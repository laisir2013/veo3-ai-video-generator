var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/_core/env.ts
var ENV;
var init_env = __esm({
  "server/_core/env.ts"() {
    "use strict";
    ENV = {
      appId: process.env.VITE_APP_ID ?? "",
      cookieSecret: process.env.JWT_SECRET ?? "",
      databaseUrl: process.env.DATABASE_URL ?? "",
      oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
      ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
      isProduction: process.env.NODE_ENV === "production",
      forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
      forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? ""
    };
  }
});

// server/videoConfig.ts
function getNextApiKey() {
  const key = API_KEYS[currentKeyIndex];
  currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
  return key;
}
var API_KEYS, currentKeyIndex, LLM_FALLBACK_CONFIG, VIDEO_FALLBACK_CHAIN, SPEED_MODE_PRESETS, STORY_MODE_PRESETS, MODE_PRESETS, VIDEO_MODELS, LLM_MODELS, API_ENDPOINTS, KREADO_CONFIG, VOICE_ACTORS, VOICE_MODES, VOICE_MATCHING_RULES;
var init_videoConfig = __esm({
  "server/videoConfig.ts"() {
    "use strict";
    API_KEYS = [
      process.env.VECTORENGINE_API_KEY_1 || "sk-nwsjL79MgOjKO3UOrt1LGNoj2D5jWbcfCwoDsc8Utf2OOhUI",
      process.env.VECTORENGINE_API_KEY_2 || "sk-0WSOTsnoaf0eNstC4pJOjrLNJjBTZi0DMYsKV6jaLOV4ydfX",
      process.env.VECTORENGINE_API_KEY_3 || "sk-fX1KaFxYUxy6S7ouggSGeLLmLuoq1zDUQDGAxyVxrWJgtqQr",
      process.env.VECTORENGINE_API_KEY_4 || "sk-DaOpIa2ho5AiWbdV6mzOaFWDZH1UlgASOspMRQtXIJxQqGhN",
      process.env.VECTORENGINE_API_KEY_5 || "sk-15QTY6nSAiFca0FCP9Yks3xlmTvL2XZjck1MMPgNznGiBsXs",
      process.env.VECTORENGINE_API_KEY_6 || "sk-T0qvRM5CIInHsskdqWV0f9Te9g8FKd7dUCfljaGWpOH4Q0Rk",
      process.env.VECTORENGINE_API_KEY_7 || "sk-uNpzao62UqY6LxrFyMo3DPImXYL2wdjydEKuPWrh8EGXrvoI",
      process.env.VECTORENGINE_API_KEY_8 || "sk-2gu2bPuvn8t6AC6wzk6NmkBIXaj34Zmvt9OpgabxQFRIW71H",
      process.env.VECTORENGINE_API_KEY_9 || "sk-M6x6doe0uKMs9DpWTDIXATeSagxOwibEkBGZytl8KblvLW2U",
      process.env.VECTORENGINE_API_KEY_10 || "sk-TRgLLnSrMqI5SuM5hkBuDeSyVYhrdppsG9Vk3grADVVryhqj",
      process.env.VECTORENGINE_API_KEY_11 || "sk-YnfJNruhEpjzEOWNmIu9TjqMhOB01NLHy6thK6Zgb0bCQ5GT",
      process.env.VECTORENGINE_API_KEY_12 || "sk-R8Zkzp274XV4Ni99H6I3RaBC7yJ8wUvbYTMETbllQYTLn9HS",
      process.env.VECTORENGINE_API_KEY_13 || "sk-VC7kkQW6bxEvTvAHdsyXCWI2eyM9UIgwa9JzTXdNLP3b5yG3"
    ].filter(Boolean);
    currentKeyIndex = 0;
    LLM_FALLBACK_CONFIG = {
      "gpt-5.2": "claude-opus-4-5-20251101",
      "claude-opus-4-5-20251101": "gpt-5.2"
    };
    VIDEO_FALLBACK_CHAIN = {
      "veo3.1-pro": ["veo3.1-fast", "runway", "kling"],
      "veo3.1-fast": ["runway", "kling"],
      "runway": ["kling"],
      "kling": []
    };
    SPEED_MODE_PRESETS = {
      fast: {
        name: "\u5FEB\u901F\u6A21\u5F0F",
        description: "\u9069\u5408\u6E2C\u8A66\u548C\u5FEB\u901F\u9810\u89BD",
        llm: "gpt-5.2",
        llmFallback: "claude-opus-4-5-20251101",
        video: "veo3.1-fast",
        videoFallback: ["runway", "kling"],
        mjMode: "fast",
        estimatedTime: "3-5 \u5206\u9418",
        quality: "\u6A19\u6E96",
        price: "\uFFE50.35/\u8996\u983B"
      },
      quality: {
        name: "\u9AD8\u8CEA\u91CF\u6A21\u5F0F",
        description: "\u9069\u5408\u6B63\u5F0F\u88FD\u4F5C",
        llm: "claude-opus-4-5-20251101",
        llmFallback: "gpt-5.2",
        video: "veo3.1-pro",
        videoFallback: ["veo3.1-fast", "runway", "kling"],
        mjMode: "default",
        estimatedTime: "8-15 \u5206\u9418",
        quality: "\u96FB\u5F71\u7D1A",
        price: "\uFFE51.75/\u8996\u983B"
      }
    };
    STORY_MODE_PRESETS = {
      character: {
        name: "\u56FA\u5B9A\u4EBA\u7269\u6A21\u5F0F",
        description: "\u4FDD\u6301\u89D2\u8272\u5916\u89C0\u4E00\u81F4\uFF0C\u9069\u5408\u6545\u4E8B\u7247\u3001\u77ED\u5287\u3001\u5EE3\u544A",
        icon: "\u{1F464}",
        features: [
          "\u751F\u6210\u89D2\u8272\u57FA\u790E\u5716",
          "\u4F7F\u7528 --cref \u4FDD\u6301\u89D2\u8272\u4E00\u81F4\u6027",
          "\u9069\u5408\u6709\u4E3B\u89D2\u7684\u6545\u4E8B"
        ],
        generateCharacterBase: true,
        useCref: true
      },
      scene: {
        name: "\u5287\u60C5\u6A21\u5F0F",
        description: "\u7D14\u5834\u666F\u6558\u4E8B\uFF0C\u9069\u5408\u98A8\u666F\u7247\u3001\u7522\u54C1\u5C55\u793A\u3001\u6982\u5FF5\u8996\u983B",
        icon: "\u{1F3AC}",
        features: [
          "\u76F4\u63A5\u751F\u6210\u5834\u666F\u5716\u7247",
          "\u7121\u9700\u89D2\u8272\u4E00\u81F4\u6027",
          "\u66F4\u5FEB\u901F\u3001\u66F4\u4F4E\u6210\u672C"
        ],
        generateCharacterBase: false,
        useCref: false
      }
    };
    MODE_PRESETS = SPEED_MODE_PRESETS;
    VIDEO_MODELS = {
      "veo3.1-fast": {
        name: "Veo 3.1 Fast",
        provider: "Google",
        price: "\xA50.35/\u6B21",
        quality: "\u6A19\u6E96",
        speed: "\u5FEB\u901F",
        duration: "8\u79D2"
      },
      "veo3.1-pro": {
        name: "Veo 3.1 Pro",
        provider: "Google",
        price: "\xA51.75/\u6B21",
        quality: "\u96FB\u5F71\u7D1A",
        speed: "\u8F03\u6162",
        duration: "8\u79D2"
      },
      "veo3.1": {
        name: "Veo 3.1",
        provider: "Google",
        price: "\xA50.35/\u6B21",
        quality: "\u9AD8",
        speed: "\u4E2D\u7B49",
        duration: "8\u79D2"
      },
      "kling": {
        name: "\u53EF\u9748 Kling 1.6",
        provider: "\u5FEB\u624B",
        price: "\xA50.30/\u6B21",
        quality: "\u9AD8",
        speed: "\u4E2D\u7B49",
        duration: "5\u79D2"
      },
      "runway": {
        name: "Runway Gen-3 Alpha",
        provider: "Runway",
        price: "\xA50.50/\u6B21",
        quality: "\u9AD8",
        speed: "\u5FEB\u901F",
        duration: "10\u79D2"
      }
    };
    LLM_MODELS = {
      "gpt-4o-mini": {
        name: "GPT-4o Mini",
        provider: "OpenAI",
        price: "\xA50.075/M",
        speed: "\u6700\u5FEB"
      },
      "gpt-4o": {
        name: "GPT-4o",
        provider: "OpenAI",
        price: "\xA51.25/M",
        speed: "\u5FEB\u901F"
      },
      "claude-opus-4-5-20251101": {
        name: "Claude Opus 4.5",
        provider: "Anthropic",
        price: "\xA54.00/M \u8F38\u5165, \xA520.00/M \u8F38\u51FA",
        speed: "\u4E2D\u7B49"
      },
      "gemini-3-pro-preview": {
        name: "Gemini 3 Pro",
        provider: "Google",
        price: "\xA50.60/M",
        speed: "\u4E2D\u7B49"
      },
      "gpt-5.2": {
        name: "GPT-5.2",
        provider: "OpenAI",
        price: "\xA50.525/M",
        speed: "\u4E2D\u7B49"
      }
    };
    API_ENDPOINTS = {
      vectorEngine: "https://api.vectorengine.ai",
      kreadoAi: "https://api.kreadoai.com"
    };
    KREADO_CONFIG = {
      apiKey: process.env.KREADO_AI_API_KEY || "E8B341B32147B299DB8ABFE9BD077929",
      voiceId: "Minimax919724_52965111962639",
      cantonese: { languageId: "1767068435675340826", voiceSource: 5 },
      mandarin: { languageId: "1767068435675340832", voiceSource: 5 }
    };
    VOICE_ACTORS = {
      // ============================================
      // 粵語配音員 (Cantonese)
      // ============================================
      // 基礎配音員
      "cantonese-male-narrator": {
        id: "cantonese-male-narrator",
        name: "\u66F8\u8072\u5112\u96C5",
        gender: "male",
        type: "narrator",
        language: "cantonese",
        description: "\u6E3E\u539A\u7A69\u91CD\u7684\u7CB5\u8A9E\u7537\u8072\uFF0C\u9069\u5408\u65C1\u767D\u548C\u6558\u8FF0",
        voice: "alloy",
        sampleText: "\u5927\u5BB6\u597D\uFF0C\u6B61\u8FCE\u569F\u5230\u6211\u5605\u983B\u9053\uFF0C\u4ECA\u65E5\u540C\u4F60\u54CB\u5206\u4EAB\u4E00\u500B\u7CBE\u5F69\u5605\u6545\u4E8B\u3002",
        tags: ["\u65C1\u767D", "\u6558\u8FF0", "\u7D00\u9304\u7247"]
      },
      "cantonese-male-young": {
        id: "cantonese-male-young",
        name: "\u78C1\u6027\u7537\u8072",
        gender: "male",
        type: "character",
        language: "cantonese",
        description: "\u5E74\u8F15\u6709\u6D3B\u529B\u7684\u7CB5\u8A9E\u7537\u8072\uFF0C\u9069\u5408\u5E74\u8F15\u7537\u6027\u89D2\u8272",
        voice: "echo",
        sampleText: "\u54CE\uFF0C\u4F60\u8B1B\u5605\u4FC2\u5514\u4FC2\u771F\u35CE\uFF1F\u6211\u8981\u8A66\u4E0B\u5148\u5F97\uFF01",
        tags: ["\u5E74\u8F15", "\u6D3B\u6F51", "\u7537\u4E3B\u89D2"]
      },
      "cantonese-male-mature": {
        id: "cantonese-male-mature",
        name: "\u6210\u719F\u7537\u8072",
        gender: "male",
        type: "character",
        language: "cantonese",
        description: "\u6210\u719F\u7A69\u91CD\u7684\u7CB5\u8A9E\u7537\u8072\uFF0C\u9069\u5408\u4E2D\u5E74\u7537\u6027\u89D2\u8272",
        voice: "onyx",
        sampleText: "\u5462\u4EF6\u4E8B\u5514\u7C21\u55AE\uFF0C\u8981\u8AD7\u6E05\u695A\u5148\u5F97\u3002",
        tags: ["\u6210\u719F", "\u7A69\u91CD", "\u7236\u89AA", "\u8001\u95C6"]
      },
      "cantonese-female-narrator": {
        id: "cantonese-female-narrator",
        name: "\u9748\u97FB",
        gender: "female",
        type: "narrator",
        language: "cantonese",
        description: "\u6EAB\u67D4\u512A\u96C5\u7684\u7CB5\u8A9E\u5973\u8072\uFF0C\u9069\u5408\u65C1\u767D\u548C\u6558\u8FF0",
        voice: "nova",
        sampleText: "\u55BA\u5462\u500B\u5B89\u975C\u5605\u591C\u665A\uFF0C\u6708\u5149\u7167\u55BA\u5C0F\u93AE\u5605\u8857\u9053\u4E0A...",
        tags: ["\u65C1\u767D", "\u6558\u8FF0", "\u6EAB\u67D4"]
      },
      "cantonese-female-young": {
        id: "cantonese-female-young",
        name: "\u9748\u97F3\u59EC",
        gender: "female",
        type: "character",
        language: "cantonese",
        description: "\u5E74\u8F15\u6D3B\u6F51\u7684\u7CB5\u8A9E\u5973\u8072\uFF0C\u9069\u5408\u5E74\u8F15\u5973\u6027\u89D2\u8272",
        voice: "shimmer",
        sampleText: "\u54C7\uFF0C\u771F\u4FC2\u597D\u975A\u5440\uFF01\u6211\u5514\u6562\u76F8\u4FE1\u5440\uFF01",
        tags: ["\u5E74\u8F15", "\u6D3B\u6F51", "\u5973\u4E3B\u89D2"]
      },
      "cantonese-female-mature": {
        id: "cantonese-female-mature",
        name: "\u9748\u6C50",
        gender: "female",
        type: "character",
        language: "cantonese",
        description: "\u6210\u719F\u512A\u96C5\u7684\u7CB5\u8A9E\u5973\u8072\uFF0C\u9069\u5408\u4E2D\u5E74\u5973\u6027\u89D2\u8272",
        voice: "alloy",
        sampleText: "\u4F60\u8981\u8A18\u4F4F\uFF0C\u505A\u4EBA\u6700\u7DCA\u8981\u4FC2\u8AA0\u5BE6\u3002",
        tags: ["\u6210\u719F", "\u512A\u96C5", "\u6BCD\u89AA"]
      },
      // 擴充粵語男聲
      "cantonese-male-deep": {
        id: "cantonese-male-deep",
        name: "\u6C89\u7A69\u7537",
        gender: "male",
        type: "character",
        language: "cantonese",
        description: "\u6DF1\u6C89\u6709\u78C1\u6027\u7684\u7537\u8072\uFF0C\u9069\u5408\u795E\u79D8\u6216\u6B63\u5F0F\u5834\u5408",
        voice: "fable",
        sampleText: "\u547D\u904B\u5605\u8F2A\u76E4\u5DF2\u7D93\u958B\u59CB\u8F49\u52D5...",
        tags: ["\u6DF1\u6C89", "\u78C1\u6027", "\u795E\u79D8"]
      },
      "cantonese-male-energetic": {
        id: "cantonese-male-energetic",
        name: "\u96F2\u9038",
        gender: "male",
        type: "character",
        language: "cantonese",
        description: "\u5145\u6EFF\u6D3B\u529B\u7684\u7537\u8072\uFF0C\u9069\u5408\u904B\u52D5\u6216\u5192\u96AA\u89D2\u8272",
        voice: "echo",
        sampleText: "\u885D\u5440\uFF01\u6211\u54CB\u4E00\u5B9A\u5F97\u35CE\uFF01",
        tags: ["\u6D3B\u529B", "\u904B\u52D5", "\u5192\u96AA"]
      },
      "cantonese-male-elegant": {
        id: "cantonese-male-elegant",
        name: "\u8FEA\u66DC",
        gender: "male",
        type: "character",
        language: "cantonese",
        description: "\u512A\u96C5\u7D33\u58EB\u7684\u7537\u8072\uFF0C\u9069\u5408\u8CB4\u65CF\u6216\u5546\u52D9\u89D2\u8272",
        voice: "onyx",
        sampleText: "\u8ACB\u5BB9\u8A31\u6211\u81EA\u6211\u4ECB\u7D39...",
        tags: ["\u512A\u96C5", "\u7D33\u58EB", "\u8CB4\u65CF"]
      },
      "cantonese-male-dj": {
        id: "cantonese-male-dj",
        name: "\u97F3\u97FB\u4FCA\u6717",
        gender: "male",
        type: "character",
        language: "cantonese",
        description: "DJ\u98A8\u683C\u7684\u7537\u8072\uFF0C\u9069\u5408\u5A1B\u6A02\u7BC0\u76EE",
        voice: "echo",
        sampleText: "\u5404\u4F4D\u89C0\u773E\u670B\u53CB\uFF0C\u6E96\u5099\u597D\u672A\uFF1F",
        tags: ["DJ", "\u5A1B\u6A02", "\u6D3B\u6F51"]
      },
      "cantonese-male-boy": {
        id: "cantonese-male-boy",
        name: "\u4E2D\u4E8C\u541B",
        gender: "male",
        type: "character",
        language: "cantonese",
        description: "\u4E2D\u4E8C\u5C11\u5E74\u98A8\u683C\uFF0C\u9069\u5408\u52D5\u6F2B\u89D2\u8272",
        voice: "echo",
        sampleText: "\u898B\u8B58\u4E0B\u6211\u5605\u5FC5\u6BBA\u6280\uFF01",
        tags: ["\u4E2D\u4E8C", "\u5C11\u5E74", "\u52D5\u6F2B"]
      },
      "cantonese-male-scholar": {
        id: "cantonese-male-scholar",
        name: "\u535A\u6587",
        gender: "male",
        type: "character",
        language: "cantonese",
        description: "\u5B78\u8005\u98A8\u683C\u7684\u7537\u8072\uFF0C\u9069\u5408\u77E5\u8B58\u5206\u4EAB",
        voice: "alloy",
        sampleText: "\u6839\u64DA\u6B77\u53F2\u8A18\u8F09...",
        tags: ["\u5B78\u8005", "\u77E5\u8B58", "\u6559\u80B2"]
      },
      "cantonese-male-hero": {
        id: "cantonese-male-hero",
        name: "\u51F1\u591C",
        gender: "male",
        type: "character",
        language: "cantonese",
        description: "\u82F1\u96C4\u98A8\u683C\u7684\u7537\u8072\uFF0C\u9069\u5408\u52D5\u4F5C\u89D2\u8272",
        voice: "onyx",
        sampleText: "\u6211\u6703\u4FDD\u8B77\u4F60\u54CB\uFF01",
        tags: ["\u82F1\u96C4", "\u52D5\u4F5C", "\u6B63\u7FA9"]
      },
      "cantonese-male-cold": {
        id: "cantonese-male-cold",
        name: "\u51B7\u50B2\u9752\u92D2",
        gender: "male",
        type: "character",
        language: "cantonese",
        description: "\u51B7\u9177\u98A8\u683C\u7684\u7537\u8072\uFF0C\u9069\u5408\u53CD\u6D3E\u6216\u9AD8\u51B7\u89D2\u8272",
        voice: "onyx",
        sampleText: "\u5514\u597D\u963B\u4F4F\u6211\u3002",
        tags: ["\u51B7\u9177", "\u9AD8\u51B7", "\u53CD\u6D3E"]
      },
      "cantonese-male-dragon": {
        id: "cantonese-male-dragon",
        name: "\u9F8D\u562F\u5A01\u8072",
        gender: "male",
        type: "character",
        language: "cantonese",
        description: "\u9738\u6C23\u5A01\u56B4\u7684\u7537\u8072\uFF0C\u9069\u5408\u9818\u8896\u89D2\u8272",
        voice: "onyx",
        sampleText: "\u807D\u6211\u865F\u4EE4\uFF01",
        tags: ["\u9738\u6C23", "\u5A01\u56B4", "\u9818\u8896"]
      },
      "cantonese-male-sunny": {
        id: "cantonese-male-sunny",
        name: "\u967D\u5149\u5065\u7FD4",
        gender: "male",
        type: "character",
        language: "cantonese",
        description: "\u967D\u5149\u958B\u6717\u7684\u7537\u8072\uFF0C\u9069\u5408\u904B\u52D5\u6216\u5065\u5EB7\u4E3B\u984C",
        voice: "echo",
        sampleText: "\u4ECA\u65E5\u5929\u6C23\u771F\u4FC2\u597D\uFF01\u4E00\u9F4A\u505A\u904B\u52D5\u5566\uFF01",
        tags: ["\u967D\u5149", "\u904B\u52D5", "\u5065\u5EB7"]
      },
      // 擴充粵語女聲
      "cantonese-female-sweet": {
        id: "cantonese-female-sweet",
        name: "\u9748\u97F3\u59B9",
        gender: "female",
        type: "character",
        language: "cantonese",
        description: "\u751C\u7F8E\u53EF\u611B\u7684\u5973\u8072\uFF0C\u9069\u5408\u5C11\u5973\u89D2\u8272",
        voice: "shimmer",
        sampleText: "\u597D\u958B\u5FC3\u5440\uFF5E",
        tags: ["\u751C\u7F8E", "\u53EF\u611B", "\u5C11\u5973"]
      },
      "cantonese-female-wise": {
        id: "cantonese-female-wise",
        name: "\u77E5\u8587",
        gender: "female",
        type: "character",
        language: "cantonese",
        description: "\u77E5\u6027\u512A\u96C5\u7684\u5973\u8072\uFF0C\u9069\u5408\u8077\u696D\u5973\u6027\u89D2\u8272",
        voice: "nova",
        sampleText: "\u8B93\u6211\u5206\u6790\u4E00\u4E0B\u5462\u500B\u60C5\u6CC1...",
        tags: ["\u77E5\u6027", "\u512A\u96C5", "\u8077\u696D"]
      },
      "cantonese-female-dj": {
        id: "cantonese-female-dj",
        name: "\u661F\u703E",
        gender: "female",
        type: "character",
        language: "cantonese",
        description: "DJ\u98A8\u683C\u7684\u5973\u8072\uFF0C\u9069\u5408\u5A1B\u6A02\u7BC0\u76EE",
        voice: "shimmer",
        sampleText: "\u4ECA\u665A\u5605\u6D3E\u5C0D\u958B\u59CB\u5566\uFF01",
        tags: ["DJ", "\u5A1B\u6A02", "\u6D3B\u6F51"]
      },
      "cantonese-female-elegant2": {
        id: "cantonese-female-elegant2",
        name: "\u97F3\u97FB\u9713\u88F3",
        gender: "female",
        type: "character",
        language: "cantonese",
        description: "\u9AD8\u8CB4\u5178\u96C5\u7684\u5973\u8072\uFF0C\u9069\u5408\u8CB4\u65CF\u89D2\u8272",
        voice: "nova",
        sampleText: "\u8ACB\u591A\u591A\u6307\u6559\u3002",
        tags: ["\u9AD8\u8CB4", "\u5178\u96C5", "\u8CB4\u65CF"]
      },
      "cantonese-female-fairy": {
        id: "cantonese-female-fairy",
        name: "\u7518\u9713",
        gender: "female",
        type: "character",
        language: "cantonese",
        description: "\u4ED9\u6C23\u98C4\u98C4\u7684\u5973\u8072\uFF0C\u9069\u5408\u4ED9\u4FE0\u89D2\u8272",
        voice: "nova",
        sampleText: "\u5875\u4E16\u9593\u5605\u7D1B\u64FE...",
        tags: ["\u4ED9\u6C23", "\u4ED9\u4FE0", "\u7A7A\u9748"]
      },
      "cantonese-female-cute": {
        id: "cantonese-female-cute",
        name: "\u80E1\u6843\u97F3\u59EC",
        gender: "female",
        type: "character",
        language: "cantonese",
        description: "\u4FCF\u76AE\u53EF\u611B\u7684\u5973\u8072\uFF0C\u9069\u5408\u6D3B\u6F51\u89D2\u8272",
        voice: "shimmer",
        sampleText: "\u563B\u563B\uFF0C\u4FFE\u6211\u6349\u5230\u4F60\u5566\uFF01",
        tags: ["\u4FCF\u76AE", "\u53EF\u611B", "\u6D3B\u6F51"]
      },
      "cantonese-female-clear": {
        id: "cantonese-female-clear",
        name: "\u6E05\u97F3\u59EC",
        gender: "female",
        type: "character",
        language: "cantonese",
        description: "\u6E05\u6F88\u660E\u4EAE\u7684\u5973\u8072\uFF0C\u9069\u5408\u7D14\u6DE8\u89D2\u8272",
        voice: "nova",
        sampleText: "\u4ECA\u65E5\u5605\u5929\u7A7A\u597D\u85CD\u5440\u3002",
        tags: ["\u6E05\u6F88", "\u660E\u4EAE", "\u7D14\u6DE8"]
      },
      "cantonese-female-loli": {
        id: "cantonese-female-loli",
        name: "\u53EF\u9E97\u97F3",
        gender: "female",
        type: "character",
        language: "cantonese",
        description: "\u863F\u8389\u98A8\u683C\u7684\u5973\u8072\uFF0C\u9069\u5408\u5E7C\u5973\u89D2\u8272",
        voice: "shimmer",
        sampleText: "\u5927\u54E5\u54E5\uFF0C\u966A\u6211\u73A9\u5566\uFF5E",
        tags: ["\u863F\u8389", "\u53EF\u611B", "\u5E7C\u5973"]
      },
      "cantonese-female-assistant": {
        id: "cantonese-female-assistant",
        name: "\u6676\u9748\u52A9\u624B",
        gender: "female",
        type: "narrator",
        language: "cantonese",
        description: "AI\u52A9\u624B\u98A8\u683C\u7684\u5973\u8072\uFF0C\u9069\u5408\u667A\u80FD\u52A9\u624B",
        voice: "nova",
        sampleText: "\u6709\u54A9\u53EF\u4EE5\u5E6B\u5230\u4F60\uFF1F",
        tags: ["\u52A9\u624B", "AI", "\u667A\u80FD"]
      },
      "cantonese-female-teacher": {
        id: "cantonese-female-teacher",
        name: "\u6559\u5C0E\u56B4\u97F3",
        gender: "female",
        type: "character",
        language: "cantonese",
        description: "\u56B4\u8085\u8A8D\u771F\u7684\u5973\u8072\uFF0C\u9069\u5408\u6559\u5E2B\u89D2\u8272",
        voice: "nova",
        sampleText: "\u540C\u5B78\u5011\uFF0C\u6CE8\u610F\u807D\u8B1B\uFF01",
        tags: ["\u56B4\u8085", "\u6559\u5E2B", "\u8A8D\u771F"]
      },
      "cantonese-female-gentle": {
        id: "cantonese-female-gentle",
        name: "\u7483\u7D17",
        gender: "female",
        type: "character",
        language: "cantonese",
        description: "\u6EAB\u67D4\u9AD4\u8CBC\u7684\u5973\u8072\uFF0C\u9069\u5408\u6EAB\u67D4\u89D2\u8272",
        voice: "nova",
        sampleText: "\u5514\u597D\u64D4\u5FC3\uFF0C\u6211\u55BA\u5EA6\u3002",
        tags: ["\u6EAB\u67D4", "\u9AD4\u8CBC", "\u6EAB\u6696"]
      },
      "cantonese-female-ice": {
        id: "cantonese-female-ice",
        name: "\u51B0\u5B0C\u5922\u97F3",
        gender: "female",
        type: "character",
        language: "cantonese",
        description: "\u51B7\u8277\u9AD8\u8CB4\u7684\u5973\u8072\uFF0C\u9069\u5408\u51B0\u5C71\u7F8E\u4EBA\u89D2\u8272",
        voice: "nova",
        sampleText: "\u5514\u597D\u9760\u8FD1\u6211\u3002",
        tags: ["\u51B7\u8277", "\u9AD8\u8CB4", "\u51B0\u5C71"]
      },
      "cantonese-female-proud": {
        id: "cantonese-female-proud",
        name: "\u50B2\u5B0C\u82B3",
        gender: "female",
        type: "character",
        language: "cantonese",
        description: "\u50B2\u5B0C\u98A8\u683C\u7684\u5973\u8072\uFF0C\u9069\u5408\u50B2\u5B0C\u89D2\u8272",
        voice: "shimmer",
        sampleText: "\u54FC\uFF0C\u5514\u4FC2\u56E0\u70BA\u4F60\u5440\uFF01",
        tags: ["\u50B2\u5B0C", "\u53EF\u611B", "\u5C11\u5973"]
      },
      "cantonese-female-breeze": {
        id: "cantonese-female-breeze",
        name: "\u8F15\u8072\u6E05\u5D50",
        gender: "female",
        type: "character",
        language: "cantonese",
        description: "\u8F15\u67D4\u5982\u98A8\u7684\u5973\u8072\uFF0C\u9069\u5408\u6587\u85DD\u89D2\u8272",
        voice: "nova",
        sampleText: "\u98A8\u8F15\u8F15\u5481\u5439\u904E...",
        tags: ["\u8F15\u67D4", "\u6587\u85DD", "\u6E05\u65B0"]
      },
      "cantonese-female-morning": {
        id: "cantonese-female-morning",
        name: "\u6668\u66E6\u9732",
        gender: "female",
        type: "character",
        language: "cantonese",
        description: "\u6E05\u65B0\u660E\u6717\u7684\u5973\u8072\uFF0C\u9069\u5408\u65E9\u6668\u6216\u6E05\u65B0\u4E3B\u984C",
        voice: "shimmer",
        sampleText: "\u65E9\u6668\uFF01\u65B0\u5605\u4E00\u65E5\u958B\u59CB\u5566\uFF01",
        tags: ["\u6E05\u65B0", "\u660E\u6717", "\u65E9\u6668"]
      },
      // 粵語特殊角色
      "cantonese-child-boy": {
        id: "cantonese-child-boy",
        name: "\u91D1\u5C0F\u7334",
        gender: "male",
        type: "character",
        language: "cantonese",
        description: "\u6D3B\u6F51\u53EF\u611B\u7684\u7537\u7AE5\u8072\u97F3",
        voice: "echo",
        sampleText: "\u5ABD\u5ABD\uFF0C\u6211\u60F3\u98DF\u96EA\u7CD5\uFF01",
        tags: ["\u5152\u7AE5", "\u7537\u5B69", "\u53EF\u611B"]
      },
      "cantonese-elder-male": {
        id: "cantonese-elder-male",
        name: "\u8001\u570B\u8072",
        gender: "male",
        type: "character",
        language: "cantonese",
        description: "\u6EAB\u548C\u667A\u6167\u7684\u8001\u5E74\u7537\u8072",
        voice: "fable",
        sampleText: "\u5F8C\u751F\u4ED4\uFF0C\u807D\u963F\u723A\u8B1B\u500B\u6545\u4E8B\u4F60\u807D\u3002",
        tags: ["\u8001\u4EBA", "\u723A\u723A", "\u667A\u8005"]
      },
      "cantonese-elder-female": {
        id: "cantonese-elder-female",
        name: "\u9B4F\u7D39\u862D",
        gender: "female",
        type: "character",
        language: "cantonese",
        description: "\u6EAB\u6696\u6148\u7965\u7684\u8001\u5E74\u5973\u8072",
        voice: "nova",
        sampleText: "\u4E56\u5B6B\uFF0C\u569F\u98DF\u5976\u5976\u716E\u5605\u6E6F\u3002",
        tags: ["\u8001\u4EBA", "\u5976\u5976", "\u6EAB\u6696"]
      },
      // ============================================
      // 普通話配音員 (Mandarin)
      // ============================================
      // 基礎配音員
      "mandarin-male-narrator": {
        id: "mandarin-male-narrator",
        name: "\u4EAC\u8154\u4F83\u723A",
        gender: "male",
        type: "narrator",
        language: "mandarin",
        description: "\u6E3E\u539A\u7A69\u91CD\u7684\u666E\u901A\u8A71\u7537\u8072\uFF0C\u9069\u5408\u65C1\u767D\u548C\u6558\u8FF0",
        voice: "alloy",
        sampleText: "\u5927\u5BB6\u597D\uFF0C\u6B22\u8FCE\u6765\u5230\u6211\u7684\u9891\u9053\uFF0C\u4ECA\u5929\u548C\u5927\u5BB6\u5206\u4EAB\u4E00\u4E2A\u7CBE\u5F69\u7684\u6545\u4E8B\u3002",
        tags: ["\u65C1\u767D", "\u6558\u8FF0", "\u7D00\u9304\u7247"]
      },
      "mandarin-male-young": {
        id: "mandarin-male-young",
        name: "\u967D\u5149\u9752\u5E74",
        gender: "male",
        type: "character",
        language: "mandarin",
        description: "\u5E74\u8F15\u6709\u6D3B\u529B\u7684\u666E\u901A\u8A71\u7537\u8072\uFF0C\u9069\u5408\u5E74\u8F15\u7537\u6027\u89D2\u8272",
        voice: "echo",
        sampleText: "\u563F\uFF0C\u4F60\u8BF4\u7684\u4E0D\u662F\u5F00\u73A9\u7B11\u5427\uFF1F\u6211\u8981\u8BD5\u8BD5\u770B\uFF01",
        tags: ["\u5E74\u8F15", "\u6D3B\u6F51", "\u7537\u4E3B\u89D2"]
      },
      "mandarin-male-mature": {
        id: "mandarin-male-mature",
        name: "\u6DF5\u535A\u5C0F\u53D4",
        gender: "male",
        type: "character",
        language: "mandarin",
        description: "\u6210\u719F\u7A69\u91CD\u7684\u666E\u901A\u8A71\u7537\u8072\uFF0C\u9069\u5408\u4E2D\u5E74\u7537\u6027\u89D2\u8272",
        voice: "onyx",
        sampleText: "\u8FD9\u4EF6\u4E8B\u4E0D\u7B80\u5355\uFF0C\u9700\u8981\u4ED4\u7EC6\u8003\u8651\u3002",
        tags: ["\u6210\u719F", "\u7A69\u91CD", "\u7236\u89AA", "\u8001\u95C6"]
      },
      "mandarin-female-narrator": {
        id: "mandarin-female-narrator",
        name: "\u723D\u5FEB\u601D\u601D",
        gender: "female",
        type: "narrator",
        language: "mandarin",
        description: "\u6EAB\u67D4\u512A\u96C5\u7684\u666E\u901A\u8A71\u5973\u8072\uFF0C\u9069\u5408\u65C1\u767D\u548C\u6558\u8FF0",
        voice: "nova",
        sampleText: "\u5728\u8FD9\u4E2A\u5B89\u9759\u7684\u591C\u665A\uFF0C\u6708\u5149\u7167\u5728\u5C0F\u9547\u7684\u8857\u9053\u4E0A...",
        tags: ["\u65C1\u767D", "\u6558\u8FF0", "\u6EAB\u67D4"]
      },
      "mandarin-female-young": {
        id: "mandarin-female-young",
        name: "\u9130\u5BB6\u5973\u5B69",
        gender: "female",
        type: "character",
        language: "mandarin",
        description: "\u5E74\u8F15\u6D3B\u6F51\u7684\u666E\u901A\u8A71\u5973\u8072\uFF0C\u9069\u5408\u5E74\u8F15\u5973\u6027\u89D2\u8272",
        voice: "shimmer",
        sampleText: "\u54C7\uFF0C\u771F\u7684\u592A\u68D2\u4E86\uFF01\u6211\u7B80\u76F4\u4E0D\u6562\u76F8\u4FE1\uFF01",
        tags: ["\u5E74\u8F15", "\u6D3B\u6F51", "\u5973\u4E3B\u89D2"]
      },
      "mandarin-female-mature": {
        id: "mandarin-female-mature",
        name: "\u9AD8\u51B7\u5FA1\u59D0",
        gender: "female",
        type: "character",
        language: "mandarin",
        description: "\u6210\u719F\u512A\u96C5\u7684\u666E\u901A\u8A71\u5973\u8072\uFF0C\u9069\u5408\u4E2D\u5E74\u5973\u6027\u89D2\u8272",
        voice: "alloy",
        sampleText: "\u4F60\u8981\u8BB0\u4F4F\uFF0C\u505A\u4EBA\u6700\u91CD\u8981\u7684\u662F\u8BDA\u5B9E\u3002",
        tags: ["\u6210\u719F", "\u512A\u96C5", "\u6BCD\u89AA"]
      },
      // 擴充普通話男聲
      "mandarin-male-warm": {
        id: "mandarin-male-warm",
        name: "\u6EAB\u6696\u963F\u864E",
        gender: "male",
        type: "character",
        language: "mandarin",
        description: "\u6EAB\u6696\u89AA\u5207\u7684\u7537\u8072\uFF0C\u9069\u5408\u6696\u7537\u89D2\u8272",
        voice: "alloy",
        sampleText: "\u522B\u62C5\u5FC3\uFF0C\u6709\u6211\u5728\u5462\u3002",
        tags: ["\u6EAB\u6696", "\u89AA\u5207", "\u6696\u7537"]
      },
      "mandarin-male-arrogant": {
        id: "mandarin-male-arrogant",
        name: "\u50B2\u5B0C\u9738\u7E3D",
        gender: "male",
        type: "character",
        language: "mandarin",
        description: "\u9738\u9053\u7E3D\u88C1\u98A8\u683C\u7684\u7537\u8072",
        voice: "onyx",
        sampleText: "\u8FD9\u4E2A\u9879\u76EE\uFF0C\u6211\u8981\u4E86\u3002",
        tags: ["\u9738\u9053", "\u7E3D\u88C1", "\u50B2\u5B0C"]
      },
      "mandarin-male-teen": {
        id: "mandarin-male-teen",
        name: "\u5C11\u5E74\u6893\u8F9B",
        gender: "male",
        type: "character",
        language: "mandarin",
        description: "\u5C11\u5E74\u98A8\u683C\u7684\u7537\u8072\uFF0C\u9069\u5408\u9752\u6625\u89D2\u8272",
        voice: "echo",
        sampleText: "\u6211\u4E00\u5B9A\u4F1A\u53D8\u5F97\u66F4\u5F3A\u7684\uFF01",
        tags: ["\u5C11\u5E74", "\u9752\u6625", "\u71B1\u8840"]
      },
      "mandarin-male-news": {
        id: "mandarin-male-news",
        name: "\u65B0\u805E\u7537\u8072",
        gender: "male",
        type: "narrator",
        language: "mandarin",
        description: "\u5C08\u696D\u65B0\u805E\u64AD\u5831\u98A8\u683C",
        voice: "alloy",
        sampleText: "\u5404\u4F4D\u89C2\u4F17\u670B\u53CB\u4EEC\uFF0C\u5927\u5BB6\u597D\u3002",
        tags: ["\u65B0\u805E", "\u64AD\u5831", "\u5C08\u696D"]
      },
      "mandarin-male-magnetic": {
        id: "mandarin-male-magnetic",
        name: "\u78C1\u6027\u7537\u8072",
        gender: "male",
        type: "character",
        language: "mandarin",
        description: "\u78C1\u6027\u8FF7\u4EBA\u7684\u7537\u8072",
        voice: "onyx",
        sampleText: "\u8BA9\u6211\u6765\u544A\u8BC9\u4F60\u4E00\u4E2A\u79D8\u5BC6...",
        tags: ["\u78C1\u6027", "\u8FF7\u4EBA", "\u6DF1\u6C89"]
      },
      "mandarin-male-gentle": {
        id: "mandarin-male-gentle",
        name: "\u6EAB\u67D4\u5C0F\u54E5",
        gender: "male",
        type: "character",
        language: "mandarin",
        description: "\u6EAB\u67D4\u9AD4\u8CBC\u7684\u7537\u8072",
        voice: "alloy",
        sampleText: "\u6CA1\u5173\u7CFB\uFF0C\u6162\u6162\u6765\u3002",
        tags: ["\u6EAB\u67D4", "\u9AD4\u8CBC", "\u6EAB\u6696"]
      },
      "mandarin-male-cheerful": {
        id: "mandarin-male-cheerful",
        name: "\u958B\u6717\u9752\u5E74",
        gender: "male",
        type: "character",
        language: "mandarin",
        description: "\u958B\u6717\u6A02\u89C0\u7684\u7537\u8072",
        voice: "echo",
        sampleText: "\u54C8\u54C8\uFF0C\u4ECA\u5929\u5FC3\u60C5\u771F\u597D\uFF01",
        tags: ["\u958B\u6717", "\u6A02\u89C0", "\u6D3B\u6F51"]
      },
      "mandarin-male-elegant": {
        id: "mandarin-male-elegant",
        name: "\u5112\u96C5\u9752\u5E74",
        gender: "male",
        type: "character",
        language: "mandarin",
        description: "\u5112\u96C5\u66F8\u751F\u98A8\u683C\u7684\u7537\u8072",
        voice: "alloy",
        sampleText: "\u53E4\u4EBA\u4E91...",
        tags: ["\u5112\u96C5", "\u66F8\u751F", "\u6587\u96C5"]
      },
      "mandarin-male-simple": {
        id: "mandarin-male-simple",
        name: "\u8CEA\u6A38\u9752\u5E74",
        gender: "male",
        type: "character",
        language: "mandarin",
        description: "\u8CEA\u6A38\u771F\u8AA0\u7684\u7537\u8072",
        voice: "alloy",
        sampleText: "\u6211\u8BF4\u7684\u90FD\u662F\u771F\u5FC3\u8BDD\u3002",
        tags: ["\u8CEA\u6A38", "\u771F\u8AA0", "\u6A38\u5BE6"]
      },
      "mandarin-male-boss": {
        id: "mandarin-male-boss",
        name: "\u9738\u6C23\u9752\u53D4",
        gender: "male",
        type: "character",
        language: "mandarin",
        description: "\u9738\u6C23\u5A01\u56B4\u7684\u7537\u8072",
        voice: "onyx",
        sampleText: "\u8FD9\u4EF6\u4E8B\uFF0C\u5C31\u8FD9\u4E48\u5B9A\u4E86\u3002",
        tags: ["\u9738\u6C23", "\u5A01\u56B4", "\u8001\u95C6"]
      },
      "mandarin-male-commentary": {
        id: "mandarin-male-commentary",
        name: "\u6D3B\u529B\u89E3\u8AAA\u7537",
        gender: "male",
        type: "narrator",
        language: "mandarin",
        description: "\u5145\u6EFF\u6D3B\u529B\u7684\u89E3\u8AAA\u98A8\u683C",
        voice: "echo",
        sampleText: "\u7CBE\u5F69\u7684\u4E00\u5E55\u51FA\u73B0\u4E86\uFF01",
        tags: ["\u89E3\u8AAA", "\u6D3B\u529B", "\u9AD4\u80B2"]
      },
      "mandarin-male-steady": {
        id: "mandarin-male-steady",
        name: "\u6C89\u7A69\u89E3\u8AAA\u7537",
        gender: "male",
        type: "narrator",
        language: "mandarin",
        description: "\u6C89\u7A69\u5C08\u696D\u7684\u89E3\u8AAA\u98A8\u683C",
        voice: "alloy",
        sampleText: "\u8BA9\u6211\u4EEC\u6765\u5206\u6790\u4E00\u4E0B\u8FD9\u4E2A\u5C40\u52BF\u3002",
        tags: ["\u89E3\u8AAA", "\u6C89\u7A69", "\u5C08\u696D"]
      },
      "mandarin-male-handsome": {
        id: "mandarin-male-handsome",
        name: "\u89E3\u8AAA\u5C0F\u5E25",
        gender: "male",
        type: "narrator",
        language: "mandarin",
        description: "\u5E25\u6C23\u967D\u5149\u7684\u89E3\u8AAA\u98A8\u683C",
        voice: "echo",
        sampleText: "\u5927\u5BB6\u597D\uFF0C\u6211\u662F\u4F60\u4EEC\u7684\u89E3\u8BF4\u5458\u3002",
        tags: ["\u89E3\u8AAA", "\u5E25\u6C23", "\u967D\u5149"]
      },
      "mandarin-male-emotional": {
        id: "mandarin-male-emotional",
        name: "\u60C5\u611F\u5C0F\u5E25",
        gender: "male",
        type: "character",
        language: "mandarin",
        description: "\u60C5\u611F\u8C50\u5BCC\u7684\u7537\u8072",
        voice: "echo",
        sampleText: "\u6211\u771F\u7684\u5F88\u60F3\u5FF5\u4F60...",
        tags: ["\u60C5\u611F", "\u6DF1\u60C5", "\u6D6A\u6F2B"]
      },
      "mandarin-male-promo": {
        id: "mandarin-male-promo",
        name: "\u4FC3\u92B7\u7537\u8072",
        gender: "male",
        type: "narrator",
        language: "mandarin",
        description: "\u4FC3\u92B7\u5EE3\u544A\u98A8\u683C\u7684\u7537\u8072",
        voice: "echo",
        sampleText: "\u9650\u65F6\u7279\u60E0\uFF0C\u4E0D\u5BB9\u9519\u8FC7\uFF01",
        tags: ["\u4FC3\u92B7", "\u5EE3\u544A", "\u6D3B\u529B"]
      },
      "mandarin-male-dub": {
        id: "mandarin-male-dub",
        name: "\u8B6F\u88FD\u7247\u7537\u8072",
        gender: "male",
        type: "narrator",
        language: "mandarin",
        description: "\u7D93\u5178\u8B6F\u88FD\u7247\u98A8\u683C\u7684\u7537\u8072",
        voice: "alloy",
        sampleText: "\u5728\u90A3\u9065\u8FDC\u7684\u5730\u65B9...",
        tags: ["\u8B6F\u88FD\u7247", "\u7D93\u5178", "\u914D\u97F3"]
      },
      "mandarin-male-chongqing": {
        id: "mandarin-male-chongqing",
        name: "\u91CD\u6176\u5C0F\u4F19",
        gender: "male",
        type: "character",
        language: "mandarin",
        description: "\u91CD\u6176\u65B9\u8A00\u98A8\u683C\u7684\u7537\u8072",
        voice: "echo",
        sampleText: "\u5DF4\u9002\u5F97\u5F88\uFF01",
        tags: ["\u91CD\u6176", "\u65B9\u8A00", "\u6D3B\u6F51"]
      },
      // 擴充普通話女聲
      "mandarin-female-taiwan": {
        id: "mandarin-female-taiwan",
        name: "\u7063\u7063\u5C0F\u4F55",
        gender: "female",
        type: "character",
        language: "mandarin",
        description: "\u53F0\u7063\u8154\u98A8\u683C\u7684\u5973\u8072",
        voice: "shimmer",
        sampleText: "\u597D\u5566\u597D\u5566\uFF0C\u6211\u77E5\u9053\u4E86\u5566\uFF5E",
        tags: ["\u53F0\u7063\u8154", "\u53EF\u611B", "\u751C\u7F8E"]
      },
      "mandarin-female-cancan": {
        id: "mandarin-female-cancan",
        name: "\u71E6\u71E6",
        gender: "female",
        type: "character",
        language: "mandarin",
        description: "\u967D\u5149\u958B\u6717\u7684\u5973\u8072",
        voice: "shimmer",
        sampleText: "\u4ECA\u5929\u4E5F\u662F\u5143\u6C14\u6EE1\u6EE1\u7684\u4E00\u5929\uFF01",
        tags: ["\u967D\u5149", "\u958B\u6717", "\u6D3B\u529B"]
      },
      "mandarin-female-zizi": {
        id: "mandarin-female-zizi",
        name: "\u6893\u6893",
        gender: "female",
        type: "character",
        language: "mandarin",
        description: "\u6EAB\u67D4\u751C\u7F8E\u7684\u5973\u8072",
        voice: "nova",
        sampleText: "\u8C22\u8C22\u4F60\u7684\u5173\u5FC3\uFF5E",
        tags: ["\u6EAB\u67D4", "\u751C\u7F8E", "\u53EF\u611B"]
      },
      "mandarin-female-ranran": {
        id: "mandarin-female-ranran",
        name: "\u71C3\u71C3",
        gender: "female",
        type: "character",
        language: "mandarin",
        description: "\u71B1\u60C5\u6D3B\u529B\u7684\u5973\u8072",
        voice: "shimmer",
        sampleText: "\u52A0\u6CB9\u52A0\u6CB9\uFF01\u6211\u4EEC\u4E00\u5B9A\u884C\uFF01",
        tags: ["\u71B1\u60C5", "\u6D3B\u529B", "\u5143\u6C23"]
      },
      "mandarin-female-weiwei": {
        id: "mandarin-female-weiwei",
        name: "\u8587\u8587",
        gender: "female",
        type: "character",
        language: "mandarin",
        description: "\u512A\u96C5\u77E5\u6027\u7684\u5973\u8072",
        voice: "nova",
        sampleText: "\u8BA9\u6211\u6765\u4E3A\u5927\u5BB6\u4ECB\u7ECD\u4E00\u4E0B\u3002",
        tags: ["\u512A\u96C5", "\u77E5\u6027", "\u5927\u65B9"]
      },
      "mandarin-female-news": {
        id: "mandarin-female-news",
        name: "\u65B0\u805E\u5973\u8072",
        gender: "female",
        type: "narrator",
        language: "mandarin",
        description: "\u5C08\u696D\u65B0\u805E\u64AD\u5831\u98A8\u683C",
        voice: "nova",
        sampleText: "\u5404\u4F4D\u89C2\u4F17\uFF0C\u73B0\u5728\u64AD\u62A5\u4ECA\u5929\u7684\u65B0\u95FB\u3002",
        tags: ["\u65B0\u805E", "\u64AD\u5831", "\u5C08\u696D"]
      },
      "mandarin-female-intellectual": {
        id: "mandarin-female-intellectual",
        name: "\u77E5\u6027\u5973\u8072",
        gender: "female",
        type: "narrator",
        language: "mandarin",
        description: "\u77E5\u6027\u512A\u96C5\u7684\u5973\u8072",
        voice: "nova",
        sampleText: "\u8BA9\u6211\u4EEC\u4E00\u8D77\u6765\u63A2\u8BA8\u8FD9\u4E2A\u8BDD\u9898\u3002",
        tags: ["\u77E5\u6027", "\u512A\u96C5", "\u5C08\u696D"]
      },
      "mandarin-female-friendly": {
        id: "mandarin-female-friendly",
        name: "\u89AA\u5207\u5973\u8072",
        gender: "female",
        type: "narrator",
        language: "mandarin",
        description: "\u89AA\u5207\u6EAB\u6696\u7684\u5973\u8072",
        voice: "nova",
        sampleText: "\u6B22\u8FCE\u6765\u5230\u6211\u4EEC\u7684\u8282\u76EE\u3002",
        tags: ["\u89AA\u5207", "\u6EAB\u6696", "\u53CB\u597D"]
      },
      "mandarin-female-gentle": {
        id: "mandarin-female-gentle",
        name: "\u6EAB\u67D4\u6DD1\u5973",
        gender: "female",
        type: "character",
        language: "mandarin",
        description: "\u6EAB\u67D4\u8CE2\u6DD1\u7684\u5973\u8072",
        voice: "nova",
        sampleText: "\u8BF7\u6162\u6162\u8BF4\uFF0C\u6211\u5728\u542C\u3002",
        tags: ["\u6EAB\u67D4", "\u8CE2\u6DD1", "\u6EAB\u6696"]
      },
      "mandarin-female-sweet": {
        id: "mandarin-female-sweet",
        name: "\u751C\u5BF5\u5C11\u5FA1",
        gender: "female",
        type: "character",
        language: "mandarin",
        description: "\u751C\u7F8E\u6492\u5B0C\u7684\u5973\u8072",
        voice: "shimmer",
        sampleText: "\u4EBA\u5BB6\u4E0D\u8981\u561B\uFF5E",
        tags: ["\u751C\u7F8E", "\u6492\u5B0C", "\u53EF\u611B"]
      },
      "mandarin-female-ancient": {
        id: "mandarin-female-ancient",
        name: "\u53E4\u98A8\u5C11\u5FA1",
        gender: "female",
        type: "character",
        language: "mandarin",
        description: "\u53E4\u98A8\u4ED9\u6C23\u7684\u5973\u8072",
        voice: "nova",
        sampleText: "\u516C\u5B50\uFF0C\u8BF7\u7559\u6B65\u3002",
        tags: ["\u53E4\u98A8", "\u4ED9\u6C23", "\u512A\u96C5"]
      },
      "mandarin-female-lively": {
        id: "mandarin-female-lively",
        name: "\u6D3B\u6F51\u5973\u8072",
        gender: "female",
        type: "character",
        language: "mandarin",
        description: "\u6D3B\u6F51\u958B\u6717\u7684\u5973\u8072",
        voice: "shimmer",
        sampleText: "\u54C8\u54C8\uFF0C\u592A\u597D\u73A9\u4E86\uFF01",
        tags: ["\u6D3B\u6F51", "\u958B\u6717", "\u5143\u6C23"]
      },
      "mandarin-female-promo": {
        id: "mandarin-female-promo",
        name: "\u4FC3\u92B7\u5973\u8072",
        gender: "female",
        type: "narrator",
        language: "mandarin",
        description: "\u4FC3\u92B7\u5EE3\u544A\u98A8\u683C\u7684\u5973\u8072",
        voice: "shimmer",
        sampleText: "\u8D85\u503C\u4F18\u60E0\uFF0C\u5FEB\u6765\u62A2\u8D2D\uFF01",
        tags: ["\u4FC3\u92B7", "\u5EE3\u544A", "\u6D3B\u529B"]
      },
      "mandarin-female-movie": {
        id: "mandarin-female-movie",
        name: "\u5F71\u8996\u5C0F\u7F8E",
        gender: "female",
        type: "narrator",
        language: "mandarin",
        description: "\u5F71\u8996\u89E3\u8AAA\u98A8\u683C\u7684\u5973\u8072",
        voice: "nova",
        sampleText: "\u63A5\u4E0B\u6765\uFF0C\u8BA9\u6211\u4EEC\u770B\u770B\u8FD9\u90E8\u7535\u5F71\u7684\u7CBE\u5F69\u7247\u6BB5\u3002",
        tags: ["\u5F71\u8996", "\u89E3\u8AAA", "\u5C08\u696D"]
      },
      "mandarin-female-anchor": {
        id: "mandarin-female-anchor",
        name: "\u76F4\u64AD\u4E00\u59D0",
        gender: "female",
        type: "narrator",
        language: "mandarin",
        description: "\u76F4\u64AD\u4E3B\u64AD\u98A8\u683C\u7684\u5973\u8072",
        voice: "shimmer",
        sampleText: "\u5B9D\u5B9D\u4EEC\uFF0C\u70B9\u70B9\u5173\u6CE8\u4E0D\u8FF7\u8DEF\uFF01",
        tags: ["\u76F4\u64AD", "\u4E3B\u64AD", "\u6D3B\u529B"]
      },
      "mandarin-female-literary": {
        id: "mandarin-female-literary",
        name: "\u6587\u85DD\u5973\u8072",
        gender: "female",
        type: "narrator",
        language: "mandarin",
        description: "\u6587\u85DD\u6E05\u65B0\u7684\u5973\u8072",
        voice: "nova",
        sampleText: "\u5C81\u6708\u9759\u597D\uFF0C\u65F6\u5149\u6E29\u67D4\u3002",
        tags: ["\u6587\u85DD", "\u6E05\u65B0", "\u8A69\u610F"]
      },
      "mandarin-female-sister": {
        id: "mandarin-female-sister",
        name: "\u77E5\u6027\u59D0\u59D0",
        gender: "female",
        type: "character",
        language: "mandarin",
        description: "\u77E5\u6027\u5927\u59D0\u59D0\u98A8\u683C\u7684\u5973\u8072",
        voice: "nova",
        sampleText: "\u6765\uFF0C\u59D0\u59D0\u6559\u4F60\u3002",
        tags: ["\u77E5\u6027", "\u59D0\u59D0", "\u6210\u719F"]
      },
      "mandarin-female-sichuan": {
        id: "mandarin-female-sichuan",
        name: "\u56DB\u5DDD\u751C\u59B9\u5152",
        gender: "female",
        type: "character",
        language: "mandarin",
        description: "\u56DB\u5DDD\u65B9\u8A00\u98A8\u683C\u7684\u5973\u8072",
        voice: "shimmer",
        sampleText: "\u5B89\u9038\u5F97\u5F88\uFF01",
        tags: ["\u56DB\u5DDD", "\u65B9\u8A00", "\u751C\u7F8E"]
      },
      // 普通話特殊角色
      "mandarin-child-girl": {
        id: "mandarin-child-girl",
        name: "\u5C0F\u863F\u8389",
        gender: "female",
        type: "character",
        language: "mandarin",
        description: "\u751C\u7F8E\u53EF\u611B\u7684\u5973\u7AE5\u8072\u97F3",
        voice: "shimmer",
        sampleText: "\u8C22\u8C22\u53D4\u53D4\u963F\u59E8\uFF01",
        tags: ["\u5152\u7AE5", "\u5973\u5B69", "\u751C\u7F8E"]
      },
      "mandarin-child-boy": {
        id: "mandarin-child-boy",
        name: "\u5976\u6C23\u840C\u5A03",
        gender: "male",
        type: "character",
        language: "mandarin",
        description: "\u5976\u8072\u5976\u6C23\u7684\u7537\u7AE5\u8072\u97F3",
        voice: "echo",
        sampleText: "\u5988\u5988\uFF0C\u6211\u60F3\u5403\u7CD6\uFF01",
        tags: ["\u5152\u7AE5", "\u7537\u5B69", "\u53EF\u611B"]
      },
      "mandarin-child-genius": {
        id: "mandarin-child-genius",
        name: "\u5929\u624D\u7AE5\u8072",
        gender: "male",
        type: "character",
        language: "mandarin",
        description: "\u8070\u660E\u4F36\u4FD0\u7684\u7AE5\u8072",
        voice: "echo",
        sampleText: "\u8FD9\u9053\u9898\u6211\u4F1A\uFF01",
        tags: ["\u5152\u7AE5", "\u8070\u660E", "\u6D3B\u6F51"]
      },
      "mandarin-elder-male": {
        id: "mandarin-elder-male",
        name: "\u667A\u6167\u8001\u8005",
        gender: "male",
        type: "character",
        language: "mandarin",
        description: "\u667A\u6167\u6148\u7965\u7684\u8001\u5E74\u7537\u8072",
        voice: "fable",
        sampleText: "\u5E74\u8F7B\u4EBA\uFF0C\u542C\u8001\u592B\u4E00\u8A00\u3002",
        tags: ["\u8001\u4EBA", "\u667A\u6167", "\u6148\u7965"]
      },
      "mandarin-elder-female": {
        id: "mandarin-elder-female",
        name: "\u6148\u611B\u59E5\u59E5",
        gender: "female",
        type: "character",
        language: "mandarin",
        description: "\u6148\u611B\u6EAB\u6696\u7684\u8001\u5E74\u5973\u8072",
        voice: "nova",
        sampleText: "\u4E56\u5B59\u5B50\uFF0C\u6765\u5403\u59E5\u59E5\u505A\u7684\u996D\u3002",
        tags: ["\u8001\u4EBA", "\u59E5\u59E5", "\u6148\u611B"]
      },
      "mandarin-cartoon-sponge": {
        id: "mandarin-cartoon-sponge",
        name: "\u52D5\u6F2B\u6D77\u7DBF",
        gender: "male",
        type: "character",
        language: "mandarin",
        description: "\u6D77\u7DBF\u5BF6\u5BF6\u98A8\u683C\u7684\u8072\u97F3",
        voice: "echo",
        sampleText: "\u6211\u51C6\u5907\u597D\u4E86\uFF01",
        tags: ["\u52D5\u6F2B", "\u5361\u901A", "\u641E\u7B11"]
      },
      "mandarin-cartoon-star": {
        id: "mandarin-cartoon-star",
        name: "\u52D5\u6F2B\u6D77\u661F",
        gender: "male",
        type: "character",
        language: "mandarin",
        description: "\u6D3E\u5927\u661F\u98A8\u683C\u7684\u8072\u97F3",
        voice: "echo",
        sampleText: "\u8FD9\u662F\u4EC0\u4E48\uFF1F",
        tags: ["\u52D5\u6F2B", "\u5361\u901A", "\u5446\u840C"]
      },
      "mandarin-cartoon-shin": {
        id: "mandarin-cartoon-shin",
        name: "\u52D5\u6F2B\u5C0F\u65B0",
        gender: "male",
        type: "character",
        language: "mandarin",
        description: "\u881F\u7B46\u5C0F\u65B0\u98A8\u683C\u7684\u8072\u97F3",
        voice: "echo",
        sampleText: "\u52A8\u611F\u5149\u6CE2\uFF01",
        tags: ["\u52D5\u6F2B", "\u5361\u901A", "\u641E\u602A"]
      },
      "mandarin-rap": {
        id: "mandarin-rap",
        name: "\u8AAA\u5531\u5C0F\u54E5",
        gender: "male",
        type: "character",
        language: "mandarin",
        description: "\u8AAA\u5531\u98A8\u683C\u7684\u7537\u8072",
        voice: "echo",
        sampleText: "Yo\uFF0Ccheck it out\uFF01",
        tags: ["\u8AAA\u5531", "\u563B\u54C8", "\u6F6E\u6D41"]
      },
      // ============================================
      // 英語配音員 (English)
      // ============================================
      // 基礎配音員
      "english-male-narrator": {
        id: "english-male-narrator",
        name: "Alyx",
        gender: "male",
        type: "narrator",
        language: "english",
        description: "Vibrant British male voice for narration",
        voice: "alloy",
        sampleText: "Welcome to our channel. Today, we're going to share an amazing story with you.",
        tags: ["narrator", "British", "professional"]
      },
      "english-male-young": {
        id: "english-male-young",
        name: "Johnny Kid",
        gender: "male",
        type: "character",
        language: "english",
        description: "Serious young male voice for youthful characters",
        voice: "echo",
        sampleText: "Hey, are you kidding me? I've got to try this!",
        tags: ["young", "serious", "protagonist"]
      },
      "english-male-mature": {
        id: "english-male-mature",
        name: "Christopher",
        gender: "male",
        type: "character",
        language: "english",
        description: "Mature and steady male voice for middle-aged characters",
        voice: "onyx",
        sampleText: "This isn't simple. We need to think it through carefully.",
        tags: ["mature", "steady", "father", "boss"]
      },
      "english-female-narrator": {
        id: "english-female-narrator",
        name: "Samara X",
        gender: "female",
        type: "narrator",
        language: "english",
        description: "Warm and elegant female voice for narration",
        voice: "nova",
        sampleText: "On this quiet evening, the moonlight shone upon the streets of the small town...",
        tags: ["narrator", "warm", "elegant"]
      },
      "english-female-young": {
        id: "english-female-young",
        name: "Amelia",
        gender: "female",
        type: "character",
        language: "english",
        description: "Lively young female voice for youthful characters",
        voice: "shimmer",
        sampleText: "Wow, this is amazing! I can't believe it!",
        tags: ["young", "lively", "protagonist"]
      },
      "english-female-mature": {
        id: "english-female-mature",
        name: "Alexis Lancaster",
        gender: "female",
        type: "character",
        language: "english",
        description: "Studio quality smooth British female voice",
        voice: "alloy",
        sampleText: "Remember, the most important thing in life is honesty.",
        tags: ["mature", "elegant", "British"]
      },
      // 擴充英語男聲
      "english-male-adam": {
        id: "english-male-adam",
        name: "Adam Stone",
        gender: "male",
        type: "narrator",
        language: "english",
        description: "Late night radio style voice",
        voice: "onyx",
        sampleText: "Good evening, listeners. Welcome to the late night show.",
        tags: ["radio", "deep", "smooth"]
      },
      "english-male-russell": {
        id: "english-male-russell",
        name: "Russell",
        gender: "male",
        type: "narrator",
        language: "english",
        description: "Dramatic British TV style voice",
        voice: "onyx",
        sampleText: "In a world where nothing is as it seems...",
        tags: ["dramatic", "British", "TV"]
      },
      "english-male-alexander": {
        id: "english-male-alexander",
        name: "Alexander Kensington",
        gender: "male",
        type: "narrator",
        language: "english",
        description: "Studio quality professional voice",
        voice: "alloy",
        sampleText: "Ladies and gentlemen, may I have your attention please.",
        tags: ["professional", "studio", "formal"]
      },
      "english-male-jeremy": {
        id: "english-male-jeremy",
        name: "Jeremy",
        gender: "male",
        type: "character",
        language: "english",
        description: "Friendly conversational male voice",
        voice: "echo",
        sampleText: "Hey there! Great to meet you!",
        tags: ["friendly", "casual", "conversational"]
      },
      "english-male-aaran": {
        id: "english-male-aaran",
        name: "Aaran",
        gender: "male",
        type: "character",
        language: "english",
        description: "Energetic young male voice",
        voice: "echo",
        sampleText: "Let's do this! I'm so excited!",
        tags: ["energetic", "young", "excited"]
      },
      "english-male-archer": {
        id: "english-male-archer",
        name: "Archer",
        gender: "male",
        type: "character",
        language: "english",
        description: "Cool and confident male voice",
        voice: "onyx",
        sampleText: "Trust me, I've got this under control.",
        tags: ["cool", "confident", "action"]
      },
      "english-male-nathaniel": {
        id: "english-male-nathaniel",
        name: "Nathaniel C.",
        gender: "male",
        type: "narrator",
        language: "english",
        description: "Customer care agent style voice",
        voice: "alloy",
        sampleText: "Thank you for calling. How may I assist you today?",
        tags: ["professional", "customer service", "friendly"]
      },
      // 擴充英語女聲
      "english-female-elli": {
        id: "english-female-elli",
        name: "Elli",
        gender: "female",
        type: "character",
        language: "english",
        description: "Sweet and gentle female voice",
        voice: "shimmer",
        sampleText: "Oh, that's so lovely!",
        tags: ["sweet", "gentle", "friendly"]
      },
      "english-female-dorothy": {
        id: "english-female-dorothy",
        name: "Dorothy",
        gender: "female",
        type: "character",
        language: "english",
        description: "Classic elegant female voice",
        voice: "nova",
        sampleText: "There's no place like home.",
        tags: ["classic", "elegant", "warm"]
      },
      "english-female-serena": {
        id: "english-female-serena",
        name: "Serena",
        gender: "female",
        type: "character",
        language: "english",
        description: "Calm and soothing female voice",
        voice: "nova",
        sampleText: "Take a deep breath and relax.",
        tags: ["calm", "soothing", "meditation"]
      },
      "english-female-jessi": {
        id: "english-female-jessi",
        name: "Jessi",
        gender: "female",
        type: "character",
        language: "english",
        description: "Energetic and fun female voice",
        voice: "shimmer",
        sampleText: "This is gonna be so much fun!",
        tags: ["energetic", "fun", "young"]
      },
      "english-female-allison": {
        id: "english-female-allison",
        name: "Allison",
        gender: "female",
        type: "narrator",
        language: "english",
        description: "Inviting velvety British accent",
        voice: "nova",
        sampleText: "Welcome to our journey through time.",
        tags: ["British", "inviting", "velvety"]
      },
      "english-female-liberty": {
        id: "english-female-liberty",
        name: "Liberty X",
        gender: "female",
        type: "character",
        language: "english",
        description: "Bold and confident female voice",
        voice: "shimmer",
        sampleText: "Nothing can stop us now!",
        tags: ["bold", "confident", "powerful"]
      },
      "english-female-shelby": {
        id: "english-female-shelby",
        name: "Shelby",
        gender: "female",
        type: "character",
        language: "english",
        description: "Warm Southern American accent",
        voice: "nova",
        sampleText: "Well, bless your heart!",
        tags: ["Southern", "warm", "friendly"]
      },
      // ============================================
      // 克隆聲音 (Clone Voices)
      // ============================================
      "clone-po": {
        id: "clone-po",
        name: "PO \u514B\u9686\u8072\u97F3",
        gender: "male",
        type: "narrator",
        language: "clone",
        description: "PO \u7684\u514B\u9686\u8A9E\u97F3\uFF0C\u7CB5\u8A9E\u767C\u97F3\uFF0C\u9069\u5408\u65C1\u767D\u548C\u6558\u8FF0",
        voice: "alloy",
        sampleText: "\u5927\u5BB6\u597D\uFF0C\u6B61\u8FCE\u5636\u5230\u6211\u5605\u983B\u9053\u3002",
        tags: ["\u514B\u9686", "PO", "\u7CB5\u8A9E", "\u65C1\u767D"],
        sampleUrl: "https://aigc-cdn.kreadoai.com/default_voice/audio/2025/12/eaf6d307ffaf43a694f487dbfd138bc7.mp3"
      },
      // ============================================
      // 向後兼容（舊版配音員 ID）
      // ============================================
      "male-narrator": {
        id: "male-narrator",
        name: "\u7537\u8072\u65C1\u767D",
        gender: "male",
        type: "narrator",
        language: "cantonese",
        description: "\u6E3E\u539A\u7A69\u91CD\u7684\u7537\u8072\uFF0C\u9069\u5408\u65C1\u767D\u548C\u6558\u8FF0",
        voice: "alloy",
        sampleText: "\u5927\u5BB6\u597D\uFF0C\u6B61\u8FCE\u569F\u5230\u6211\u5605\u983B\u9053\u3002",
        tags: ["\u65C1\u767D", "\u6558\u8FF0", "\u7D00\u9304\u7247"]
      },
      "male-young": {
        id: "male-young",
        name: "\u5E74\u8F15\u7537\u8072",
        gender: "male",
        type: "character",
        language: "cantonese",
        description: "\u5E74\u8F15\u6709\u6D3B\u529B\u7684\u7537\u8072\uFF0C\u9069\u5408\u5E74\u8F15\u7537\u6027\u89D2\u8272",
        voice: "echo",
        sampleText: "\u54CE\uFF0C\u4F60\u8B1B\u5605\u4FC2\u5514\u4FC2\u771F\u35CE\uFF1F",
        tags: ["\u5E74\u8F15", "\u6D3B\u6F51", "\u7537\u4E3B\u89D2"]
      },
      "male-mature": {
        id: "male-mature",
        name: "\u6210\u719F\u7537\u8072",
        gender: "male",
        type: "character",
        language: "cantonese",
        description: "\u6210\u719F\u7A69\u91CD\u7684\u7537\u8072\uFF0C\u9069\u5408\u4E2D\u5E74\u7537\u6027\u89D2\u8272",
        voice: "onyx",
        sampleText: "\u5462\u4EF6\u4E8B\u5514\u7C21\u55AE\uFF0C\u8981\u8AD7\u6E05\u695A\u5148\u5F97\u3002",
        tags: ["\u6210\u719F", "\u7A69\u91CD", "\u7236\u89AA", "\u8001\u95C6"]
      },
      "male-deep": {
        id: "male-deep",
        name: "\u6DF1\u6C89\u7537\u8072",
        gender: "male",
        type: "character",
        language: "cantonese",
        description: "\u6DF1\u6C89\u6709\u78C1\u6027\u7684\u7537\u8072\uFF0C\u9069\u5408\u795E\u79D8\u6216\u6B63\u5F0F\u5834\u5408",
        voice: "fable",
        sampleText: "\u547D\u904B\u5605\u8F2A\u76E4\u5DF2\u7D93\u958B\u59CB\u8F49\u52D5...",
        tags: ["\u6DF1\u6C89", "\u78C1\u6027", "\u795E\u79D8"]
      },
      "female-narrator": {
        id: "female-narrator",
        name: "\u5973\u8072\u65C1\u767D",
        gender: "female",
        type: "narrator",
        language: "cantonese",
        description: "\u6EAB\u67D4\u512A\u96C5\u7684\u5973\u8072\uFF0C\u9069\u5408\u65C1\u767D\u548C\u6558\u8FF0",
        voice: "nova",
        sampleText: "\u55BA\u5462\u500B\u5B89\u975C\u5605\u591C\u665A...",
        tags: ["\u65C1\u767D", "\u6558\u8FF0", "\u6EAB\u67D4"]
      },
      "female-young": {
        id: "female-young",
        name: "\u5E74\u8F15\u5973\u8072",
        gender: "female",
        type: "character",
        language: "cantonese",
        description: "\u5E74\u8F15\u6D3B\u6F51\u7684\u5973\u8072\uFF0C\u9069\u5408\u5E74\u8F15\u5973\u6027\u89D2\u8272",
        voice: "shimmer",
        sampleText: "\u54C7\uFF0C\u771F\u4FC2\u597D\u975A\u5440\uFF01",
        tags: ["\u5E74\u8F15", "\u6D3B\u6F51", "\u5973\u4E3B\u89D2"]
      },
      "female-mature": {
        id: "female-mature",
        name: "\u6210\u719F\u5973\u8072",
        gender: "female",
        type: "character",
        language: "cantonese",
        description: "\u6210\u719F\u512A\u96C5\u7684\u5973\u8072\uFF0C\u9069\u5408\u4E2D\u5E74\u5973\u6027\u89D2\u8272",
        voice: "alloy",
        sampleText: "\u4F60\u8981\u8A18\u4F4F\uFF0C\u505A\u4EBA\u6700\u7DCA\u8981\u4FC2\u8AA0\u5BE6\u3002",
        tags: ["\u6210\u719F", "\u512A\u96C5", "\u6BCD\u89AA"]
      },
      "child-boy": {
        id: "child-boy",
        name: "\u7537\u7AE5\u8072",
        gender: "male",
        type: "character",
        language: "cantonese",
        description: "\u6D3B\u6F51\u53EF\u611B\u7684\u7537\u7AE5\u8072\u97F3",
        voice: "echo",
        sampleText: "\u5ABD\u5ABD\uFF0C\u6211\u60F3\u98DF\u96EA\u7CD5\uFF01",
        tags: ["\u5152\u7AE5", "\u7537\u5B69", "\u53EF\u611B"]
      },
      "child-girl": {
        id: "child-girl",
        name: "\u5973\u7AE5\u8072",
        gender: "female",
        type: "character",
        language: "cantonese",
        description: "\u751C\u7F8E\u53EF\u611B\u7684\u5973\u7AE5\u8072\u97F3",
        voice: "shimmer",
        sampleText: "\u591A\u8B1D\u4F60\u5440\uFF0C\u4F60\u771F\u4FC2\u597D\u4EBA\uFF01",
        tags: ["\u5152\u7AE5", "\u5973\u5B69", "\u751C\u7F8E"]
      },
      "elderly-male": {
        id: "elderly-male",
        name: "\u8001\u5E74\u7537\u8072",
        gender: "male",
        type: "character",
        language: "cantonese",
        description: "\u6EAB\u548C\u667A\u6167\u7684\u8001\u5E74\u7537\u8072",
        voice: "fable",
        sampleText: "\u5F8C\u751F\u4ED4\uFF0C\u807D\u963F\u723A\u8B1B\u500B\u6545\u4E8B\u4F60\u807D\u3002",
        tags: ["\u8001\u4EBA", "\u723A\u723A", "\u667A\u8005"]
      },
      "elderly-female": {
        id: "elderly-female",
        name: "\u8001\u5E74\u5973\u8072",
        gender: "female",
        type: "character",
        language: "cantonese",
        description: "\u6EAB\u6696\u6148\u7965\u7684\u8001\u5E74\u5973\u8072",
        voice: "nova",
        sampleText: "\u4E56\u5B6B\uFF0C\u569F\u98DF\u5976\u5976\u716E\u5605\u6E6F\u3002",
        tags: ["\u8001\u4EBA", "\u5976\u5976", "\u6EAB\u6696"]
      }
    };
    VOICE_MODES = {
      unified: {
        name: "\u7D71\u4E00\u914D\u97F3",
        description: "\u6240\u6709\u5834\u666F\u4F7F\u7528\u540C\u4E00\u500B\u914D\u97F3\u54E1",
        icon: "\u{1F399}\uFE0F"
      },
      perScene: {
        name: "\u5834\u666F\u914D\u97F3",
        description: "\u6BCF\u500B\u5834\u666F\u53EF\u9078\u64C7\u4E0D\u540C\u914D\u97F3\u54E1",
        icon: "\u{1F3AC}"
      },
      character: {
        name: "\u89D2\u8272\u914D\u97F3",
        description: "\u6839\u64DA\u89D2\u8272\u81EA\u52D5\u5206\u914D\u914D\u97F3\u54E1\uFF0C\u9069\u5408\u5C0D\u8A71\u5834\u666F",
        icon: "\u{1F465}"
      }
    };
    VOICE_MATCHING_RULES = {
      // 根據角色描述關鍵詞匹配
      keywords: {
        "\u7537\u5B69": "child-boy",
        "\u5C0F\u7537\u5B69": "child-boy",
        "\u5152\u5B50": "child-boy",
        "\u5973\u5B69": "child-girl",
        "\u5C0F\u5973\u5B69": "child-girl",
        "\u5973\u5152": "child-girl",
        "\u5E74\u8F15\u7537": "male-young",
        "\u5E74\u8F15\u5973": "female-young",
        "\u5C11\u5E74": "male-young",
        "\u5C11\u5973": "female-young",
        "\u4E2D\u5E74\u7537": "male-mature",
        "\u4E2D\u5E74\u5973": "female-mature",
        "\u8001\u4EBA": "elderly-male",
        "\u8001\u723A\u723A": "elderly-male",
        "\u723A\u723A": "elderly-male",
        "\u8001\u5976\u5976": "elderly-female",
        "\u5976\u5976": "elderly-female",
        "\u7236\u89AA": "male-mature",
        "\u7238\u7238": "male-mature",
        "\u6BCD\u89AA": "female-mature",
        "\u5ABD\u5ABD": "female-mature",
        "\u63A2\u96AA\u5BB6": "male-young",
        "\u5973\u63A2\u96AA\u5BB6": "female-young"
      },
      // 默認配音員
      defaultNarrator: "male-narrator",
      defaultMale: "male-young",
      defaultFemale: "female-young"
    };
  }
});

