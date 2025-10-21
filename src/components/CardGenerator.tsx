import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Eye } from "lucide-react";
import jsPDF from "jspdf";
import { toast } from "sonner";

interface CardGeneratorProps {
  gridSize: number;
  words: string[];
  onBack: () => void;
}

const CardGenerator = ({ gridSize, words, onBack }: CardGeneratorProps) => {
  const [numCards, setNumCards] = useState(10);
  const [showPreview, setShowPreview] = useState(false);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const generateCards = (count: number): string[][] => {
    const cards: string[][] = [];
    for (let i = 0; i < count; i++) {
      cards.push(shuffleArray(words));
    }
    return cards;
  };

  const previewCards = generateCards(2);

  const generatePDF = () => {
    try {
      const doc = new jsPDF();
      const cards = generateCards(numCards);
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 15;
      const cardWidth = pageWidth - 2 * margin;
      const cardHeight = cardWidth; // Square cards
      const cellSize = cardWidth / gridSize;
      
      cards.forEach((card, cardIndex) => {
        if (cardIndex > 0) {
          doc.addPage();
        }

        // Title
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text(`Bingo Card #${cardIndex + 1}`, pageWidth / 2, margin, { align: "center" });

        // Grid
        const startY = margin + 10;
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");

        for (let row = 0; row < gridSize; row++) {
          for (let col = 0; col < gridSize; col++) {
            const x = margin + col * cellSize;
            const y = startY + row * cellSize;
            const word = card[row * gridSize + col];

            // Cell border
            doc.rect(x, y, cellSize, cellSize);

            // Word text (centered and wrapped if needed)
            doc.setFontSize(gridSize === 3 ? 11 : gridSize === 4 ? 9 : 7);
            const lines = doc.splitTextToSize(word, cellSize - 4);
            const textHeight = lines.length * 4;
            const textY = y + cellSize / 2 - textHeight / 2 + 4;
            
            doc.text(lines, x + cellSize / 2, textY, { 
              align: "center",
              maxWidth: cellSize - 4
            });
          }
        }

        // Footer with cut line
        const footerY = startY + cardWidth + 5;
        doc.setFontSize(8);
        doc.line(margin, footerY, pageWidth - margin, footerY);
        doc.text("✂ Cut along this line ✂", pageWidth / 2, footerY + 4, { align: "center" });
      });

      doc.save(`bingo-cards-${gridSize}x${gridSize}.pdf`);
      toast.success(`Generated ${numCards} Bingo cards!`);
    } catch (error) {
      toast.error("Failed to generate PDF. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen gradient-subtle p-6">
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold text-foreground">Generate Your Bingo Cards</h2>
          <p className="text-muted-foreground">
            Preview your cards and download them as PDF
          </p>
        </div>

        {/* Number of Cards Input */}
        <div className="bg-card shadow-card-hover rounded-2xl p-8 border border-border max-w-md mx-auto">
          <label className="block text-sm font-medium text-foreground mb-2">
            How many cards would you like to create?
          </label>
          <Input
            type="number"
            min={1}
            max={100}
            value={numCards}
            onChange={(e) => setNumCards(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
            className="text-center text-lg font-semibold"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Each card will have the same words in a different random order
          </p>
        </div>

        {/* Preview Toggle */}
        <div className="text-center">
          <Button 
            onClick={() => setShowPreview(!showPreview)} 
            variant="outline" 
            size="lg"
            className="gap-2"
          >
            <Eye className="w-4 h-4" />
            {showPreview ? "Hide" : "Show"} Preview
          </Button>
        </div>

        {/* Preview Cards */}
        {showPreview && (
          <div className="grid md:grid-cols-2 gap-6">
            {previewCards.map((card, cardIndex) => (
              <div key={cardIndex} className="bg-card shadow-card-hover rounded-xl p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
                  Sample Card {cardIndex + 1}
                </h3>
                <div
                  className="grid gap-2"
                  style={{
                    gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                  }}
                >
                  {card.map((word, i) => (
                    <div
                      key={i}
                      className="bg-muted border-2 border-border rounded-lg p-3 flex items-center justify-center text-center text-xs font-medium min-h-[60px] hover:border-primary/50 transition-colors"
                    >
                      {word}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button onClick={onBack} variant="outline" size="lg">
            Back to Edit Words
          </Button>
          <Button 
            onClick={generatePDF} 
            variant="gradient" 
            size="lg"
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Download {numCards} Cards as PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardGenerator;
