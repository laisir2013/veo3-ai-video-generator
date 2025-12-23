import { useState } from "react";
import { VISUAL_STYLES, type VisualStyle } from "../config/visualStyles";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, ChevronUp, Sparkles, X } from "lucide-react";

interface StyleSelectorProps {
  value: string;
  onChange: (styleId: string, stylePrompt: string) => void;
  className?: string;
}

export function StyleSelector({ value, onChange, className }: StyleSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [previewStyle, setPreviewStyle] = useState<VisualStyle | null>(null);
  
  const selectedStyle = VISUAL_STYLES.find(s => s.id === value);
  
  // 分類風格
  const categories = {
    realistic: VISUAL_STYLES.filter(s => ["cinematic", "documentary", "portrait"].includes(s.id)),
    animation: VISUAL_STYLES.filter(s => ["disney-pixar", "anime", "ghibli", "cartoon", "chibi"].includes(s.id)),
    artistic: VISUAL_STYLES.filter(s => ["watercolor", "oil-painting", "storybook", "ink-wash", "comic"].includes(s.id)),
    genre: VISUAL_STYLES.filter(s => ["cyberpunk", "fantasy", "retro", "minimalist", "steampunk", "horror", "romantic", "scifi", "pixel-art"].includes(s.id)),
  };
  
  const categoryNames: Record<string, string> = {
    realistic: "🎬 真人寫實",
    animation: "🎨 動畫風格",
    artistic: "🖼️ 藝術風格",
    genre: "✨ 特殊風格",
  };

  return (
    <div className={cn("space-y-3", className)}>
      {/* 已選擇的風格預覽 */}
      <div 
        className="relative cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 border border-zinc-700 hover:border-purple-500/50 transition-colors">
          {selectedStyle ? (
            <div className="flex items-center gap-3">
              <img 
                src={selectedStyle.previewImage} 
                alt={selectedStyle.name}
                className="w-20 h-12 object-cover rounded"
              />
              <div>
                <div className="flex items-center gap-2">
                  {selectedStyle.icon && <span className="text-lg">{selectedStyle.icon}</span>}
                  <span className="font-medium text-white">{selectedStyle.name}</span>
                </div>
                <p className="text-xs text-zinc-400">{selectedStyle.description}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-zinc-400">
              <Sparkles className="w-5 h-5" />
              <span>選擇視覺風格</span>
            </div>
          )}
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-zinc-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-zinc-400" />
          )}
        </div>
      </div>

      {/* 風格選擇面板 - 重新設計 */}
      {isExpanded && (
        <div className="rounded-xl bg-zinc-900/95 border border-zinc-700 p-4 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* 大圖預覽區域 */}
          {previewStyle && (
            <div className="relative rounded-xl overflow-hidden border border-purple-500/50 bg-black">
              <img
                src={previewStyle.previewImage}
                alt={previewStyle.name}
                className="w-full h-48 sm:h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                <div className="flex items-center gap-2 mb-1">
                  {previewStyle.icon && <span className="text-2xl">{previewStyle.icon}</span>}
                  <h3 className="text-lg font-bold text-white">{previewStyle.name}</h3>
                </div>
                <p className="text-sm text-zinc-300">{previewStyle.description}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setPreviewStyle(null);
                }}
                className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          )}

          {Object.entries(categories).map(([key, styles]) => (
            <div key={key}>
              <h3 className="text-base font-semibold text-zinc-200 mb-4 flex items-center gap-2">
                {categoryNames[key]}
                <span className="text-xs text-zinc-500 font-normal">({styles.length} 種風格)</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {styles.map((style) => (
                  <div
                    key={style.id}
                    className={cn(
                      "relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-200 group",
                      value === style.id
                        ? "border-purple-500 ring-2 ring-purple-500/30 scale-[1.02]"
                        : "border-zinc-700 hover:border-purple-400/50 hover:scale-[1.02]"
                    )}
                    onClick={() => {
                      onChange(style.id, style.prompt);
                      setIsExpanded(false);
                      setPreviewStyle(null);
                    }}
                  >
                    {/* 預覽圖片 - 放大尺寸 */}
                    <div className="aspect-[4/3] relative">
                      <img
                        src={style.previewImage}
                        alt={style.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {/* 選中標記 */}
                      {value === style.id && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                      {/* 放大預覽按鈕 */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewStyle(style);
                        }}
                        className="absolute top-2 left-2 px-2 py-1 bg-black/60 rounded-md text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                      >
                        🔍 預覽
                      </button>
                      {/* 漸變遮罩 */}
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                    </div>
                    {/* 名稱和描述 */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className="flex items-center gap-2 mb-0.5">
                        {style.icon && <span className="text-base">{style.icon}</span>}
                        <span className="text-sm font-semibold text-white">
                          {style.name}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 line-clamp-1">
                        {style.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {/* 提示信息 */}
          <div className="text-sm text-zinc-400 text-center pt-4 border-t border-zinc-800">
            💡 點擊「預覽」可查看大圖，點擊風格卡片即可選擇
          </div>
        </div>
      )}
    </div>
  );
}

export default StyleSelector;