// server/kreadoTTS.ts
async function generateSpeechWithKreado(content, voiceActorId, language = "cantonese") {
  const langConfig = LANGUAGE_CONFIG[language];
  const voiceMapping = VOICE_ACTOR_MAPPING[voiceActorId];
  const voiceId = voiceMapping?.voiceId || langConfig.defaultVoiceId;
  const voiceSource = voiceMapping?.voiceSource || langConfig.voiceSource;
  console.log(`[KreadoAI TTS] \u751F\u6210\u8A9E\u97F3: language=${language}, voiceId=${voiceId}, voiceSource=${voiceSource}`);
  console.log(`[KreadoAI TTS] \u6587\u5B57\u5167\u5BB9: ${content.substring(0, 50)}...`);
  const requestBody = {
    languageId: langConfig.languageId,
    content,
    voiceId,
    voiceSource,
    voiceClone: 0
  };
  try {
    const response = await fetch(KREADO_TTS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apiToken": KREADO_CONFIG.apiKey
      },
      body: JSON.stringify(requestBody)
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`KreadoAI TTS API \u8ABF\u7528\u5931\u6557: ${response.status} - ${errorText}`);
    }
    const data = await response.json();
    if (data.code !== "200") {
      throw new Error(`KreadoAI TTS \u932F\u8AA4: ${data.message}`);
    }
    console.log(`[KreadoAI TTS] \u6210\u529F\u751F\u6210\u8A9E\u97F3: ${data.data.textToSpeech.audioUrl}`);
    console.log(`[KreadoAI TTS] \u6642\u9577: ${data.data.textToSpeech.duration}\u79D2, \u6D88\u8017: ${data.data.textToSpeech.paymentMoney}\u9EDE`);
    return {
      audioUrl: data.data.textToSpeech.audioUrl,
      duration: data.data.textToSpeech.duration
    };
  } catch (error) {
    console.error("[KreadoAI TTS] \u932F\u8AA4:", error);
    throw error;
  }
}
var KREADO_TTS_URL, LANGUAGE_CONFIG, VOICE_ACTOR_MAPPING;
var init_kreadoTTS = __esm({
  "server/kreadoTTS.ts"() {
    "use strict";
    init_videoConfig();
    KREADO_TTS_URL = "https://api.kreadoai.com/apis/open/voice/v3/textToSpeech";
    LANGUAGE_CONFIG = {
      cantonese: {
        languageId: "1767068435675340826",
        // 粵語
        voiceSource: 5,
        // MiniMax
        defaultVoiceId: "ai_000046"
        // 書聲儒雅
      },
      mandarin: {
        languageId: "1767068435675340832",
        // 普通話
        voiceSource: 4,
        // 字節
        defaultVoiceId: "zh_male_jingqiangkanye_moon_bigtts"
      },
      english: {
        languageId: "1767068435553706002",
        // English (UK)
        voiceSource: 21,
        // ElevenLabs
        defaultVoiceId: "1BUhH8aaMvGMUdGAmWVM"
        // Alyx - Vibrant British Male
      },
      clone: {
        languageId: "1767068435675340826",
        // 克隆聲音使用粵語 languageId
        voiceSource: 5,
        // MiniMax
        defaultVoiceId: "Minimax919724_52965111962639"
        // PO 克隆聲音
      }
    };
    VOICE_ACTOR_MAPPING = {
      // ============================================
      // 粵語配音員 (MiniMax voiceSource: 5)
      // ============================================
      // 基礎配音員（原有）
      "cantonese-male-narrator": { voiceId: "ai_000046", voiceSource: 5 },
      // 書聲儒雅
      "cantonese-male-young": { voiceId: "ai_charming_m_01", voiceSource: 5 },
      // 磁性男聲
      "cantonese-male-mature": { voiceId: "ai_000141", voiceSource: 5 },
      // 成熟男聲
      "cantonese-female-narrator": { voiceId: "ai_charming_f_01", voiceSource: 5 },
      // 灵韵
      "cantonese-female-young": { voiceId: "ai_charming_f_22", voiceSource: 5 },
      // 灵音姬
      "cantonese-female-mature": { voiceId: "ai_charming_f_23", voiceSource: 5 },
      // 灵汐
      // 擴充粵語男聲
      "cantonese-male-deep": { voiceId: "ai_charming_m_05", voiceSource: 5 },
      // 沉稳男
      "cantonese-male-energetic": { voiceId: "ai_chongyun", voiceSource: 5 },
      // 云逸
      "cantonese-male-elegant": { voiceId: "ai_diluke", voiceSource: 5 },
      // 迪曜
      "cantonese-male-dj": { voiceId: "ai_dj_m_01", voiceSource: 5 },
      // 音韵俊朗
      "cantonese-male-boy": { voiceId: "ai_bili_712", voiceSource: 5 },
      // 中二君
      "cantonese-male-scholar": { voiceId: "ai_baodewen4_712", voiceSource: 5 },
      // 博文
      "cantonese-male-hero": { voiceId: "ai_kaiya", voiceSource: 5 },
      // 凯夜
      "cantonese-male-cold": { voiceId: "ai_lilianhua_712", voiceSource: 5 },
      // 冷傲青锋
      "cantonese-male-dragon": { voiceId: "ai_longxiao_712", voiceSource: 5 },
      // 龙啸威声
      "cantonese-male-sunny": { voiceId: "ai_jianshenjiaolian_712", voiceSource: 5 },
      // 阳光健翔
      // 擴充粵語女聲
      "cantonese-female-sweet": { voiceId: "ai_charming_f_24", voiceSource: 5 },
      // 灵音妹
      "cantonese-female-wise": { voiceId: "ai_charming_f_25", voiceSource: 5 },
      // 知薇
      "cantonese-female-dj": { voiceId: "ai_dj_f_01", voiceSource: 5 },
      // 星澜
      "cantonese-female-elegant2": { voiceId: "ai_dj_f_02", voiceSource: 5 },
      // 音韵霓裳
      "cantonese-female-fairy": { voiceId: "ai_ganyu", voiceSource: 5 },
      // 甘霓
      "cantonese-female-cute": { voiceId: "ai_hutao", voiceSource: 5 },
      // 胡桃音姬
      "cantonese-female-clear": { voiceId: "ai_keqing", voiceSource: 5 },
      // 清音姬
      "cantonese-female-loli": { voiceId: "ai_keli", voiceSource: 5 },
      // 可丽音
      "cantonese-female-assistant": { voiceId: "ai_jingling", voiceSource: 5 },
      // 晶灵助手
      "cantonese-female-teacher": { voiceId: "ai_jiaodaozhuren_712", voiceSource: 5 },
      // 教导严音
      "cantonese-female-gentle": { voiceId: "ai_lisha", voiceSource: 5 },
      // 璃纱
      "cantonese-female-ice": { voiceId: "ai_bingjiaoxuemei_712", voiceSource: 5 },
      // 冰娇梦音
      "cantonese-female-proud": { voiceId: "ai_heqifang_712", voiceSource: 5 },
      // 傲娇芳
      "cantonese-female-breeze": { voiceId: "ai_enina_712", voiceSource: 5 },
      // 轻声清岚
      "cantonese-female-morning": { voiceId: "ai_chenguilu_712", voiceSource: 5 },
      // 晨曦露
      // 粵語特殊角色
      "cantonese-child-boy": { voiceId: "ai_jinsihou_712", voiceSource: 5 },
      // 金小猴
      "cantonese-child-girl": { voiceId: "ai_charming_f_22", voiceSource: 5 },
      // 甘霓女童
      "cantonese-child-cute": { voiceId: "ai_jinsihou_712", voiceSource: 5 },
      // 萌娃童音
      "cantonese-elder-male": { voiceId: "ai_laoguowang_712", voiceSource: 5 },
      // 老国声
      "cantonese-elder-female": { voiceId: "ai_her_06", voiceSource: 5 },
      // 魏绍兰
      // ============================================
      // 普通話配音員 (字節 voiceSource: 4)
      // ============================================
      // 基礎配音員（原有）
      "mandarin-male-narrator": { voiceId: "zh_male_jingqiangkanye_moon_bigtts", voiceSource: 4 },
      // 京腔侃爷
      "mandarin-male-young": { voiceId: "zh_male_yangguangqingnian_moon_bigtts", voiceSource: 4 },
      // 阳光青年
      "mandarin-male-mature": { voiceId: "zh_male_yuanboxiaoshu_moon_bigtts", voiceSource: 4 },
      // 渊博小叔
      "mandarin-female-narrator": { voiceId: "zh_female_shuangkuaisisi_moon_bigtts", voiceSource: 4 },
      // 爽快思思
      "mandarin-female-young": { voiceId: "zh_female_linjianvhai_moon_bigtts", voiceSource: 4 },
      // 邻家女孩
      "mandarin-female-mature": { voiceId: "zh_female_gaolengyujie_moon_bigtts", voiceSource: 4 },
      // 高冷御姐
      // 擴充普通話男聲
      "mandarin-male-warm": { voiceId: "zh_male_wennuanahu_moon_bigtts", voiceSource: 4 },
      // 温暖阿虎
      "mandarin-male-arrogant": { voiceId: "zh_male_aojiaobazong_moon_bigtts", voiceSource: 4 },
      // 傲娇霸总
      "mandarin-male-teen": { voiceId: "zh_male_shaonianzixin_moon_bigtts", voiceSource: 4 },
      // 少年梓辛
      "mandarin-male-news": { voiceId: "BV012_streaming", voiceSource: 4 },
      // 新闻男声
      "mandarin-male-magnetic": { voiceId: "BV006_streaming", voiceSource: 4 },
      // 磁性男声
      "mandarin-male-gentle": { voiceId: "BV033_streaming", voiceSource: 4 },
      // 温柔小哥
      "mandarin-male-cheerful": { voiceId: "BV004_streaming", voiceSource: 4 },
      // 开朗青年
      "mandarin-male-elegant": { voiceId: "BV102_streaming", voiceSource: 4 },
      // 儒雅青年
      "mandarin-male-simple": { voiceId: "BV100_streaming", voiceSource: 4 },
      // 质朴青年
      "mandarin-male-boss": { voiceId: "BV107_streaming", voiceSource: 4 },
      // 霸气青叔
      "mandarin-male-sunny2": { voiceId: "BV056_streaming", voiceSource: 4 },
      // 阳光男声
      "mandarin-male-promo": { voiceId: "BV401_streaming", voiceSource: 4 },
      // 促销男声
      "mandarin-male-commentary": { voiceId: "BV410_streaming", voiceSource: 4 },
      // 活力解说男
      "mandarin-male-steady": { voiceId: "BV142_streaming", voiceSource: 4 },
      // 沉稳解说男
      "mandarin-male-handsome": { voiceId: "BV411_streaming", voiceSource: 4 },
      // 解说小帅
      "mandarin-male-emotional": { voiceId: "BV437_streaming", voiceSource: 4 },
      // 情感小帅
      "mandarin-male-casual": { voiceId: "BV143_streaming", voiceSource: 4 },
      // 潇洒青年
      "mandarin-male-rebel": { voiceId: "BV120_streaming", voiceSource: 4 },
      // 反卷青年
      "mandarin-male-noble": { voiceId: "BV119_streaming", voiceSource: 4 },
      // 通用赘婿
      "mandarin-male-dandy": { voiceId: "BV159_streaming", voiceSource: 4 },
      // 纨绔青年
      "mandarin-male-crosstalk": { voiceId: "BV212_streaming", voiceSource: 4 },
      // 相声演员
      "mandarin-male-chongqing": { voiceId: "BV019_streaming", voiceSource: 4 },
      // 重庆小伙
      "mandarin-male-farmer": { voiceId: "BV214_streaming", voiceSource: 4 },
      // 乡村企业家
      // 擴充普通話女聲
      "mandarin-female-taiwan": { voiceId: "zh_female_wanwanxiaohe_moon_bigtts", voiceSource: 4 },
      // 湾湾小何
      "mandarin-female-cancan": { voiceId: "BV700_streaming", voiceSource: 4 },
      // 灿灿
      "mandarin-female-zizi": { voiceId: "BV406_streaming", voiceSource: 4 },
      // 梓梓
      "mandarin-female-ranran": { voiceId: "BV407_streaming", voiceSource: 4 },
      // 燃燃
      "mandarin-female-weiwei": { voiceId: "BV001_streaming", voiceSource: 4 },
      // 薇薇
      "mandarin-female-news": { voiceId: "BV011_streaming", voiceSource: 4 },
      // 新闻女声
      "mandarin-female-intellectual": { voiceId: "BV009_streaming", voiceSource: 4 },
      // 知性女声
      "mandarin-female-friendly": { voiceId: "BV007_streaming", voiceSource: 4 },
      // 亲切女声
      "mandarin-female-gentle": { voiceId: "BV104_streaming", voiceSource: 4 },
      // 温柔淑女
      "mandarin-female-sweet": { voiceId: "BV113_streaming", voiceSource: 4 },
      // 甜宠少御
      "mandarin-female-ancient": { voiceId: "BV115_streaming", voiceSource: 4 },
      // 古风少御
      "mandarin-female-lively": { voiceId: "BV005_streaming", voiceSource: 4 },
      // 活泼女声
      "mandarin-female-promo": { voiceId: "BV402_streaming", voiceSource: 4 },
      // 促销女声
      "mandarin-female-movie": { voiceId: "BV412_streaming", voiceSource: 4 },
      // 影视小美
      "mandarin-female-anchor": { voiceId: "BV418_streaming", voiceSource: 4 },
      // 直播一姐
      "mandarin-female-literary": { voiceId: "BV428_streaming", voiceSource: 4 },
      // 文艺女声
      "mandarin-female-chicken": { voiceId: "BV403_streaming", voiceSource: 4 },
      // 鸡汤女声
      "mandarin-female-sister": { voiceId: "BV034_streaming", voiceSource: 4 },
      // 知性姐姐
      "mandarin-female-xiaoyuan": { voiceId: "BV405_streaming", voiceSource: 4 },
      // 甜美小源
      "mandarin-female-shanghai": { voiceId: "BV217_streaming", voiceSource: 4 },
      // 沪上阿姐
      "mandarin-female-sichuan": { voiceId: "BV221_streaming", voiceSource: 4 },
      // 四川甜妹儿
      "mandarin-female-chongqing": { voiceId: "BV423_streaming", voiceSource: 4 },
      // 重庆幺妹儿
      "mandarin-female-changsha": { voiceId: "BV216_streaming", voiceSource: 4 },
      // 长沙靓女
      "mandarin-female-hunan": { voiceId: "BV226_streaming", voiceSource: 4 },
      // 湖南妹坨
      // 普通話特殊角色
      "mandarin-child-girl": { voiceId: "BV064_streaming", voiceSource: 4 },
      // 小萝莉
      "mandarin-child-boy": { voiceId: "BV051_streaming", voiceSource: 4 },
      // 奶气萌娃
      "mandarin-child-genius": { voiceId: "BV061_streaming", voiceSource: 4 },
      // 天才童声
      "mandarin-child-tongtong": { voiceId: "BV415_streaming", voiceSource: 4 },
      // 童童
      "mandarin-child-chengcheng": { voiceId: "BV419_streaming", voiceSource: 4 },
      // 诚诚
      "mandarin-elder-male": { voiceId: "BV158_streaming", voiceSource: 4 },
      // 智慧老者
      "mandarin-elder-female": { voiceId: "BV157_streaming", voiceSource: 4 },
      // 慈爱姥姥
      "mandarin-cartoon-sponge": { voiceId: "BV063_streaming", voiceSource: 4 },
      // 动漫海绵
      "mandarin-cartoon-star": { voiceId: "BV417_streaming", voiceSource: 4 },
      // 动漫海星
      "mandarin-cartoon-shin": { voiceId: "BV050_streaming", voiceSource: 4 },
      // 动漫小新
      "mandarin-cartoon-sheep": { voiceId: "BV426_streaming", voiceSource: 4 },
      // 懒小羊
      "mandarin-rap": { voiceId: "BR001_streaming", voiceSource: 4 },
      // 说唱小哥
      "mandarin-dub": { voiceId: "BV408_streaming", voiceSource: 4 },
      // 译制片男声
      // ============================================
      // 英語配音員 (ElevenLabs voiceSource: 21)
      // ============================================
      // 基礎配音員（原有）
      "english-male-narrator": { voiceId: "1BUhH8aaMvGMUdGAmWVM", voiceSource: 21 },
      // Alyx - Vibrant British Male
      "english-male-young": { voiceId: "8JVbfL6oEdmuxKn5DK2C", voiceSource: 21 },
      // Johnny Kid - Serious
      "english-male-mature": { voiceId: "G17SuINrv2H9FC6nvetn", voiceSource: 21 },
      // Christopher
      "english-female-narrator": { voiceId: "19STyYD15bswVz51nqLf", voiceSource: 21 },
      // Samara X
      "english-female-young": { voiceId: "ZF6FPAbjXT4488VcRRnw", voiceSource: 21 },
      // Amelia
      "english-female-mature": { voiceId: "O4fnkotIypvedJqBp4yb", voiceSource: 21 },
      // Alexis Lancaster
      // 擴充英語男聲
      "english-male-adam": { voiceId: "NFG5qt843uXKj4pFvR7C", voiceSource: 21 },
      // Adam Stone - late night radio
      "english-male-russell": { voiceId: "NYC9WEgkq1u4jiqBseQ9", voiceSource: 21 },
      // Russell - Dramatic British TV
      "english-male-alexander": { voiceId: "mZ8K1MPRiT5wDQaasg3i", voiceSource: 21 },
      // Alexander Kensington
      "english-male-jeremy": { voiceId: "bVMeCyTHy58xNoL34h3p", voiceSource: 21 },
      // Jeremy
      "english-male-aaran": { voiceId: "CZ1JCWXlwX5dmHx0XdiL", voiceSource: 21 },
      // Aaran
      "english-male-archer": { voiceId: "L0Dsvb3SLTyegXwtm47J", voiceSource: 21 },
      // Archer
      "english-male-nathaniel": { voiceId: "lnIpQcZuikKim3oNdYlP", voiceSource: 21 },
      // Nathaniel C. - Customer Care
      // 擴充英語女聲
      "english-female-elli": { voiceId: "MF3mGyEYCl7XYWbV9V6O", voiceSource: 21 },
      // Elli
      "english-female-dorothy": { voiceId: "ThT5KcBeYPX3keUQqHPh", voiceSource: 21 },
      // Dorothy
      "english-female-serena": { voiceId: "pMsXgVXv3BLzUgSXRplE", voiceSource: 21 },
      // Serena
      "english-female-jessi": { voiceId: "09AoN6tYyW3VSTQqCo7C", voiceSource: 21 },
      // Jessi
      "english-female-allison": { voiceId: "Se2Vw1WbHmGbBbyWTuu4", voiceSource: 21 },
      // Allison - British accent
      "english-female-liberty": { voiceId: "iBo5PWT1qLiEyqhM7TrG", voiceSource: 21 },
      // Liberty X
      "english-female-shelby": { voiceId: "rfkTsdZrVWEVhDycUYn9", voiceSource: 21 },
      // Shelby
      // 英語童聲
      "english-child-boy": { voiceId: "8JVbfL6oEdmuxKn5DK2C", voiceSource: 21 },
      // Tommy Boy
      "english-child-girl": { voiceId: "09AoN6tYyW3VSTQqCo7C", voiceSource: 21 },
      // Lily Girl
      // ============================================
      // 克隆聲音 (Clone Voices)
      // ============================================
      "clone-po": { voiceId: "Minimax919724_52965111962639", voiceSource: 5 },
      // PO 克隆聲音 - 粵語
      "cantonese-po-clone": { voiceId: "Minimax919724_52965111962639", voiceSource: 5 },
      // PO 克隆語音 - 粵語 (別名)
      "po-clone": { voiceId: "Minimax919724_52965111962639", voiceSource: 5 },
      // PO 克隆語音 (別名)
      // ============================================
      // 向後兼容映射（舊版配音員 ID）
      // ============================================
      "male-narrator": { voiceId: "ai_000046", voiceSource: 5 },
      "male-young": { voiceId: "ai_charming_m_01", voiceSource: 5 },
      "male-mature": { voiceId: "ai_000141", voiceSource: 5 },
      "male-deep": { voiceId: "ai_charming_m_05", voiceSource: 5 },
      "female-narrator": { voiceId: "ai_charming_f_01", voiceSource: 5 },
      "female-young": { voiceId: "ai_charming_f_22", voiceSource: 5 },
      "female-mature": { voiceId: "ai_charming_f_23", voiceSource: 5 },
      "female-sweet": { voiceId: "ai_charming_f_24", voiceSource: 5 },
      "child-boy": { voiceId: "ai_jinsihou_712", voiceSource: 5 },
      "child-girl": { voiceId: "BV064_streaming", voiceSource: 4 },
      "elderly-male": { voiceId: "ai_laoguowang_712", voiceSource: 5 },
      "elderly-female": { voiceId: "BV157_streaming", voiceSource: 4 }
    };
  }
});

