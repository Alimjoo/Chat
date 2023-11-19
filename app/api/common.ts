import { NextRequest, NextResponse } from "next/server";

export const OPENAI_URL = "api.openai.com";
const DEFAULT_PROTOCOL = "https";
const PROTOCOL = process.env.PROTOCOL || DEFAULT_PROTOCOL;
const BASE_URL = process.env.BASE_URL || OPENAI_URL;
const DISABLE_GPT4 = !!process.env.DISABLE_GPT4;

// import { getHeaders} from "../client/api";
import { ACCESS_CODE_PREFIX, apiUrl } from "@/app/constant";
import { EvalSourceMapDevToolPlugin } from "webpack";

// async function check_gpt4_name(accessCode: string): Promise<number> {
//   const url = apiUrl + `checkName/${accessCode}`;
//   try {
//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const data = await response.json();
//     if (data == "1") {
//       return 1;
//     } else {
//       return 0;
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     return 0;
//   }
// }

interface MyObject {
  model: string;
}

export async function get_remaining_word_count(
  name: string,
  model: string,
): Promise<string> {
  const apiUrll = apiUrl + `getMessage/${name}`;

  try {
    const response = await fetch(apiUrll);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const message = data.message;

    if (model == "gpt-4") {
      return message[1];
    } else {
      return message[0];
    }

    return message;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to handle it further, if needed
  }
}

export async function requestOpenai(req: NextRequest, accessCode: string) {
  const controller = new AbortController();
  const authValue = req.headers.get("Authorization") ?? "";
  const openaiPath = `${req.nextUrl.pathname}${req.nextUrl.search}`.replaceAll(
    "/api/openai/",
    "",
  );

  let baseUrl = BASE_URL;

  if (!baseUrl.startsWith("http")) {
    baseUrl = `${PROTOCOL}://${baseUrl}`;
  }

  if (baseUrl.endsWith("/")) {
    baseUrl = baseUrl.slice(0, -1);
  }

  console.log("[Proxy] ", openaiPath);
  console.log("[Base Url]", baseUrl);

  if (process.env.OPENAI_ORG_ID) {
    console.log("[Org ID]", process.env.OPENAI_ORG_ID);
  }

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 10 * 60 * 1000);

  const fetchUrl = `${baseUrl}/${openaiPath}`;
  const fetchOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      Authorization: authValue,
      ...(process.env.OPENAI_ORG_ID && {
        "OpenAI-Organization": process.env.OPENAI_ORG_ID,
      }),
    },
    method: req.method,
    body: req.body,
    // to fix #2485: https://stackoverflow.com/questions/55920957/cloudflare-worker-typeerror-one-time-use-body
    redirect: "manual",
    // @ts-ignore
    duplex: "half",
    signal: controller.signal,
  };

  // if (!DISABLE_GPT4 && req.body) {
  //   try {
  //     const clonedBody = await req.text();
  //     fetchOptions.body = clonedBody;

  //     const jsonBody = JSON.parse(clonedBody);

  //     if ((jsonBody?.model ?? "").includes("gpt-4")) {
  //       const a = await check_gpt4_name(accessCode);
  //       console.log(a);
  //       if (!a) {
  //         return NextResponse.json(
  //           {
  //             error: true,
  //             message: "无权访问GPT-4, 请联系管理员",
  //             contect: "微信:Pistallion",
  //           },
  //           {
  //             status: 403,
  //           },
  //         );
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }
  let model = "";
  if (!DISABLE_GPT4 && req.body) {
    try {
      const clonedBody = await req.text();
      fetchOptions.body = clonedBody;

      const jsonBody = JSON.parse(clonedBody);

      if ((jsonBody?.model ?? "").includes("gpt-4")) {
        model = "gpt-4";
      } else {
        model = "gpt-3.5-turbo";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const num = await get_remaining_word_count("alim", model);
  if (Number(num) <= 0) {
    return NextResponse.json(
      {
        error: true,
        message: model + " 的字数已用完",
        contect: "联系 微信:Pistallion, 进行充值",
      },
      {
        status: 403,
      },
    );
  }

  // #1815 try to refuse gpt4 request
  if (DISABLE_GPT4 && req.body) {
    try {
      const clonedBody = await req.text();
      fetchOptions.body = clonedBody;

      const jsonBody = JSON.parse(clonedBody);

      if ((jsonBody?.model ?? "").includes("gpt-4")) {
        return NextResponse.json(
          {
            error: true,
            message: "you are not allowed to use gpt-4 model",
          },
          {
            status: 403,
          },
        );
      }
    } catch (e) {
      console.error("[OpenAI] gpt4 filter", e);
    }
  }

  try {
    const res = await fetch(fetchUrl, fetchOptions);

    // to prevent browser prompt for credentials
    const newHeaders = new Headers(res.headers);
    newHeaders.delete("www-authenticate");
    // to disable nginx buffering
    newHeaders.set("X-Accel-Buffering", "no");

    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers: newHeaders,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}
