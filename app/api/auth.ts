import { NextRequest } from "next/server";
import { getServerSideConfig } from "../config/server";
import md5 from "spark-md5";
import { ACCESS_CODE_PREFIX, apiUrl } from "../constant";
import { error } from "console";
import { ContextExclusionPlugin } from "webpack";
function getIP(req: NextRequest) {
  let ip = req.ip ?? req.headers.get("x-real-ip");
  const forwardedFor = req.headers.get("x-forwarded-for");

  if (!ip && forwardedFor) {
    ip = forwardedFor.split(",").at(0) ?? "";
  }

  return ip;
}

function parseApiKey(bearToken: string) {
  const token = bearToken.trim().replaceAll("Bearer ", "").trim();
  const isOpenAiKey = !token.startsWith(ACCESS_CODE_PREFIX);

  return {
    accessCode: isOpenAiKey ? "" : token.slice(ACCESS_CODE_PREFIX.length),
    apiKey: isOpenAiKey ? token : "",
  };
}

export async function fetchMessage(name: string): Promise<string> {
  const apiUrll = apiUrl + `getMessage/${name}`;

  try {
    const response = await fetch(apiUrll);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const message = data.message;

    return message;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to handle it further, if needed
  }
}

export async function auth(req: NextRequest) {
  const authToken = req.headers.get("Authorization") ?? "";

  // check if it is openai api key or user token
  const { accessCode, apiKey: token } = parseApiKey(authToken);

  try {
    const message = await fetchMessage(accessCode);

    if (Number(message) <= 0) {
      return {
        error: true,
        msg: "字数已用完",
      };
    }

    const hashedCode = md5.hash(accessCode ?? "").trim();

    const serverConfig = getServerSideConfig();
    console.log("[Auth] allowed hashed codes: ", [...serverConfig.codes]);
    console.log("[Auth] got access code:", accessCode);
    console.log("[Auth] hashed access code:", hashedCode);
    console.log("[User IP] ", getIP(req));
    console.log("[Time] ", new Date().toLocaleString());

    if (
      serverConfig.needCode &&
      !serverConfig.codes.has(hashedCode) &&
      !token
    ) {
      return {
        error: true,
        msg: !accessCode ? "empty access code" : "wrong access code",
      };
    }

    // if user does not provide an api key, inject system api key
    if (!token) {
      const apiKey = serverConfig.apiKey;
      if (apiKey) {
        console.log("[Auth] use system api key");
        req.headers.set("Authorization", `Bearer ${apiKey}`);
      } else {
        console.log("[Auth] admin did not provide an api key");
      }
    } else {
      console.log("[Auth] use user api key");
    }

    return {
      error: false,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      error: true,
      msg: "Error fetching message", // You can customize the error message here
    };
  }
}