// server/storage.ts
var storage_exports = {};
__export(storage_exports, {
  storageGet: () => storageGet,
  storagePut: () => storagePut
});
function getStorageConfig() {
  const baseUrl = ENV.forgeApiUrl;
  const apiKey = ENV.forgeApiKey;
  if (!baseUrl || !apiKey) {
    throw new Error(
      "Storage proxy credentials missing: set BUILT_IN_FORGE_API_URL and BUILT_IN_FORGE_API_KEY"
    );
  }
  return { baseUrl: baseUrl.replace(/\/+$/, ""), apiKey };
}
function buildUploadUrl(baseUrl, relKey) {
  const url = new URL("v1/storage/upload", ensureTrailingSlash(baseUrl));
  url.searchParams.set("path", normalizeKey(relKey));
  return url;
}
async function buildDownloadUrl(baseUrl, relKey, apiKey) {
  const downloadApiUrl = new URL(
    "v1/storage/downloadUrl",
    ensureTrailingSlash(baseUrl)
  );
  downloadApiUrl.searchParams.set("path", normalizeKey(relKey));
  const response = await fetch(downloadApiUrl, {
    method: "GET",
    headers: buildAuthHeaders(apiKey)
  });
  return (await response.json()).url;
}
function ensureTrailingSlash(value) {
  return value.endsWith("/") ? value : `${value}/`;
}
function normalizeKey(relKey) {
  return relKey.replace(/^\/+/, "");
}
function toFormData(data, contentType, fileName) {
  const blob = typeof data === "string" ? new Blob([data], { type: contentType }) : new Blob([data], { type: contentType });
  const form = new FormData();
  form.append("file", blob, fileName || "file");
  return form;
}
function buildAuthHeaders(apiKey) {
  return { Authorization: `Bearer ${apiKey}` };
}
async function storagePut(relKey, data, contentType = "application/octet-stream") {
  const { baseUrl, apiKey } = getStorageConfig();
  const key = normalizeKey(relKey);
  const uploadUrl = buildUploadUrl(baseUrl, key);
  const formData = toFormData(data, contentType, key.split("/").pop() ?? key);
  const response = await fetch(uploadUrl, {
    method: "POST",
    headers: buildAuthHeaders(apiKey),
    body: formData
  });
  if (!response.ok) {
    const message = await response.text().catch(() => response.statusText);
    throw new Error(
      `Storage upload failed (${response.status} ${response.statusText}): ${message}`
    );
  }
  const url = (await response.json()).url;
  return { key, url };
}
async function storageGet(relKey) {
  const { baseUrl, apiKey } = getStorageConfig();
  const key = normalizeKey(relKey);
  return {
    key,
    url: await buildDownloadUrl(baseUrl, key, apiKey)
  };
}
var init_storage = __esm({
  "server/storage.ts"() {
    "use strict";
    init_env();
  }
});

