import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { useState } from "react";
import { GridSize } from "@/pages/Index";

interface GridSelectorProps {
  selectedSize: GridSize;
  onSizeSelect: (size: GridSize) => void;
  onNext: () => void;
  onBack: () => void;
}

const gridOptions = [
  { rows: 3, cols: 3, total: 9, label: "3×3", description: "Perfect for quick games" },
  { rows: 4, cols: 4, total: 16, label: "4×4", description: "Balanced difficulty" },
  { rows: 5, cols: 5, total: 25, label: "5×5", description: "Classic Bingo experience" },
];

const GridSelector = ({ selectedSize, onSizeSelect, onNext, onBack }: GridSelectorProps) => {
  const [customRows, setCustomRows] = useState<number>(3);
  const [customCols, setCustomCols] = useState<number>(3);
  const [isCustom, setIsCustom] = useState(false);

  const handlePresetSelect = (rows: number, cols: number) => {
    setIsCustom(false);
    onSizeSelect({ rows, cols });
  };

  const handleCustomSelect = () => {
    setIsCustom(true);
    onSizeSelect({ rows: customRows, cols: customCols });
  };

  const isSelected = (rows: number, cols: number) => 
    selectedSize.rows === rows && selectedSize.cols === cols && !isCustom;
  return (
    <div className="min-h-screen gradient-subtle flex items-center justify-center p-6">
      <div className="max-w-5xl w-full space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold text-foreground">Choose Your Grid Size</h2>
          <p className="text-muted-foreground">Select the perfect size for your Bingo cards</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {gridOptions.map((option) => (
            <button
              key={option.label}
              onClick={() => handlePresetSelect(option.rows, option.cols)}
              className={`bg-card rounded-2xl p-8 border-2 transition-all hover:scale-105 ${
                isSelected(option.rows, option.cols)
                  ? "border-primary shadow-card-hover"
                  : "border-border shadow-card hover:border-primary/50"
              }`}
            >
              <div className="space-y-4">
                {/* Preview Grid */}
                <div className="flex justify-center">
                  <div
                    className="grid gap-1.5"
                    style={{
                      gridTemplateColumns: `repeat(${option.cols}, minmax(0, 1fr))`,
                    }}
                  >
                    {Array.from({ length: option.total }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-6 h-6 rounded border-2 transition-all ${
                          isSelected(option.rows, option.cols)
                            ? "bg-primary border-primary"
                            : "bg-muted border-border"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <h3 className="text-2xl font-bold text-foreground">{option.label}</h3>
                    {isSelected(option.rows, option.cols) && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                  <p className="text-xs text-muted-foreground font-medium">
                    {option.total} words needed
                  </p>
                </div>
              </div>
            </button>
          ))}

          {/* Custom Grid Option */}
          <div
            className={`bg-card rounded-2xl p-8 border-2 transition-all ${
              isCustom
                ? "border-primary shadow-card-hover"
                : "border-border shadow-card hover:border-primary/50"
            }`}
          >
            <div className="space-y-4">
              {/* Custom Icon */}
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-foreground">?</span>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <h3 className="text-2xl font-bold text-foreground">Custom</h3>
                  {isCustom && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground text-center">Choose your own size</p>
                
                {/* Custom Input Fields */}
                <div className="space-y-2">
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Rows (max 8)</label>
                    <Input
                      type="number"
                      min="2"
                      max="8"
                      value={customRows}
                      onChange={(e) => {
                        const val = Math.min(8, Math.max(2, parseInt(e.target.value) || 2));
                        setCustomRows(val);
                      }}
                      className="text-center"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Columns (max 8)</label>
                    <Input
                      type="number"
                      min="2"
                      max="8"
                      value={customCols}
                      onChange={(e) => {
                        const val = Math.min(8, Math.max(2, parseInt(e.target.value) || 2));
                        setCustomCols(val);
                      }}
                      className="text-center"
                    />
                  </div>
                  <Button
                    onClick={handleCustomSelect}
                    variant={isCustom ? "default" : "outline"}
                    size="sm"
                    className="w-full"
                  >
                    Select {customRows}×{customCols}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground font-medium text-center">
                  {customRows * customCols} words needed
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <Button onClick={onBack} variant="outline" size="lg">
            Back
          </Button>
          <Button 
            onClick={onNext} 
            variant="gradient" 
            size="lg"
            disabled={selectedSize.rows === 0 || selectedSize.cols === 0}
          >
            Continue to Word Input
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GridSelector;
