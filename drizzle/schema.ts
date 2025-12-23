import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json, bigint } from "drizzle-orm/mysql-core";

// 用戶表
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// 視頻生成任務表
export const videoTasks = mysqlTable("video_tasks", {
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
  scenes: json("scenes").$type<SceneData[]>(),
  characterImageUrl: text("characterImageUrl"),
  finalVideoUrl: text("finalVideoUrl"),
  thumbnailUrl: text("thumbnailUrl"),
  
  // 統計信息
  totalScenes: int("totalScenes").default(0),
  completedScenes: int("completedScenes").default(0),
  duration: int("duration"), // 視頻時長（秒）
  
  // 錯誤信息
  errorMessage: text("errorMessage"),
  
  // 時間戳
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  completedAt: timestamp("completedAt"),
});

export type VideoTask = typeof videoTasks.$inferSelect;
export type InsertVideoTask = typeof videoTasks.$inferInsert;

// 場景數據類型
export interface SceneData {
  id: number;
  description: string;
  narration: string;
  imagePrompt: string;
  imageUrl?: string;
  videoUrl?: string;
  audioUrl?: string;
  status: "pending" | "generating" | "completed" | "failed";
  // 配音相關
  voiceActorId?: string; // 指定的配音員 ID
  dialogues?: DialogueData[]; // 對話列表（用於角色配音模式）
}

// 對話數據類型
export interface DialogueData {
  characterName: string; // 角色名稱
  text: string; // 對話內容
  voiceActorId: string; // 配音員 ID
  audioUrl?: string; // 生成的音頻 URL
}

// 角色聲音配置類型
export interface CharacterVoiceConfig {
  characterName: string;
  characterDescription?: string;
  voiceActorId: string;
  isAutoMatched?: boolean; // 是否由 AI 自動匹配
}

// API Key 使用記錄表（用於追蹤輪流使用）
export const apiKeyUsage = mysqlTable("api_key_usage", {
  id: int("id").autoincrement().primaryKey(),
  keyIndex: int("keyIndex").notNull(),
  usedAt: timestamp("usedAt").defaultNow().notNull(),
  endpoint: varchar("endpoint", { length: 128 }),
  success: int("success").default(1),
});

export type ApiKeyUsage = typeof apiKeyUsage.$inferSelect;

// 角色聲音綁定表（用於記憶角色的固定聲音）
export const characterVoices = mysqlTable("character_voices", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  
  // 角色信息
  characterName: varchar("characterName", { length: 128 }).notNull(),
  characterDescription: text("characterDescription"),
  characterImageUrl: text("characterImageUrl"), // 角色圖片（可選）
  
  // 綁定的配音員
  voiceActorId: varchar("voiceActorId", { length: 64 }).notNull(),
  
  // 是否由 AI 自動匹配
  isAutoMatched: int("isAutoMatched").default(0),
  
  // 時間戳
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CharacterVoice = typeof characterVoices.$inferSelect;
export type InsertCharacterVoice = typeof characterVoices.$inferInsert;

// 角色庫表（用戶上傳的角色照片和信息）
export const characters = mysqlTable("characters", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  
  // 角色基本信息
  name: varchar("name", { length: 128 }).notNull(), // 角色名稱，用於故事中識別
  description: text("description"), // 角色簡介
  
  // 照片信息
  originalPhotoUrl: text("originalPhotoUrl"), // 用戶上傳的原始照片
  baseImageUrl: text("baseImageUrl"), // Midjourney 生成的角色基礎圖
  
  // AI 分析結果
  aiAnalysis: json("aiAnalysis").$type<CharacterAnalysis>(), // Claude 分析的角色特徵
  
  // 狀態
  status: mysqlEnum("status", ["pending", "analyzing", "generating", "ready", "failed"]).default("pending").notNull(),
  errorMessage: text("errorMessage"),
  
  // 配音綁定
  voiceActorId: varchar("voiceActorId", { length: 64 }),
  
  // 時間戳
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Character = typeof characters.$inferSelect;
export type InsertCharacter = typeof characters.$inferInsert;

// AI 分析角色特徵的結果
export interface CharacterAnalysis {
  gender: string; // 性別
  ageRange: string; // 年齡範圍
  ethnicity: string; // 族裔
  hairStyle: string; // 髮型
  hairColor: string; // 髮色
  facialFeatures: string; // 面部特徵
  bodyType: string; // 體型
  clothing: string; // 服裝
  accessories: string; // 配件
  overallStyle: string; // 整體風格
  mjPrompt: string; // 生成的 Midjourney 提示詞
}