// server/videoService.ts
var videoService_exports = {};
__export(videoService_exports, {
  analyzeStory: () => analyzeStory,
  generateCharacterImage: () => generateCharacterImage,
  generateSceneDescription: () => generateSceneDescription,
  generateSceneImage: () => generateSceneImage,
  generateSpeech: () => generateSpeech,
  generateSpeechWithVectorEngine: () => generateSpeechWithVectorEngine,
  generateVideo: () => generateVideo,
  shouldGenerateCharacterBase: () => shouldGenerateCharacterBase,
  sleep: () => sleep
});
async function analyzeStory(story, characterDescription, visualStyle, llmModel, language = "cantonese") {
  const apiKey = getNextApiKey();
  const langConfig = LANGUAGE_PROMPTS[language];
  const systemPrompt = `\u4F60\u662F\u4E00\u500B\u5C08\u696D\u7684\u8996\u983B\u8173\u672C\u5206\u6790\u5E2B\u3002\u8ACB\u5C07\u7528\u6236\u7684\u6545\u4E8B\u5206\u89E3\u70BA 3-5 \u500B\u5834\u666F\uFF0C\u6BCF\u500B\u5834\u666F\u5305\u542B\uFF1A
1. \u5834\u666F\u63CF\u8FF0\uFF08\u7528\u65BC\u751F\u6210\u8996\u983B\u63D0\u793A\u8A5E\uFF09
2. \u65C1\u767D\u6587\u5B57\uFF08\u7528\u65BC\u8A9E\u97F3\u5408\u6210\uFF09
3. \u5716\u7247\u63D0\u793A\u8A5E\uFF08\u7528\u65BC Midjourney \u751F\u6210\u89D2\u8272\u5716\u7247\uFF09

\u91CD\u8981\uFF1A\u65C1\u767D\u6587\u5B57\u5FC5\u9808\u4F7F\u7528${langConfig.outputLanguage}\uFF0C${langConfig.narrationStyle}\u3002

\u8ACB\u4EE5 JSON \u683C\u5F0F\u8FD4\u56DE\uFF0C\u683C\u5F0F\u5982\u4E0B\uFF1A
{
  "scenes": [
    {
      "id": 1,
      "description": "\u5834\u666F\u63CF\u8FF0",
      "narration": "\u65C1\u767D\u6587\u5B57\uFF08\u5FC5\u9808\u7528${langConfig.outputLanguage}\uFF09",
      "imagePrompt": "\u82F1\u6587\u5716\u7247\u63D0\u793A\u8A5E\uFF0C\u5305\u542B\u89D2\u8272\u7279\u5FB5\u548C\u5834\u666F\u7D30\u7BC0"
    }
  ],
  "characterPrompt": "\u89D2\u8272\u57FA\u790E\u5716\u7247\u7684\u82F1\u6587\u63D0\u793A\u8A5E\uFF0C\u7528\u65BC\u4FDD\u6301\u89D2\u8272\u4E00\u81F4\u6027"
}`;
  const userPrompt = `\u6545\u4E8B\uFF1A${story}
${characterDescription ? `\u89D2\u8272\u63CF\u8FF0\uFF1A${characterDescription}` : ""}
${visualStyle ? `\u8996\u89BA\u98A8\u683C\uFF1A${visualStyle}` : ""}

\u8ACB\u5206\u6790\u9019\u500B\u6545\u4E8B\u4E26\u751F\u6210\u5834\u666F\u6578\u64DA\u3002\u8A18\u4F4F\u65C1\u767D\u6587\u5B57\u5FC5\u9808\u4F7F\u7528${langConfig.outputLanguage}\u3002`;
  const modelsToTry = [llmModel];
  const fallbackModel = LLM_FALLBACK_CONFIG[llmModel];
  if (fallbackModel) {
    modelsToTry.push(fallbackModel);
  }
  let lastError = null;
  let result = null;
  for (const model of modelsToTry) {
    try {
      console.log(`[LLM] \u5617\u8A66\u4F7F\u7528\u6A21\u578B: ${model}`);
      const response = await fetch(`${API_ENDPOINTS.vectorEngine}/v1/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
          response_format: { type: "json_object" }
        })
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`LLM API \u8ABF\u7528\u5931\u6557: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      if (!content) {
        throw new Error("LLM \u8FD4\u56DE\u5167\u5BB9\u70BA\u7A7A");
      }
      let jsonContent = content.trim();
      if (jsonContent.startsWith("```json")) {
        jsonContent = jsonContent.slice(7);
      } else if (jsonContent.startsWith("```")) {
        jsonContent = jsonContent.slice(3);
      }
      if (jsonContent.endsWith("```")) {
        jsonContent = jsonContent.slice(0, -3);
      }
      jsonContent = jsonContent.trim();
      result = JSON.parse(jsonContent);
      console.log(`[LLM] \u6A21\u578B ${model} \u6210\u529F`);
      break;
    } catch (error) {
      lastError = error;
      console.warn(`[LLM] \u6A21\u578B ${model} \u5931\u6557:`, error);
      if (model !== modelsToTry[modelsToTry.length - 1]) {
        console.log(`[LLM] \u5207\u63DB\u5230\u5099\u7528\u6A21\u578B...`);
      }
    }
  }
  if (!result) {
    throw lastError || new Error("\u6240\u6709 LLM \u6A21\u578B\u90FD\u5931\u6557");
  }
  return {
    scenes: result.scenes.map((s, index) => ({
      id: index + 1,
      description: s.description,
      narration: s.narration,
      imagePrompt: s.imagePrompt,
      status: "pending"
    })),
    characterPrompt: result.characterPrompt
  };
}
async function generateCharacterImage(prompt, mode) {
  const apiKey = getNextApiKey();
  console.log(`[Image] \u751F\u6210\u89D2\u8272\u5716\u7247\uFF0C\u6A21\u5F0F: ${mode}`);
  console.log(`[Image] \u63D0\u793A\u8A5E: ${prompt}`);
  try {
    const submitResponse = await fetch(`${API_ENDPOINTS.vectorEngine}/mj/submit/imagine`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        prompt: `${prompt} --ar 1:1 --v 6.1 ${mode === "fast" ? "--fast" : ""}`,
        notifyHook: ""
      })
    });
    if (!submitResponse.ok) {
      const errorText = await submitResponse.text();
      console.warn(`[Image] Midjourney \u63D0\u4EA4\u5931\u6557: ${submitResponse.status} - ${errorText}`);
      throw new Error(`Midjourney \u63D0\u4EA4\u5931\u6557: ${submitResponse.status}`);
    }
    const submitData = await submitResponse.json();
    if (submitData.code && submitData.code !== 1) {
      console.warn(`[Image] Midjourney \u8FD4\u56DE\u932F\u8AA4: ${submitData.description || submitData.message}`);
      throw new Error(`Midjourney \u932F\u8AA4: ${submitData.description || submitData.message}`);
    }
    const taskId = submitData.result;
    if (!taskId) {
      throw new Error("Midjourney \u4EFB\u52D9 ID \u70BA\u7A7A");
    }
    console.log(`[Image] Midjourney \u4EFB\u52D9\u5DF2\u63D0\u4EA4: ${taskId}`);
    return await pollMidjourneyTask(taskId);
  } catch (mjError) {
    console.warn(`[Image] Midjourney \u5931\u6557\uFF0C\u5207\u63DB\u5230 DALL-E 3:`, mjError);
    return await generateImageWithDallE3(prompt);
  }
}
async function generateImageWithDallE3(prompt) {
  const apiKey = getNextApiKey();
  console.log(`[Image] \u4F7F\u7528 DALL-E 3 \u751F\u6210\u5716\u7247`);
  console.log(`[Image] \u63D0\u793A\u8A5E: ${prompt}`);
  const response = await fetch(`${API_ENDPOINTS.vectorEngine}/v1/images/generations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1792x1024",
      // 16:9 比例
      quality: "hd",
      style: "vivid"
    })
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`DALL-E 3 \u5716\u7247\u751F\u6210\u5931\u6557: ${response.status} - ${errorText}`);
  }
  const data = await response.json();
  const imageUrl = data.data?.[0]?.url;
  if (!imageUrl) {
    throw new Error("DALL-E 3 \u672A\u8FD4\u56DE\u5716\u7247 URL");
  }
  console.log(`[Image] DALL-E 3 \u5716\u7247\u751F\u6210\u6210\u529F: ${imageUrl}`);
  return imageUrl;
}
async function generateSceneImage(prompt, characterImageUrl, speedMode, storyMode = "character") {
  const apiKey = getNextApiKey();
  const storyConfig = STORY_MODE_PRESETS[storyMode];
  console.log(`[Image] \u751F\u6210\u5834\u666F\u5716\u7247\uFF0C\u6A21\u5F0F: ${storyMode}, \u901F\u5EA6: ${speedMode}`);
  console.log(`[Image] \u63D0\u793A\u8A5E: ${prompt}`);
  try {
    let fullPrompt = prompt;
    if (storyConfig.useCref && characterImageUrl) {
      fullPrompt = `${prompt} --cref ${characterImageUrl} --cw 100 --ar 16:9 --v 6.1 ${speedMode === "fast" ? "--fast" : ""}`;
      console.log(`[Image] \u56FA\u5B9A\u4EBA\u7269\u6A21\u5F0F\uFF0C\u53C3\u8003\u5716\u7247: ${characterImageUrl}`);
    } else {
      fullPrompt = `${prompt} --ar 16:9 --v 6.1 ${speedMode === "fast" ? "--fast" : ""}`;
    }
    const submitResponse = await fetch(`${API_ENDPOINTS.vectorEngine}/mj/submit/imagine`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        prompt: fullPrompt,
        notifyHook: ""
      })
    });
    if (!submitResponse.ok) {
      const errorText = await submitResponse.text();
      console.warn(`[Image] Midjourney \u5834\u666F\u5716\u7247\u63D0\u4EA4\u5931\u6557: ${submitResponse.status} - ${errorText}`);
      throw new Error(`Midjourney \u5834\u666F\u5716\u7247\u63D0\u4EA4\u5931\u6557: ${submitResponse.status}`);
    }
    const submitData = await submitResponse.json();
    if (submitData.code && submitData.code !== 1) {
      console.warn(`[Image] Midjourney \u8FD4\u56DE\u932F\u8AA4: ${submitData.description || submitData.message}`);
      throw new Error(`Midjourney \u932F\u8AA4: ${submitData.description || submitData.message}`);
    }
    const taskId = submitData.result;
    console.log(`[Image] Midjourney \u5834\u666F\u4EFB\u52D9\u5DF2\u63D0\u4EA4: ${taskId}`);
    return await pollMidjourneyTask(taskId);
  } catch (mjError) {
    console.warn(`[Image] Midjourney \u5931\u6557\uFF0C\u5207\u63DB\u5230 DALL-E 3:`, mjError);
    if (storyConfig.useCref && characterImageUrl) {
      console.warn(`[Image] \u6CE8\u610F\uFF1ADALL-E 3 \u4E0D\u652F\u6301\u56FA\u5B9A\u4EBA\u7269\u6A21\u5F0F\uFF0C\u5C07\u4F7F\u7528\u5287\u60C5\u6A21\u5F0F\u751F\u6210`);
    }
    return await generateImageWithDallE3(prompt);
  }
}
function shouldGenerateCharacterBase(storyMode) {
  return STORY_MODE_PRESETS[storyMode].generateCharacterBase;
}
async function pollMidjourneyTask(taskId, maxAttempts = 60) {
  const apiKey = getNextApiKey();
  for (let i = 0; i < maxAttempts; i++) {
    await sleep(5e3);
    const response = await fetch(`${API_ENDPOINTS.vectorEngine}/mj/task/${taskId}/fetch`, {
      headers: { "Authorization": `Bearer ${apiKey}` }
    });
    if (!response.ok) continue;
    const data = await response.json();
    if (data.status === "SUCCESS" && data.imageUrl) {
      return data.imageUrl;
    }
    if (data.status === "FAILURE") {
      throw new Error(`Midjourney \u4EFB\u52D9\u5931\u6557: ${data.failReason || "\u672A\u77E5\u932F\u8AA4"}`);
    }
  }
  throw new Error("Midjourney \u4EFB\u52D9\u8D85\u6642");
}
async function generateVideo(imageUrl, prompt, videoModel) {
  const modelsToTry = [videoModel];
  const fallbackChain = VIDEO_FALLBACK_CHAIN[videoModel];
  if (fallbackChain) {
    modelsToTry.push(...fallbackChain);
  }
  let lastError = null;
  for (const model of modelsToTry) {
    try {
      console.log(`[Video] \u5617\u8A66\u4F7F\u7528\u6A21\u578B: ${model}`);
      const apiKey = getNextApiKey();
      let videoUrl;
      if (model === "kling") {
        videoUrl = await generateKlingVideo(imageUrl, prompt, apiKey);
      } else if (model === "runway") {
        videoUrl = await generateRunwayVideo(imageUrl, prompt, apiKey);
      } else {
        videoUrl = await generateVeoVideo(imageUrl, prompt, model, apiKey);
      }
      console.log(`[Video] \u6A21\u578B ${model} \u6210\u529F`);
      return videoUrl;
    } catch (error) {
      lastError = error;
      console.warn(`[Video] \u6A21\u578B ${model} \u5931\u6557:`, error);
      if (model !== modelsToTry[modelsToTry.length - 1]) {
        console.log(`[Video] \u5207\u63DB\u5230\u5099\u7528\u6A21\u578B...`);
      }
    }
  }
  throw lastError || new Error("\u6240\u6709\u8996\u983B\u6A21\u578B\u90FD\u5931\u6557");
}
async function generateVeoVideo(imageUrl, prompt, model, apiKey) {
  const submitResponse = await fetch(`${API_ENDPOINTS.vectorEngine}/v1/video/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      prompt,
      image_url: imageUrl
    })
  });
  if (!submitResponse.ok) {
    throw new Error(`Veo \u63D0\u4EA4\u5931\u6557: ${submitResponse.status}`);
  }
  const submitData = await submitResponse.json();
  const taskId = submitData.id;
  for (let i = 0; i < 60; i++) {
    await sleep(5e3);
    const queryResponse = await fetch(
      `${API_ENDPOINTS.vectorEngine}/v1/video/query?id=${taskId}`,
      { headers: { "Authorization": `Bearer ${apiKey}` } }
    );
    if (!queryResponse.ok) continue;
    const data = await queryResponse.json();
    if (data.status === "completed" && data.video_url) {
      return data.video_url;
    }
    if (data.status === "failed") {
      throw new Error(`Veo \u751F\u6210\u5931\u6557: ${data.error || "\u672A\u77E5\u932F\u8AA4"}`);
    }
  }
  throw new Error("Veo \u8996\u983B\u751F\u6210\u8D85\u6642");
}
async function generateKlingVideo(imageUrl, prompt, apiKey) {
  const submitResponse = await fetch(`${API_ENDPOINTS.vectorEngine}/kling/v1/videos/image2video`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model_name: "kling-v1-6",
      image: imageUrl,
      prompt,
      duration: "5",
      mode: "std"
    })
  });
  if (!submitResponse.ok) {
    throw new Error(`Kling \u63D0\u4EA4\u5931\u6557: ${submitResponse.status}`);
  }
  const submitData = await submitResponse.json();
  const taskId = submitData.data?.task_id;
  for (let i = 0; i < 60; i++) {
    await sleep(5e3);
    const queryResponse = await fetch(
      `${API_ENDPOINTS.vectorEngine}/kling/v1/videos/image2video/${taskId}`,
      { headers: { "Authorization": `Bearer ${apiKey}` } }
    );
    if (!queryResponse.ok) continue;
    const data = await queryResponse.json();
    if (data.data?.task_status === "succeed") {
      return data.data.task_result?.videos?.[0]?.url || "";
    }
    if (data.data?.task_status === "failed") {
      throw new Error(`Kling \u751F\u6210\u5931\u6557`);
    }
  }
  throw new Error("Kling \u8996\u983B\u751F\u6210\u8D85\u6642");
}
async function generateRunwayVideo(imageUrl, prompt, apiKey) {
  const submitResponse = await fetch(`${API_ENDPOINTS.vectorEngine}/runwayml/v1/image_to_video`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gen3a_turbo",
      promptImage: imageUrl,
      promptText: prompt,
      duration: 10,
      ratio: "16:9"
    })
  });
  if (!submitResponse.ok) {
    throw new Error(`Runway \u63D0\u4EA4\u5931\u6557: ${submitResponse.status}`);
  }
  const submitData = await submitResponse.json();
  const taskId = submitData.id;
  for (let i = 0; i < 60; i++) {
    await sleep(5e3);
    const queryResponse = await fetch(
      `${API_ENDPOINTS.vectorEngine}/runwayml/v1/tasks/${taskId}`,
      { headers: { "Authorization": `Bearer ${apiKey}` } }
    );
    if (!queryResponse.ok) continue;
    const data = await queryResponse.json();
    if (data.status === "SUCCEEDED" && data.output?.[0]) {
      return data.output[0];
    }
    if (data.status === "FAILED") {
      throw new Error(`Runway \u751F\u6210\u5931\u6557`);
    }
  }
  throw new Error("Runway \u8996\u983B\u751F\u6210\u8D85\u6642");
}
async function generateSpeechWithVectorEngine(text2, voice = "alloy", model = "tts-1") {
  const apiKey = getNextApiKey();
  const response = await fetch(`${API_ENDPOINTS.vectorEngine}/v1/audio/speech`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      input: text2,
      voice,
      response_format: "mp3"
    })
  });
  if (!response.ok) {
    throw new Error(`VectorEngine TTS \u5931\u6557: ${response.status}`);
  }
  const audioBuffer = await response.arrayBuffer();
  const { storagePut: storagePut2 } = await Promise.resolve().then(() => (init_storage(), storage_exports));
  const fileName = `tts-${Date.now()}-${Math.random().toString(36).slice(2)}.mp3`;
  const { url } = await storagePut2(fileName, Buffer.from(audioBuffer), "audio/mpeg");
  return url;
}
async function generateSpeech(text2, voiceActorId = "cantonese-male-narrator", language = "cantonese") {
  try {
    console.log(`[TTS] \u958B\u59CB\u751F\u6210\u8A9E\u97F3: voiceActorId=${voiceActorId}, language=${language}`);
    try {
      const result = await generateSpeechWithKreado(text2, voiceActorId, language);
      console.log(`[TTS] KreadoAI \u8A9E\u97F3\u751F\u6210\u6210\u529F: ${result.audioUrl}`);
      return result.audioUrl;
    } catch (kreadoError) {
      console.warn("[TTS] KreadoAI TTS \u5931\u6557\uFF0C\u5617\u8A66\u4F7F\u7528 VectorEngine TTS:", kreadoError);
      const vectorVoice = language === "english" ? "nova" : "alloy";
      const audioUrl = await generateSpeechWithVectorEngine(text2, vectorVoice, "tts-1-hd");
      console.log(`[TTS] VectorEngine TTS \u751F\u6210\u6210\u529F: ${audioUrl}`);
      return audioUrl;
    }
  } catch (error) {
    console.error("[TTS] \u6240\u6709 TTS \u670D\u52D9\u90FD\u5931\u6557:", error);
    throw error;
  }
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function generateSceneDescription(story, existingScenes = [], language = "cantonese", visualStyle) {
  const apiKey = getNextApiKey();
  const langConfig = LANGUAGE_PROMPTS[language];
  const existingScenesText = existingScenes.length > 0 ? `

\u5DF2\u6709\u5834\u666F\uFF08\u8ACB\u907F\u514D\u91CD\u8907\uFF09\uFF1A
${existingScenes.map((s, i) => `${i + 1}. ${s}`).join("\n")}` : "";
  const systemPrompt = `\u4F60\u662F\u4E00\u500B\u5C08\u696D\u7684\u8996\u983B\u5834\u666F\u8A2D\u8A08\u5E2B\u3002\u8ACB\u6839\u64DA\u7528\u6236\u63D0\u4F9B\u7684\u6545\u4E8B\uFF0C\u751F\u6210\u4E00\u500B\u65B0\u7684\u5834\u666F\u63CF\u8FF0\u3002

\u8981\u6C42\uFF1A
1. \u5834\u666F\u63CF\u8FF0\u8981\u5177\u9AD4\u3001\u751F\u52D5\uFF0C\u9069\u5408\u7528\u65BC\u8996\u983B\u751F\u6210
2. \u5305\u542B\u8996\u89BA\u5143\u7D20\uFF08\u4EBA\u7269\u52D5\u4F5C\u3001\u74B0\u5883\u3001\u5149\u7DDA\u3001\u6C1B\u570D\u7B49\uFF09
3. \u8207\u6545\u4E8B\u4E3B\u984C\u76F8\u95DC\uFF0C\u4F46\u8981\u6709\u5275\u610F
4. \u4F7F\u7528${langConfig.outputLanguage}\u63CF\u8FF0
5. \u9577\u5EA6\u63A7\u5236\u5728 50-100 \u5B57
${visualStyle ? `6. \u8996\u89BA\u98A8\u683C\uFF1A${visualStyle}` : ""}

\u8ACB\u76F4\u63A5\u8FD4\u56DE\u5834\u666F\u63CF\u8FF0\u6587\u5B57\uFF0C\u4E0D\u8981\u5305\u542B\u4EFB\u4F55\u5176\u4ED6\u5167\u5BB9\u3002`;
  const userPrompt = `\u6545\u4E8B\u4E3B\u984C\uFF1A${story}${existingScenesText}

\u8ACB\u751F\u6210\u4E00\u500B\u65B0\u7684\u3001\u7368\u7279\u7684\u5834\u666F\u63CF\u8FF0\u3002`;
  try {
    console.log(`[AI Scene] \u958B\u59CB\u751F\u6210\u5834\u666F\u63CF\u8FF0`);
    const response = await fetch(`${API_ENDPOINTS.vectorEngine}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-5.2",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        max_tokens: 200,
        temperature: 0.8
      })
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`LLM API \u8ABF\u7528\u5931\u6557: ${response.status} - ${errorText}`);
    }
    const data = await response.json();
    let content = data.choices[0]?.message?.content;
    if (!content) {
      throw new Error("LLM \u8FD4\u56DE\u5167\u5BB9\u70BA\u7A7A");
    }
    content = content.trim();
    if (content.startsWith('"') && content.endsWith('"') || content.startsWith("'") && content.endsWith("'")) {
      content = content.slice(1, -1);
    }
    console.log(`[AI Scene] \u5834\u666F\u751F\u6210\u6210\u529F: ${content.substring(0, 50)}...`);
    return content;
  } catch (error) {
    console.error("[AI Scene] \u5834\u666F\u751F\u6210\u5931\u6557:", error);
    throw error;
  }
}
var LANGUAGE_PROMPTS;
var init_videoService = __esm({
  "server/videoService.ts"() {
    "use strict";
    init_videoConfig();
    init_videoConfig();
    init_kreadoTTS();
    LANGUAGE_PROMPTS = {
      cantonese: {
        narrationStyle: "\u4F7F\u7528\u5730\u9053\u7CB5\u8A9E\u8A5E\u5F59\u5982\u300C\u4FC2\u300D\u300C\u5514\u300D\u300C\u5605\u300D\u300C\u54A1\u300D\u300C\u5572\u300D\u300C\u5636\u300D\u7B49\uFF0C\u8A9E\u6C23\u81EA\u7136\u53E3\u8A9E\u5316",
        outputLanguage: "\u7CB5\u8A9E\uFF08\u5EE3\u6771\u8A71\uFF09"
      },
      mandarin: {
        narrationStyle: "\u4F7F\u7528\u6A19\u6E96\u66F8\u9762\u8A9E\uFF0C\u6B63\u5F0F\u6D41\u66A2\u7684\u8868\u9054\u65B9\u5F0F",
        outputLanguage: "\u666E\u901A\u8A71\uFF08\u6A19\u6E96\u4E2D\u6587\uFF09"
      },
      english: {
        narrationStyle: "Natural American English with conversational tone, engaging and clear",
        outputLanguage: "English"
      }
    };
  }
});

// server/_core/llm.ts
var llm_exports = {};
__export(llm_exports, {
  invokeLLM: () => invokeLLM
});
async function invokeLLM(params) {
  assertApiKey();
  const {
    messages,
    tools,
    toolChoice,
    tool_choice,
    outputSchema,
    output_schema,
    responseFormat,
    response_format
  } = params;
  const payload = {
    model: "gemini-2.5-flash",
    messages: messages.map(normalizeMessage)
  };
  if (tools && tools.length > 0) {
    payload.tools = tools;
  }
  const normalizedToolChoice = normalizeToolChoice(
    toolChoice || tool_choice,
    tools
  );
  if (normalizedToolChoice) {
    payload.tool_choice = normalizedToolChoice;
  }
  payload.max_tokens = 32768;
  payload.thinking = {
    "budget_tokens": 128
  };
  const normalizedResponseFormat = normalizeResponseFormat({
    responseFormat,
    response_format,
    outputSchema,
    output_schema
  });
  if (normalizedResponseFormat) {
    payload.response_format = normalizedResponseFormat;
  }
  const response = await fetch(resolveApiUrl(), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${ENV.forgeApiKey}`
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `LLM invoke failed: ${response.status} ${response.statusText} \u2013 ${errorText}`
    );
  }
  return await response.json();
}
var ensureArray, normalizeContentPart, normalizeMessage, normalizeToolChoice, resolveApiUrl, assertApiKey, normalizeResponseFormat;
var init_llm = __esm({
  "server/_core/llm.ts"() {
    "use strict";
    init_env();
    ensureArray = (value) => Array.isArray(value) ? value : [value];
    normalizeContentPart = (part) => {
      if (typeof part === "string") {
        return { type: "text", text: part };
      }
      if (part.type === "text") {
        return part;
      }
      if (part.type === "image_url") {
        return part;
      }
      if (part.type === "file_url") {
        return part;
      }
      throw new Error("Unsupported message content part");
    };
    normalizeMessage = (message) => {
      const { role, name, tool_call_id } = message;
      if (role === "tool" || role === "function") {
        const content = ensureArray(message.content).map((part) => typeof part === "string" ? part : JSON.stringify(part)).join("\n");
        return {
          role,
          name,
          tool_call_id,
          content
        };
      }
      const contentParts = ensureArray(message.content).map(normalizeContentPart);
      if (contentParts.length === 1 && contentParts[0].type === "text") {
        return {
          role,
          name,
          content: contentParts[0].text
        };
      }
      return {
        role,
        name,
        content: contentParts
      };
    };
    normalizeToolChoice = (toolChoice, tools) => {
      if (!toolChoice) return void 0;
      if (toolChoice === "none" || toolChoice === "auto") {
        return toolChoice;
      }
      if (toolChoice === "required") {
        if (!tools || tools.length === 0) {
          throw new Error(
            "tool_choice 'required' was provided but no tools were configured"
          );
        }
        if (tools.length > 1) {
          throw new Error(
            "tool_choice 'required' needs a single tool or specify the tool name explicitly"
          );
        }
        return {
          type: "function",
          function: { name: tools[0].function.name }
        };
      }
      if ("name" in toolChoice) {
        return {
          type: "function",
          function: { name: toolChoice.name }
        };
      }
      return toolChoice;
    };
    resolveApiUrl = () => ENV.forgeApiUrl && ENV.forgeApiUrl.trim().length > 0 ? `${ENV.forgeApiUrl.replace(/\/$/, "")}/v1/chat/completions` : "https://forge.manus.im/v1/chat/completions";
    assertApiKey = () => {
      if (!ENV.forgeApiKey) {
        throw new Error("OPENAI_API_KEY is not configured");
      }
    };
    normalizeResponseFormat = ({
      responseFormat,
      response_format,
      outputSchema,
      output_schema
    }) => {
      const explicitFormat = responseFormat || response_format;
      if (explicitFormat) {
        if (explicitFormat.type === "json_schema" && !explicitFormat.json_schema?.schema) {
          throw new Error(
            "responseFormat json_schema requires a defined schema object"
          );
        }
        return explicitFormat;
      }
      const schema = outputSchema || output_schema;
      if (!schema) return void 0;
      if (!schema.name || !schema.schema) {
        throw new Error("outputSchema requires both name and schema");
      }
      return {
        type: "json_schema",
        json_schema: {
          name: schema.name,
          schema: schema.schema,
          ...typeof schema.strict === "boolean" ? { strict: schema.strict } : {}
        }
      };
    };
  }
});

// server/seoService.ts
var seoService_exports = {};
__export(seoService_exports, {
  SEO_LLM_MODELS: () => SEO_LLM_MODELS,
  generateSeo: () => generateSeo,
  generateSeoWithFallback: () => generateSeoWithFallback,
  generateTitles: () => generateTitles,
  generateTitlesWithFallback: () => generateTitlesWithFallback
});
function getPromptLanguage(language) {
  switch (language) {
    case "zh-TW":
    case "cantonese":
      return "\u7E41\u9AD4\u4E2D\u6587\uFF08\u9999\u6E2F/\u53F0\u7063\u98A8\u683C\uFF09";
    case "zh-CN":
    case "mandarin":
      return "\u7C21\u9AD4\u4E2D\u6587";
    case "en":
    case "english":
      return "English";
    case "ja":
      return "\u65E5\u672C\u8A9E";
    case "ko":
      return "\uD55C\uAD6D\uC5B4";
    default:
      return "\u7E41\u9AD4\u4E2D\u6587";
  }
}
function getPlatformOptimization(platform) {
  switch (platform) {
    case "youtube":
      return "\u6A19\u984C\u8981\u5305\u542B\u641C\u7D22\u95DC\u9375\u8A5E\uFF0C\u4F7F\u7528\u6578\u5B57\u548C\u62EC\u865F\u589E\u52A0\u9EDE\u64CA\u7387\uFF0C\u63CF\u8FF0\u524D150\u5B57\u6700\u91CD\u8981";
    case "tiktok":
      return "\u6A19\u984C\u8981\u7C21\u77ED\u6709\u529B\u88FD\u9020\u61F8\u5FF5\uFF0C\u4F7F\u7528\u6D41\u884C\u8A71\u984C\u6A19\u7C64\uFF0C\u63CF\u8FF0\u8981\u6709\u4E92\u52D5\u6027";
    case "instagram":
      return "\u6A19\u984C\u8981\u5F15\u767C\u60C5\u611F\u5171\u9CF4\uFF0C\u4F7F\u7528\u5927\u91CF\u76F8\u95DC\u8A71\u984C\u6A19\u7C64\uFF0C\u63CF\u8FF0\u8981\u6709\u6545\u4E8B\u6027";
    case "facebook":
      return "\u6A19\u984C\u8981\u5F15\u767C\u8A0E\u8AD6\u548C\u5206\u4EAB\uFF0C\u63CF\u8FF0\u8981\u6709\u50F9\u503C\u548C\u898B\u89E3\uFF0C\u4F7F\u7528\u554F\u53E5\u5F15\u767C\u4E92\u52D5";
    default:
      return "\u6A19\u984C\u6E05\u6670\u63CF\u8FF0\u5167\u5BB9\uFF0C\u63CF\u8FF0\u5B8C\u6574\u6709\u689D\u7406\uFF0C\u95DC\u9375\u8A5E\u76F8\u95DC\u6027\u5F37";
  }
}
async function callLlmApi(params) {
  const { model, systemPrompt, userPrompt, temperature = 0.8, maxTokens = 2e3 } = params;
  const apiKey = getNextApiKey();
  console.log(`[SEO] \u4F7F\u7528\u6A21\u578B: ${model}`);
  const response = await fetch("https://api.vectorengine.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature,
      max_tokens: maxTokens
    })
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[SEO] API \u932F\u8AA4: ${response.status} - ${errorText}`);
    throw new Error(`SEO API \u8ABF\u7528\u5931\u6557: ${response.status}`);
  }
  const data = await response.json();
  const content = data.choices[0]?.message?.content;
  if (!content) {
    throw new Error("SEO \u751F\u6210\u8FD4\u56DE\u5167\u5BB9\u70BA\u7A7A");
  }
  console.log(`[SEO] \u6A21\u578B ${model} \u6210\u529F\u8FD4\u56DE\u7D50\u679C`);
  return content;
}
function parseJsonContent(content) {
  let jsonContent = content.trim();
  if (jsonContent.startsWith("```json")) jsonContent = jsonContent.slice(7);
  else if (jsonContent.startsWith("```")) jsonContent = jsonContent.slice(3);
  if (jsonContent.endsWith("```")) jsonContent = jsonContent.slice(0, -3);
  jsonContent = jsonContent.trim();
  return JSON.parse(jsonContent);
}
async function generateSeo(params) {
  const {
    story,
    language,
    platform,
    model = "gpt-5.2",
    // 默認使用 GPT 5.2
    targetAudience,
    videoStyle,
    duration
  } = params;
  const config = PLATFORM_CONFIG[platform];
  const promptLanguage = getPromptLanguage(language);
  const platformOptimization = getPlatformOptimization(platform);
  const systemPrompt = `\u4F60\u662F\u5C08\u696D\u7684\u793E\u4EA4\u5A92\u9AD4 SEO \u5C08\u5BB6\uFF0C\u7CBE\u901A ${platform.toUpperCase()} \u5E73\u53F0\u512A\u5316\u3002
\u512A\u5316\u5EFA\u8B70\uFF1A${platformOptimization}
\u8F38\u51FA\u8A9E\u8A00\uFF1A${promptLanguage}
\u4F60\u5FC5\u9808\u56B4\u683C\u6309\u7167 JSON \u683C\u5F0F\u8F38\u51FA\uFF0C\u4E0D\u8981\u6DFB\u52A0\u4EFB\u4F55\u984D\u5916\u8AAA\u660E\u3002`;
  const userPrompt = `\u70BA\u4EE5\u4E0B\u8996\u983B\u751F\u6210 SEO \u5167\u5BB9\uFF1A

\u3010\u6545\u4E8B\u3011${story}
${targetAudience ? `\u3010\u76EE\u6A19\u53D7\u773E\u3011${targetAudience}` : ""}
${videoStyle ? `\u3010\u8996\u89BA\u98A8\u683C\u3011${videoStyle}` : ""}
${duration ? `\u3010\u6642\u9577\u3011${duration}\u79D2` : ""}

\u8ACB\u751F\u6210\uFF08\u4F7F\u7528${promptLanguage}\uFF09\uFF1A
1. 5\u500B\u512A\u5316\u6A19\u984C\uFF08\u6BCF\u500B\u2264${config.titleMaxLength}\u5B57\uFF09
   - \u7B2C1\u500B\uFF1A\u76F4\u63A5\u63CF\u8FF0\u578B
   - \u7B2C2\u500B\uFF1A\u6578\u5B57/\u5217\u8868\u578B
   - \u7B2C3\u500B\uFF1A\u554F\u53E5\u578B
   - \u7B2C4\u500B\uFF1A\u60C5\u611F/\u6545\u4E8B\u578B
   - \u7B2C5\u500B\uFF1A\u61F8\u5FF5/\u597D\u5947\u578B
2. \u8996\u983B\u63CF\u8FF0\uFF08\u2264${config.descriptionMaxLength}\u5B57\uFF0C\u5305\u542B\u95DC\u9375\u8A5E\u548CCTA\uFF09
3. ${config.maxTags}\u500B\u95DC\u9375\u8A5E\uFF08\u9AD8\u641C\u7D22\u91CF\u3001\u76F8\u95DC\u6027\u5F37\uFF09
4. ${config.maxTags}\u500B\u6A19\u7C64
5. ${config.maxHashtags}\u500B\u8A71\u984C\u6A19\u7C64\uFF08\u5E36#\u865F\uFF09
6. 3\u500B\u7E2E\u7565\u5716\u5EFA\u8B70

\u56B4\u683C\u6309\u7167\u4EE5\u4E0B JSON \u683C\u5F0F\u8F38\u51FA\uFF1A
{"titles":["\u6A19\u984C1","\u6A19\u984C2","\u6A19\u984C3","\u6A19\u984C4","\u6A19\u984C5"],"description":"\u8996\u983B\u63CF\u8FF0...","keywords":["\u95DC\u9375\u8A5E1","\u95DC\u9375\u8A5E2"],"tags":["\u6A19\u7C641","\u6A19\u7C642"],"hashtags":["#\u8A71\u984C1","#\u8A71\u984C2"],"thumbnailSuggestions":["\u5EFA\u8B701","\u5EFA\u8B702","\u5EFA\u8B703"]}`;
  const content = await callLlmApi({
    model,
    systemPrompt,
    userPrompt,
    temperature: 0.8,
    maxTokens: 2e3
  });
  const result = parseJsonContent(content);
  result.hashtags = result.hashtags.map((tag) => tag.startsWith("#") ? tag : `#${tag}`);
  return result;
}
async function generateTitles(params) {
  const { story, language, platform, model = "gpt-5.2", count = 5 } = params;
  const config = PLATFORM_CONFIG[platform];
  const promptLanguage = getPromptLanguage(language);
  const systemPrompt = `\u4F60\u662F${platform.toUpperCase()}\u6A19\u984C\u512A\u5316\u5C08\u5BB6\u3002\u8F38\u51FA\u8A9E\u8A00\uFF1A${promptLanguage}\u3002\u4F60\u5FC5\u9808\u56B4\u683C\u6309\u7167 JSON \u6578\u7D44\u683C\u5F0F\u8F38\u51FA\u3002`;
  const userPrompt = `\u70BA\u4EE5\u4E0B\u8996\u983B\u751F\u6210${count}\u500B\u512A\u5316\u6A19\u984C\uFF08\u6BCF\u500B\u2264${config.titleMaxLength}\u5B57\uFF09\uFF1A

${story}

\u6A19\u984C\u985E\u578B\uFF1A
1. \u76F4\u63A5\u63CF\u8FF0\u578B
2. \u6578\u5B57/\u5217\u8868\u578B
3. \u554F\u53E5\u578B
4. \u60C5\u611F/\u6545\u4E8B\u578B
5. \u61F8\u5FF5/\u597D\u5947\u578B

\u56B4\u683C\u6309\u7167 JSON \u6578\u7D44\u683C\u5F0F\u8F38\u51FA\uFF1A["\u6A19\u984C1","\u6A19\u984C2","\u6A19\u984C3","\u6A19\u984C4","\u6A19\u984C5"]`;
  const content = await callLlmApi({
    model,
    systemPrompt,
    userPrompt,
    temperature: 0.9,
    maxTokens: 500
  });
  return parseJsonContent(content);
}
async function generateSeoWithFallback(params) {
  const models = [
    params.model || "gpt-5.2",
    "claude-opus-4-5-20251101",
    "gemini-3-pro-preview"
  ];
  const uniqueModels = Array.from(new Set(models));
  for (const model of uniqueModels) {
    try {
      console.log(`[SEO] \u5617\u8A66\u4F7F\u7528\u6A21\u578B: ${model}`);
      return await generateSeo({ ...params, model });
    } catch (error) {
      console.error(`[SEO] \u6A21\u578B ${model} \u5931\u6557:`, error);
      if (model === uniqueModels[uniqueModels.length - 1]) {
        throw error;
      }
      console.log(`[SEO] \u5207\u63DB\u5230\u4E0B\u4E00\u500B\u5099\u7528\u6A21\u578B...`);
    }
  }
  throw new Error("\u6240\u6709 SEO \u6A21\u578B\u90FD\u5931\u6557\u4E86");
}
async function generateTitlesWithFallback(params) {
  const models = [
    params.model || "gpt-5.2",
    "claude-opus-4-5-20251101",
    "gemini-3-pro-preview"
  ];
  const uniqueModels = Array.from(new Set(models));
  for (const model of uniqueModels) {
    try {
      console.log(`[SEO Titles] \u5617\u8A66\u4F7F\u7528\u6A21\u578B: ${model}`);
      return await generateTitles({ ...params, model });
    } catch (error) {
      console.error(`[SEO Titles] \u6A21\u578B ${model} \u5931\u6557:`, error);
      if (model === uniqueModels[uniqueModels.length - 1]) {
        throw error;
      }
      console.log(`[SEO Titles] \u5207\u63DB\u5230\u4E0B\u4E00\u500B\u5099\u7528\u6A21\u578B...`);
    }
  }
  throw new Error("\u6240\u6709\u6A19\u984C\u751F\u6210\u6A21\u578B\u90FD\u5931\u6557\u4E86");
}
var SEO_LLM_MODELS, PLATFORM_CONFIG;
var init_seoService = __esm({
  "server/seoService.ts"() {
    "use strict";
    init_videoConfig();
    SEO_LLM_MODELS = {
      "gpt-5.2": {
        name: "GPT 5.2",
        provider: "OpenAI",
        description: "\u5FEB\u901F\u4E14\u9AD8\u8CEA\u91CF\uFF0C\u9069\u5408\u5927\u591A\u6578\u5834\u666F",
        speed: "\u5FEB\u901F"
      },
      "claude-opus-4-5-20251101": {
        name: "Claude Opus 4.5",
        provider: "Anthropic",
        description: "\u6DF1\u5EA6\u7406\u89E3\u548C\u5275\u610F\u5BEB\u4F5C\uFF0C\u9069\u5408\u9AD8\u8CEA\u91CF\u5167\u5BB9",
        speed: "\u4E2D\u7B49"
      },
      "gemini-3-pro-preview": {
        name: "Gemini 3 Pro",
        provider: "Google",
        description: "\u591A\u8A9E\u8A00\u512A\u5316\uFF0C\u9069\u5408\u570B\u969B\u5316\u5167\u5BB9",
        speed: "\u4E2D\u7B49"
      }
    };
    PLATFORM_CONFIG = {
      youtube: { titleMaxLength: 100, descriptionMaxLength: 5e3, maxTags: 15, maxHashtags: 5 },
      tiktok: { titleMaxLength: 150, descriptionMaxLength: 2200, maxTags: 10, maxHashtags: 8 },
      instagram: { titleMaxLength: 125, descriptionMaxLength: 2200, maxTags: 30, maxHashtags: 30 },
      facebook: { titleMaxLength: 255, descriptionMaxLength: 63206, maxTags: 10, maxHashtags: 5 },
      general: { titleMaxLength: 100, descriptionMaxLength: 1e3, maxTags: 10, maxHashtags: 5 }
    };
  }
});

// server/_core/index.ts
import "dotenv/config";
import express2 from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

// shared/const.ts
var COOKIE_NAME = "app_session_id";
var ONE_YEAR_MS = 1e3 * 60 * 60 * 24 * 365;
var AXIOS_TIMEOUT_MS = 3e4;
var UNAUTHED_ERR_MSG = "Please login (10001)";
var NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";

// server/db.ts
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";

// drizzle/schema.ts
import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json } from "drizzle-orm/mysql-core";
var users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull()
});
var videoTasks = mysqlTable("video_tasks", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  // 速度模式
  mode: mysqlEnum("mode", ["fast", "quality"]).notNull(),
  // 故事模式（固定人物/劇情）
  storyMode: mysqlEnum("storyMode", ["character", "scene"]).default("character").notNull(),
  // 視頻模型
  videoModel: varchar("videoModel", { length: 64 }).notNull(),
  llmModel: varchar("llmModel", { length: 64 }).notNull(),
  // 用戶輸入
  story: text("story").notNull(),
  characterDescription: text("characterDescription"),
  visualStyle: text("visualStyle"),
  // 語言設置
  language: mysqlEnum("language", ["cantonese", "mandarin", "english"]).default("cantonese").notNull(),
  // 生成狀態
  status: mysqlEnum("status", ["pending", "analyzing", "generating_images", "generating_videos", "generating_audio", "merging", "completed", "failed"]).default("pending").notNull(),
  progress: int("progress").default(0).notNull(),
  currentStep: varchar("currentStep", { length: 128 }),
  // 生成結果
  scenes: json("scenes").$type(),
  characterImageUrl: text("characterImageUrl"),
  finalVideoUrl: text("finalVideoUrl"),
  thumbnailUrl: text("thumbnailUrl"),
  // 統計信息
  totalScenes: int("totalScenes").default(0),
  completedScenes: int("completedScenes").default(0),
  duration: int("duration"),
  // 視頻時長（秒）
  // 錯誤信息
  errorMessage: text("errorMessage"),
  // 時間戳
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  completedAt: timestamp("completedAt")
});
var apiKeyUsage = mysqlTable("api_key_usage", {
  id: int("id").autoincrement().primaryKey(),
  keyIndex: int("keyIndex").notNull(),
  usedAt: timestamp("usedAt").defaultNow().notNull(),
  endpoint: varchar("endpoint", { length: 128 }),
  success: int("success").default(1)
});
var characterVoices = mysqlTable("character_voices", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  // 角色信息
  characterName: varchar("characterName", { length: 128 }).notNull(),
  characterDescription: text("characterDescription"),
  characterImageUrl: text("characterImageUrl"),
  // 角色圖片（可選）
  // 綁定的配音員
  voiceActorId: varchar("voiceActorId", { length: 64 }).notNull(),
  // 是否由 AI 自動匹配
  isAutoMatched: int("isAutoMatched").default(0),
  // 時間戳
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});
var characters = mysqlTable("characters", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  // 角色基本信息
  name: varchar("name", { length: 128 }).notNull(),
  // 角色名稱，用於故事中識別
  description: text("description"),
  // 角色簡介
  // 照片信息
  originalPhotoUrl: text("originalPhotoUrl"),
  // 用戶上傳的原始照片
  baseImageUrl: text("baseImageUrl"),
  // Midjourney 生成的角色基礎圖
  // AI 分析結果
  aiAnalysis: json("aiAnalysis").$type(),
  // Claude 分析的角色特徵
  // 狀態
  status: mysqlEnum("status", ["pending", "analyzing", "generating", "ready", "failed"]).default("pending").notNull(),
  errorMessage: text("errorMessage"),
  // 配音綁定
  voiceActorId: varchar("voiceActorId", { length: 64 }),
  // 時間戳
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});

// server/db.ts
init_env();
var _db = null;
async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}
async function upsertUser(user) {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }
  try {
    const values = {
      openId: user.openId
    };
    const updateSet = {};
    const textFields = ["name", "email", "loginMethod"];
    const assignNullable = (field) => {
      const value = user[field];
      if (value === void 0) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== void 0) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== void 0) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }
    if (!values.lastSignedIn) {
      values.lastSignedIn = /* @__PURE__ */ new Date();
    }
    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = /* @__PURE__ */ new Date();
    }
    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}
async function getUserByOpenId(openId) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return void 0;
  }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}

// server/_core/cookies.ts
function isSecureRequest(req) {
  if (req.protocol === "https") return true;
  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;
  const protoList = Array.isArray(forwardedProto) ? forwardedProto : forwardedProto.split(",");
  return protoList.some((proto) => proto.trim().toLowerCase() === "https");
}
function getSessionCookieOptions(req) {
  return {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: isSecureRequest(req)
  };
}

// shared/_core/errors.ts
var HttpError = class extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
};
var ForbiddenError = (msg) => new HttpError(403, msg);

// server/_core/sdk.ts
import axios from "axios";
import { parse as parseCookieHeader } from "cookie";
import { SignJWT, jwtVerify } from "jose";
init_env();
var isNonEmptyString = (value) => typeof value === "string" && value.length > 0;
var EXCHANGE_TOKEN_PATH = `/webdev.v1.WebDevAuthPublicService/ExchangeToken`;
var GET_USER_INFO_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfo`;
var GET_USER_INFO_WITH_JWT_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfoWithJwt`;
var OAuthService = class {
  constructor(client) {
    this.client = client;
    console.log("[OAuth] Initialized with baseURL:", ENV.oAuthServerUrl);
    if (!ENV.oAuthServerUrl) {
      console.error(
        "[OAuth] ERROR: OAUTH_SERVER_URL is not configured! Set OAUTH_SERVER_URL environment variable."
      );
    }
  }
  decodeState(state) {
    const redirectUri = atob(state);
    return redirectUri;
  }
  async getTokenByCode(code, state) {
    const payload = {
      clientId: ENV.appId,
      grantType: "authorization_code",
      code,
      redirectUri: this.decodeState(state)
    };
    const { data } = await this.client.post(
      EXCHANGE_TOKEN_PATH,
      payload
    );
    return data;
  }
  async getUserInfoByToken(token) {
    const { data } = await this.client.post(
      GET_USER_INFO_PATH,
      {
        accessToken: token.accessToken
      }
    );
    return data;
  }
};
var createOAuthHttpClient = () => axios.create({
  baseURL: ENV.oAuthServerUrl,
  timeout: AXIOS_TIMEOUT_MS
});
var SDKServer = class {
  client;
  oauthService;
  constructor(client = createOAuthHttpClient()) {
    this.client = client;
    this.oauthService = new OAuthService(this.client);
  }
  deriveLoginMethod(platforms, fallback) {
    if (fallback && fallback.length > 0) return fallback;
    if (!Array.isArray(platforms) || platforms.length === 0) return null;
    const set = new Set(
      platforms.filter((p) => typeof p === "string")
    );
    if (set.has("REGISTERED_PLATFORM_EMAIL")) return "email";
    if (set.has("REGISTERED_PLATFORM_GOOGLE")) return "google";
    if (set.has("REGISTERED_PLATFORM_APPLE")) return "apple";
    if (set.has("REGISTERED_PLATFORM_MICROSOFT") || set.has("REGISTERED_PLATFORM_AZURE"))
      return "microsoft";
    if (set.has("REGISTERED_PLATFORM_GITHUB")) return "github";
    const first = Array.from(set)[0];
    return first ? first.toLowerCase() : null;
  }
  /**
   * Exchange OAuth authorization code for access token
   * @example
   * const tokenResponse = await sdk.exchangeCodeForToken(code, state);
   */
  async exchangeCodeForToken(code, state) {
    return this.oauthService.getTokenByCode(code, state);
  }
  /**
   * Get user information using access token
   * @example
   * const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
   */
  async getUserInfo(accessToken) {
    const data = await this.oauthService.getUserInfoByToken({
      accessToken
    });
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  parseCookies(cookieHeader) {
    if (!cookieHeader) {
      return /* @__PURE__ */ new Map();
    }
    const parsed = parseCookieHeader(cookieHeader);
    return new Map(Object.entries(parsed));
  }
  getSessionSecret() {
    const secret = ENV.cookieSecret;
    return new TextEncoder().encode(secret);
  }
  /**
   * Create a session token for a Manus user openId
   * @example
   * const sessionToken = await sdk.createSessionToken(userInfo.openId);
   */
  async createSessionToken(openId, options = {}) {
    return this.signSession(
      {
        openId,
        appId: ENV.appId,
        name: options.name || ""
      },
      options
    );
  }
  async signSession(payload, options = {}) {
    const issuedAt = Date.now();
    const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
    const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1e3);
    const secretKey = this.getSessionSecret();
    return new SignJWT({
      openId: payload.openId,
      appId: payload.appId,
      name: payload.name
    }).setProtectedHeader({ alg: "HS256", typ: "JWT" }).setExpirationTime(expirationSeconds).sign(secretKey);
  }
  async verifySession(cookieValue) {
    if (!cookieValue) {
      console.warn("[Auth] Missing session cookie");
      return null;
    }
    try {
      const secretKey = this.getSessionSecret();
      const { payload } = await jwtVerify(cookieValue, secretKey, {
        algorithms: ["HS256"]
      });
      const { openId, appId, name } = payload;
      if (!isNonEmptyString(openId) || !isNonEmptyString(appId) || !isNonEmptyString(name)) {
        console.warn("[Auth] Session payload missing required fields");
        return null;
      }
      return {
        openId,
        appId,
        name
      };
    } catch (error) {
      console.warn("[Auth] Session verification failed", String(error));
      return null;
    }
  }
  async getUserInfoWithJwt(jwtToken) {
    const payload = {
      jwtToken,
      projectId: ENV.appId
    };
    const { data } = await this.client.post(
      GET_USER_INFO_WITH_JWT_PATH,
      payload
    );
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  async authenticateRequest(req) {
    const cookies = this.parseCookies(req.headers.cookie);
    const sessionCookie = cookies.get(COOKIE_NAME);
    const session = await this.verifySession(sessionCookie);
    if (!session) {
      throw ForbiddenError("Invalid session cookie");
    }
    const sessionUserId = session.openId;
    const signedInAt = /* @__PURE__ */ new Date();
    let user = await getUserByOpenId(sessionUserId);
    if (!user) {
      try {
        const userInfo = await this.getUserInfoWithJwt(sessionCookie ?? "");
        await upsertUser({
          openId: userInfo.openId,
          name: userInfo.name || null,
          email: userInfo.email ?? null,
          loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
          lastSignedIn: signedInAt
        });
        user = await getUserByOpenId(userInfo.openId);
      } catch (error) {
        console.error("[Auth] Failed to sync user from OAuth:", error);
        throw ForbiddenError("Failed to sync user info");
      }
    }
    if (!user) {
      throw ForbiddenError("User not found");
    }
    await upsertUser({
      openId: user.openId,
      lastSignedIn: signedInAt
    });
    return user;
  }
};
var sdk = new SDKServer();

// server/_core/oauth.ts
function getQueryParam(req, key) {
  const value = req.query[key];
  return typeof value === "string" ? value : void 0;
}
function registerOAuthRoutes(app) {
  app.get("/api/oauth/callback", async (req, res) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");
    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }
    try {
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
      if (!userInfo.openId) {
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }
      await upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: /* @__PURE__ */ new Date()
      });
      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS
      });
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}

// server/_core/systemRouter.ts
import { z } from "zod";

// server/_core/notification.ts
init_env();
import { TRPCError } from "@trpc/server";
var TITLE_MAX_LENGTH = 1200;
var CONTENT_MAX_LENGTH = 2e4;
var trimValue = (value) => value.trim();
var isNonEmptyString2 = (value) => typeof value === "string" && value.trim().length > 0;
var buildEndpointUrl = (baseUrl) => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(
    "webdevtoken.v1.WebDevService/SendNotification",
    normalizedBase
  ).toString();
};
var validatePayload = (input) => {
  if (!isNonEmptyString2(input.title)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required."
    });
  }
  if (!isNonEmptyString2(input.content)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required."
    });
  }
  const title = trimValue(input.title);
  const content = trimValue(input.content);
  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`
    });
  }
  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`
    });
  }
  return { title, content };
};
async function notifyOwner(payload) {
  const { title, content } = validatePayload(payload);
  if (!ENV.forgeApiUrl) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service URL is not configured."
    });
  }
  if (!ENV.forgeApiKey) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service API key is not configured."
    });
  }
  const endpoint = buildEndpointUrl(ENV.forgeApiUrl);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1"
      },
      body: JSON.stringify({ title, content })
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Notification] Failed to notify owner (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Notification] Error calling notification service:", error);
    return false;
  }
}

