import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface GridSelectorProps {
  selectedSize: number;
  onSizeSelect: (size: number) => void;
  onNext: () => void;
  onBack: () => void;
}

const gridOptions = [
  { size: 3, total: 9, label: "3×3", description: "Perfect for quick games" },
  { size: 4, total: 16, label: "4×4", description: "Balanced difficulty" },
  { size: 5, total: 25, label: "5×5", description: "Classic Bingo experience" },
];

const GridSelector = ({ selectedSize, onSizeSelect, onNext, onBack }: GridSelectorProps) => {
  return (
    <div className="min-h-screen gradient-subtle flex items-center justify-center p-6">
      <div className="max-w-5xl w-full space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold text-foreground">Choose Your Grid Size</h2>
          <p className="text-muted-foreground">Select the perfect size for your Bingo cards</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {gridOptions.map((option) => (
            <button
              key={option.size}
              onClick={() => onSizeSelect(option.size)}
              className={`bg-card rounded-2xl p-8 border-2 transition-all hover:scale-105 ${
                selectedSize === option.size
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
                      gridTemplateColumns: `repeat(${option.size}, minmax(0, 1fr))`,
                    }}
                  >
                    {Array.from({ length: option.total }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-6 h-6 rounded border-2 transition-all ${
                          selectedSize === option.size
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
                    {selectedSize === option.size && (
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
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <Button onClick={onBack} variant="outline" size="lg">
            Back
          </Button>
          <Button 
            onClick={onNext} 
            variant="gradient" 
            size="lg"
            disabled={!selectedSize}
          >
            Continue to Word Input
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GridSelector;
