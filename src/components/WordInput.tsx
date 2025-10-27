import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { GridSize } from "@/pages/Index";

interface WordInputProps {
  gridSize: GridSize;
  words: string[];
  onWordsChange: (words: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const WordInput = ({ gridSize, words, onWordsChange, onNext, onBack }: WordInputProps) => {
  const [inputValue, setInputValue] = useState(words.join("\n"));
  const requiredWords = gridSize.rows * gridSize.cols;

  const handleInputChange = (value: string) => {
    setInputValue(value);
    const wordList = value
      .split("\n")
      .map((w) => w.trim())
      .filter((w) => w.length > 0);
    onWordsChange(wordList);
  };

  const currentWordCount = words.length;
  const isValid = currentWordCount === requiredWords;
  const hasWords = currentWordCount > 0;

  return (
    <div className="min-h-screen gradient-subtle flex items-center justify-center p-6">
      <div className="max-w-3xl w-full space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold text-foreground">Add Your Bingo Words</h2>
          <p className="text-muted-foreground">
            Enter your words or phrases, one per line
          </p>
        </div>

        <div className="bg-card shadow-card-hover rounded-2xl p-8 space-y-4 border border-border">
          {/* Word Counter */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isValid ? (
                <CheckCircle2 className="w-5 h-5 text-accent" />
              ) : (
                <AlertCircle className="w-5 h-5 text-muted-foreground" />
              )}
              <span className="text-sm font-medium text-muted-foreground">
                Word Count: 
                <span className={`ml-2 ${isValid ? "text-accent font-bold" : "text-foreground"}`}>
                  {currentWordCount} / {requiredWords}
                </span>
              </span>
            </div>
            <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
              {gridSize.rows}×{gridSize.cols} Grid
            </span>
          </div>

          {/* Text Area */}
          <Textarea
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={`Enter ${requiredWords} words (one per line)\n\nExample:\nCoffee\nRemote Work\nZoom Call\nDeadline\n...`}
            className="min-h-[400px] font-mono text-sm resize-none focus-visible:ring-primary"
          />

          {/* Validation Message */}
          {hasWords && !isValid && (
            <div className="flex items-start gap-2 text-sm p-3 bg-muted rounded-lg">
              <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-muted-foreground">
                {currentWordCount < requiredWords
                  ? `You need ${requiredWords - currentWordCount} more ${
                      requiredWords - currentWordCount === 1 ? "word" : "words"
                    }.`
                  : `You have ${currentWordCount - requiredWords} too many ${
                      currentWordCount - requiredWords === 1 ? "word" : "words"
                    }. Please remove some.`}
              </p>
            </div>
          )}

          {isValid && (
            <div className="flex items-start gap-2 text-sm p-3 bg-accent/10 border border-accent/20 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
              <p className="text-accent">
                Perfect! You have exactly {requiredWords} words. Ready to generate cards!
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-center gap-4">
          <Button onClick={onBack} variant="outline" size="lg">
            Back
          </Button>
          <Button 
            onClick={onNext} 
            variant="gradient" 
            size="lg"
            disabled={!isValid}
          >
            Generate Cards
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WordInput;