// server/_core/trpc.ts
import { initTRPC, TRPCError as TRPCError2 } from "@trpc/server";
import superjson from "superjson";
var t = initTRPC.context().create({
  transformer: superjson
});
var router = t.router;
var publicProcedure = t.procedure;
var requireUser = t.middleware(async (opts) => {
  const { ctx, next } = opts;
  if (!ctx.user) {
    throw new TRPCError2({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
var protectedProcedure = t.procedure.use(requireUser);
var adminProcedure = t.procedure.use(
  t.middleware(async (opts) => {
    const { ctx, next } = opts;
    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError2({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user
      }
    });
  })
);

// server/_core/systemRouter.ts
var systemRouter = router({
  health: publicProcedure.input(
    z.object({
      timestamp: z.number().min(0, "timestamp cannot be negative")
    })
  ).query(() => ({
    ok: true
  })),
  notifyOwner: adminProcedure.input(
    z.object({
      title: z.string().min(1, "title is required"),
      content: z.string().min(1, "content is required")
    })
  ).mutation(async ({ input }) => {
    const delivered = await notifyOwner(input);
    return {
      success: delivered
    };
  })
});

// server/routers.ts
import { z as z2 } from "zod";
import { eq as eq2, desc } from "drizzle-orm";
init_videoConfig();
init_videoService();

// server/videoMergeService.ts
init_videoConfig();
var VIDEO_API_BASE = API_ENDPOINTS.vectorEngine;
var BGM_OPTIONS = {
  none: { name: "\u7121\u80CC\u666F\u97F3\u6A02", url: null },
  cinematic: { name: "\u96FB\u5F71\u611F", url: "https://cdn.pixabay.com/audio/2024/11/04/audio_4956b4edd1.mp3" },
  emotional: { name: "\u611F\u4EBA", url: "https://cdn.pixabay.com/audio/2024/02/14/audio_8f506e3e0f.mp3" },
  upbeat: { name: "\u6B61\u5FEB", url: "https://cdn.pixabay.com/audio/2024/09/12/audio_6e1d0b3a3a.mp3" },
  dramatic: { name: "\u6232\u5287\u6027", url: "https://cdn.pixabay.com/audio/2024/04/24/audio_36e7a0e4e4.mp3" },
  peaceful: { name: "\u5E73\u975C", url: "https://cdn.pixabay.com/audio/2024/08/27/audio_4a1b2c3d4e.mp3" }
};
var SUBTITLE_STYLES = {
  none: { name: "\u7121\u5B57\u5E55", enabled: false },
  bottom: { name: "\u5E95\u90E8\u5B57\u5E55", position: "bottom", fontSize: 24, color: "white", bgColor: "black@0.5" },
  top: { name: "\u9802\u90E8\u5B57\u5E55", position: "top", fontSize: 24, color: "white", bgColor: "black@0.5" },
  cinematic: { name: "\u96FB\u5F71\u5B57\u5E55", position: "bottom", fontSize: 28, color: "white", bgColor: "transparent" }
};
async function mergeVideos(options) {
  const {
    videoUrls,
    narrations = [],
    bgmType = "none",
    subtitleStyle = "none",
    outputFormat = "mp4",
    resolution = "1080p"
  } = options;
  if (videoUrls.length === 0) {
    return { success: false, error: "\u6C92\u6709\u53EF\u5408\u4F75\u7684\u8996\u983B" };
  }
  if (videoUrls.length === 1 && bgmType === "none" && subtitleStyle === "none") {
    return { success: true, videoUrl: videoUrls[0] };
  }
  try {
    const apiKey = getNextApiKey();
    const mergeRequest = {
      videos: videoUrls.map((url, index) => ({
        url,
        narration: narrations[index] || null
      })),
      bgm: BGM_OPTIONS[bgmType].url,
      subtitle: SUBTITLE_STYLES[subtitleStyle],
      output: {
        format: outputFormat,
        resolution
      }
    };
    const response = await fetch(`${VIDEO_API_BASE}/video/merge`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(mergeRequest)
    });
    if (!response.ok) {
      console.log("\u8996\u983B\u5408\u4F75 API \u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528\u5099\u7528\u65B9\u6848");
      return await fallbackMerge(videoUrls, narrations, bgmType);
    }
    const result = await response.json();
    if (result.url) {
      return {
        success: true,
        videoUrl: result.url,
        duration: result.duration
      };
    }
    return { success: false, error: result.error || "\u5408\u4F75\u5931\u6557" };
  } catch (error) {
    console.error("\u8996\u983B\u5408\u4F75\u932F\u8AA4:", error);
    return await fallbackMerge(videoUrls, narrations, bgmType);
  }
}
async function fallbackMerge(videoUrls, narrations, bgmType) {
  try {
    const apiKey = getNextApiKey();
    const response = await fetch(`${VIDEO_API_BASE}/video/concat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        videos: videoUrls,
        transition: "fade",
        transitionDuration: 0.5
      })
    });
    if (response.ok) {
      const result = await response.json();
      if (result.url) {
        return { success: true, videoUrl: result.url };
      }
    }
    console.log("\u8996\u983B\u62FC\u63A5 API \u4E0D\u53EF\u7528\uFF0C\u8FD4\u56DE\u7B2C\u4E00\u500B\u8996\u983B");
    return {
      success: true,
      videoUrl: videoUrls[0]
    };
  } catch (error) {
    console.error("\u5099\u7528\u5408\u4F75\u5931\u6557:", error);
    return {
      success: true,
      videoUrl: videoUrls[0]
    };
  }
}

// server/batchService.ts
init_videoConfig();
var batchJobs = /* @__PURE__ */ new Map();
function createBatchJob(stories, speedMode, storyMode) {
  const jobId = `batch_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const tasks = stories.map((s, index) => ({
    id: `${jobId}_task_${index}`,
    story: s.story,
    characterDescription: s.characterDescription,
    visualStyle: s.visualStyle,
    speedMode,
    storyMode,
    status: "pending",
    progress: 0
  }));
  const job = {
    id: jobId,
    tasks,
    status: "pending",
    progress: 0,
    createdAt: /* @__PURE__ */ new Date(),
    totalTasks: tasks.length,
    completedTasks: 0,
    failedTasks: 0
  };
  batchJobs.set(jobId, job);
  return job;
}
function getBatchJob(jobId) {
  return batchJobs.get(jobId);
}
function updateBatchTask(jobId, taskId, updates) {
  const job = batchJobs.get(jobId);
  if (job) {
    const task = job.tasks.find((t2) => t2.id === taskId);
    if (task) {
      Object.assign(task, updates);
      const completedTasks = job.tasks.filter((t2) => t2.status === "completed").length;
      const failedTasks = job.tasks.filter((t2) => t2.status === "failed").length;
      const totalProgress = job.tasks.reduce((sum, t2) => sum + t2.progress, 0);
      job.completedTasks = completedTasks;
      job.failedTasks = failedTasks;
      job.progress = Math.round(totalProgress / job.tasks.length);
      if (completedTasks + failedTasks === job.totalTasks) {
        job.status = failedTasks === job.totalTasks ? "failed" : "completed";
        job.completedAt = /* @__PURE__ */ new Date();
      }
      batchJobs.set(jobId, job);
    }
  }
}
function calculateMaxConcurrency(taskCount) {
  return Math.min(API_KEYS.length, taskCount, 5);
}
function getAllBatchJobs() {
  return Array.from(batchJobs.values()).sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
}
function deleteBatchJob(jobId) {
  return batchJobs.delete(jobId);
}
function estimateBatchTime(taskCount, speedMode) {
  const concurrency = calculateMaxConcurrency(taskCount);
  const batches = Math.ceil(taskCount / concurrency);
  const timePerTask = speedMode === "fast" ? 4 : 12;
  return {
    minMinutes: batches * timePerTask * 0.8,
    maxMinutes: batches * timePerTask * 1.5
  };
}

// server/segmentBatchService.ts
init_videoConfig();
var BATCH_SIZE = 6;
var SEGMENT_DURATION = 8;
var API_KEY_GROUPS = (() => {
  const groups = [];
  const keysPerGroup = Math.ceil(API_KEYS.length / 3);
  for (let i = 0; i < API_KEYS.length; i += keysPerGroup) {
    groups.push(API_KEYS.slice(i, i + keysPerGroup));
  }
  return groups;
})();
var groupKeyIndices = API_KEY_GROUPS.map(() => 0);
function getApiKeyFromGroup(groupIndex) {
  const group = API_KEY_GROUPS[groupIndex % API_KEY_GROUPS.length];
  const keyIndex = groupKeyIndices[groupIndex % API_KEY_GROUPS.length];
  const key = group[keyIndex % group.length];
  groupKeyIndices[groupIndex % API_KEY_GROUPS.length] = (keyIndex + 1) % group.length;
  return key;
}
var longVideoTasks = /* @__PURE__ */ new Map();
function calculateSegmentCount(durationMinutes) {
  return Math.ceil(durationMinutes * 60 / SEGMENT_DURATION);
}
function calculateBatchCount(totalSegments) {
  return Math.ceil(totalSegments / BATCH_SIZE);
}
function createLongVideoTask(userId, durationMinutes, story, options = {}) {
  const taskId = `long_video_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const totalSegments = calculateSegmentCount(durationMinutes);
  const totalBatches = calculateBatchCount(totalSegments);
  const segments = [];
  for (let i = 0; i < totalSegments; i++) {
    const batchIndex = Math.floor(i / BATCH_SIZE);
    segments.push({
      id: i + 1,
      batchIndex,
      status: "pending",
      progress: 0,
      startTime: i * SEGMENT_DURATION,
      endTime: Math.min((i + 1) * SEGMENT_DURATION, durationMinutes * 60)
    });
  }
  const batches = [];
  for (let i = 0; i < totalBatches; i++) {
    const batchSegments = segments.filter((s) => s.batchIndex === i);
    batches.push({
      index: i,
      segments: batchSegments,
      status: "pending",
      apiKeyGroupIndex: i % API_KEY_GROUPS.length
      // 輪換使用 API Key 組
    });
  }
  const task = {
    id: taskId,
    userId,
    totalDurationMinutes: durationMinutes,
    totalSegments,
    totalBatches,
    segments,
    batches,
    status: "pending",
    progress: 0,
    currentBatchIndex: 0,
    story,
    characterDescription: options.characterDescription,
    visualStyle: options.visualStyle,
    language: options.language || "cantonese",
    voiceActorId: options.voiceActorId || "cantonese-male-narrator",
    speedMode: options.speedMode || "fast",
    storyMode: options.storyMode || "character",
    createdAt: /* @__PURE__ */ new Date(),
    updatedAt: /* @__PURE__ */ new Date()
  };
  longVideoTasks.set(taskId, task);
  return task;
}
function getLongVideoTask(taskId) {
  return longVideoTasks.get(taskId);
}
function updateLongVideoTask(taskId, updates) {
  const task = longVideoTasks.get(taskId);
  if (task) {
    Object.assign(task, updates, { updatedAt: /* @__PURE__ */ new Date() });
    longVideoTasks.set(taskId, task);
  }
}
function updateSegment(taskId, segmentId, updates) {
  const task = longVideoTasks.get(taskId);
  if (task) {
    const segment = task.segments.find((s) => s.id === segmentId);
    if (segment) {
      Object.assign(segment, updates);
      const completedSegments = task.segments.filter((s) => s.status === "completed").length;
      task.progress = Math.round(completedSegments / task.totalSegments * 100);
      const batch = task.batches[segment.batchIndex];
      if (batch) {
        const batchSegments = task.segments.filter((s) => s.batchIndex === segment.batchIndex);
        const batchCompleted = batchSegments.filter((s) => s.status === "completed").length;
        const batchFailed = batchSegments.filter((s) => s.status === "failed").length;
        if (batchCompleted + batchFailed === batchSegments.length) {
          batch.status = batchFailed === batchSegments.length ? "failed" : "completed";
          batch.completedAt = /* @__PURE__ */ new Date();
        }
      }
      task.updatedAt = /* @__PURE__ */ new Date();
      longVideoTasks.set(taskId, task);
    }
  }
}
function startNextBatch(taskId) {
  const task = longVideoTasks.get(taskId);
  if (!task) return null;
  const nextBatch = task.batches.find((b) => b.status === "pending");
  if (!nextBatch) return null;
  nextBatch.status = "processing";
  nextBatch.startedAt = /* @__PURE__ */ new Date();
  task.currentBatchIndex = nextBatch.index;
  task.status = "generating";
  task.updatedAt = /* @__PURE__ */ new Date();
  nextBatch.segments.forEach((segment) => {
    const taskSegment = task.segments.find((s) => s.id === segment.id);
    if (taskSegment) {
      taskSegment.status = "generating";
    }
  });
  longVideoTasks.set(taskId, task);
  return nextBatch;
}
function getBatchApiKey(batch) {
  return getApiKeyFromGroup(batch.apiKeyGroupIndex);
}
function isTaskCompleted(taskId) {
  const task = longVideoTasks.get(taskId);
  if (!task) return false;
  return task.batches.every((b) => b.status === "completed" || b.status === "failed");
}
function getUserLongVideoTasks(userId) {
  return Array.from(longVideoTasks.values()).filter((t2) => t2.userId === userId).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}
function deleteLongVideoTask(taskId) {
  return longVideoTasks.delete(taskId);
}
function getTaskStats(taskId) {
  const task = longVideoTasks.get(taskId);
  if (!task) return null;
  const completedSegments = task.segments.filter((s) => s.status === "completed").length;
  const failedSegments = task.segments.filter((s) => s.status === "failed").length;
  const pendingSegments = task.segments.filter((s) => s.status === "pending").length;
  const generatingSegments = task.segments.filter((s) => s.status === "generating").length;
  const completedBatches = task.batches.filter((b) => b.status === "completed").length;
  const remainingSegments = pendingSegments + generatingSegments;
  const estimatedTimeRemaining = Math.ceil(remainingSegments * 30 / 60);
  return {
    totalSegments: task.totalSegments,
    completedSegments,
    failedSegments,
    pendingSegments,
    generatingSegments,
    totalBatches: task.totalBatches,
    completedBatches,
    currentBatch: task.currentBatchIndex,
    progress: task.progress,
    estimatedTimeRemaining
  };
}

// server/voiceService.ts
init_videoConfig();

// server/voiceActorsConfig.ts
var CANTONESE_VOICE_ACTORS = {
  // === 男聲 - 成年 ===
  "cantonese-male-narrator": {
    id: "cantonese-male-narrator",
    name: "\u66F8\u8072\u5112\u96C5",
    gender: "male",
    type: "narrator",
    language: "cantonese",
    ageGroup: "adult",
    style: ["narrator", "storytelling", "professional"],
    description: "\u6E3E\u539A\u7A69\u91CD\u7684\u7CB5\u8A9E\u7537\u8072\uFF0C\u97F3\u8272\u6EAB\u6F64\u6709\u78C1\u6027\uFF0C\u5410\u5B57\u6E05\u6670",
    useCases: ["\u7D00\u9304\u7247\u65C1\u767D", "\u6709\u8072\u66F8\u6717\u8B80", "\u54C1\u724C\u5BA3\u50B3", "\u6559\u80B2\u5167\u5BB9"],
    voice: "alloy",
    sampleText: "\u5927\u5BB6\u597D\uFF0C\u6B61\u8FCE\u569F\u5230\u6211\u5605\u983B\u9053\uFF0C\u4ECA\u65E5\u540C\u4F60\u54CB\u5206\u4EAB\u4E00\u500B\u7CBE\u5F69\u5605\u6545\u4E8B\u3002",
    sampleUrl: "https://aigc-cdn.kreadoai.com/digitalhuman/voice/default_voice/speech02/db43a80789d343c6843d3f03191360cd.mp3",
    tags: ["\u65C1\u767D", "\u6558\u8FF0", "\u7D00\u9304\u7247", "\u5C08\u696D"],
    kreadoVoiceId: "ai_000046",
    kreadoVoiceSource: 5
  },
  "cantonese-male-young": {
    id: "cantonese-male-young",
    name: "\u78C1\u6027\u7537\u8072",
    gender: "male",
    type: "character",
    language: "cantonese",
    ageGroup: "young",
    style: ["character", "emotional"],
    description: "\u5E74\u8F15\u6709\u6D3B\u529B\u7684\u7CB5\u8A9E\u7537\u8072\uFF0C\u8072\u7DDA\u6E05\u4EAE\u6709\u611F\u67D3\u529B",
    useCases: ["\u5E74\u8F15\u7537\u4E3B\u89D2", "\u611B\u60C5\u6545\u4E8B", "\u9752\u6625\u5287\u60C5", "\u65E5\u5E38\u5C0D\u8A71"],
    voice: "echo",
    sampleText: "\u54CE\uFF0C\u4F60\u8B1B\u5605\u4FC2\u5514\u4FC2\u771F\u35CE\uFF1F\u6211\u8981\u8A66\u4E0B\u5148\u5F97\uFF01",
    sampleUrl: "https://aigc-cdn.kreadoai.com/digitalhuman/voice/default_voice/speech02/1f67f1eddb54492386bbf979d5d1f55c.mp3",
    tags: ["\u5E74\u8F15", "\u6D3B\u6F51", "\u7537\u4E3B\u89D2", "\u611B\u60C5"],
    kreadoVoiceId: "ai_charming_m_01",
    kreadoVoiceSource: 5
  },
  "cantonese-male-mature": {
    id: "cantonese-male-mature",
    name: "\u6210\u719F\u7537\u8072",
    gender: "male",
    type: "character",
    language: "cantonese",
    ageGroup: "middle",
    style: ["character", "professional"],
    description: "\u6210\u719F\u7A69\u91CD\u7684\u7CB5\u8A9E\u7537\u8072\uFF0C\u5E36\u6709\u5A01\u56B4\u548C\u53EF\u9760\u611F",
    useCases: ["\u7236\u89AA\u89D2\u8272", "\u8001\u95C6\u89D2\u8272", "\u5C0E\u5E2B\u89D2\u8272", "\u6B0A\u5A01\u4EBA\u7269"],
    voice: "onyx",
    sampleText: "\u5462\u4EF6\u4E8B\u5514\u7C21\u55AE\uFF0C\u8981\u8AD7\u6E05\u695A\u5148\u5F97\u3002",
    sampleUrl: "https://aigc-cdn.kreadoai.com/digitalhuman/voice/default_voice/speech02/0c499ea708404312b3a1d3d847c3c3bb.mp3",
    tags: ["\u6210\u719F", "\u7A69\u91CD", "\u7236\u89AA", "\u8001\u95C6"],
    kreadoVoiceId: "ai_000141",
    kreadoVoiceSource: 5
  },
  "cantonese-male-deep": {
    id: "cantonese-male-deep",
    name: "\u6C89\u7A69\u7537",
    gender: "male",
    type: "character",
    language: "cantonese",
    ageGroup: "adult",
    style: ["narrator", "storytelling"],
    description: "\u6DF1\u6C89\u6709\u78C1\u6027\u7684\u7537\u8072\uFF0C\u5E36\u6709\u795E\u79D8\u611F\u548C\u6545\u4E8B\u611F",
    useCases: ["\u61F8\u7591\u6545\u4E8B", "\u795E\u79D8\u89D2\u8272", "\u6DF1\u591C\u96FB\u53F0", "\u54F2\u7406\u5167\u5BB9"],
    voice: "fable",
    sampleText: "\u547D\u904B\u5605\u8F2A\u76E4\u5DF2\u7D93\u958B\u59CB\u8F49\u52D5...",
    sampleUrl: "https://aigc-cdn.kreadoai.com/digitalhuman/voice/default_voice/speech02/ceec0ba8719844e1b159e39698001aa6.mp3",
    tags: ["\u6DF1\u6C89", "\u78C1\u6027", "\u795E\u79D8", "\u6545\u4E8B"],
    kreadoVoiceId: "ai_charming_m_05",
    kreadoVoiceSource: 5
  },
  "cantonese-male-energetic": {
    id: "cantonese-male-energetic",
    name: "\u96F2\u9038",
    gender: "male",
    type: "character",
    language: "cantonese",
    ageGroup: "young",
    style: ["character", "commercial"],
    description: "\u5145\u6EFF\u6D3B\u529B\u7684\u7537\u8072\uFF0C\u8072\u97F3\u660E\u4EAE\u6709\u671D\u6C23",
    useCases: ["\u904B\u52D5\u5167\u5BB9", "\u5192\u96AA\u6545\u4E8B", "\u904A\u6232\u89E3\u8AAA", "\u6D3B\u529B\u5EE3\u544A"],
    voice: "echo",
    sampleText: "\u885D\u5440\uFF01\u6211\u54CB\u4E00\u5B9A\u5F97\u35CE\uFF01",
    sampleUrl: "https://aigc-cdn.kreadoai.com/digitalhuman/voice/default_voice/speech02/ee86e11a6e344ecb9bfcf7def6c484e1.mp3",
    tags: ["\u6D3B\u529B", "\u904B\u52D5", "\u5192\u96AA", "\u71B1\u8840"],
    kreadoVoiceId: "ai_chongyun",
    kreadoVoiceSource: 5
  },
  "cantonese-male-elegant": {
    id: "cantonese-male-elegant",
    name: "\u8FEA\u66DC",
    gender: "male",
    type: "character",
    language: "cantonese",
    ageGroup: "adult",
    style: ["character", "professional"],
    description: "\u512A\u96C5\u7D33\u58EB\u7684\u7537\u8072\uFF0C\u5E36\u6709\u8CB4\u65CF\u6C23\u8CEA",
    useCases: ["\u7D33\u58EB\u89D2\u8272", "\u9AD8\u7AEF\u54C1\u724C", "\u512A\u96C5\u5834\u5408", "\u53E4\u5178\u6545\u4E8B"],
    voice: "alloy",
    sampleText: "\u8ACB\u5BB9\u8A31\u6211\u70BA\u4F60\u4ECB\u7D39...",
    sampleUrl: "https://aigc-cdn.kreadoai.com/digitalhuman/voice/default_voice/speech02/be13d115112c474d8988b2d8a85affff.mp3",
    tags: ["\u512A\u96C5", "\u7D33\u58EB", "\u8CB4\u65CF", "\u9AD8\u7AEF"],
    kreadoVoiceId: "ai_diluke",
    kreadoVoiceSource: 5
  },
  "cantonese-male-dj": {
    id: "cantonese-male-dj",
    name: "\u97F3\u97FB\u4FCA\u6717",
    gender: "male",
    type: "narrator",
    language: "cantonese",
    ageGroup: "young",
    style: ["narrator", "commercial"],
    description: "DJ \u98A8\u683C\u7684\u7537\u8072\uFF0C\u8072\u97F3\u6709\u7BC0\u594F\u611F\u548C\u611F\u67D3\u529B",
    useCases: ["\u96FB\u53F0\u7BC0\u76EE", "\u97F3\u6A02\u4ECB\u7D39", "\u6D3B\u52D5\u4E3B\u6301", "\u6F6E\u6D41\u5167\u5BB9"],
    voice: "echo",
    sampleText: "\u5404\u4F4D\u807D\u773E\u670B\u53CB\uFF0C\u6B61\u8FCE\u6536\u807D\u4ECA\u665A\u5605\u7BC0\u76EE\uFF01",
    sampleUrl: "https://aigc-cdn.kreadoai.com/digitalhuman/voice/default_voice/speech02/7babf8c82b814e8eb2edd7a1630880a0.mp3",
    tags: ["DJ", "\u96FB\u53F0", "\u4E3B\u6301", "\u6F6E\u6D41"],
    kreadoVoiceId: "ai_dj_m_01",
    kreadoVoiceSource: 5
  },
  "cantonese-male-boy": {
    id: "cantonese-male-boy",
    name: "\u4E2D\u4E8C\u541B",
    gender: "male",
    type: "character",
    language: "cantonese",
    ageGroup: "teen",
    style: ["character", "cartoon"],
    description: "\u4E2D\u4E8C\u5C11\u5E74\u98A8\u683C\u7684\u7537\u8072\uFF0C\u5E36\u6709\u71B1\u8840\u548C\u5E7B\u60F3\u611F",
    useCases: ["\u52D5\u6F2B\u89D2\u8272", "\u904A\u6232\u89D2\u8272", "\u71B1\u8840\u5C11\u5E74", "\u641E\u7B11\u5167\u5BB9"],
    voice: "echo",
    sampleText: "\u6211\u5605\u53F3\u624B\u5C01\u5370\u4F4F\u5F37\u5927\u5605\u529B\u91CF\uFF01",
    sampleUrl: "https://aigc-cdn.kreadoai.com/digitalhuman/voice/default_voice/speech02/de079ad85855455aabf3bf9509295d27.mp3",
    tags: ["\u4E2D\u4E8C", "\u5C11\u5E74", "\u52D5\u6F2B", "\u71B1\u8840"],
    kreadoVoiceId: "ai_bili_712",
    kreadoVoiceSource: 5
  },
  "cantonese-male-scholar": {
    id: "cantonese-male-scholar",
    name: "\u535A\u6587",
    gender: "male",
    type: "narrator",
    language: "cantonese",
    ageGroup: "adult",
    style: ["narrator", "professional"],
    description: "\u5B78\u8005\u98A8\u683C\u7684\u7537\u8072\uFF0C\u8072\u97F3\u6C89\u7A69\u6709\u5B78\u8B58\u611F",
    useCases: ["\u6559\u80B2\u5167\u5BB9", "\u77E5\u8B58\u8B1B\u89E3", "\u5B78\u8853\u5206\u4EAB", "\u79D1\u666E\u8996\u983B"],
    voice: "alloy",
    sampleText: "\u6839\u64DA\u7814\u7A76\u986F\u793A\uFF0C\u5462\u500B\u73FE\u8C61\u80CC\u5F8C\u6709\u5E7E\u500B\u91CD\u8981\u539F\u56E0...",
    sampleUrl: "https://aigc-cdn.kreadoai.com/digitalhuman/voice/default_voice/speech02/9535eb9ccfbc4fc7ae09ac2cf8d376fe.mp3",
    tags: ["\u5B78\u8005", "\u6559\u80B2", "\u77E5\u8B58", "\u5C08\u696D"],
    kreadoVoiceId: "ai_baodewen4_712",
    kreadoVoiceSource: 5
  },
  "cantonese-male-hero": {
    id: "cantonese-male-hero",
    name: "\u51F1\u591C",
    gender: "male",
    type: "character",
    language: "cantonese",
    ageGroup: "young",
    style: ["character", "storytelling"],
    description: "\u82F1\u96C4\u98A8\u683C\u7684\u7537\u8072\uFF0C\u8072\u97F3\u5805\u5B9A\u6709\u6B63\u7FA9\u611F",
    useCases: ["\u82F1\u96C4\u89D2\u8272", "\u6B63\u7FA9\u6545\u4E8B", "\u52D5\u4F5C\u5834\u666F", "\u52F5\u5FD7\u5167\u5BB9"],
    voice: "onyx",
    sampleText: "\u6211\u6703\u4FDD\u8B77\u4F60\u54CB\uFF0C\u7121\u8AD6\u767C\u751F\u54A9\u4E8B\uFF01",
    sampleUrl: "https://aigc-cdn.kreadoai.com/digitalhuman/voice/default_voice/speech02/0d21f349bf50467bb185a82472552535.mp3",
    tags: ["\u82F1\u96C4", "\u6B63\u7FA9", "\u5805\u5B9A", "\u4FDD\u8B77"],
    kreadoVoiceId: "ai_kaiya",
    kreadoVoiceSource: 5
  },
  "cantonese-male-cold": {
    id: "cantonese-male-cold",
    name: "\u51B7\u50B2\u9752\u92D2",
    gender: "male",
    type: "character",
    language: "cantonese",
    ageGroup: "young",
    style: ["character"],
    description: "\u51B7\u9177\u50B2\u6162\u7684\u7537\u8072\uFF0C\u5E36\u6709\u8DDD\u96E2\u611F\u548C\u9AD8\u51B7\u6C23\u8CEA",
    useCases: ["\u9AD8\u51B7\u89D2\u8272", "\u53CD\u6D3E\u89D2\u8272", "\u6B66\u4FE0\u6545\u4E8B", "\u9738\u9053\u7E3D\u88C1"],
    voice: "onyx",
    sampleText: "\u54FC\uFF0C\u4F60\u4EE5\u70BA\u4F60\u4FC2\u908A\u500B\uFF1F",
    sampleUrl: "https://aigc-cdn.kreadoai.com/digitalhuman/voice/default_voice/speech02/da54ec59097940fc81679f2140c17e6a.mp3",
    tags: ["\u51B7\u9177", "\u9AD8\u51B7", "\u50B2\u6162", "\u9738\u9053"],
    kreadoVoiceId: "ai_lilianhua_712",
    kreadoVoiceSource: 5
  },
  "cantonese-male-dragon": {
    id: "cantonese-male-dragon",
    name: "\u9F8D\u562F\u5A01\u8072",
    gender: "male",
    type: "character",
    language: "cantonese",
    ageGroup: "adult",
    style: ["character", "storytelling"],
    description: "\u5A01\u56B4\u9738\u6C23\u7684\u7537\u8072\uFF0C\u8072\u97F3\u6D2A\u4EAE\u6709\u6C23\u52E2",
    useCases: ["\u738B\u8005\u89D2\u8272", "\u6B66\u4FE0\u5927\u4FE0", "\u53F2\u8A69\u6545\u4E8B", "\u6C23\u52E2\u5BA3\u50B3"],
    voice: "onyx",
    sampleText: "\u5929\u4E0B\u82F1\u96C4\uFF0C\u76E1\u5728\u6B64\u8655\uFF01",
    sampleUrl: "https://aigc-cdn.kreadoai.com/digitalhuman/voice/default_voice/speech02/7976101f21c64634976cf3e673a11b22.mp3",
    tags: ["\u5A01\u56B4", "\u9738\u6C23", "\u738B\u8005", "\u6B66\u4FE0"],
    kreadoVoiceId: "ai_longxiao_712",
    kreadoVoiceSource: 5
  },
  "cantonese-male-sunny": {
    id: "cantonese-male-sunny",
    name: "\u967D\u5149\u5065\u7FD4",
    gender: "male",
    type: "character",
    language: "cantonese",
    ageGroup: "young",
    style: ["character", "commercial"],
    description: "\u967D\u5149\u958B\u6717\u7684\u7537\u8072\uFF0C\u8072\u97F3\u6EAB\u6696\u6709\u89AA\u548C\u529B",
    useCases: ["\u967D\u5149\u7537\u5B69", "\u904B\u52D5\u54E1\u89D2\u8272", "\u5065\u5EB7\u5EE3\u544A", "\u6B63\u80FD\u91CF\u5167\u5BB9"],
    voice: "echo",
    sampleText: "\u4ECA\u65E5\u5929\u6C23\u5481\u597D\uFF0C\u4E00\u9F4A\u53BB\u505A\u904B\u52D5\u5566\uFF01",
    sampleUrl: "https://aigc-cdn.kreadoai.com/digitalhuman/voice/default_voice/speech02/5ae1b04de0694c3c9a6c3955391f8c7a.mp3",
    tags: ["\u967D\u5149", "\u5065\u5EB7", "\u904B\u52D5", "\u958B\u6717"],
    kreadoVoiceId: "ai_jianshenjiaolian_712",
    kreadoVoiceSource: 5
  },
  // === 女聲 - 成年 ===
  "cantonese-female-narrator": {
    id: "cantonese-female-narrator",
    name: "\u9748\u97FB",
    gender: "female",
    type: "narrator",
    language: "cantonese",
    ageGroup: "adult",
    style: ["narrator", "storytelling"],
    description: "\u6EAB\u67D4\u512A\u96C5\u7684\u7CB5\u8A9E\u5973\u8072\uFF0C\u97F3\u8272\u751C\u7F8E\u6709\u611F\u67D3\u529B",
    useCases: ["\u6709\u8072\u66F8\u6717\u8B80", "\u6545\u4E8B\u65C1\u767D", "\u54C1\u724C\u5BA3\u50B3", "\u6EAB\u99A8\u5167\u5BB9"],
    voice: "nova",
    sampleText: "\u55BA\u5462\u500B\u5B89\u975C\u5605\u591C\u665A\uFF0C\u6708\u5149\u7167\u55BA\u5C0F\u93AE\u5605\u8857\u9053\u4E0A...",
    sampleUrl: "https://aigc-cdn.kreadoai.com/digitalhuman/voice/default_voice/speech02/e7b2df6dee7f419e863f1dfc994d7993.mp3",
    tags: ["\u65C1\u767D", "\u6558\u8FF0", "\u6EAB\u67D4", "\u512A\u96C5"],
    kreadoVoiceId: "ai_charming_f_01",
    kreadoVoiceSource: 5
  },
  "cantonese-female-young": {
    id: "cantonese-female-young",
    name: "\u9748\u97F3\u59EC",
    gender: "female",
    type: "character",
    language: "cantonese",
    ageGroup: "young",
    style: ["character", "emotional"],
    description: "\u5E74\u8F15\u6D3B\u6F51\u7684\u7CB5\u8A9E\u5973\u8072\uFF0C\u8072\u97F3\u6E05\u8106\u6709\u671D\u6C23",
    useCases: ["\u5E74\u8F15\u5973\u4E3B\u89D2", "\u611B\u60C5\u6545\u4E8B", "\u9752\u6625\u5287\u60C5", "\u65E5\u5E38\u5C0D\u8A71"],
    voice: "shimmer",
    sampleText: "\u54C7\uFF0C\u771F\u4FC2\u597D\u975A\u5440\uFF01\u6211\u5514\u6562\u76F8\u4FE1\u5440\uFF01",
    sampleUrl: "https://aigc-cdn.kreadoai.com/digitalhuman/voice/default_voice/speech02/09b07749d50b41fa893bacb57ebbd849.mp3",
    tags: ["\u5E74\u8F15", "\u6D3B\u6F51", "\u5973\u4E3B\u89D2", "\u9752\u6625"],
    kreadoVoiceId: "ai_charming_f_22",
    kreadoVoiceSource: 5
  },
  "cantonese-female-mature": {
    id: "cantonese-female-mature",
    name: "\u9748\u6C50",
    gender: "female",
    type: "character",
    language: "cantonese",
    ageGroup: "middle",
    style: ["character", "professional"],
    description: "\u6210\u719F\u512A\u96C5\u7684\u7CB5\u8A9E\u5973\u8072\uFF0C\u5E36\u6709\u77E5\u6027\u548C\u6EAB\u6696\u611F",
    useCases: ["\u6BCD\u89AA\u89D2\u8272", "\u8077\u5834\u5973\u6027", "\u77E5\u6027\u89D2\u8272", "\u6EAB\u99A8\u6545\u4E8B"],
    voice: "alloy",
    sampleText: "\u4F60\u8981\u8A18\u4F4F\uFF0C\u505A\u4EBA\u6700\u7DCA\u8981\u4FC2\u8AA0\u5BE6\u3002",
    sampleUrl: "https://aigc-cdn.kreadoai.com/digitalhuman/voice/default_voice/speech02/0e51c773ec3a498fbc7dc024b6f6d8c7.mp3",
    tags: ["\u6210\u719F", "\u512A\u96C5", "\u6BCD\u89AA", "\u77E5\u6027"],
    kreadoVoiceId: "ai_charming_f_23",
    kreadoVoiceSource: 5
  },
  "cantonese-female-sweet": {
    id: "cantonese-female-sweet",
    name: "\u9748\u97F3\u59B9",
    gender: "female",
    type: "character",
    language: "cantonese",
    ageGroup: "young",
    style: ["character", "assistant"],
    description: "\u751C\u7F8E\u53EF\u611B\u7684\u5973\u8072\uFF0C\u8072\u97F3\u8EDF\u7CEF\u6709\u89AA\u548C\u529B",
    useCases: ["\u53EF\u611B\u89D2\u8272", "\u5BA2\u670D\u52A9\u624B", "\u751C\u871C\u5167\u5BB9", "\u5C11\u5973\u89D2\u8272"],
    voice: "shimmer",
    sampleText: "\u4F60\u597D\u5440\uFF5E\u6709\u54A9\u53EF\u4EE5\u5E6B\u5230\u4F60\u35CE\uFF1F",
    sampleUrl: "https://aigc-cdn.kreadoai.com/digitalhuman/voice/default_voice/speech02/c1e58ecbc81d457d96e3449491ea8376.mp3",
    tags: ["\u751C\u7F8E", "\u53EF\u611B", "\u52A9\u624B", "\u5C11\u5973"],
    kreadoVoiceId: "ai_charming_f_24",
    kreadoVoiceSource: 5
  },
  "cantonese-female-wise": {
    id: "cantonese-female-wise",
    name: "\u77E5\u8587",
    gender: "female",
    type: "narrator",
    language: "cantonese",
    ageGroup: "adult",
    style: ["narrator", "professional"],
    description: "\u77E5\u6027\u512A\u96C5\u7684\u5973\u8072\uFF0C\u8072\u97F3\u6C89\u7A69\u6709\u5B78\u8B58\u611F",
    useCases: ["\u77E5\u8B58\u8B1B\u89E3", "\u6559\u80B2\u5167\u5BB9", "\u5C08\u696D\u89E3\u8AAA", "\u79D1\u666E\u8996\u983B"],
    voice: "nova",
    sampleText: "\u4ECA\u65E5\u6211\u54CB\u569F\u4E86\u89E3\u4E00\u4E0B\u5462\u500B\u6709\u8DA3\u5605\u73FE\u8C61...",
    sampleUrl: "https://aigc-cdn.kreadoai.com/digitalhuman/voice/default_voice/speech02/1387f57365ef410685aef35e8e5fc8a1.mp3",
    tags: ["\u77E5\u6027", "\u5C08\u696D", "\u6559\u80B2", "\u512A\u96C5"],
    kreadoVoiceId: "ai_charming_f_25",
    kreadoVoiceSource: 5
  },
  "cantonese-female-dj": {
    id: "cantonese-female-dj",
    name: "\u661F\u703E",
    gender: "female",
    type: "narrator",
    language: "cantonese",
    ageGroup: "young",
    style: ["narrator", "commercial"],
    description: "DJ \u98A8\u683C\u7684\u5973\u8072\uFF0C\u8072\u97F3\u6709\u7BC0\u594F\u611F\u548C\u6D3B\u529B",
    useCases: ["\u96FB\u53F0\u7BC0\u76EE", "\u97F3\u6A02\u4ECB\u7D39", "\u6D3B\u52D5\u4E3B\u6301", "\u6F6E\u6D41\u5167\u5BB9"],
    voice: "shimmer",
    sampleText: "\u5404\u4F4D\u807D\u773E\u670B\u53CB\uFF0C\u6E96\u5099\u597D\u672A\uFF1F\u97F3\u6A02\u569F\u5566\uFF01",
    sampleUrl: "https://aigc-cdn.kreadoai.com/digitalhuman/voice/default_voice/speech02/8d1252e4c7af4089808888d0e69ecc6b.mp3",
    tags: ["DJ", "\u96FB\u53F0", "\u4E3B\u6301", "\u6D3B\u529B"],
    kreadoVoiceId: "ai_dj_f_01",
    kreadoVoiceSource: 5
  },
  "cantonese-female-elegant2": {
    id: "cantonese-female-elegant2",
    name: "\u97F3\u97FB\u9713\u88F3",
    gender: "female",
    type: "narrator",
    language: "cantonese",
    ageGroup: "adult",
    style: ["narrator", "storytelling"],
    description: "\u512A\u96C5\u83EF\u9E97\u7684\u5973\u8072\uFF0C\u8072\u97F3\u5982\u8A69\u5982\u756B",
    useCases: ["\u53E4\u98A8\u6545\u4E8B", "\u512A\u96C5\u5834\u5408", "\u9AD8\u7AEF\u54C1\u724C", "\u85DD\u8853\u5167\u5BB9"],
    voice: "nova",
    sampleText: "\u6708\u83EF\u5982\u6C34\uFF0C\u6D41\u6DCC\u55BA\u5462\u500B\u5BE7\u975C\u5605\u591C\u665A...",
    sampleUrl: "https://aigc-cdn.kreadoai.com/digitalhuman/voice/default_voice/speech02/0f0b6b5eae9a432e85822ec69fa5cb01.mp3",
    tags: ["\u512A\u96C5", "\u83EF\u9E97", "\u53E4\u98A8", "\u85DD\u8853"],
    kreadoVoiceId: "ai_dj_f_02",
    kreadoVoiceSource: 5
  },
  "cantonese-female-fairy": {
    id: "cantonese-female-fairy",
    name: "\u7518\u9713",
    gender: "female",
    type: "character",
    language: "cantonese",
    ageGroup: "young",
    style: ["character", "storytelling"],
    description: "\u4ED9\u6C23\u98C4\u98C4\u7684\u5973\u8072\uFF0C\u8072\u97F3\u7A7A\u9748\u6709\u5922\u5E7B\u611F",
    useCases: ["\u4ED9\u4FE0\u89D2\u8272", "\u5922\u5E7B\u6545\u4E8B", "\u5947\u5E7B\u5167\u5BB9", "\u795E\u79D8\u89D2\u8272"],
    voice: "nova",
    sampleText: "\u51E1\u4EBA\uFF0C\u4F60\u53EF\u77E5\u9053\u5462\u5EA6\u4FC2\u4ED9\u754C\uFF1F",
    sampleUrl: "https://aigc-cdn.kreadoai.com/digitalhuman/voice/default_voice/speech02/d6d1bf3a729f47a0b8884869249b5e3f.mp3",
    tags: ["\u4ED9\u6C23", "\u7A7A\u9748", "\u5922\u5E7B", "\u4ED9\u4FE0"],
    kreadoVoiceId: "ai_ganyu",
    kreadoVoiceSource: 5
  },
  "cantonese-female-cute": {
    id: "cantonese-female-cute",
    name: "\u80E1\u6843\u97F3\u59EC",
    gender: "female",
    type: "character",
    language: "cantonese",
    ageGroup: "teen",
    style: ["character", "cartoon"],
    description: "\u4FCF\u76AE\u53EF\u611B\u7684\u5973\u8072\uFF0C\u8072\u97F3\u6D3B\u6F51\u6709\u8DA3",
    useCases: ["\u53EF\u611B\u89D2\u8272", "\u641E\u7B11\u5167\u5BB9", "\u904A\u6232\u89D2\u8272", "\u8F15\u9B06\u6545\u4E8B"],
    voice: "shimmer",
    sampleText: "\u563B\u563B\uFF0C\u4FFE\u6211\u6349\u5230\u4F60\u5566\uFF01",
    sampleUrl: "https://aigc-cdn.kreadoai.com/digitalhuman/voice/default_voice/speech02/f3c24f50d0b8407bbdc56ec79226292b.mp3",
    tags: ["\u4FCF\u76AE", "\u53EF\u611B", "\u6D3B\u6F51", "\u641E\u7B11"],
    kreadoVoiceId: "ai_hutao",
    kreadoVoiceSource: 5
  },
  "cantonese-female-clear": {
    id: "cantonese-female-clear",
    name: "\u6E05\u97F3\u59EC",
    gender: "female",
    type: "character",
    language: "cantonese",
    ageGroup: "young",
    style: ["character", "professional"],
    description: "\u6E05\u51B7\u9AD8\u8CB4\u7684\u5973\u8072\uFF0C\u8072\u97F3\u6E05\u6F88\u6709\u6C23\u8CEA",
    useCases: ["\u9AD8\u51B7\u89D2\u8272", "\u8077\u5834\u7CBE\u82F1", "\u51B7\u8277\u7F8E\u4EBA", "\u5C08\u696D\u5834\u5408"],
    voice: "nova",
    sampleText: "\u8ACB\u4F60\u8A8D\u771F\u5572\uFF0C\u5462\u4EF6\u4E8B\u5514\u4FC2\u73A9\u5605\u3002",
    sampleUrl: "https://aigc-cdn.kreadoai.com/digitalhuman/voice/default_voice/speech02/2b58de6a172f48e1b6f35557e5fd1492.mp3",
    tags: ["\u6E05\u51B7", "\u9AD8\u8CB4", "\u5C08\u696D", "\u6C23\u8CEA"],
    kreadoVoiceId: "ai_keqing",
    kreadoVoiceSource: 5
  },
  "cantonese-female-loli": {
    id: "cantonese-female-loli",
    name: "\u53EF\u9E97\u97F3",
    gender: "female",
    type: "character",
    language: "cantonese",
    ageGroup: "teen",
    style: ["character", "cartoon"],
    description: "\u863F\u8389\u98A8\u683C\u7684\u5973\u8072\uFF0C\u8072\u97F3\u751C\u7F8E\u7A1A\u5AE9",
    useCases: ["\u863F\u8389\u89D2\u8272", "\u53EF\u611B\u52D5\u6F2B", "\u5152\u7AE5\u5167\u5BB9", "\u840C\u7CFB\u89D2\u8272"],
    voice: "shimmer",
    sampleText: "\u54E5\u54E5\uFF5E\u4F60\u966A\u6211\u73A9\u597D\u5514\u597D\uFF1F",
    sampleUrl: "https://aigc-cdn.kreadoai.com/digitalhuman/voice/default_voice/speech02/656e89a054fd4342b27445a79da822c4.mp3",
    tags: ["\u863F\u8389", "\u751C\u7F8E", "\u7A1A\u5AE9", "\u840C"],
    kreadoVoiceId: "ai_keli",
    kreadoVoiceSource: 5
  },
  "cantonese-female-assistant": {
    id: "cantonese-female-assistant",
    name: "\u6676\u9748\u52A9\u624B",
    gender: "female",
    type: "narrator",
    language: "cantonese",
    ageGroup: "young",
    style: ["assistant", "professional"],
    description: "AI \u52A9\u624B\u98A8\u683C\u7684\u5973\u8072\uFF0C\u8072\u97F3\u6E05\u6670\u5C08\u696D",
    useCases: ["\u8A9E\u97F3\u52A9\u624B", "\u5BA2\u670D\u7CFB\u7D71", "\u5C0E\u822A\u8A9E\u97F3", "\u667A\u80FD\u8A2D\u5099"],
    voice: "nova",
    sampleText: "\u4F60\u597D\uFF0C\u6211\u4FC2\u4F60\u5605\u667A\u80FD\u52A9\u624B\uFF0C\u6709\u54A9\u53EF\u4EE5\u5E6B\u5230\u4F60\uFF1F",
    sampleUrl: "https://aigc-cdn.kreadoai.com/digitalhuman/voice/default_voice/speech02/0c77bb6b9d9146359c7689c5d4a29a15.mp3",
    tags: ["\u52A9\u624B", "AI", "\u5C08\u696D", "\u6E05\u6670"],
    kreadoVoiceId: "ai_jingling",
    kreadoVoiceSource: 5
  },
  "cantonese-female-teacher": {
    id: "cantonese-female-teacher",
    name: "\u6559\u5C0E\u56B4\u97F3",
    gender: "female",
    type: "character",
    language: "cantonese",
    ageGroup: "adult",
    style: ["character", "professional"],
    description: "\u56B4\u8085\u8A8D\u771F\u7684\u5973\u8072\uFF0C\u8072\u97F3\u6709\u6B0A\u5A01\u611F",
    useCases: ["\u8001\u5E2B\u89D2\u8272", "\u6559\u80B2\u5167\u5BB9", "\u56B4\u8085\u5834\u5408", "\u8A13\u5C0E\u89D2\u8272"],
    voice: "alloy",
    sampleText: "\u540C\u5B78\u5011\uFF0C\u8ACB\u8A8D\u771F\u807D\u8B1B\uFF01",
    sampleUrl: "https://aigc-cdn.kreadoai.com/digitalhuman/voice/default_voice/speech02/758f38577665404898fea8e9d6d51b12.mp3",
    tags: ["\u8001\u5E2B", "\u56B4\u8085", "\u6B0A\u5A01", "\u6559\u80B2"],
    kreadoVoiceId: "ai_jiaodaozhuren_712",
    kreadoVoiceSource: 5
  },
  "cantonese-female-gentle": {
    id: "cantonese-female-gentle",
    name: "\u7483\u7D17",
    gender: "female",
    type: "character",
    language: "cantonese",
    ageGroup: "young",
    style: ["character", "emotional"],
    description: "\u6EAB\u67D4\u9AD4\u8CBC\u7684\u5973\u8072\uFF0C\u8072\u97F3\u8F15\u67D4\u6709\u611B\u610F",
    useCases: ["\u6EAB\u67D4\u89D2\u8272", "\u611B\u60C5\u6545\u4E8B", "\u6CBB\u7652\u5167\u5BB9", "\u6EAB\u99A8\u5834\u666F"],
    voice: "nova",
    sampleText: "\u5514\u597D\u64D4\u5FC3\uFF0C\u6211\u6703\u4E00\u76F4\u966A\u4F4F\u4F60\u3002",
    sampleUrl: "https://aigc-cdn.kreadoai.com/digitalhuman/voice/default_voice/speech02/e431c5e31d9745699388d0db339ac816.mp3",
    tags: ["\u6EAB\u67D4", "\u9AD4\u8CBC", "\u611B\u60C5", "\u6CBB\u7652"],
    kreadoVoiceId: "ai_lisha",
    kreadoVoiceSource: 5
  },
  "cantonese-female-ice": {
    id: "cantonese-female-ice",
    name: "\u51B0\u5B0C\u5922\u97F3",
    gender: "female",
    type: "character",
    language: "cantonese",
    ageGroup: "young",
    style: ["character"],
    description: "\u51B0\u51B7\u50B2\u5B0C\u7684\u5973\u8072\uFF0C\u8072\u97F3\u5E36\u6709\u8DDD\u96E2\u611F",
    useCases: ["\u50B2\u5B0C\u89D2\u8272", "\u51B7\u8277\u7F8E\u4EBA", "\u9AD8\u51B7\u5973\u4E3B", "\u53CD\u5DEE\u840C"],
    voice: "nova",
    sampleText: "\u54FC\uFF0C\u5514\u4FC2\u56E0\u70BA\u4F60\u6211\u5148\u5481\u505A\u35CE\uFF01",
    sampleUrl: "https://aigc-cdn.kreadoai.com/digitalhuman/voice/default_voice/speech02/5173f69b6db74b06983852357967b2bd.mp3",
    tags: ["\u50B2\u5B0C", "\u51B0\u51B7", "\u9AD8\u51B7", "\u53CD\u5DEE"],
    kreadoVoiceId: "ai_bingjiaoxuemei_712",
    kreadoVoiceSource: 5
  },
  "cantonese-female-proud": {
    id: "cantonese-female-proud",
    name: "\u50B2\u5B0C\u82B3",
    gender: "female",
    type: "character",
    language: "cantonese",
    ageGroup: "young",
    style: ["character", "emotional"],
    description: "\u50B2\u5B0C\u53EF\u611B\u7684\u5973\u8072\uFF0C\u8072\u97F3\u5E36\u6709\u5C0F\u813E\u6C23",
    useCases: ["\u50B2\u5B0C\u89D2\u8272", "\u53EF\u611B\u5973\u53CB", "\u8F15\u559C\u5287", "\u65E5\u5E38\u5C0D\u8A71"],
    voice: "shimmer",
    sampleText: "\u6211...\u6211\u5148\u5514\u4FC2\u64D4\u5FC3\u4F60\u5462\uFF01",
    sampleUrl: "https://aigc-cdn.kreadoai.com/digitalhuman/voice/default_voice/speech02/fdf2ee6ab4cd4c1fb8b1b888cb652d8b.mp3",
    tags: ["\u50B2\u5B0C", "\u53EF\u611B", "\u5C0F\u813E\u6C23", "\u5973\u53CB"],
    kreadoVoiceId: "ai_heqifang_712",
    kreadoVoiceSource: 5
  },
  "cantonese-female-breeze": {
    id: "cantonese-female-breeze",
    name: "\u8F15\u8072\u6E05\u5D50",
    gender: "female",
    type: "narrator",
    language: "cantonese",
    ageGroup: "young",
    style: ["narrator", "storytelling"],
    description: "\u8F15\u67D4\u6E05\u65B0\u7684\u5973\u8072\uFF0C\u8072\u97F3\u5982\u5FAE\u98A8\u822C\u8212\u9069",
    useCases: ["ASMR \u5167\u5BB9", "\u7761\u524D\u6545\u4E8B", "\u51A5\u60F3\u5F15\u5C0E", "\u653E\u9B06\u5167\u5BB9"],
    voice: "nova",
    sampleText: "\u9589\u4E0A\u773C\u775B\uFF0C\u6DF1\u547C\u5438\uFF0C\u611F\u53D7\u5462\u4E00\u523B\u5605\u5BE7\u975C...",
    sampleUrl: "https://aigc-cdn.kreadoai.com/digitalhuman/voice/default_voice/speech02/accc08de8770421e8e0a86ded8f58985.mp3",
    tags: ["\u8F15\u67D4", "\u6E05\u65B0", "ASMR", "\u653E\u9B06"],
    kreadoVoiceId: "ai_enina_712",
    kreadoVoiceSource: 5
  },
  "cantonese-female-morning": {
    id: "cantonese-female-morning",
    name: "\u6668\u66E6\u9732",
    gender: "female",
    type: "narrator",
    language: "cantonese",
    ageGroup: "young",
    style: ["narrator", "commercial"],
    description: "\u6E05\u65B0\u660E\u4EAE\u7684\u5973\u8072\uFF0C\u8072\u97F3\u5982\u6668\u66E6\u822C\u6EAB\u6696",
    useCases: ["\u65E9\u5B89\u554F\u5019", "\u6B63\u80FD\u91CF\u5167\u5BB9", "\u6E05\u65B0\u5EE3\u544A", "\u751F\u6D3B\u5206\u4EAB"],
    voice: "shimmer",
    sampleText: "\u65E9\u6668\uFF01\u65B0\u5605\u4E00\u65E5\u53C8\u958B\u59CB\u5566\uFF0C\u52A0\u6CB9\uFF01",
    sampleUrl: "https://aigc-cdn.kreadoai.com/digitalhuman/voice/default_voice/speech02/baf71ee27f8b47979beb9879f8722fce.mp3",
    tags: ["\u6E05\u65B0", "\u660E\u4EAE", "\u65E9\u5B89", "\u6B63\u80FD\u91CF"],
    kreadoVoiceId: "ai_chenguilu_712",
    kreadoVoiceSource: 5
  },
  // === 童聲 ===
  "cantonese-child-boy": {
    id: "cantonese-child-boy",
    name: "\u91D1\u5C0F\u7334",
    gender: "male",
    type: "character",
    language: "cantonese",
    ageGroup: "child",
    style: ["character", "cartoon"],
    description: "\u6D3B\u6F51\u53EF\u611B\u7684\u7537\u7AE5\u8072\uFF0C\u8072\u97F3\u7A1A\u5AE9\u6709\u7AE5\u8DA3",
    useCases: ["\u5152\u7AE5\u89D2\u8272", "\u52D5\u756B\u914D\u97F3", "\u5152\u7AE5\u7BC0\u76EE", "\u7AE5\u8A71\u6545\u4E8B"],
    voice: "echo",
    sampleText: "\u5ABD\u54AA\uFF0C\u6211\u60F3\u98DF\u7CD6\u7CD6\uFF01",
    sampleUrl: "https://aigc-cdn.kreadoai.com/digitalhuman/voice/default_voice/speech02/b7786e600724494abc5ccb4456afea2d.mp3",
    tags: ["\u7AE5\u8072", "\u7537\u5B69", "\u53EF\u611B", "\u6D3B\u6F51"],
    kreadoVoiceId: "ai_jinsihou_712",
    kreadoVoiceSource: 5
  },
  "cantonese-child-girl": {
    id: "cantonese-child-girl",
    name: "\u7518\u9713\u5973\u7AE5",
    gender: "female",
    type: "character",
    language: "cantonese",
    ageGroup: "child",
    style: ["character", "cartoon"],
    description: "\u751C\u7F8E\u53EF\u611B\u7684\u5973\u7AE5\u8072\uFF0C\u8072\u97F3\u6E05\u8106\u7A1A\u5AE9",
    useCases: ["\u5152\u7AE5\u89D2\u8272", "\u52D5\u756B\u914D\u97F3", "\u5152\u7AE5\u7BC0\u76EE", "\u7AE5\u8A71\u6545\u4E8B"],
    voice: "shimmer",
    sampleText: "\u7238\u7238\uFF0C\u6211\u60F3\u8981\u500B\u6D0B\u5A03\u5A03\uFF01",
    sampleUrl: "https://aigc-cdn.kreadoai.com/digitalhuman/voice/default_voice/speech02/09b07749d50b41fa893bacb57ebbd849.mp3",
    tags: ["\u7AE5\u8072", "\u5973\u5B69", "\u53EF\u611B", "\u751C\u7F8E"],
    kreadoVoiceId: "ai_charming_f_22",
    kreadoVoiceSource: 5
  },
  "cantonese-child-cute": {
    id: "cantonese-child-cute",
    name: "\u840C\u5A03\u7AE5\u97F3",
    gender: "male",
    type: "character",
    language: "cantonese",
    ageGroup: "child",
    style: ["character", "cartoon"],
    description: "\u5976\u8072\u5976\u6C23\u7684\u7AE5\u8072\uFF0C\u8072\u97F3\u8D85\u840C\u8D85\u53EF\u611B",
    useCases: ["\u5E7C\u5152\u89D2\u8272", "\u53EF\u611B\u52D5\u756B", "\u5152\u7AE5\u5EE3\u544A", "\u840C\u7CFB\u5167\u5BB9"],
    voice: "echo",
    sampleText: "\u5ABD\u5ABD\u62B1\u62B1\uFF5E\u6211\u8981\u62B1\u62B1\uFF5E",
    sampleUrl: "https://aigc-cdn.kreadoai.com/digitalhuman/voice/default_voice/speech02/b7786e600724494abc5ccb4456afea2d.mp3",
    tags: ["\u7AE5\u8072", "\u840C\u5A03", "\u5976\u8072\u5976\u6C23", "\u8D85\u840C"],
    kreadoVoiceId: "ai_jinsihou_712",
    kreadoVoiceSource: 5
  },
  // === 老年聲 ===
  "cantonese-elder-male": {
    id: "cantonese-elder-male",
    name: "\u8001\u570B\u8072",
    gender: "male",
    type: "character",
    language: "cantonese",
    ageGroup: "elder",
    style: ["character", "storytelling"],
    description: "\u6148\u7965\u667A\u6167\u7684\u8001\u5E74\u7537\u8072\uFF0C\u8072\u97F3\u6C89\u7A69\u6709\u6B77\u7DF4\u611F",
    useCases: ["\u723A\u723A\u89D2\u8272", "\u667A\u8005\u89D2\u8272", "\u6B77\u53F2\u6545\u4E8B", "\u4EBA\u751F\u54F2\u7406"],
    voice: "fable",
    sampleText: "\u5F8C\u751F\u4ED4\uFF0C\u807D\u963F\u723A\u8B1B\u500B\u6545\u4E8B\u4FFE\u4F60\u807D...",
    sampleUrl: "https://aigc-cdn.kreadoai.com/digitalhuman/voice/default_voice/speech02/00ecc0b9126b4bef8dc48e51b6056f4e.mp3",
    tags: ["\u8001\u5E74", "\u667A\u6167", "\u723A\u723A", "\u6148\u7965"],
    kreadoVoiceId: "ai_laoguowang_712",
    kreadoVoiceSource: 5
  },
  "cantonese-elder-female": {
    id: "cantonese-elder-female",
    name: "\u9B4F\u7D39\u862D",
    gender: "female",
    type: "character",
    language: "cantonese",
    ageGroup: "elder",
    style: ["character", "storytelling"],
    description: "\u6148\u611B\u6EAB\u6696\u7684\u8001\u5E74\u5973\u8072\uFF0C\u8072\u97F3\u89AA\u5207\u6709\u611B\u610F",
    useCases: ["\u5A46\u5A46\u89D2\u8272", "\u6148\u6BCD\u89D2\u8272", "\u5BB6\u5EAD\u6545\u4E8B", "\u6EAB\u99A8\u5167\u5BB9"],
    voice: "nova",
    sampleText: "\u4E56\u5B6B\uFF0C\u569F\u98DF\u5A46\u5A46\u716E\u5605\u6E6F\u5566\u3002",
    sampleUrl: "https://aigc-cdn.kreadoai.com/digitalhuman/voice/default_voice/speech02/2bf0384c60b24339ab233156717d1429.mp3",
    tags: ["\u8001\u5E74", "\u6148\u611B", "\u5A46\u5A46", "\u6EAB\u6696"],
    kreadoVoiceId: "ai_her_06",
    kreadoVoiceSource: 5
  }
};
var MANDARIN_VOICE_ACTORS = {
  // === 男聲 - 成年 ===
  "mandarin-male-narrator": {
    id: "mandarin-male-narrator",
    name: "\u4EAC\u8154\u4F83\u723A",
    gender: "male",
    type: "narrator",
    language: "mandarin",
    ageGroup: "adult",
    style: ["narrator", "storytelling"],
    description: "\u5730\u9053\u4EAC\u8154\u7537\u8072\uFF0C\u8072\u97F3\u6E3E\u539A\u6709\u6545\u4E8B\u611F",
    useCases: ["\u7D00\u9304\u7247\u65C1\u767D", "\u6B77\u53F2\u6545\u4E8B", "\u5317\u4EAC\u6587\u5316", "\u50B3\u7D71\u5167\u5BB9"],
    voice: "alloy",
    sampleText: "\u5404\u4F4D\u89C2\u4F17\u670B\u53CB\u4EEC\uFF0C\u4ECA\u513F\u54B1\u4EEC\u804A\u804A\u8FD9\u5317\u4EAC\u57CE\u7684\u6545\u4E8B...",
    sampleUrl: "https://aigc-cdn.kreadoai.com/default_voice_new/audio/2024/7/892ab9f825604370b1ee5c6249ddcb5f.mp3",
    tags: ["\u4EAC\u8154", "\u65C1\u767D", "\u6545\u4E8B", "\u50B3\u7D71"],
    kreadoVoiceId: "zh_male_jingqiangkanye_moon_bigtts",
    kreadoVoiceSource: 4
  },
  "mandarin-male-young": {
    id: "mandarin-male-young",
    name: "\u967D\u5149\u9752\u5E74",
    gender: "male",
    type: "character",
    language: "mandarin",
    ageGroup: "young",
    style: ["character", "commercial"],
    description: "\u967D\u5149\u958B\u6717\u7684\u5E74\u8F15\u7537\u8072\uFF0C\u8072\u97F3\u6E05\u4EAE\u6709\u6D3B\u529B",
    useCases: ["\u5E74\u8F15\u7537\u4E3B\u89D2", "\u9752\u6625\u6545\u4E8B", "\u6D3B\u529B\u5EE3\u544A", "\u6821\u5712\u5167\u5BB9"],
    voice: "echo",
    sampleText: "\u563F\uFF0C\u4ECA\u5929\u5929\u6C14\u771F\u4E0D\u9519\uFF0C\u4E00\u8D77\u51FA\u53BB\u73A9\u5427\uFF01",
    sampleUrl: "https://aigc-cdn.kreadoai.com/default_voice_new/audio/2024/7/d1e76302e6094344a6f6fddfd0132243.mp3",
    tags: ["\u967D\u5149", "\u9752\u5E74", "\u6D3B\u529B", "\u9752\u6625"],
    kreadoVoiceId: "zh_male_yangguangqingnian_moon_bigtts",
    kreadoVoiceSource: 4
  },
  "mandarin-male-mature": {
    id: "mandarin-male-mature",
    name: "\u6DF5\u535A\u5C0F\u53D4",
    gender: "male",
    type: "character",
    language: "mandarin",
    ageGroup: "middle",
    style: ["character", "professional"],
    description: "\u6210\u719F\u77E5\u6027\u7684\u7537\u8072\uFF0C\u8072\u97F3\u6C89\u7A69\u6709\u5B78\u8B58",
    useCases: ["\u77E5\u8B58\u5206\u4EAB", "\u5C08\u696D\u8B1B\u89E3", "\u6210\u719F\u89D2\u8272", "\u5546\u52D9\u5834\u5408"],
    voice: "onyx",
    sampleText: "\u8BA9\u6211\u6765\u7ED9\u5927\u5BB6\u5206\u6790\u4E00\u4E0B\u8FD9\u4E2A\u95EE\u9898\u7684\u672C\u8D28...",
    sampleUrl: "https://aigc-cdn.kreadoai.com/default_voice_new/audio/2024/7/6e518079ab784a8790cc024bd9ffdfc3.mp3",
    tags: ["\u6210\u719F", "\u77E5\u6027", "\u5C08\u696D", "\u5B78\u8B58"],
    kreadoVoiceId: "zh_male_yuanboxiaoshu_moon_bigtts",
    kreadoVoiceSource: 4
  },
  "mandarin-male-warm": {
    id: "mandarin-male-warm",
    name: "\u6EAB\u6696\u963F\u864E",
    gender: "male",
    type: "character",
    language: "mandarin",
    ageGroup: "adult",
    style: ["character", "emotional"],
    description: "\u6EAB\u6696\u89AA\u5207\u7684\u7537\u8072\uFF0C\u8072\u97F3\u6709\u5B89\u5168\u611F",
    useCases: ["\u6696\u7537\u89D2\u8272", "\u6CBB\u7652\u5167\u5BB9", "\u5BB6\u5EAD\u6545\u4E8B", "\u6EAB\u99A8\u5EE3\u544A"],
    voice: "alloy",
    sampleText: "\u522B\u62C5\u5FC3\uFF0C\u6709\u6211\u5728\uFF0C\u4E00\u5207\u90FD\u4F1A\u597D\u8D77\u6765\u7684\u3002",
    sampleUrl: "https://aigc-cdn.kreadoai.com/default_voice_new/audio/2024/7/510749d0962c4dc6aea3e683dd32206e.mp3",
    tags: ["\u6EAB\u6696", "\u89AA\u5207", "\u6696\u7537", "\u6CBB\u7652"],
    kreadoVoiceId: "zh_male_wennuanahu_moon_bigtts",
    kreadoVoiceSource: 4
  },
  "mandarin-male-arrogant": {
    id: "mandarin-male-arrogant",
    name: "\u50B2\u5B0C\u9738\u7E3D",
    gender: "male",
    type: "character",
    language: "mandarin",
    ageGroup: "adult",
    style: ["character"],
    description: "\u9738\u9053\u7E3D\u88C1\u98A8\u683C\u7684\u7537\u8072\uFF0C\u8072\u97F3\u6709\u6C23\u52E2",
    useCases: ["\u9738\u7E3D\u89D2\u8272", "\u5546\u6230\u6545\u4E8B", "\u8A00\u60C5\u5C0F\u8AAA", "\u5F37\u52E2\u89D2\u8272"],
    voice: "onyx",
    sampleText: "\u8FD9\u4EF6\u4E8B\uFF0C\u5C31\u8FD9\u4E48\u5B9A\u4E86\uFF0C\u4E0D\u7528\u518D\u8BA8\u8BBA\u3002",
    sampleUrl: "https://aigc-cdn.kreadoai.com/default_voice_new/audio/2024/7/31a24d928f834ad188f63a84e06635bc.mp3",
    tags: ["\u9738\u9053", "\u7E3D\u88C1", "\u5F37\u52E2", "\u8A00\u60C5"],
    kreadoVoiceId: "zh_male_aojiaobazong_moon_bigtts",
    kreadoVoiceSource: 4
  },
  "mandarin-male-teen": {
    id: "mandarin-male-teen",
    name: "\u5C11\u5E74\u6893\u8F9B",
    gender: "male",
    type: "character",
    language: "mandarin",
    ageGroup: "teen",
    style: ["character", "emotional"],
    description: "\u6E05\u6F88\u5C11\u5E74\u7684\u7537\u8072\uFF0C\u8072\u97F3\u7D14\u6DE8\u6709\u671D\u6C23",
    useCases: ["\u5C11\u5E74\u89D2\u8272", "\u6821\u5712\u6545\u4E8B", "\u9752\u6625\u5287\u60C5", "\u6210\u9577\u6545\u4E8B"],
    voice: "echo",
    sampleText: "\u6211\u4E00\u5B9A\u8981\u52AA\u529B\uFF0C\u4E0D\u80FD\u8BA9\u5927\u5BB6\u5931\u671B\uFF01",
    sampleUrl: "https://aigc-cdn.kreadoai.com/default_voice_new/audio/2024/7/d5cabbceaf6b4582be2bf63a8e61ddd2.mp3",
    tags: ["\u5C11\u5E74", "\u6E05\u6F88", "\u9752\u6625", "\u6210\u9577"],
    kreadoVoiceId: "zh_male_shaonianzixin_moon_bigtts",
    kreadoVoiceSource: 4
  },
  "mandarin-male-news": {
    id: "mandarin-male-news",
    name: "\u65B0\u805E\u7537\u8072",
    gender: "male",
    type: "narrator",
    language: "mandarin",
    ageGroup: "adult",
    style: ["news", "professional"],
    description: "\u6A19\u6E96\u65B0\u805E\u64AD\u5831\u7537\u8072\uFF0C\u8072\u97F3\u6E05\u6670\u5C08\u696D",
    useCases: ["\u65B0\u805E\u64AD\u5831", "\u8CC7\u8A0A\u7BC0\u76EE", "\u6B63\u5F0F\u5834\u5408", "\u5B98\u65B9\u5167\u5BB9"],
    voice: "alloy",
    sampleText: "\u5404\u4F4D\u89C2\u4F17\u670B\u53CB\u4EEC\uFF0C\u6B22\u8FCE\u6536\u770B\u4ECA\u5929\u7684\u65B0\u95FB\u8282\u76EE\u3002",
    sampleUrl: "https://aigc-cdn.kreadoai.com/default_voice_new/audio/2024/4/046f8a34166a475792d8ff1b9c82a8ed.mp3",
    tags: ["\u65B0\u805E", "\u64AD\u5831", "\u5C08\u696D", "\u6B63\u5F0F"],
    kreadoVoiceId: "BV012_streaming",
    kreadoVoiceSource: 4
  },
  "mandarin-male-magnetic": {
    id: "mandarin-male-magnetic",
    name: "\u78C1\u6027\u7537\u8072",
    gender: "male",
    type: "narrator",
    language: "mandarin",
    ageGroup: "adult",
    style: ["narrator", "commercial"],
    description: "\u4F4E\u6C89\u78C1\u6027\u7684\u7537\u8072\uFF0C\u8072\u97F3\u6709\u5438\u5F15\u529B",
    useCases: ["\u54C1\u724C\u5EE3\u544A", "\u9AD8\u7AEF\u5BA3\u50B3", "\u6DF1\u591C\u96FB\u53F0", "\u60C5\u611F\u5167\u5BB9"],
    voice: "onyx",
    sampleText: "\u5728\u8FD9\u4E2A\u57CE\u5E02\u7684\u591C\u665A\uFF0C\u603B\u6709\u4E00\u4E9B\u6545\u4E8B\u5728\u6084\u6084\u53D1\u751F...",
    sampleUrl: "https://aigc-cdn.kreadoai.com/default_voice_new/audio/2024/4/9e93f681a2144c7299b5c5f6b426ea49.mp3",
    tags: ["\u78C1\u6027", "\u4F4E\u6C89", "\u5EE3\u544A", "\u9AD8\u7AEF"],
    kreadoVoiceId: "BV006_streaming",
    kreadoVoiceSource: 4
  },
  // === 女聲 - 成年 ===
  "mandarin-female-narrator": {
    id: "mandarin-female-narrator",
    name: "\u723D\u5FEB\u601D\u601D",
    gender: "female",
    type: "narrator",
    language: "mandarin",
    ageGroup: "adult",
    style: ["narrator", "commercial"],
    description: "\u723D\u6717\u5927\u65B9\u7684\u5973\u8072\uFF0C\u8072\u97F3\u6E05\u8106\u6709\u611F\u67D3\u529B",
    useCases: ["\u54C1\u724C\u5BA3\u50B3", "\u7522\u54C1\u4ECB\u7D39", "\u6D3B\u529B\u5EE3\u544A", "\u751F\u6D3B\u5206\u4EAB"],
    voice: "nova",
    sampleText: "\u5927\u5BB6\u597D\uFF0C\u4ECA\u5929\u7ED9\u5927\u5BB6\u5206\u4EAB\u4E00\u4E2A\u8D85\u68D2\u7684\u597D\u7269\uFF01",
    sampleUrl: "https://aigc-cdn.kreadoai.com/default_voice_new/audio/2024/7/46b69611fab64a00bbc192f68bae6c37.mp3",
    tags: ["\u723D\u6717", "\u5927\u65B9", "\u5EE3\u544A", "\u6D3B\u529B"],
    kreadoVoiceId: "zh_female_shuangkuaisisi_moon_bigtts",
    kreadoVoiceSource: 4
  },
  "mandarin-female-young": {
    id: "mandarin-female-young",
    name: "\u9130\u5BB6\u5973\u5B69",
    gender: "female",
    type: "character",
    language: "mandarin",
    ageGroup: "young",
    style: ["character", "emotional"],
    description: "\u89AA\u5207\u53EF\u611B\u7684\u5973\u8072\uFF0C\u8072\u97F3\u81EA\u7136\u6709\u89AA\u548C\u529B",
    useCases: ["\u9130\u5BB6\u5973\u5B69", "\u65E5\u5E38\u5C0D\u8A71", "\u751F\u6D3B\u6545\u4E8B", "\u8F15\u9B06\u5167\u5BB9"],
    voice: "shimmer",
    sampleText: "\u563F\uFF0C\u4F60\u4ECA\u5929\u770B\u8D77\u6765\u5FC3\u60C5\u4E0D\u9519\u561B\uFF01",
    sampleUrl: "https://aigc-cdn.kreadoai.com/default_voice_new/audio/2024/7/00695908c4ae466b9e22a8df9976b970.mp3",
    tags: ["\u9130\u5BB6", "\u89AA\u5207", "\u53EF\u611B", "\u65E5\u5E38"],
    kreadoVoiceId: "zh_female_linjianvhai_moon_bigtts",
    kreadoVoiceSource: 4
  },
  "mandarin-female-mature": {
    id: "mandarin-female-mature",
    name: "\u9AD8\u51B7\u5FA1\u59D0",
    gender: "female",
    type: "character",
    language: "mandarin",
    ageGroup: "adult",
    style: ["character", "professional"],
    description: "\u9AD8\u51B7\u6C23\u8CEA\u7684\u5973\u8072\uFF0C\u8072\u97F3\u6709\u8DDD\u96E2\u611F\u548C\u6C23\u5834",
    useCases: ["\u5FA1\u59D0\u89D2\u8272", "\u8077\u5834\u5973\u5F37\u4EBA", "\u9AD8\u51B7\u7F8E\u4EBA", "\u5C08\u696D\u5834\u5408"],
    voice: "nova",
    sampleText: "\u8FD9\u4EF6\u4E8B\uFF0C\u6211\u81EA\u6709\u5B89\u6392\uFF0C\u4E0D\u9700\u8981\u4F60\u64CD\u5FC3\u3002",
    sampleUrl: "https://aigc-cdn.kreadoai.com/default_voice_new/audio/2024/7/30e1cdb01bcd4211b7a3cb682c36614f.mp3",
    tags: ["\u9AD8\u51B7", "\u5FA1\u59D0", "\u6C23\u5834", "\u5C08\u696D"],
    kreadoVoiceId: "zh_female_gaolengyujie_moon_bigtts",
    kreadoVoiceSource: 4
  },
  "mandarin-female-sweet": {
    id: "mandarin-female-sweet",
    name: "\u751C\u7F8E\u5973\u8072",
    gender: "female",
    type: "character",
    language: "mandarin",
    ageGroup: "young",
    style: ["character", "assistant"],
    description: "\u751C\u7F8E\u53EF\u611B\u7684\u5973\u8072\uFF0C\u8072\u97F3\u8EDF\u7CEF\u6709\u89AA\u548C\u529B",
    useCases: ["\u53EF\u611B\u89D2\u8272", "\u5BA2\u670D\u52A9\u624B", "\u751C\u871C\u5167\u5BB9", "\u5C11\u5973\u89D2\u8272"],
    voice: "shimmer",
    sampleText: "\u4F60\u597D\u5440\uFF5E\u6709\u4EC0\u4E48\u53EF\u4EE5\u5E2E\u5230\u4F60\u7684\u5417\uFF1F",
    sampleUrl: "https://aigc-cdn.kreadoai.com/default_voice/audio/bytedance/zh_female_tianmei_moon_bigtts.mp3",
    tags: ["\u751C\u7F8E", "\u53EF\u611B", "\u52A9\u624B", "\u5C11\u5973"],
    kreadoVoiceId: "zh_female_tianmei_moon_bigtts",
    kreadoVoiceSource: 4
  },
  "mandarin-female-news": {
    id: "mandarin-female-news",
    name: "\u65B0\u805E\u5973\u8072",
    gender: "female",
    type: "narrator",
    language: "mandarin",
    ageGroup: "adult",
    style: ["news", "professional"],
    description: "\u6A19\u6E96\u65B0\u805E\u64AD\u5831\u5973\u8072\uFF0C\u8072\u97F3\u6E05\u6670\u5C08\u696D",
    useCases: ["\u65B0\u805E\u64AD\u5831", "\u8CC7\u8A0A\u7BC0\u76EE", "\u6B63\u5F0F\u5834\u5408", "\u5B98\u65B9\u5167\u5BB9"],
    voice: "nova",
    sampleText: "\u5404\u4F4D\u89C2\u4F17\u670B\u53CB\u4EEC\uFF0C\u6B22\u8FCE\u6536\u770B\u4ECA\u5929\u7684\u65B0\u95FB\u8282\u76EE\u3002",
    sampleUrl: "https://aigc-cdn.kreadoai.com/default_voice_new/audio/2024/4/be6804d25bcd482c885b473c074e9513.mp3",
    tags: ["\u65B0\u805E", "\u64AD\u5831", "\u5C08\u696D", "\u6B63\u5F0F"],
    kreadoVoiceId: "BV011_streaming",
    kreadoVoiceSource: 4
  },
  // === 童聲 ===
  "mandarin-child-girl": {
    id: "mandarin-child-girl",
    name: "\u5C0F\u863F\u8389",
    gender: "female",
    type: "character",
    language: "mandarin",
    ageGroup: "child",
    style: ["character", "cartoon"],
    description: "\u53EF\u611B\u751C\u7F8E\u7684\u5973\u7AE5\u8072\uFF0C\u8072\u97F3\u7A1A\u5AE9\u6709\u7AE5\u8DA3",
    useCases: ["\u5152\u7AE5\u89D2\u8272", "\u52D5\u756B\u914D\u97F3", "\u5152\u7AE5\u7BC0\u76EE", "\u7AE5\u8A71\u6545\u4E8B"],
    voice: "shimmer",
    sampleText: "\u5988\u5988\uFF0C\u6211\u60F3\u5403\u51B0\u6DC7\u6DCB\uFF5E",
    sampleUrl: "https://aigc-cdn.kreadoai.com/default_voice_new/audio/2024/4/1537a85c00af4959adc8f641a397a186.mp3",
    tags: ["\u7AE5\u8072", "\u5973\u5B69", "\u53EF\u611B", "\u863F\u8389"],
    kreadoVoiceId: "BV064_streaming",
    kreadoVoiceSource: 4
  },
  "mandarin-child-boy": {
    id: "mandarin-child-boy",
    name: "\u5976\u6C23\u840C\u5A03",
    gender: "male",
    type: "character",
    language: "mandarin",
    ageGroup: "child",
    style: ["character", "cartoon"],
    description: "\u5976\u8072\u5976\u6C23\u7684\u7537\u7AE5\u8072\uFF0C\u8072\u97F3\u7A1A\u5AE9\u53EF\u611B",
    useCases: ["\u5152\u7AE5\u89D2\u8272", "\u52D5\u756B\u914D\u97F3", "\u5152\u7AE5\u7BC0\u76EE", "\u7AE5\u8A71\u6545\u4E8B"],
    voice: "echo",
    sampleText: "\u7238\u7238\uFF0C\u6211\u8981\u73A9\u73A9\u5177\uFF01",
    sampleUrl: "https://aigc-cdn.kreadoai.com/default_voice_new/audio/2024/4/e81cb5aabf964428bddc3815a7e225f7.mp3",
    tags: ["\u7AE5\u8072", "\u7537\u5B69", "\u5976\u6C23", "\u840C\u5A03"],
    kreadoVoiceId: "BV700_streaming",
    kreadoVoiceSource: 4
  },
  "mandarin-child-genius": {
    id: "mandarin-child-genius",
    name: "\u5929\u624D\u7AE5\u8072",
    gender: "male",
    type: "character",
    language: "mandarin",
    ageGroup: "child",
    style: ["character"],
    description: "\u8070\u660E\u4F36\u4FD0\u7684\u7AE5\u8072\uFF0C\u8072\u97F3\u6E05\u8106\u6709\u9748\u6C23",
    useCases: ["\u5C0F\u5929\u624D\u89D2\u8272", "\u6559\u80B2\u5167\u5BB9", "\u5152\u7AE5\u7BC0\u76EE", "\u76CA\u667A\u5167\u5BB9"],
    voice: "echo",
    sampleText: "\u8FD9\u9053\u9898\u6211\u4F1A\uFF01\u7B54\u6848\u662F42\uFF01",
    sampleUrl: "https://aigc-cdn.kreadoai.com/default_voice_new/audio/2024/4/a17d2195284445648d97ecd193f66325.mp3",
    tags: ["\u7AE5\u8072", "\u8070\u660E", "\u5929\u624D", "\u9748\u6C23"],
    kreadoVoiceId: "BV701_streaming",
    kreadoVoiceSource: 4
  },
  // === 老年聲 ===
  "mandarin-elder-male": {
    id: "mandarin-elder-male",
    name: "\u667A\u6167\u8001\u8005",
    gender: "male",
    type: "character",
    language: "mandarin",
    ageGroup: "elder",
    style: ["character", "storytelling"],
    description: "\u6148\u7965\u667A\u6167\u7684\u8001\u5E74\u7537\u8072\uFF0C\u8072\u97F3\u6C89\u7A69\u6709\u6B77\u7DF4",
    useCases: ["\u723A\u723A\u89D2\u8272", "\u667A\u8005\u89D2\u8272", "\u6B77\u53F2\u6545\u4E8B", "\u4EBA\u751F\u54F2\u7406"],
    voice: "fable",
    sampleText: "\u5E74\u8F7B\u4EBA\uFF0C\u542C\u8001\u592B\u7ED9\u4F60\u8BB2\u4E2A\u6545\u4E8B...",
    sampleUrl: "https://aigc-cdn.kreadoai.com/default_voice_new/audio/2024/4/e7dea5e12c9645de90c7531809bf11a4.mp3",
    tags: ["\u8001\u5E74", "\u667A\u6167", "\u723A\u723A", "\u6148\u7965"],
    kreadoVoiceId: "BV157_streaming",
    kreadoVoiceSource: 4
  },
  "mandarin-elder-female": {
    id: "mandarin-elder-female",
    name: "\u6148\u611B\u59E5\u59E5",
    gender: "female",
    type: "character",
    language: "mandarin",
    ageGroup: "elder",
    style: ["character", "storytelling"],
    description: "\u6148\u611B\u6EAB\u6696\u7684\u8001\u5E74\u5973\u8072\uFF0C\u8072\u97F3\u89AA\u5207\u6709\u611B\u610F",
    useCases: ["\u5976\u5976\u89D2\u8272", "\u6148\u6BCD\u89D2\u8272", "\u5BB6\u5EAD\u6545\u4E8B", "\u6EAB\u99A8\u5167\u5BB9"],
    voice: "nova",
    sampleText: "\u4E56\u5B59\u5B50\uFF0C\u6765\u5403\u59E5\u59E5\u505A\u7684\u996D\u3002",
    sampleUrl: "https://aigc-cdn.kreadoai.com/default_voice_new/audio/2024/4/3bdc9ccf0126439b9a12970d69513a8d.mp3",
    tags: ["\u8001\u5E74", "\u6148\u611B", "\u59E5\u59E5", "\u6EAB\u6696"],
    kreadoVoiceId: "BV158_streaming",
    kreadoVoiceSource: 4
  },
  // === 特殊角色 ===
  "mandarin-cartoon-sponge": {
    id: "mandarin-cartoon-sponge",
    name: "\u52D5\u6F2B\u6D77\u7DBF",
    gender: "male",
    type: "character",
    language: "mandarin",
    ageGroup: "child",
    style: ["cartoon"],
    description: "\u6D77\u7DBF\u5BF6\u5BF6\u98A8\u683C\u7684\u8072\u97F3\uFF0C\u8072\u97F3\u641E\u7B11\u6709\u8DA3",
    useCases: ["\u5361\u901A\u89D2\u8272", "\u641E\u7B11\u5167\u5BB9", "\u5152\u7AE5\u52D5\u756B", "\u8DA3\u5473\u914D\u97F3"],
    voice: "echo",
    sampleText: "\u6211\u51C6\u5907\u597D\u4E86\uFF01\u6211\u51C6\u5907\u597D\u4E86\uFF01",
    sampleUrl: "https://aigc-cdn.kreadoai.com/default_voice/audio/bytedance/BV702_streaming.mp3",
    tags: ["\u5361\u901A", "\u641E\u7B11", "\u6D77\u7DBF\u5BF6\u5BF6", "\u8DA3\u5473"],
    kreadoVoiceId: "BV702_streaming",
    kreadoVoiceSource: 4
  },
  "mandarin-cartoon-star": {
    id: "mandarin-cartoon-star",
    name: "\u52D5\u6F2B\u6D77\u661F",
    gender: "male",
    type: "character",
    language: "mandarin",
    ageGroup: "child",
    style: ["cartoon"],
    description: "\u6D3E\u5927\u661F\u98A8\u683C\u7684\u8072\u97F3\uFF0C\u8072\u97F3\u5446\u840C\u6709\u8DA3",
    useCases: ["\u5361\u901A\u89D2\u8272", "\u641E\u7B11\u5167\u5BB9", "\u5152\u7AE5\u52D5\u756B", "\u8DA3\u5473\u914D\u97F3"],
    voice: "echo",
    sampleText: "\u8FD9\u662F\u4EC0\u4E48\uFF1F\u80FD\u5403\u5417\uFF1F",
    sampleUrl: "https://aigc-cdn.kreadoai.com/default_voice/audio/bytedance/BV703_streaming.mp3",
    tags: ["\u5361\u901A", "\u5446\u840C", "\u6D3E\u5927\u661F", "\u8DA3\u5473"],
    kreadoVoiceId: "BV703_streaming",
    kreadoVoiceSource: 4
  }
};
var ENGLISH_VOICE_ACTORS = {
  "english-male-narrator": {
    id: "english-male-narrator",
    name: "Alyx",
    gender: "male",
    type: "narrator",
    language: "english",
    ageGroup: "adult",
    style: ["narrator", "professional"],
    description: "Vibrant British male voice, clear and engaging",
    useCases: ["Documentary narration", "Audiobooks", "Brand promotion", "Educational content"],
    voice: "alloy",
    sampleText: "Welcome to our journey through the fascinating world of science and discovery.",
    sampleUrl: "https://aigc-cdn.kreadoai.com/default_voice/audio/elevenlabs/1BUhH8aaMvGMUdGAmWVM.mp3",
    tags: ["British", "narrator", "professional", "engaging"],
    kreadoVoiceId: "1BUhH8aaMvGMUdGAmWVM",
    kreadoVoiceSource: 21
  },
  "english-male-young": {
    id: "english-male-young",
    name: "Johnny Kid",
    gender: "male",
    type: "character",
    language: "english",
    ageGroup: "young",
    style: ["character", "commercial"],
    description: "Youthful energetic male voice, friendly and approachable",
    useCases: ["Young male characters", "Casual content", "Gaming", "Youth marketing"],
    voice: "echo",
    sampleText: "Hey there! Ready to have some fun?",
    sampleUrl: "https://aigc-cdn.kreadoai.com/default_voice/audio/elevenlabs/8JVbfL6oEdmuxKn5DK2C.mp3",
    tags: ["young", "energetic", "friendly", "casual"],
    kreadoVoiceId: "8JVbfL6oEdmuxKn5DK2C",
    kreadoVoiceSource: 21
  },
  "english-male-mature": {
    id: "english-male-mature",
    name: "Christopher",
    gender: "male",
    type: "character",
    language: "english",
    ageGroup: "middle",
    style: ["character", "professional"],
    description: "Mature authoritative male voice, commanding and trustworthy",
    useCases: ["Authority figures", "Business content", "Father roles", "Corporate narration"],
    voice: "onyx",
    sampleText: "Let me explain the situation clearly and thoroughly.",
    sampleUrl: "https://aigc-cdn.kreadoai.com/default_voice/audio/elevenlabs/G17SuINrv2H9FC6nvetn.mp3",
    tags: ["mature", "authoritative", "professional", "trustworthy"],
    kreadoVoiceId: "G17SuINrv2H9FC6nvetn",
    kreadoVoiceSource: 21
  },
  "english-female-narrator": {
    id: "english-female-narrator",
    name: "Samara X",
    gender: "female",
    type: "narrator",
    language: "english",
    ageGroup: "adult",
    style: ["narrator", "storytelling"],
    description: "Warm elegant female voice, soothing and captivating",
    useCases: ["Audiobook narration", "Documentary", "Brand storytelling", "Meditation content"],
    voice: "nova",
    sampleText: "In the quiet moments of the evening, stories come alive...",
    sampleUrl: "https://aigc-cdn.kreadoai.com/default_voice/audio/elevenlabs/19STyYD15bswVz51nqLf.mp3",
    tags: ["warm", "elegant", "narrator", "soothing"],
    kreadoVoiceId: "19STyYD15bswVz51nqLf",
    kreadoVoiceSource: 21
  },
  "english-female-young": {
    id: "english-female-young",
    name: "Elli",
    gender: "female",
    type: "character",
    language: "english",
    ageGroup: "young",
    style: ["character", "emotional"],
    description: "Sweet gentle female voice, friendly and approachable",
    useCases: ["Young female characters", "Romance stories", "Casual content", "Customer service"],
    voice: "shimmer",
    sampleText: "Oh, that's so lovely! I can't believe it!",
    sampleUrl: "https://aigc-cdn.kreadoai.com/default_voice/audio/elevenlabs/09AoN6tYyW3VSTQqCo7C.mp3",
    tags: ["sweet", "gentle", "friendly", "young"],
    kreadoVoiceId: "09AoN6tYyW3VSTQqCo7C",
    kreadoVoiceSource: 21
  },
  "english-female-mature": {
    id: "english-female-mature",
    name: "Dorothy",
    gender: "female",
    type: "character",
    language: "english",
    ageGroup: "middle",
    style: ["character", "professional"],
    description: "Classic elegant female voice, warm and sophisticated",
    useCases: ["Mature female characters", "Classic stories", "Luxury brands", "Professional content"],
    voice: "nova",
    sampleText: "There's no place like home, my dear.",
    sampleUrl: "https://aigc-cdn.kreadoai.com/default_voice/audio/elevenlabs/Se2Vw1WbHmGbBbyWTuu4.mp3",
    tags: ["classic", "elegant", "warm", "sophisticated"],
    kreadoVoiceId: "Se2Vw1WbHmGbBbyWTuu4",
    kreadoVoiceSource: 21
  },
  // === 童聲 ===
  "english-child-boy": {
    id: "english-child-boy",
    name: "Tommy Boy",
    gender: "male",
    type: "character",
    language: "english",
    ageGroup: "child",
    style: ["character", "cartoon"],
    description: "Cute energetic boy voice, playful and cheerful",
    useCases: ["Children characters", "Animation dubbing", "Kids shows", "Fairy tales"],
    voice: "echo",
    sampleText: "Mommy, can I have some ice cream please?",
    sampleUrl: "https://aigc-cdn.kreadoai.com/default_voice/audio/elevenlabs/8JVbfL6oEdmuxKn5DK2C.mp3",
    tags: ["child", "boy", "cute", "energetic"],
    kreadoVoiceId: "8JVbfL6oEdmuxKn5DK2C",
    kreadoVoiceSource: 21
  },
  "english-child-girl": {
    id: "english-child-girl",
    name: "Lily Girl",
    gender: "female",
    type: "character",
    language: "english",
    ageGroup: "child",
    style: ["character", "cartoon"],
    description: "Sweet adorable girl voice, innocent and charming",
    useCases: ["Children characters", "Animation dubbing", "Kids shows", "Fairy tales"],
    voice: "shimmer",
    sampleText: "Daddy, look at my pretty dress!",
    sampleUrl: "https://aigc-cdn.kreadoai.com/default_voice/audio/elevenlabs/09AoN6tYyW3VSTQqCo7C.mp3",
    tags: ["child", "girl", "sweet", "adorable"],
    kreadoVoiceId: "09AoN6tYyW3VSTQqCo7C",
    kreadoVoiceSource: 21
  }
};
var CLONE_VOICE_ACTORS = {
  "clone-po": {
    id: "clone-po",
    name: "PO \u514B\u9686\u8072\u97F3",
    gender: "male",
    type: "narrator",
    language: "clone",
    ageGroup: "adult",
    style: ["narrator", "storytelling"],
    description: "PO \u7684\u514B\u9686\u8A9E\u97F3\uFF0C\u7CB5\u8A9E\u767C\u97F3\uFF0C\u8072\u97F3\u81EA\u7136\u771F\u5BE6",
    useCases: ["\u500B\u4EBA\u54C1\u724C", "\u81EA\u5A92\u9AD4\u5167\u5BB9", "\u65C1\u767D\u6558\u8FF0", "\u500B\u6027\u5316\u914D\u97F3"],
    voice: "alloy",
    sampleText: "\u5927\u5BB6\u597D\uFF0C\u6B61\u8FCE\u569F\u5230\u6211\u5605\u983B\u9053\u3002",
    sampleUrl: "https://aigc-cdn.kreadoai.com/default_voice/audio/2025/12/eaf6d307ffaf43a694f487dbfd138bc7.mp3",
    tags: ["\u514B\u9686", "PO", "\u7CB5\u8A9E", "\u65C1\u767D", "\u500B\u4EBA"],
    kreadoVoiceId: "Minimax919724_52965111962639",
    kreadoVoiceSource: 5
  }
};
var ALL_VOICE_ACTORS = {
  ...CANTONESE_VOICE_ACTORS,
  ...MANDARIN_VOICE_ACTORS,
  ...ENGLISH_VOICE_ACTORS,
  ...CLONE_VOICE_ACTORS
};
function filterByLanguage(language) {
  return Object.values(ALL_VOICE_ACTORS).filter((actor) => actor.language === language);
}
function filterByGender(gender) {
  return Object.values(ALL_VOICE_ACTORS).filter((actor) => actor.gender === gender);
}
function filterByAgeGroup(ageGroup) {
  return Object.values(ALL_VOICE_ACTORS).filter((actor) => actor.ageGroup === ageGroup);
}
function filterByStyle(style) {
  return Object.values(ALL_VOICE_ACTORS).filter((actor) => actor.style.includes(style));
}
function filterVoiceActors(options) {
  let result = Object.values(ALL_VOICE_ACTORS);
  if (options.language) {
    result = result.filter((actor) => actor.language === options.language);
  }
  if (options.gender) {
    result = result.filter((actor) => actor.gender === options.gender);
  }
  if (options.ageGroup) {
    result = result.filter((actor) => actor.ageGroup === options.ageGroup);
  }
  if (options.style) {
    result = result.filter((actor) => options.style && actor.style.includes(options.style));
  }
  return result;
}
function getVoiceActorStats() {
  const actors = Object.values(ALL_VOICE_ACTORS);
  return {
    total: actors.length,
    byLanguage: {
      cantonese: actors.filter((a) => a.language === "cantonese").length,
      mandarin: actors.filter((a) => a.language === "mandarin").length,
      english: actors.filter((a) => a.language === "english").length,
      clone: actors.filter((a) => a.language === "clone").length
    },
    byGender: {
      male: actors.filter((a) => a.gender === "male").length,
      female: actors.filter((a) => a.gender === "female").length
    },
    byAgeGroup: {
      child: actors.filter((a) => a.ageGroup === "child").length,
      teen: actors.filter((a) => a.ageGroup === "teen").length,
      young: actors.filter((a) => a.ageGroup === "young").length,
      adult: actors.filter((a) => a.ageGroup === "adult").length,
      middle: actors.filter((a) => a.ageGroup === "middle").length,
      elder: actors.filter((a) => a.ageGroup === "elder").length
    }
  };
}

// server/voiceService.ts
function getVoiceActorConfig(voiceActorId) {
  return ALL_VOICE_ACTORS[voiceActorId];
}
function getAllVoiceActorsConfig() {
  return Object.values(ALL_VOICE_ACTORS);
}
function getVoiceActorsByGender(gender) {
  return filterByGender(gender);
}
function getVoiceActorsByType(type) {
  return Object.values(ALL_VOICE_ACTORS).filter((actor) => actor.type === type);
}
function getVoiceActorsByAgeGroup(ageGroup) {
  return filterByAgeGroup(ageGroup);
}
function getVoiceActorsByStyle(style) {
  return filterByStyle(style);
}
function filterVoiceActorsAdvanced(options) {
  let result = filterVoiceActors({
    language: options.language,
    gender: options.gender,
    ageGroup: options.ageGroup,
    style: options.style
  });
  if (options.searchText) {
    const searchLower = options.searchText.toLowerCase();
    result = result.filter(
      (actor) => actor.name.toLowerCase().includes(searchLower) || actor.description.toLowerCase().includes(searchLower) || actor.tags.some((tag) => tag.toLowerCase().includes(searchLower)) || actor.useCases.some((useCase) => useCase.toLowerCase().includes(searchLower))
    );
  }
  return result;
}
function getVoiceStats() {
  return getVoiceActorStats();
}
function getVoiceActorSampleUrl(voiceActorId) {
  const actor = ALL_VOICE_ACTORS[voiceActorId];
  return actor?.sampleUrl;
}
function getAllSampleUrls() {
  return Object.values(ALL_VOICE_ACTORS).filter((actor) => actor.sampleUrl).map((actor) => ({
    id: actor.id,
    name: actor.name,
    sampleUrl: actor.sampleUrl
  }));
}
function matchVoiceActorByDescription(characterDescription, language = "cantonese") {
  const description = characterDescription.toLowerCase();
  const languageActors = filterByLanguage(language);
  for (const [keyword, voiceActorId] of Object.entries(VOICE_MATCHING_RULES.keywords)) {
    if (description.includes(keyword)) {
      const matchedActor = languageActors.find((a) => a.id.includes(voiceActorId.split("-").slice(1).join("-")));
      if (matchedActor) return matchedActor.id;
    }
  }
  const isFemale = /女|她|母|媽|姐|妹|婆|嬸|姑|姨|小姐|女士|公主|皇后|女王|female|woman|girl|queen|princess/.test(description);
  const isMale = /男|他|父|爸|哥|弟|公|叔|伯|舅|先生|王子|皇帝|國王|male|man|boy|king|prince/.test(description);
  const isChild = /小|孩|童|兒|幼|寶|child|kid|baby/.test(description);
  const isElderly = /老|年邁|年長|爺|奶|婆|公|elderly|old|senior/.test(description);
  const isTeen = /少年|少女|青年|teenager|teen|young/.test(description);
  let filteredActors = languageActors;
  if (isChild) {
    filteredActors = filteredActors.filter((a) => a.ageGroup === "child");
  } else if (isElderly) {
    filteredActors = filteredActors.filter((a) => a.ageGroup === "elder");
  } else if (isTeen) {
    filteredActors = filteredActors.filter((a) => a.ageGroup === "teen" || a.ageGroup === "young");
  }
  if (isFemale) {
    filteredActors = filteredActors.filter((a) => a.gender === "female");
  } else if (isMale) {
    filteredActors = filteredActors.filter((a) => a.gender === "male");
  }
  if (filteredActors.length > 0) {
    return filteredActors[0].id;
  }
  const prefix = language === "cantonese" ? "cantonese" : language === "mandarin" ? "mandarin" : "english";
  return `${prefix}-male-narrator`;
}
function autoAssignVoiceActors(characters2, existingBindings, language = "cantonese") {
  const result = [];
  const usedVoiceActors = /* @__PURE__ */ new Set();
  if (existingBindings) {
    for (const binding of existingBindings) {
      usedVoiceActors.add(binding.voiceActorId);
    }
  }
  for (const character of characters2) {
    const existingBinding = existingBindings?.find(
      (b) => b.characterName.toLowerCase() === character.name.toLowerCase()
    );
    if (existingBinding) {
      result.push(existingBinding);
      continue;
    }
    let voiceActorId = matchVoiceActorByDescription(character.description || character.name, language);
    if (usedVoiceActors.has(voiceActorId)) {
      const actor = ALL_VOICE_ACTORS[voiceActorId];
      if (actor) {
        const alternatives = filterVoiceActors({
          language: actor.language,
          gender: actor.gender,
          ageGroup: actor.ageGroup
        }).filter((a) => !usedVoiceActors.has(a.id));
        if (alternatives.length > 0) {
          voiceActorId = alternatives[0].id;
        }
      }
    }
    usedVoiceActors.add(voiceActorId);
    result.push({
      characterName: character.name,
      characterDescription: character.description,
      voiceActorId,
      isAutoMatched: true
    });
  }
  return result;
}
async function analyzeCharactersFromStory(story, llmModel = "gpt-4o-mini") {
  const { invokeLLM: invokeLLM2 } = await Promise.resolve().then(() => (init_llm(), llm_exports));
  const response = await invokeLLM2({
    messages: [
      {
        role: "system",
        content: `\u4F60\u662F\u4E00\u500B\u5C08\u696D\u7684\u6545\u4E8B\u5206\u6790\u5E2B\u3002\u8ACB\u5206\u6790\u6545\u4E8B\u4E2D\u7684\u89D2\u8272\uFF0C\u63D0\u53D6\u89D2\u8272\u540D\u7A31\u548C\u63CF\u8FF0\u3002
\u8FD4\u56DE JSON \u683C\u5F0F\uFF1A
{
  "characters": [
    { "name": "\u89D2\u8272\u540D", "description": "\u89D2\u8272\u63CF\u8FF0\uFF08\u5305\u62EC\u6027\u5225\u3001\u5E74\u9F61\u3001\u6027\u683C\u7279\u9EDE\u7B49\uFF09" }
  ]
}
\u53EA\u8FD4\u56DE JSON\uFF0C\u4E0D\u8981\u5176\u4ED6\u5167\u5BB9\u3002`
      },
      {
        role: "user",
        content: `\u8ACB\u5206\u6790\u4EE5\u4E0B\u6545\u4E8B\u4E2D\u7684\u89D2\u8272\uFF1A

${story}`
      }
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "character_analysis",
        strict: true,
        schema: {
          type: "object",
          properties: {
            characters: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  description: { type: "string" }
                },
                required: ["name", "description"],
                additionalProperties: false
              }
            }
          },
          required: ["characters"],
          additionalProperties: false
        }
      }
    }
  });
  try {
    const content = response.choices[0].message.content;
    const contentStr = typeof content === "string" ? content : JSON.stringify(content);
    const parsed = JSON.parse(contentStr);
    return parsed.characters || [];
  } catch (error) {
    console.error("\u89E3\u6790\u89D2\u8272\u5206\u6790\u7D50\u679C\u5931\u6557:", error);
    return [];
  }
}
function getFilterOptions() {
  return {
    languages: [
      { value: "cantonese", label: "\u7CB5\u8A9E", icon: "\u{1F1ED}\u{1F1F0}" },
      { value: "mandarin", label: "\u666E\u901A\u8A71", icon: "\u{1F1E8}\u{1F1F3}" },
      { value: "english", label: "English", icon: "\u{1F1FA}\u{1F1F8}" },
      { value: "clone", label: "\u514B\u9686\u8072\u97F3", icon: "\u{1F3AD}" }
    ],
    genders: [
      { value: "male", label: "\u7537\u8072", icon: "\u{1F468}" },
      { value: "female", label: "\u5973\u8072", icon: "\u{1F469}" }
    ],
    ageGroups: [
      { value: "child", label: "\u7AE5\u8072", icon: "\u{1F476}" },
      { value: "teen", label: "\u5C11\u5E74", icon: "\u{1F9D2}" },
      { value: "young", label: "\u9752\u5E74", icon: "\u{1F471}" },
      { value: "adult", label: "\u6210\u5E74", icon: "\u{1F9D1}" },
      { value: "middle", label: "\u4E2D\u5E74", icon: "\u{1F468}\u200D\u{1F4BC}" },
      { value: "elder", label: "\u8001\u5E74", icon: "\u{1F474}" }
    ],
    styles: [
      { value: "narrator", label: "\u65C1\u767D", icon: "\u{1F399}\uFE0F" },
      { value: "character", label: "\u89D2\u8272", icon: "\u{1F3AD}" },
      { value: "news", label: "\u65B0\u805E", icon: "\u{1F4F0}" },
      { value: "commercial", label: "\u5EE3\u544A", icon: "\u{1F4E2}" },
      { value: "storytelling", label: "\u6545\u4E8B", icon: "\u{1F4D6}" },
      { value: "assistant", label: "\u52A9\u624B", icon: "\u{1F916}" },
      { value: "cartoon", label: "\u5361\u901A", icon: "\u{1F3A8}" },
      { value: "emotional", label: "\u60C5\u611F", icon: "\u{1F495}" },
      { value: "professional", label: "\u5C08\u696D", icon: "\u{1F4BC}" }
    ]
  };
}

// server/routers.ts
init_videoConfig();

// server/characterService.ts
init_videoConfig();
init_storage();
async function analyzeCharacterPhoto(photoUrl) {
  const apiKey = getNextApiKey();
  const systemPrompt = `\u4F60\u662F\u4E00\u500B\u5C08\u696D\u7684\u4EBA\u7269\u7279\u5FB5\u5206\u6790\u5E2B\u3002\u8ACB\u4ED4\u7D30\u5206\u6790\u7167\u7247\u4E2D\u7684\u4EBA\u7269\uFF0C\u63D0\u53D6\u8A73\u7D30\u7684\u5916\u89C0\u7279\u5FB5\u3002
\u4F60\u7684\u5206\u6790\u5C07\u7528\u65BC\u751F\u6210 Midjourney \u63D0\u793A\u8A5E\uFF0C\u4EE5\u5275\u5EFA\u98A8\u683C\u5316\u7684\u89D2\u8272\u57FA\u790E\u5716\u3002

\u8ACB\u4EE5 JSON \u683C\u5F0F\u8FD4\u56DE\u5206\u6790\u7D50\u679C\uFF0C\u5305\u542B\u4EE5\u4E0B\u6B04\u4F4D\uFF1A
- gender: \u6027\u5225\uFF08male/female/other\uFF09
- ageRange: \u5E74\u9F61\u7BC4\u570D\uFF08\u5982 "20-25\u6B72", "30-35\u6B72"\uFF09
- ethnicity: \u65CF\u88D4\u5916\u89C0\uFF08\u5982 "\u6771\u4E9E", "\u6B50\u7F8E", "\u5357\u4E9E"\uFF09
- hairStyle: \u9AEE\u578B\u63CF\u8FF0\uFF08\u5982 "\u77ED\u9AEE", "\u9577\u76F4\u9AEE", "\u6372\u9AEE"\uFF09
- hairColor: \u9AEE\u8272\uFF08\u5982 "\u9ED1\u8272", "\u68D5\u8272", "\u91D1\u8272"\uFF09
- facialFeatures: \u9762\u90E8\u7279\u5FB5\uFF08\u5982 "\u5713\u81C9", "\u9AD8\u9F3B\u6A11", "\u5927\u773C\u775B"\uFF09
- bodyType: \u9AD4\u578B\uFF08\u5982 "\u82D7\u689D", "\u5065\u58EF", "\u666E\u901A"\uFF09
- clothing: \u670D\u88DD\u63CF\u8FF0\uFF08\u5982\u679C\u53EF\u898B\uFF09
- accessories: \u914D\u4EF6\uFF08\u5982 "\u773C\u93E1", "\u8033\u74B0", "\u5E3D\u5B50"\uFF09
- overallStyle: \u6574\u9AD4\u98A8\u683C\u5370\u8C61
- mjPrompt: \u57FA\u65BC\u4EE5\u4E0A\u5206\u6790\u751F\u6210\u7684 Midjourney \u63D0\u793A\u8A5E\uFF08\u82F1\u6587\uFF0C\u7528\u65BC\u751F\u6210\u89D2\u8272\u57FA\u790E\u5716\uFF09

mjPrompt \u61C9\u8A72\u662F\u4E00\u500B\u8A73\u7D30\u7684\u82F1\u6587\u63CF\u8FF0\uFF0C\u683C\u5F0F\u5982\uFF1A
"A [age] [ethnicity] [gender] with [hair description], [facial features], [body type], [clothing], [style], portrait, high quality, detailed face"`;
  const userPrompt = `\u8ACB\u5206\u6790\u9019\u5F35\u7167\u7247\u4E2D\u7684\u4EBA\u7269\u7279\u5FB5\uFF1A${photoUrl}`;
  const modelsToTry = ["claude-opus-4-5-20251101", "gpt-5.2"];
  let lastError = null;
  let result = null;
  for (const model of modelsToTry) {
    try {
      console.log(`[Character] \u4F7F\u7528\u6A21\u578B ${model} \u5206\u6790\u7167\u7247...`);
      const response = await fetch(`${API_ENDPOINTS.vectorEngine}/v1/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: systemPrompt },
            {
              role: "user",
              content: [
                { type: "text", text: userPrompt },
                { type: "image_url", image_url: { url: photoUrl } }
              ]
            }
          ],
          response_format: { type: "json_object" }
        })
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API \u8ABF\u7528\u5931\u6557: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      if (!content) {
        throw new Error("LLM \u8FD4\u56DE\u5167\u5BB9\u70BA\u7A7A");
      }
      result = JSON.parse(content);
      console.log(`[Character] \u6A21\u578B ${model} \u5206\u6790\u6210\u529F`);
      break;
    } catch (error) {
      lastError = error;
      console.warn(`[Character] \u6A21\u578B ${model} \u5931\u6557:`, error);
    }
  }
  if (!result) {
    throw lastError || new Error("\u6240\u6709 LLM \u6A21\u578B\u90FD\u5931\u6557");
  }
  return result;
}
async function generateCharacterBaseImage(mjPrompt, originalPhotoUrl) {
  const apiKey = getNextApiKey();
  let fullPrompt = `${mjPrompt} --ar 1:1 --v 6.1 --style raw`;
  if (originalPhotoUrl) {
    fullPrompt = `${mjPrompt} --cref ${originalPhotoUrl} --cw 80 --ar 1:1 --v 6.1 --style raw`;
  }
  console.log(`[Character] \u751F\u6210\u89D2\u8272\u57FA\u790E\u5716\uFF0C\u63D0\u793A\u8A5E: ${fullPrompt}`);
  const submitResponse = await fetch(`${API_ENDPOINTS.vectorEngine}/mj/submit/imagine`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      prompt: fullPrompt,
      notifyHook: ""
    })
  });
  if (!submitResponse.ok) {
    const errorText = await submitResponse.text();
    throw new Error(`Midjourney \u63D0\u4EA4\u5931\u6557: ${submitResponse.status} - ${errorText}`);
  }
  const submitData = await submitResponse.json();
  const taskId = submitData.result;
  if (!taskId) {
    throw new Error("Midjourney \u4EFB\u52D9 ID \u70BA\u7A7A");
  }
  console.log(`[Character] Midjourney \u4EFB\u52D9\u5DF2\u63D0\u4EA4: ${taskId}`);
  for (let i = 0; i < 60; i++) {
    await sleep2(3e3);
    const queryResponse = await fetch(
      `${API_ENDPOINTS.vectorEngine}/mj/task/${taskId}/fetch`,
      { headers: { "Authorization": `Bearer ${apiKey}` } }
    );
    if (!queryResponse.ok) continue;
    const data = await queryResponse.json();
    if (data.status === "SUCCESS" && data.imageUrl) {
      console.log(`[Character] \u89D2\u8272\u57FA\u790E\u5716\u751F\u6210\u6210\u529F: ${data.imageUrl}`);
      return data.imageUrl;
    }
    if (data.status === "FAILURE") {
      throw new Error(`Midjourney \u4EFB\u52D9\u5931\u6557: ${data.failReason || "\u672A\u77E5\u932F\u8AA4"}`);
    }
    console.log(`[Character] \u7B49\u5F85\u4E2D... \u72C0\u614B: ${data.status}, \u9032\u5EA6: ${data.progress || 0}%`);
  }
  throw new Error("Midjourney \u4EFB\u52D9\u8D85\u6642");
}
async function identifyCharactersInStory(story, availableCharacters) {
  const apiKey = getNextApiKey();
  const characterList = availableCharacters.map(
    (c) => `- ${c.name}${c.description ? ` (${c.description})` : ""}`
  ).join("\n");
  const systemPrompt = `\u4F60\u662F\u4E00\u500B\u6545\u4E8B\u5206\u6790\u5E2B\u3002\u8ACB\u5206\u6790\u6545\u4E8B\u4E2D\u51FA\u73FE\u7684\u89D2\u8272\uFF0C\u4E26\u5339\u914D\u5230\u7528\u6236\u7684\u89D2\u8272\u5EAB\u3002

\u7528\u6236\u7684\u89D2\u8272\u5EAB\uFF1A
${characterList || "\uFF08\u7A7A\uFF09"}

\u8ACB\u4EE5 JSON \u683C\u5F0F\u8FD4\u56DE\uFF1A
{
  "characters": [
    {
      "characterName": "\u6545\u4E8B\u4E2D\u7684\u89D2\u8272\u540D\u7A31",
      "matchedCharacterId": \u89D2\u8272\u5EAB\u4E2D\u5339\u914D\u7684 ID\uFF08\u5982\u679C\u6C92\u6709\u5339\u914D\u5247\u70BA null\uFF09,
      "scenes": [\u51FA\u73FE\u7684\u5834\u666F\u7DE8\u865F\u5217\u8868]
    }
  ]
}

\u6CE8\u610F\uFF1A
1. \u89D2\u8272\u540D\u7A31\u53EF\u80FD\u6709\u8B8A\u9AD4\uFF08\u5982 "\u5C0F\u660E" \u548C "\u660E"\uFF09\uFF0C\u8ACB\u667A\u80FD\u5339\u914D
2. \u5982\u679C\u89D2\u8272\u5EAB\u4E2D\u6C92\u6709\u5C0D\u61C9\u89D2\u8272\uFF0CmatchedCharacterId \u8A2D\u70BA null
3. scenes \u662F\u89D2\u8272\u51FA\u73FE\u7684\u5834\u666F\u7DE8\u865F\uFF08\u5F9E 1 \u958B\u59CB\uFF09`;
  const response = await fetch(`${API_ENDPOINTS.vectorEngine}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-5.2",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `\u6545\u4E8B\u5167\u5BB9\uFF1A
${story}` }
      ],
      response_format: { type: "json_object" }
    })
  });
  if (!response.ok) {
    throw new Error(`\u89D2\u8272\u8B58\u5225\u5931\u6557: ${response.status}`);
  }
  const data = await response.json();
  const content = data.choices[0]?.message?.content;
  if (!content) {
    throw new Error("LLM \u8FD4\u56DE\u5167\u5BB9\u70BA\u7A7A");
  }
  const result = JSON.parse(content);
  return result.characters.map((c) => ({
    characterName: c.characterName,
    characterId: c.matchedCharacterId,
    scenes: c.scenes || []
  }));
}
async function uploadCharacterPhoto(fileBuffer, fileName, contentType, userId) {
  const timestamp2 = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  const extension = fileName.split(".").pop() || "jpg";
  const key = `characters/${userId}/${timestamp2}-${randomSuffix}.${extension}`;
  const { url } = await storagePut(key, fileBuffer, contentType);
  console.log(`[Character] \u7167\u7247\u5DF2\u4E0A\u50B3: ${url}`);
  return url;
}
function sleep2(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// server/memoryStore.ts
var MemoryStore = class {
  videoTasks = /* @__PURE__ */ new Map();
  longVideoTasks = /* @__PURE__ */ new Map();
  characters = /* @__PURE__ */ new Map();
  nextVideoTaskId = 1;
  nextCharacterId = 1;
  // Video Tasks
  createVideoTask(data) {
    const task = {
      ...data,
      id: this.nextVideoTaskId++,
      errorMessage: null,
      scenes: null,
      finalVideoUrl: null,
      currentStep: null,
      totalScenes: null,
      completedScenes: null,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.videoTasks.set(task.id, task);
    console.log(`[MemoryStore] Created video task ${task.id}`);
    return task;
  }
  getVideoTask(id) {
    return this.videoTasks.get(id);
  }
  updateVideoTask(id, updates) {
    const task = this.videoTasks.get(id);
    if (task) {
      Object.assign(task, updates, { updatedAt: /* @__PURE__ */ new Date() });
      this.videoTasks.set(id, task);
      console.log(`[MemoryStore] Updated video task ${id}:`, updates.status || updates.progress);
    }
    return task;
  }
  getVideoTasksByUser(userId) {
    return Array.from(this.videoTasks.values()).filter((t2) => t2.userId === userId).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  // Long Video Tasks
  createLongVideoTask(data) {
    const task = {
      ...data,
      finalVideoUrl: null,
      errorMessage: null,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.longVideoTasks.set(task.id, task);
    console.log(`[MemoryStore] Created long video task ${task.id}`);
    return task;
  }
  getLongVideoTask(id) {
    return this.longVideoTasks.get(id);
  }
  updateLongVideoTask(id, updates) {
    const task = this.longVideoTasks.get(id);
    if (task) {
      Object.assign(task, updates, { updatedAt: /* @__PURE__ */ new Date() });
      this.longVideoTasks.set(id, task);
      console.log(`[MemoryStore] Updated long video task ${id}:`, updates.status || updates.completedSegments);
    }
    return task;
  }
  getLongVideoTasksByUser(userId) {
    return Array.from(this.longVideoTasks.values()).filter((t2) => t2.userId === userId).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  // Characters
  createCharacter(data) {
    const character = {
      ...data,
      id: this.nextCharacterId++,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.characters.set(character.id, character);
    console.log(`[MemoryStore] Created character ${character.id}`);
    return character;
  }
  getCharacter(id) {
    return this.characters.get(id);
  }
  getCharactersByUser(userId) {
    return Array.from(this.characters.values()).filter((c) => c.userId === userId).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  getCharactersByIds(ids) {
    return ids.map((id) => this.characters.get(id)).filter((c) => c !== void 0);
  }
  updateCharacter(id, updates) {
    const character = this.characters.get(id);
    if (character) {
      Object.assign(character, updates);
      this.characters.set(id, character);
    }
    return character;
  }
  deleteCharacter(id) {
    return this.characters.delete(id);
  }
};
var memoryStore = new MemoryStore();

// server/routers.ts
var appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true };
    })
  }),
  // 視頻生成相關路由
  video: router({
    // 獲取配置信息
    getConfig: publicProcedure.query(() => ({
      speedModePresets: MODE_PRESETS,
      storyModePresets: STORY_MODE_PRESETS,
      videoModels: VIDEO_MODELS,
      llmModels: LLM_MODELS
    })),
    // 創建視頻生成任務 (暫時改為 public 以便測試)
    create: publicProcedure.input(z2.object({
      speedMode: z2.enum(["fast", "quality"]),
      storyMode: z2.enum(["character", "scene"]).default("character"),
      story: z2.string().min(5, "\u6545\u4E8B\u81F3\u5C11\u9700\u8981 5 \u500B\u5B57\u7B26"),
      characterDescription: z2.string().optional(),
      visualStyle: z2.string().optional(),
      videoModel: z2.string().optional(),
      llmModel: z2.string().optional(),
      language: z2.enum(["cantonese", "mandarin", "english"]).default("cantonese"),
      voiceActorId: z2.string().default("cantonese-male-narrator"),
      // 角色庫支持
      selectedCharacterIds: z2.array(z2.number()).optional()
      // 選擇的角色 ID 列表
    })).mutation(async ({ ctx, input }) => {
      const userId = ctx.user?.id ?? 0;
      const preset = MODE_PRESETS[input.speedMode];
      const videoModel = input.videoModel || preset.video;
      const llmModel = input.llmModel || preset.llm;
      let selectedCharacters = [];
      if (input.selectedCharacterIds && input.selectedCharacterIds.length > 0) {
        const chars = memoryStore.getCharactersByIds(input.selectedCharacterIds);
        selectedCharacters = chars.filter(
          (c) => c.userId === userId && c.status === "ready"
        ).map((c) => ({
          id: c.id,
          name: c.name,
          description: c.description,
          baseImageUrl: c.baseImageUrl,
          voiceActorId: c.voiceActorId
        }));
      }
      const task = memoryStore.createVideoTask({
        userId,
        mode: input.speedMode,
        storyMode: input.storyMode,
        videoModel,
        llmModel,
        story: input.story,
        characterDescription: input.characterDescription || null,
        visualStyle: input.visualStyle || null,
        language: input.language,
        status: "pending",
        progress: 0
      });
      const taskId = task.id;
      startVideoGeneration(
        taskId,
        { ...input, selectedCharacters },
        videoModel,
        llmModel,
        preset.mjMode,
        input.storyMode,
        input.language,
        input.voiceActorId
      );
      return { taskId, message: "\u4EFB\u52D9\u5DF2\u5275\u5EFA\uFF0C\u6B63\u5728\u751F\u6210\u4E2D..." };
    }),
    // 獲取任務狀態（使用內存存儲）
    getStatus: publicProcedure.input(z2.object({ taskId: z2.number() })).query(async ({ ctx, input }) => {
      const task = memoryStore.getVideoTask(input.taskId);
      if (!task) {
        throw new Error("\u4EFB\u52D9\u4E0D\u5B58\u5728");
      }
      const userId = ctx.user?.id ?? 0;
      if (userId !== 0 && task.userId !== userId) {
        throw new Error("\u7121\u6B0A\u8A2A\u554F\u6B64\u4EFB\u52D9");
      }
      return task;
    }),
    // 獲取用戶的生成歷史（使用內存存儲）
    getHistory: publicProcedure.input(z2.object({
      limit: z2.number().min(1).max(50).default(10),
      offset: z2.number().min(0).default(0)
    })).query(async ({ ctx, input }) => {
      const userId = ctx.user?.id ?? 0;
      const allTasks = memoryStore.getVideoTasksByUser(userId);
      const tasks = allTasks.slice(input.offset, input.offset + input.limit);
      return tasks;
    }),
    // 刪除任務
    delete: protectedProcedure.input(z2.object({ taskId: z2.number() })).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("\u6578\u64DA\u5EAB\u4E0D\u53EF\u7528");
      const tasks = await db.select().from(videoTasks).where(eq2(videoTasks.id, input.taskId)).limit(1);
      if (tasks.length === 0 || tasks[0].userId !== ctx.user.id) {
        throw new Error("\u7121\u6B0A\u522A\u9664\u6B64\u4EFB\u52D9");
      }
      await db.delete(videoTasks).where(eq2(videoTasks.id, input.taskId));
      return { success: true };
    }),
    // 合併視頻
    merge: protectedProcedure.input(z2.object({
      taskId: z2.number(),
      bgmType: z2.enum(["none", "cinematic", "emotional", "upbeat", "dramatic", "peaceful"]).default("none"),
      subtitleStyle: z2.enum(["none", "bottom", "top", "cinematic"]).default("none")
    })).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("\u6578\u64DA\u5EAB\u4E0D\u53EF\u7528");
      const tasks = await db.select().from(videoTasks).where(eq2(videoTasks.id, input.taskId)).limit(1);
      if (tasks.length === 0 || tasks[0].userId !== ctx.user.id) {
        throw new Error("\u7121\u6B0A\u8A2A\u554F\u6B64\u4EFB\u52D9");
      }
      const task = tasks[0];
      const scenes = task.scenes || [];
      const videoUrls = scenes.filter((s) => s.status === "completed" && s.videoUrl).map((s) => s.videoUrl);
      const narrations = scenes.filter((s) => s.status === "completed" && s.videoUrl).map((s) => s.narration);
      if (videoUrls.length === 0) {
        throw new Error("\u6C92\u6709\u53EF\u5408\u4F75\u7684\u8996\u983B");
      }
      const result = await mergeVideos({
        videoUrls,
        narrations,
        bgmType: input.bgmType,
        subtitleStyle: input.subtitleStyle
      });
      if (result.success && result.videoUrl) {
        await db.update(videoTasks).set({ finalVideoUrl: result.videoUrl }).where(eq2(videoTasks.id, input.taskId));
        return { success: true, videoUrl: result.videoUrl };
      }
      return { success: false, error: result.error };
    }),
    // 獲取合併選項
    getMergeOptions: publicProcedure.query(() => ({
      bgmOptions: BGM_OPTIONS,
      subtitleStyles: SUBTITLE_STYLES
    })),
    // 生成 SEO 內容
    generateSeo: publicProcedure.input(z2.object({
      story: z2.string().min(5, "\u6545\u4E8B\u81F3\u5C11\u9700\u8981 5 \u500B\u5B57\u7B26"),
      language: z2.enum(["zh-TW", "zh-CN", "en", "ja", "ko", "cantonese", "mandarin", "english"]).default("zh-TW"),
      platform: z2.enum(["youtube", "tiktok", "instagram", "facebook", "general"]).default("youtube"),
      model: z2.enum(["gpt-5.2", "claude-opus-4-5-20251101", "gemini-3-pro-preview"]).optional(),
      targetAudience: z2.string().optional(),
      videoStyle: z2.string().optional(),
      duration: z2.number().optional()
    })).mutation(async ({ input }) => {
      try {
        console.log("[SEO] \u958B\u59CB\u751F\u6210 SEO \u5167\u5BB9...");
        const { generateSeoWithFallback: generateSeoWithFallback2 } = await Promise.resolve().then(() => (init_seoService(), seoService_exports));
        const result = await generateSeoWithFallback2({
          story: input.story,
          language: input.language,
          platform: input.platform,
          model: input.model,
          targetAudience: input.targetAudience,
          videoStyle: input.videoStyle,
          duration: input.duration
        });
        console.log("[SEO] SEO \u5167\u5BB9\u751F\u6210\u6210\u529F");
        return { success: true, data: result };
      } catch (error) {
        console.error("[SEO] \u751F\u6210\u5931\u6557:", error);
        return { success: false, error: error instanceof Error ? error.message : "SEO \u751F\u6210\u5931\u6557" };
      }
    }),
    // 快速生成標題
    generateTitles: publicProcedure.input(z2.object({
      story: z2.string().min(5, "\u6545\u4E8B\u81F3\u5C11\u9700\u8981 5 \u500B\u5B57\u7B26"),
      language: z2.enum(["zh-TW", "zh-CN", "en", "ja", "ko", "cantonese", "mandarin", "english"]).default("zh-TW"),
      platform: z2.enum(["youtube", "tiktok", "instagram", "facebook", "general"]).default("youtube"),
      model: z2.enum(["gpt-5.2", "claude-opus-4-5-20251101", "gemini-3-pro-preview"]).optional(),
      count: z2.number().min(1).max(10).default(5)
    })).mutation(async ({ input }) => {
      try {
        console.log("[SEO] \u958B\u59CB\u751F\u6210\u6A19\u984C...");
        const { generateTitlesWithFallback: generateTitlesWithFallback2 } = await Promise.resolve().then(() => (init_seoService(), seoService_exports));
        const titles = await generateTitlesWithFallback2({
          story: input.story,
          language: input.language,
          platform: input.platform,
          model: input.model,
          count: input.count
        });
        console.log("[SEO] \u6A19\u984C\u751F\u6210\u6210\u529F");
        return { success: true, titles };
      } catch (error) {
        console.error("[SEO] \u6A19\u984C\u751F\u6210\u5931\u6557:", error);
        return { success: false, error: error instanceof Error ? error.message : "\u6A19\u984C\u751F\u6210\u5931\u6557" };
      }
    }),
    // 獲取 SEO 模型配置
    getSeoModels: publicProcedure.query(async () => {
      const { SEO_LLM_MODELS: SEO_LLM_MODELS2 } = await Promise.resolve().then(() => (init_seoService(), seoService_exports));
      return SEO_LLM_MODELS2;
    }),
    // AI 生成單個場景描述
    generateScene: publicProcedure.input(z2.object({
      story: z2.string().min(5, "\u6545\u4E8B\u81F3\u5C11\u9700\u8981 5 \u500B\u5B57\u7B26"),
      existingScenes: z2.array(z2.string()).optional(),
      language: z2.enum(["cantonese", "mandarin", "english"]).default("cantonese"),
      visualStyle: z2.string().optional()
    })).mutation(async ({ input }) => {
      try {
        console.log("[Scene] \u958B\u59CB AI \u751F\u6210\u5834\u666F...");
        const { generateSceneDescription: generateSceneDescription2 } = await Promise.resolve().then(() => (init_videoService(), videoService_exports));
        const description = await generateSceneDescription2(
          input.story,
          input.existingScenes || [],
          input.language,
          input.visualStyle
        );
        console.log("[Scene] \u5834\u666F\u751F\u6210\u6210\u529F");
        return { success: true, description };
      } catch (error) {
        console.error("[Scene] \u5834\u666F\u751F\u6210\u5931\u6557:", error);
        return { success: false, error: error instanceof Error ? error.message : "\u5834\u666F\u751F\u6210\u5931\u6557" };
      }
    })
  }),
  // 批量生成相關路由
  batch: router({
    // 創建批量任務
    create: protectedProcedure.input(z2.object({
      stories: z2.array(z2.object({
        story: z2.string().min(10),
        characterDescription: z2.string().optional(),
        visualStyle: z2.string().optional()
      })).min(1).max(20),
      speedMode: z2.enum(["fast", "quality"]),
      storyMode: z2.enum(["character", "scene"]).default("character")
    })).mutation(async ({ ctx, input }) => {
      const job = createBatchJob(input.stories, input.speedMode, input.storyMode);
      const estimate = estimateBatchTime(input.stories.length, input.speedMode);
      const concurrency = calculateMaxConcurrency(input.stories.length);
      processBatchJob(job.id, ctx.user.id, input.speedMode, input.storyMode).catch(console.error);
      return {
        jobId: job.id,
        totalTasks: job.totalTasks,
        concurrency,
        estimatedMinutes: estimate
      };
    }),
    // 獲取批量任務狀態
    getStatus: protectedProcedure.input(z2.object({ jobId: z2.string() })).query(({ input }) => {
      const job = getBatchJob(input.jobId);
      if (!job) {
        throw new Error("\u6279\u91CF\u4EFB\u52D9\u4E0D\u5B58\u5728");
      }
      return job;
    }),
    // 獲取所有批量任務
    getAll: protectedProcedure.query(() => {
      return getAllBatchJobs();
    }),
    // 刪除批量任務
    delete: protectedProcedure.input(z2.object({ jobId: z2.string() })).mutation(({ input }) => {
      const success = deleteBatchJob(input.jobId);
      return { success };
    }),
    // 獲取批量任務配置
    getConfig: publicProcedure.query(() => ({
      maxStories: 20,
      maxConcurrency: calculateMaxConcurrency(20)
    }))
  }),
  // 長視頻生成路由（按時長分段生成）
  longVideo: router({
    // 獲取配置信息
    getConfig: publicProcedure.query(() => ({
      batchSize: BATCH_SIZE,
      segmentDuration: SEGMENT_DURATION,
      maxDurationMinutes: 60,
      supportedDurations: [1, 2, 3, 5, 7, 10, 15, 20, 30]
    })),
    // 計算片段和批次數量
    calculate: publicProcedure.input(z2.object({
      durationMinutes: z2.number().min(1).max(60)
    })).query(({ input }) => {
      const totalSegments = calculateSegmentCount(input.durationMinutes);
      const totalBatches = calculateBatchCount(totalSegments);
      return {
        durationMinutes: input.durationMinutes,
        durationSeconds: input.durationMinutes * 60,
        totalSegments,
        totalBatches,
        segmentDuration: SEGMENT_DURATION,
        batchSize: BATCH_SIZE
      };
    }),
    // 創建長視頻生成任務 (暫時改為 public 以便測試)
    create: publicProcedure.input(z2.object({
      durationMinutes: z2.number().min(1).max(60),
      story: z2.string().min(5, "\u6545\u4E8B\u81F3\u5C11\u9700\u8981 5 \u500B\u5B57\u7B26"),
      characterDescription: z2.string().optional(),
      visualStyle: z2.string().optional(),
      language: z2.enum(["cantonese", "mandarin", "english"]).default("cantonese"),
      voiceActorId: z2.string().default("cantonese-male-narrator"),
      speedMode: z2.enum(["fast", "quality"]).default("fast"),
      storyMode: z2.enum(["character", "scene"]).default("character")
    })).mutation(async ({ ctx, input }) => {
      const userId = ctx.user?.id ?? 0;
      const task = createLongVideoTask(
        userId,
        input.durationMinutes,
        input.story,
        {
          characterDescription: input.characterDescription,
          visualStyle: input.visualStyle,
          language: input.language,
          voiceActorId: input.voiceActorId,
          speedMode: input.speedMode,
          storyMode: input.storyMode
        }
      );
      processLongVideoTask(task.id).catch(console.error);
      return {
        taskId: task.id,
        totalSegments: task.totalSegments,
        totalBatches: task.totalBatches,
        message: "\u4EFB\u52D9\u5DF2\u5275\u5EFA\uFF0C\u6B63\u5728\u5206\u6790\u6545\u4E8B..."
      };
    }),
    // 獲取任務狀態
    getStatus: protectedProcedure.input(z2.object({ taskId: z2.string() })).query(({ ctx, input }) => {
      const task = getLongVideoTask(input.taskId);
      if (!task) {
        throw new Error("\u4EFB\u52D9\u4E0D\u5B58\u5728");
      }
      if (task.userId !== ctx.user.id) {
        throw new Error("\u7121\u6B0A\u8A2A\u554F\u6B64\u4EFB\u52D9");
      }
      return task;
    }),
    // 獲取任務統計信息
    getStats: protectedProcedure.input(z2.object({ taskId: z2.string() })).query(({ ctx, input }) => {
      const task = getLongVideoTask(input.taskId);
      if (!task) {
        throw new Error("\u4EFB\u52D9\u4E0D\u5B58\u5728");
      }
      if (task.userId !== ctx.user.id) {
        throw new Error("\u7121\u6B0A\u8A2A\u554F\u6B64\u4EFB\u52D9");
      }
      return getTaskStats(input.taskId);
    }),
    // 獲取用戶的所有長視頻任務
    getHistory: protectedProcedure.input(z2.object({
      limit: z2.number().min(1).max(50).default(10)
    })).query(({ ctx, input }) => {
      const tasks = getUserLongVideoTasks(ctx.user.id);
      return tasks.slice(0, input.limit);
    }),
    // 刪除任務
    delete: protectedProcedure.input(z2.object({ taskId: z2.string() })).mutation(({ ctx, input }) => {
      const task = getLongVideoTask(input.taskId);
      if (!task) {
        throw new Error("\u4EFB\u52D9\u4E0D\u5B58\u5728");
      }
      if (task.userId !== ctx.user.id) {
        throw new Error("\u7121\u6B0A\u522A\u9664\u6B64\u4EFB\u52D9");
      }
      const success = deleteLongVideoTask(input.taskId);
      return { success };
    })
  }),
  // 配音員相關路由
  voice: router({
    // 獲取所有配音員（完整配置）
    getAll: publicProcedure.query(() => {
      return {
        voiceActors: getAllVoiceActorsConfig(),
        voiceModes: VOICE_MODES
      };
    }),
    // 獲取所有配音員（完整配置）
    getAllConfig: publicProcedure.query(() => {
      return {
        voiceActors: getAllVoiceActorsConfig(),
        stats: getVoiceStats(),
        filterOptions: getFilterOptions()
      };
    }),
    // 組合篩選配音員（KreadoAI 風格）
    filter: publicProcedure.input(z2.object({
      language: z2.enum(["cantonese", "mandarin", "english", "clone"]).optional(),
      gender: z2.enum(["male", "female"]).optional(),
      ageGroup: z2.enum(["child", "teen", "young", "adult", "middle", "elder"]).optional(),
      style: z2.enum(["narrator", "character", "news", "commercial", "storytelling", "assistant", "cartoon", "emotional", "professional"]).optional(),
      searchText: z2.string().optional()
    })).query(({ input }) => {
      return filterVoiceActorsAdvanced(input);
    }),
    // 獲取配音員試聽 URL
    getSampleUrl: publicProcedure.input(z2.object({ voiceActorId: z2.string() })).query(({ input }) => {
      const actor = getVoiceActorConfig(input.voiceActorId);
      return {
        sampleUrl: getVoiceActorSampleUrl(input.voiceActorId),
        actor
      };
    }),
    // 獲取所有試聽 URL
    getAllSampleUrls: publicProcedure.query(() => {
      return getAllSampleUrls();
    }),
    // 根據性別獲取配音員
    getByGender: publicProcedure.input(z2.object({ gender: z2.enum(["male", "female"]) })).query(({ input }) => getVoiceActorsByGender(input.gender)),
    // 根據類型獲取配音員
    getByType: publicProcedure.input(z2.object({ type: z2.enum(["narrator", "character"]) })).query(({ input }) => getVoiceActorsByType(input.type)),
    // 根據年齡段獲取配音員
    getByAgeGroup: publicProcedure.input(z2.object({ ageGroup: z2.enum(["child", "teen", "young", "adult", "middle", "elder"]) })).query(({ input }) => {
      return getVoiceActorsByAgeGroup(input.ageGroup);
    }),
    // 根據風格獲取配音員
    getByStyle: publicProcedure.input(z2.object({ style: z2.enum(["narrator", "character", "news", "commercial", "storytelling", "assistant", "cartoon", "emotional", "professional"]) })).query(({ input }) => {
      return getVoiceActorsByStyle(input.style);
    }),
    // AI 自動匹配配音員
    matchByDescription: publicProcedure.input(z2.object({ description: z2.string() })).query(({ input }) => {
      const voiceActorId = matchVoiceActorByDescription(input.description);
      return {
        voiceActorId,
        voiceActor: VOICE_ACTORS[voiceActorId]
      };
    }),
    // 為角色列表自動分配配音員
    autoAssign: protectedProcedure.input(z2.object({
      characters: z2.array(z2.object({
        name: z2.string(),
        description: z2.string().optional()
      }))
    })).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("\u6578\u64DA\u5EAB\u4E0D\u53EF\u7528");
      const existingBindings = await db.select().from(characterVoices).where(eq2(characterVoices.userId, ctx.user.id));
      const bindings = existingBindings.map((b) => ({
        characterName: b.characterName,
        characterDescription: b.characterDescription || void 0,
        voiceActorId: b.voiceActorId,
        isAutoMatched: b.isAutoMatched === 1
      }));
      return autoAssignVoiceActors(input.characters, bindings);
    }),
    // 分析故事中的角色
    analyzeCharacters: protectedProcedure.input(z2.object({
      story: z2.string(),
      llmModel: z2.string().optional()
    })).mutation(async ({ input }) => {
      const characters2 = await analyzeCharactersFromStory(
        input.story,
        input.llmModel || "gpt-4o-mini"
      );
      return characters2;
    }),
    // 保存角色聲音綁定
    saveCharacterVoice: protectedProcedure.input(z2.object({
      characterName: z2.string(),
      characterDescription: z2.string().optional(),
      characterImageUrl: z2.string().optional(),
      voiceActorId: z2.string(),
      isAutoMatched: z2.boolean().optional()
    })).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("\u6578\u64DA\u5EAB\u4E0D\u53EF\u7528");
      const existing = await db.select().from(characterVoices).where(eq2(characterVoices.userId, ctx.user.id)).limit(100);
      const existingBinding = existing.find(
        (b) => b.characterName.toLowerCase() === input.characterName.toLowerCase()
      );
      if (existingBinding) {
        await db.update(characterVoices).set({
          characterDescription: input.characterDescription || null,
          characterImageUrl: input.characterImageUrl || null,
          voiceActorId: input.voiceActorId,
          isAutoMatched: input.isAutoMatched ? 1 : 0
        }).where(eq2(characterVoices.id, existingBinding.id));
      } else {
        await db.insert(characterVoices).values({
          userId: ctx.user.id,
          characterName: input.characterName,
          characterDescription: input.characterDescription || null,
          characterImageUrl: input.characterImageUrl || null,
          voiceActorId: input.voiceActorId,
          isAutoMatched: input.isAutoMatched ? 1 : 0
        });
      }
      return { success: true };
    }),
    // 獲取用戶的角色聲音綁定
    getCharacterVoices: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("\u6578\u64DA\u5EAB\u4E0D\u53EF\u7528");
      const bindings = await db.select().from(characterVoices).where(eq2(characterVoices.userId, ctx.user.id)).orderBy(desc(characterVoices.updatedAt));
      return bindings;
    }),
    // 刪除角色聲音綁定
    deleteCharacterVoice: protectedProcedure.input(z2.object({ id: z2.number() })).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("\u6578\u64DA\u5EAB\u4E0D\u53EF\u7528");
      const bindings = await db.select().from(characterVoices).where(eq2(characterVoices.id, input.id)).limit(1);
      if (bindings.length === 0 || bindings[0].userId !== ctx.user.id) {
        throw new Error("\u7121\u6B0A\u522A\u9664\u6B64\u7D81\u5B9A");
      }
      await db.delete(characterVoices).where(eq2(characterVoices.id, input.id));
      return { success: true };
    })
  }),
  // 角色庫管理路由
  character: router({
    // 獲取用戶的角色庫
    list: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("\u6578\u64DA\u5EAB\u4E0D\u53EF\u7528");
      const chars = await db.select().from(characters).where(eq2(characters.userId, ctx.user.id)).orderBy(desc(characters.updatedAt));
      return chars;
    }),
    // 獲取單個角色詳情
    get: protectedProcedure.input(z2.object({ id: z2.number() })).query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("\u6578\u64DA\u5EAB\u4E0D\u53EF\u7528");
      const chars = await db.select().from(characters).where(eq2(characters.id, input.id)).limit(1);
      if (chars.length === 0 || chars[0].userId !== ctx.user.id) {
        throw new Error("\u89D2\u8272\u4E0D\u5B58\u5728");
      }
      return chars[0];
    }),
    // 創建新角色（上傳照片）
    create: protectedProcedure.input(z2.object({
      name: z2.string().min(1, "\u89D2\u8272\u540D\u7A31\u4E0D\u80FD\u70BA\u7A7A"),
      description: z2.string().optional(),
      photoBase64: z2.string().optional(),
      // Base64 編碼的圖片
      photoUrl: z2.string().optional(),
      // 或者直接提供 URL
      voiceActorId: z2.string().optional()
    })).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("\u6578\u64DA\u5EAB\u4E0D\u53EF\u7528");
      let photoUrl = input.photoUrl;
      if (input.photoBase64 && !photoUrl) {
        const matches = input.photoBase64.match(/^data:([^;]+);base64,(.+)$/);
        if (matches) {
          const contentType = matches[1];
          const base64Data = matches[2];
          const buffer = Buffer.from(base64Data, "base64");
          const extension = contentType.split("/")[1] || "jpg";
          photoUrl = await uploadCharacterPhoto(
            buffer,
            `character.${extension}`,
            contentType,
            ctx.user.id
          );
        }
      }
      const result = await db.insert(characters).values({
        userId: ctx.user.id,
        name: input.name,
        description: input.description || null,
        originalPhotoUrl: photoUrl || null,
        voiceActorId: input.voiceActorId || null,
        status: photoUrl ? "pending" : "ready"
      });
      const characterId = Number(result[0].insertId);
      if (photoUrl) {
        processCharacterPhoto(characterId, photoUrl).catch(console.error);
      }
      return { id: characterId, success: true };
    }),
    // 更新角色信息
    update: protectedProcedure.input(z2.object({
      id: z2.number(),
      name: z2.string().optional(),
      description: z2.string().optional(),
      voiceActorId: z2.string().optional()
    })).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("\u6578\u64DA\u5EAB\u4E0D\u53EF\u7528");
      const chars = await db.select().from(characters).where(eq2(characters.id, input.id)).limit(1);
      if (chars.length === 0 || chars[0].userId !== ctx.user.id) {
        throw new Error("\u7121\u6B0A\u66F4\u65B0\u6B64\u89D2\u8272");
      }
      const updateData = {};
      if (input.name) updateData.name = input.name;
      if (input.description !== void 0) updateData.description = input.description;
      if (input.voiceActorId !== void 0) updateData.voiceActorId = input.voiceActorId;
      await db.update(characters).set(updateData).where(eq2(characters.id, input.id));
      return { success: true };
    }),
    // 刪除角色
    delete: protectedProcedure.input(z2.object({ id: z2.number() })).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("\u6578\u64DA\u5EAB\u4E0D\u53EF\u7528");
      const chars = await db.select().from(characters).where(eq2(characters.id, input.id)).limit(1);
      if (chars.length === 0 || chars[0].userId !== ctx.user.id) {
        throw new Error("\u7121\u6B0A\u522A\u9664\u6B64\u89D2\u8272");
      }
      await db.delete(characters).where(eq2(characters.id, input.id));
      return { success: true };
    }),
    // 重新生成角色基礎圖
    regenerateBaseImage: protectedProcedure.input(z2.object({ id: z2.number() })).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("\u6578\u64DA\u5EAB\u4E0D\u53EF\u7528");
      const chars = await db.select().from(characters).where(eq2(characters.id, input.id)).limit(1);
      if (chars.length === 0 || chars[0].userId !== ctx.user.id) {
        throw new Error("\u7121\u6B0A\u64CD\u4F5C\u6B64\u89D2\u8272");
      }
      const char = chars[0];
      if (!char.originalPhotoUrl) {
        throw new Error("\u6B64\u89D2\u8272\u6C92\u6709\u539F\u59CB\u7167\u7247");
      }
      await db.update(characters).set({ status: "pending", errorMessage: null }).where(eq2(characters.id, input.id));
      processCharacterPhoto(input.id, char.originalPhotoUrl).catch(console.error);
      return { success: true };
    }),
    // 從故事中識別角色
    identifyInStory: protectedProcedure.input(z2.object({ story: z2.string() })).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("\u6578\u64DA\u5EAB\u4E0D\u53EF\u7528");
      const userCharacters = await db.select().from(characters).where(eq2(characters.userId, ctx.user.id));
      const identified = await identifyCharactersInStory(
        input.story,
        userCharacters.map((c) => ({
          id: c.id,
          name: c.name,
          description: c.description || void 0
        }))
      );
      return identified;
    })
  })
});
async function startVideoGeneration(taskId, input, videoModel, llmModel, mjMode, storyMode = "character", language = "cantonese", voiceActorId = "cantonese-male-narrator") {
  const db = null;
  try {
    await updateTaskStatus(db, taskId, "analyzing", 5, "\u6B63\u5728\u5206\u6790\u6545\u4E8B...");
    const { scenes, characterPrompt } = await analyzeStory(
      input.story,
      input.characterDescription || null,
      input.visualStyle || null,
      llmModel,
      language
    );
    memoryStore.updateVideoTask(taskId, {
      scenes,
      progress: 10
    });
    let characterImageUrl = null;
    let characterImageMap = {};
    if (input.selectedCharacters && input.selectedCharacters.length > 0) {
      await updateTaskStatus(db, taskId, "generating_images", 15, "\u6B63\u5728\u8F09\u5165\u89D2\u8272\u5EAB\u89D2\u8272...");
      for (const char of input.selectedCharacters) {
        if (char.baseImageUrl) {
          characterImageMap[char.name] = char.baseImageUrl;
          if (!characterImageUrl) {
            characterImageUrl = char.baseImageUrl;
          }
        }
      }
      console.log(`[\u4EFB\u52D9 ${taskId}] \u5DF2\u8F09\u5165 ${Object.keys(characterImageMap).length} \u500B\u89D2\u8272\u5EAB\u89D2\u8272`);
      memoryStore.updateVideoTask(taskId, { progress: 25 });
    } else if (shouldGenerateCharacterBase(storyMode)) {
      await updateTaskStatus(db, taskId, "generating_images", 15, "\u6B63\u5728\u751F\u6210\u89D2\u8272\u5716\u7247...");
      characterImageUrl = await generateCharacterImage(characterPrompt, mjMode);
      memoryStore.updateVideoTask(taskId, { progress: 25 });
    } else {
      memoryStore.updateVideoTask(taskId, { progress: 25 });
    }
    const updatedScenes = [...scenes];
    const progressPerScene = 60 / scenes.length;
    for (let i = 0; i < scenes.length; i++) {
      const scene = scenes[i];
      const baseProgress = 25 + i * progressPerScene;
      await updateTaskStatus(db, taskId, "generating_images", baseProgress, `\u6B63\u5728\u751F\u6210\u5834\u666F ${i + 1} \u5716\u7247...`);
      try {
        const imageUrl = await generateSceneImage(scene.imagePrompt, characterImageUrl, mjMode, storyMode);
        updatedScenes[i] = { ...scene, imageUrl, status: "generating" };
        memoryStore.updateVideoTask(taskId, { scenes: updatedScenes, progress: baseProgress + progressPerScene * 0.3 });
        await updateTaskStatus(db, taskId, "generating_videos", baseProgress + progressPerScene * 0.3, `\u6B63\u5728\u751F\u6210\u5834\u666F ${i + 1} \u8996\u983B...`);
        const videoUrl = await generateVideo(imageUrl, scene.description, videoModel);
        updatedScenes[i] = { ...updatedScenes[i], videoUrl, status: "completed" };
        memoryStore.updateVideoTask(taskId, { scenes: updatedScenes, progress: baseProgress + progressPerScene * 0.7 });
      } catch (error) {
        updatedScenes[i] = { ...scene, status: "failed" };
        console.error(`\u5834\u666F ${i + 1} \u751F\u6210\u5931\u6557:`, error);
      }
    }
    await updateTaskStatus(db, taskId, "generating_audio", 85, "\u6B63\u5728\u751F\u6210\u8A9E\u97F3\u65C1\u767D...");
    for (let i = 0; i < updatedScenes.length; i++) {
      if (updatedScenes[i].status === "completed") {
        try {
          const audioUrl = await generateSpeech(updatedScenes[i].narration, voiceActorId, language);
          updatedScenes[i] = { ...updatedScenes[i], audioUrl };
        } catch (error) {
          console.error(`\u5834\u666F ${i + 1} \u8A9E\u97F3\u751F\u6210\u5931\u6557:`, error);
        }
      }
    }
    memoryStore.updateVideoTask(taskId, { scenes: updatedScenes, progress: 95 });
    const completedScenes = updatedScenes.filter((s) => s.status === "completed" && s.videoUrl);
    const finalVideoUrl = completedScenes.length > 0 ? completedScenes[0].videoUrl : null;
    memoryStore.updateVideoTask(taskId, {
      status: "completed",
      progress: 100,
      finalVideoUrl
    });
    try {
      await notifyOwner({
        title: "\u{1F389} \u8996\u983B\u751F\u6210\u5B8C\u6210",
        content: `\u4EFB\u52D9 #${taskId} \u5DF2\u5B8C\u6210
\u5834\u666F\u6578: ${completedScenes.length}
\u8996\u983B\u9023\u7D50: ${finalVideoUrl || "\u7121"}`
      });
    } catch (e) {
      console.warn("\u767C\u9001\u901A\u77E5\u5931\u6557:", e);
    }
  } catch (error) {
    console.error("\u8996\u983B\u751F\u6210\u5931\u6557:", error);
    memoryStore.updateVideoTask(taskId, {
      status: "failed",
      errorMessage: error instanceof Error ? error.message : "\u672A\u77E5\u932F\u8AA4"
    });
  }
}
async function updateTaskStatus(db, taskId, status, progress, currentStep) {
  memoryStore.updateVideoTask(taskId, { status, progress });
}
async function processBatchJob(jobId, userId, speedMode, storyMode) {
  const job = getBatchJob(jobId);
  if (!job) return;
  const db = await getDb();
  if (!db) return;
  const concurrency = calculateMaxConcurrency(job.tasks.length);
  for (let i = 0; i < job.tasks.length; i += concurrency) {
    const batch = job.tasks.slice(i, i + concurrency);
    await Promise.all(batch.map(async (task) => {
      try {
        updateBatchTask(jobId, task.id, { status: "processing", progress: 5 });
        const preset = MODE_PRESETS[speedMode];
        const result = await db.insert(videoTasks).values({
          userId,
          mode: speedMode,
          storyMode,
          videoModel: preset.video,
          llmModel: preset.llm,
          story: task.story,
          characterDescription: task.characterDescription || null,
          visualStyle: task.visualStyle || null,
          status: "pending",
          progress: 0
        });
        const dbTaskId = Number(result[0].insertId);
        updateBatchTask(jobId, task.id, {
          progress: 10,
          result: { taskId: dbTaskId }
        });
        await startVideoGeneration(
          dbTaskId,
          {
            story: task.story,
            characterDescription: task.characterDescription,
            visualStyle: task.visualStyle,
            storyMode
          },
          preset.video,
          preset.llm,
          preset.mjMode,
          storyMode
        );
        const [finalTask] = await db.select().from(videoTasks).where(eq2(videoTasks.id, dbTaskId)).limit(1);
        if (finalTask?.status === "completed") {
          updateBatchTask(jobId, task.id, {
            status: "completed",
            progress: 100,
            result: {
              taskId: dbTaskId,
              videoUrl: finalTask.finalVideoUrl || void 0
            }
          });
        } else {
          updateBatchTask(jobId, task.id, {
            status: "failed",
            progress: 100,
            error: finalTask?.errorMessage || "\u751F\u6210\u5931\u6557"
          });
        }
      } catch (error) {
        console.error(`\u6279\u91CF\u4EFB\u52D9 ${task.id} \u5931\u6557:`, error);
        updateBatchTask(jobId, task.id, {
          status: "failed",
          progress: 100,
          error: error instanceof Error ? error.message : "\u672A\u77E5\u932F\u8AA4"
        });
      }
    }));
  }
}
async function processCharacterPhoto(characterId, photoUrl) {
  const db = await getDb();
  if (!db) return;
  try {
    await db.update(characters).set({ status: "analyzing" }).where(eq2(characters.id, characterId));
    console.log(`[Character ${characterId}] \u958B\u59CB\u5206\u6790\u7167\u7247...`);
    const analysis = await analyzeCharacterPhoto(photoUrl);
    console.log(`[Character ${characterId}] \u5206\u6790\u5B8C\u6210:`, analysis);
    await db.update(characters).set({
      status: "generating",
      aiAnalysis: analysis
    }).where(eq2(characters.id, characterId));
    console.log(`[Character ${characterId}] \u958B\u59CB\u751F\u6210\u89D2\u8272\u57FA\u790E\u5716...`);
    const baseImageUrl = await generateCharacterBaseImage(analysis.mjPrompt, photoUrl);
    console.log(`[Character ${characterId}] \u57FA\u790E\u5716\u751F\u6210\u5B8C\u6210: ${baseImageUrl}`);
    await db.update(characters).set({
      status: "ready",
      baseImageUrl
    }).where(eq2(characters.id, characterId));
    console.log(`[Character ${characterId}] \u8655\u7406\u5B8C\u6210!`);
  } catch (error) {
    console.error(`[Character ${characterId}] \u8655\u7406\u5931\u6557:`, error);
    await db.update(characters).set({
      status: "failed",
      errorMessage: error instanceof Error ? error.message : "\u672A\u77E5\u932F\u8AA4"
    }).where(eq2(characters.id, characterId));
  }
}
async function processLongVideoTask(taskId) {
  const task = getLongVideoTask(taskId);
  if (!task) {
    console.error(`[LongVideo ${taskId}] \u4EFB\u52D9\u4E0D\u5B58\u5728`);
    return;
  }
  console.log(`[LongVideo ${taskId}] \u958B\u59CB\u8655\u7406\uFF0C\u7E3D\u7247\u6BB5: ${task.totalSegments}\uFF0C\u7E3D\u6279\u6B21: ${task.totalBatches}`);
  try {
    updateLongVideoTask(taskId, { status: "analyzing" });
    console.log(`[LongVideo ${taskId}] \u5206\u6790\u6545\u4E8B\u4E2D...`);
    await sleep(2e3);
    updateLongVideoTask(taskId, { status: "generating" });
    let batch = startNextBatch(taskId);
    while (batch) {
      console.log(`[LongVideo ${taskId}] \u958B\u59CB\u8655\u7406\u7B2C ${batch.index + 1} \u6279\uFF0C\u4F7F\u7528 API Key \u7D44 ${batch.apiKeyGroupIndex + 1}`);
      const apiKey = getBatchApiKey(batch);
      console.log(`[LongVideo ${taskId}] \u6279\u6B21 ${batch.index + 1} \u4F7F\u7528 API Key: ${apiKey.substring(0, 10)}...`);
      for (const segment of batch.segments) {
        try {
          console.log(`[LongVideo ${taskId}] \u751F\u6210\u7247\u6BB5 ${segment.id}/${task.totalSegments}`);
          await sleep(1e3);
          updateSegment(taskId, segment.id, {
            status: "completed",
            progress: 100,
            videoUrl: `https://example.com/segment_${segment.id}.mp4`
            // 模擬 URL
          });
        } catch (error) {
          console.error(`[LongVideo ${taskId}] \u7247\u6BB5 ${segment.id} \u751F\u6210\u5931\u6557:`, error);
          updateSegment(taskId, segment.id, {
            status: "failed",
            error: error instanceof Error ? error.message : "\u672A\u77E5\u932F\u8AA4"
          });
        }
      }
      console.log(`[LongVideo ${taskId}] \u6279\u6B21 ${batch.index + 1} \u5B8C\u6210\uFF0C\u7B49\u5F85 5 \u79D2\u5F8C\u8655\u7406\u4E0B\u4E00\u6279...`);
      await sleep(5e3);
      batch = startNextBatch(taskId);
    }
    if (isTaskCompleted(taskId)) {
      const finalTask = getLongVideoTask(taskId);
      if (finalTask) {
        const failedCount = finalTask.segments.filter((s) => s.status === "failed").length;
        if (failedCount === finalTask.totalSegments) {
          updateLongVideoTask(taskId, {
            status: "failed",
            error: "\u6240\u6709\u7247\u6BB5\u751F\u6210\u5931\u6557"
          });
        } else {
          updateLongVideoTask(taskId, {
            status: "completed",
            completedAt: /* @__PURE__ */ new Date(),
            finalVideoUrl: `https://example.com/final_${taskId}.mp4`
            // 模擬 URL
          });
        }
      }
    }
    console.log(`[LongVideo ${taskId}] \u8655\u7406\u5B8C\u6210!`);
  } catch (error) {
    console.error(`[LongVideo ${taskId}] \u8655\u7406\u5931\u6557:`, error);
    updateLongVideoTask(taskId, {
      status: "failed",
      error: error instanceof Error ? error.message : "\u672A\u77E5\u932F\u8AA4"
    });
  }
}

