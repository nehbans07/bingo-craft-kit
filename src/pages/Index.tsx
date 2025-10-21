import { useState } from "react";
import BingoIntro from "@/components/BingoIntro";
import GridSelector from "@/components/GridSelector";
import WordInput from "@/components/WordInput";
import CardGenerator from "@/components/CardGenerator";

type Step = "intro" | "grid" | "words" | "generate";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>("intro");
  const [gridSize, setGridSize] = useState<number>(0);
  const [words, setWords] = useState<string[]>([]);

  const handleStart = () => setCurrentStep("grid");
  
  const handleGridSelect = (size: number) => setGridSize(size);
  
  const handleGridNext = () => {
    if (gridSize > 0) setCurrentStep("words");
  };
  
  const handleWordsNext = () => {
    if (words.length === gridSize * gridSize) setCurrentStep("generate");
  };

  const renderStep = () => {
    switch (currentStep) {
      case "intro":
        return <BingoIntro onStart={handleStart} />;
      
      case "grid":
        return (
          <GridSelector
            selectedSize={gridSize}
            onSizeSelect={handleGridSelect}
            onNext={handleGridNext}
            onBack={() => setCurrentStep("intro")}
          />
        );
      
      case "words":
        return (
          <WordInput
            gridSize={gridSize}
            words={words}
            onWordsChange={setWords}
            onNext={handleWordsNext}
            onBack={() => setCurrentStep("grid")}
          />
        );
      
      case "generate":
        return (
          <CardGenerator
            gridSize={gridSize}
            words={words}
            onBack={() => setCurrentStep("words")}
          />
        );
      
      default:
        return <BingoIntro onStart={handleStart} />;
    }
  };

  return renderStep();
};

export default Index;
