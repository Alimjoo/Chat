import { getClientConfig } from "../config/client";
import { SubmitKey } from "../store/config";

const isApp = !!getClientConfig()?.isApp;

const cn = {
  WIP: "بۇ ئىقتىدار تەتقىق قىلىنماقتا....",
  Error: {
    Unauthorized: isApp
      ? "ئىناۋەتسىز API ئاچقۇچى بايقالدى ، [تەڭشەك] (/#/settings) بېتىگە كىرىپ ، API ئاچقۇچىنىڭ توغرا تەڭشەلگەنلىكىنى تەكشۈرۈڭ."
      : "زىيارەت مەخپىي نومۇرى خاتا ياكى قۇرۇق ، [كىرىش] (/#/auth) بېتىگە كىرىپ توغرا كىرىش پارولىنى كىرگۈزۈڭ ياكى [تەڭشەك] (/#/settings) بېتىدىكى ئۆزىڭىزنىڭ OpenAI API ئاچقۇچىنى تولدۇرۇڭ.",
  },
  Auth: {
    Title: "پارول تەلەپ قىلىنىدۇ",
    Tips: "باشقۇرغۇچى پارولنى دەلىللەشنى تەلەپ قىلىدۇ ، تۆۋەندىكى زىيارەت كودىنى تولدۇرۇڭ",
    Input: "بۇ يەرگە كىرىش كودىنى تولدۇرۇڭ",
    Confirm: "جەزىملەشتۈرۈش",
    Later: "كىيىن بىرگەپ بوسۇن",
  },
  ChatItem: {
    ChatItemCount: (count: number) => `${count} تال دىئالوگ`,
  },
  Chat: {
    SubTitle: (count: number) => `جەمئى ${count} تال دىئالوگ`,
    EditMessage: {
      Title: "ئۇچۇر خاتىرىسىنى تەھرىرلەش",
      Topic: {
        Title: "پاراڭلىشىش تېمىسى",
        SubTitle: "نۆۋەتتىكى پاراڭلىشىش تېمىسىنى ئۆزگەرتىش",
      },
    },
    Actions: {
      ChatList: "ئۇچۇر تىزىملىكىنى كۆرمەك",
      CompressedHistory: "پرىسلاشتىن كىيىنكى تارىخ Promptنى تەشكۈرۈش",
      Export: "پاراڭلىشىش خاتىرىسىنى چىقىرىش",
      Copy: "كۆچۈرۈش",
      Stop: "توختىتىش",
      Retry: "قايتا سىناش",
      Pin: "قاداش",
      PinToastContent:
        "بىر سۆھبەتنى ئالدىن بەلگىلەنگەن ئەسكەرتمە سۆزىگە مۇقىملاندى",
      PinToastAction: "تەكشۈرمەك",
      Delete: "يۇيىۋەتمەك",
      Edit: "تەھرىرلەش",
    },
    Commands: {
      new: "يېڭى دىئالوگ قۇرۇش",
      newm: "نىقابتىن يېڭىدىن دىئالوگ قۇرۇش",
      next: "كىينكى دىئالوگ",
      prev: "ئالدىنقى دىئالوگ",
      clear: "تېكىستنى تازىلاش",
      del: "دىئالوگنى يۇيۇش",
    },
    InputActions: {
      Stop: "توختىتىش",
      ToBottom: "ئەڭ يېڭىغا بېرىش",
      Theme: {
        auto: "ئاپتوماتىك",
        light: "يورۇق",
        dark: "قېنىق",
      },
      Prompt: "تېز بۇيرۇق",
      Masks: "ھەممە نىقاب",
      Clear: "دىئالوگنى تازىلاش",
      Settings: "دىئالوگ تەڭشەك",
    },
    Rename: "دىئالوگنى ناملاش",
    Typing: "كىرگۈزۈلىۋاتىدۇ...",
    Input: (submitKey: string) => {
      var inputHints = `${submitKey} يوللاش`;
      if (submitKey === String(SubmitKey.Enter)) {
        inputHints += "，Shift + Enter قۇر ئالماشتۇرۇش";
      }
      return inputHints + "";
    },
    Send: "يوللاش",
    Config: {
      Reset: "خاتىرىنى تازىلاش",
      SaveAs: "نىقاب قىلىپ ساقلاش",
    },
    IsContext: "ئەسكەرتىش سۆزى ",
  },
  Export: {
    Title: "دىئالوگنى ھەمبەھىرلىنىش",
    Copy: "ھەممىنى كۆچۈرۈش",
    Download: "چۈشۈرۈش",
    Share: "ShareChat كە يوللاش",
    MessageFromYou: "سىزدىن كەلگەن ئۇچۇر",
    MessageFromChatGPT: "ChatGPT دىن كەلگەن ئۇچۇر",
    Format: {
      Title: "چىقىرىش شەكلى",
      SubTitle: "Markdown ياكى PNG",
    },
    IncludeContext: {
      Title: "نىقاب تىكىستىنى ئۆزئىچىگە ئېلىش",
      SubTitle: "نىقابنى كۆرسىتەمدۇ يوق؟",
    },
    Steps: {
      Select: "تاللاش",
      Preview: "ئالدىن كۆرۈش",
    },
    Image: {
      Toast: "كەسمە رەسىم ھاسىل قىلىۋاتىدۇ",
      Modal: "ئۇرۇن ياكى ئوڭ چىكىپ رەسىمنى ساقلاش",
    },
  },
  Select: {
    Search: "ئىزدەش",
    All: "ھەممىنى تاللاش",
    Latest: "يېقىنقى تاللاش",
    Clear: "ئ‍ۆچۈرۈش",
  },
  Memory: {
    Title: "تارىختىكى",
    EmptyContent: "خاتىرە يوق",
    Send: "خاتىرىنى يوللاش",
    Copy: "خاتىرىنى كۆپەيتىش",
    Reset: "تازىلاش",
    ResetConfirm: "تارىخنى تازىلاشنى مۇقىملاشتۇرۇڭ؟",
  },
  Home: {
    NewChat: "يېڭى دىئالوگ",
    DeleteChat: "تاللانغان دىئالوگنى يۇيامسىز؟",
    DeleteToast: "دىئالوگ يۇيۇلدى",
    Revert: "قايتۇرۇۋىلىش",
  },
  Settings: {
    Title: "تەڭشەك",
    SubTitle: "ھەممە تەڭشەك",

    Danger: {
      Reset: {
        Title: "ھەممە تەڭشەكنى ئەسلىگە قايتۇرۇش",
        SubTitle: "ھەممە تەڭشەكنى ئەسلىگە قايتۇرۇش",
        Action: "ئەسلىگە قايتۇرۇش",
        Confirm: "ئەسلىگە قايتۇرۇشنى جەزىملەش ؟",
      },
      Clear: {
        Title: "ھەممە ئۇچۇرنى تازىلاش",
        SubTitle: "دىئالوگ ۋە تەڭشەك ئۇچۇرلىرىنى تازىلاش",
        Action: "تازىلاش",
        Confirm: "تازىلاشنى مۇقىملاشتۇرۇش؟",
      },
    },
    Lang: {
      Name: "Language", // ATTENTION: if you wanna add a new translation, please do not translate this value, leave it as `Language`
      All: "ھەممە تىللار",
    },
    Avatar: "باش رەسىم",
    FontSize: {
      Title: "خەت چوۇڭلىقى",
      SubTitle: "دىئالوگ ئىچىدىكى خەت چوڭلۇقى",
    },
    InjectSystemPrompts: {
      Title: "سىستىما دەرىجىلىك ئەسكەرتىش",
      SubTitle:
        "ھەر قېتىملىق تەلەپ قىلىش ئۇچۇر جەدۋىلىنىڭ باشلىنىشىغا تەقلىدىي ChatGPT سىستېمىسى ئەسكەرتىشىنى كىرگۈزۈش",
    },
    InputTemplate: {
      Title: "قەلىب كىرگۈزۈش",
      SubTitle: "ئەڭ يېقىنقى دىئالوگ نى قەلىب قىلىش",
    },

    Update: {
      Version: (x: string) => `ھازىرقى نۇسخىسى ${x}`,
      IsLatest: "ئە يېقى مۇسخىسى",
      CheckUpdate: "يېڭىلاشنى تەشكۈرۈش",
      IsChecking: "تەشكۈرۈلىۋاتىدۇ...",
      FoundUpdate: (x: string) => `يېڭى نۇسقا بايقالدى：${x}`,
      GoToUpdate: "يېڭىلاش",
    },
    SendKey: "يوللاش كونۇپكىسى",
    Theme: "پاسون",
    TightBorder: "رامكىسىز ھالەت",
    SendPreviewBubble: {
      Title: "يوللاشتىن بۇرۇنقى كۆپۈكچە",
      SubTitle: "كۆپۈكچىدە Markdown نى كۆرسىتىش",
    },
    AutoGenerateTitle: {
      Title: "ئاپتوماتىك تىما ھاسىل بولۇش",
      SubTitle: "دىئالوگ مەزمۇنىغا ئاساسەن مۇۋاپىق تېما ھاسىل قىلىش",
    },
    Mask: {
      Splash: {
        Title: "نىقاب قوزغىتىش بېتى",
        SubTitle: "يىڭىدىن پاراڭلاشقاندا نىقابنىڭ قوزغىتىش بەتنى كۆرسىتىش",
      },
      Builtin: {
        Title: "نىقابنى يۇشۇرۇش",
        SubTitle: "نىقاب تىزىملىكىدىن يۇشۇرۇش",
      },
    },
    Prompt: {
      Disable: {
        Title: "ئەسكەرتمە سۆزنى ئاپتوماتىك تولۇقلاش مەنئىي قىلىش",
        SubTitle:
          "كىرگۈزۈش رامكىسىنىڭ بېشىدا /  نى كىرگۈزسە ئاپتوماتىك تاماملاش قوزغىلىدۇ",
      },
      List: "ئۆزى ئېنىقلىما بېرىش ئەسكەرتمە سۆز تىزىملىكى ياساش",
      ListCount: (builtin: number, custom: number) =>
        `ئەسلىدە ${builtin} تال，ئابۇنىت بىكىتكەن ${custom} تال`,
      Edit: "تەھرىرلەش",
      Modal: {
        Title: "ئەسكەرتمە تىزىملىكى",
        Add: "يېڭىدىن قۇرۇش",
        Search: "ئەسكەرتمە ئىزدەش",
      },
      EditModal: {
        Title: "ئەسكەرتمىنى تەھرىرلەش",
      },
    },
    HistoryCount: {
      Title: "قوشۇمچە تارىخىي ئۇچۇر سانى",
      SubTitle: "ھەر قېتىم ئېلىپ يۈرۈشنى تەلەپ قىلغان تارىخىي ئۇچۇر سانى",
    },
    CompressThreshold: {
      Title: "تارىخىي ئۇچۇرنىڭ ئۇزۇنلۇقى قىسقارتىدىغان ئۆلچەم",
      SubTitle:
        "قىسقارتىلمىغان تارىخىي خەۋەر بۇ قىممەتتىن ئېشىپ كەتكەندە قىسقارتىش",
    },
    Token: {
      Title: "API Key",
      SubTitle: "ئۆزىڭىزنىڭ API ئاچقۇچىنى كىرگۈزۈڭ",
      Placeholder: "OpenAI API Key",
    },

    Usage: {
      Title: "قالدۇق سوممىسىنى تەشكۈرۈش",
      SubTitle(used: any, total: any) {
        return `بۇ ئايدا ئىشلىتىپ بولغىنى $${used}，ئومۇمىي سوممىسى $${total}`;
      },
      IsChecking: "تەشكۈرۈلىۋاتىدۇ...",
      Check: "قايتا تەشكۈرۈش",
      NoAccess:
        "API Keyنى كىرگۈزۈش ياكى مەخپىي نومۇرنى تەكشۈرۈپ قالدۇق سوممىسىنى تەشكۈرۈش",
    },
    AccessCode: {
      Title: "مەخپى شىفىر",
      SubTitle: "باشقۇرغۇچى شىفىر تەلەپ قىلىدۇ",
      Placeholder: "شىفىز نى كىرگۈزۈڭ",
    },
    Endpoint: {
      Title: "ئۇلاش ئېغىزى ئادرېسى",
      SubTitle: "سۈكۈتتىكى ئادرېستىن باشقا ، http(s):// چوقۇم بولۇشى كېرەك",
    },
    CustomModel: {
      Title: "ئۆزى ئېنىقلىما بېرىش مودېلى نامى",
      SubTitle:
        "ئۆزى بەلگىلەنگەن مودېلنى كۆپەيتىپ، ئىنگلىزچە پەش بىلەن ئايرىش كېرەك",
    },
    Model: "مودىل (model)",
    Temperature: {
      Title: "ئىختىيارىيلىقى (temperature)",
      SubTitle: "چوڭ بوغانسىرى، جاۋاپ تېخىمۇ ئىختىيار بولىدۇ",
    },
    TopP: {
      Title: "يادرو ئەۋرىشكە ئېلىش (top_p)",
      SubTitle:
        "ئىختىيارىي خاراكتېرىگە ئوخشاپ كېتىدۇ، لېكىن ئىختىيارىي خاراكتېر بىلەن بىللە ئۆزگەرتمەڭ",
    },
    MaxTokens: {
      Title: "بىر قېتىملىق جاۋاب قايتۇرۇش چەكلىمىسى (max_tokens)",
      SubTitle: "بىر قېتىملىق دىئالوگقا ئىشلىتىلىدىغان ئەڭ چوڭ Token سانى",
    },
    PresencePenalty: {
      Title: "تېما يېڭىلىق دەرىجىسى (presence_penalty)",
      SubTitle: "قىممىتى قانچە چوڭ بولسا، يېڭى تېمىغا كېڭەيتىلىشى مۇمكىن",
    },
    FrequencyPenalty: {
      Title: "چاستوتىلىق جازالاش دەرىجىسى (frequency_penalty)",
      SubTitle:
        "قىممىتى قانچە چوڭ بولسا، تەكرار خەتلىك سۆزنى شۇنچە تۆۋەنلىتىشى مۇمكىن",
    },
  },
  Store: {
    DefaultTopic: "يېڭى دىئ‍الوگ",
    BotHello:
      "ئۇيغۇرچىنى مۇكەممەل قوللىمايدۇ، ئەڭ ياخشىسى خەنزۇچە ياكى ئىنگىلىزچە سۇئال سوراڭ!!!",
    Error: "خاتالىق چىقتى، سەل تۇرۇپ قايتا سىناپ بېقىڭ",
    Prompt: {
      History: (content: string) =>
        "بۇ سۆھبەت تارىخىنىڭ قىسقىچە مەزمۇنىنى: " + content,
      Topic:
        "使用四到五个字直接返回这句话的简要主题，不要解释、不要标点、不要语气词、不要多余文本，如果没有主题，请直接返回“闲聊”",
      Summarize:
        "简要总结一下对话内容，用作后续的上下文提示 prompt，控制在 200 字以内",
    },
  },
  Copy: {
    Success: "كۆچۈرۈلدى",
    Failed: "كۆچۈرۈش مەغلۇپ بولدى، ھوقۇق تەقسىم قىلىڭ",
  },
  Context: {
    Toast: (x: any) => `${x} تال ئەسكەرتمە سۆز بار`,
    Edit: "نۆۋەتتىكى سۆھبەت تەسىس قىلىش",
    Add: "يېڭىدىن بىر سۆھبەت قوشۇلدى",
    Clear: "تازىلىنىپ بولدى",
    Revert: "ئەسلىگە كەلتۈرۈش",
  },
  Plugin: {
    Name: "قىستۇرما",
  },
  Mask: {
    Name: "نىقاب",
    Page: {
      Title: "ئالدىن بىكىتىلگەن رول نىقاب",
      SubTitle: (count: number) => `${count} تال رول`,
      Search: "نىقاب ئىزدەش",
      Create: "يېڭىدىن قۇرۇش",
    },
    Item: {
      Info: (count: number) => `${count} تال دىئالوگ`,
      Chat: "دىئالوگ",
      View: "كۆرۈش",
      Edit: "تەھرىرلەش",
      Delete: "يۇيۇش",
      DeleteConfirm: "يۇيامسىز؟",
    },
    EditModal: {
      Title: (readonly: boolean) =>
        `نىقابنى تەھرىرلەش ${readonly ? "（پەقەت ئوقۇش）" : ""}`,
      Download: "چۈشۈرۈش",
      Clone: "كىلونلاش",
    },
    Config: {
      Avatar: "رول باش رەسىمى",
      Name: "رول نامى",
      Sync: {
        Title: "ئومۇمىي ۋەزىيەتنى تەسىس قىلىشنى ئىشلىتىش",
        SubTitle:
          "نۆۋەتتىكى سۆھبەتتە ئومۇمىي ۋەزىيەت مودېلى ئارقىلىق تەسىس قىلىندىمۇ",
        Confirm:
          "نۆۋەتتە سۆھبەتنىڭ ئاپتوماتىك ئېنىقلىمىسى ئاپتوماتىك قاپلىنىپ، ئىشلىتىش ئومۇمىيلىقىنى جەزىملەشتۈرەلەمدۇ؟",
      },
      HideContext: {
        Title: "يوشۇرۇن ئالدىن بېكىتىلگەن دىئالوگ",
        SubTitle:
          "يوشۇرغاندىن كېيىن ئالدىن مۆلچەرلەشكەن سۆھبەت پاراڭلىشىش كۆرۈنمە يۈزىدە كۆرۈلمەيدۇ",
      },
      Share: {
        Title: "نىقابنى ھەمبەھىرلىنىش",
        SubTitle: "بۇ نىقابنى ھاسىل قىلىدىغان بىۋاستە ئۇلانما",
        Action: "ئۇلانمىنى كۆچۈرۈش",
      },
    },
  },
  NewChat: {
    Return: "قايتىش",
    Skip: "بىراقلا باشلاش",
    NotShow: "بۇندىن كىيىن ئەسكەرتمەڭ",
    ConfirmNoShow:
      "چەكلەنگەنلىكىنى جەزىملەشتۈرۈش ؟ چەكلەنگەندىن كېيىن ھەرۋاقىت تەسىس قىلىش جەريانىدا قايتىدىن ئىشقا كىرىشتۈرۈلىدۇ.",
    Title: "نىقاب تاللاڭ",
    SubTitle:
      "ھازىردىن باشلاپ نىقابنىڭ ئارقىسىدىكى روھ تەپەككۇرى بىلەن سوقۇلىدۇ",
    More: "ھەممىنى كۆرۈش",
  },

  URLCommand: {
    Code: "检测到链接中已经包含访问码，是否自动填入？",
    Settings: "检测到链接中包含了预制设置，是否自动填入？",
  },

  UI: {
    Confirm: "خەزىملەش",
    Cancel: "ئەمەلدىن قالدۇرۇش",
    Close: "تاقاش",
    Create: "تېڭىدىن قۇرۇش",
    Edit: "تەھرىرلەش",
  },
  Exporter: {
    Model: "مودىل",
    Messages: "ئۇچۇر",
    Topic: "تىما",
    Time: "ۋاقىت",
  },
};

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type LocaleType = typeof cn;
export type PartialLocaleType = DeepPartial<typeof cn>;

export default cn;