// server/_core/context.ts
async function createContext(opts) {
  let user = null;
  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    user = null;
  }
  return {
    req: opts.req,
    res: opts.res,
    user
  };
}

// server/_core/vite.ts
import express from "express";
import fs from "fs";
import { nanoid } from "nanoid";
import path2 from "path";
import { createServer as createViteServer } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "@shared": path.resolve(__dirname, "./shared")
    }
  },
  root: path.resolve(__dirname, "./client"),
  build: {
    outDir: path.resolve(__dirname, "./dist/public"),
    emptyOutDir: true
  },
  server: {
    host: "0.0.0.0",
    port: 5173
  }
});

// server/_core/vite.ts
async function setupVite(app, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    server: serverOptions,
    appType: "custom"
  });
  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app) {
  const distPath = process.env.NODE_ENV === "development" ? path2.resolve(import.meta.dirname, "../..", "dist", "public") : path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app.use(express.static(distPath));
  app.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/_core/index.ts
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}
async function findAvailablePort(startPort = 3e3) {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}
async function startServer() {
  const app = express2();
  const server = createServer(app);
  app.use(express2.json({ limit: "50mb" }));
  app.use(express2.urlencoded({ limit: "50mb", extended: true }));
  registerOAuthRoutes(app);
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext
    })
  );
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);
  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
startServer().catch(console.error);
