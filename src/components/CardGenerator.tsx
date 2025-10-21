import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Printer, Eye, Download } from "lucide-react";
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
  const [generatedCards, setGeneratedCards] = useState<string[][]>([]);

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

  const handleGeneratePreview = () => {
    const cards = generateCards(numCards);
    setGeneratedCards(cards);
    setShowPreview(true);
    toast.success(`Generated ${numCards} Bingo cards!`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 15;
      const cardWidth = pageWidth - 2 * margin;
      const cellSize = cardWidth / gridSize;
      
      generatedCards.forEach((card, cardIndex) => {
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
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      toast.error("Failed to generate PDF. Please try again.");
      console.error(error);
    }
  };

  if (showPreview && generatedCards.length > 0) {
    return (
      <>
        {/* Print Styles */}
        <style>{`
          @media print {
            body * {
              visibility: hidden;
            }
            .print-area, .print-area * {
              visibility: visible;
            }
            .print-area {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
            .no-print {
              display: none !important;
            }
            .print-page {
              page-break-after: always;
              page-break-inside: avoid;
            }
            .print-page:last-child {
              page-break-after: auto;
            }
          }
        `}</style>

        <div className="min-h-screen gradient-subtle p-6 no-print">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-bold text-foreground">Your Bingo Cards Are Ready!</h2>
              <p className="text-muted-foreground">
                Review your {numCards} cards below and print when ready
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button onClick={onBack} variant="outline" size="lg">
                Back to Edit
              </Button>
              <Button 
                onClick={() => setShowPreview(false)} 
                variant="outline" 
                size="lg"
              >
                Change Number of Cards
              </Button>
              <Button 
                onClick={handlePrint} 
                variant="gradient" 
                size="lg"
                className="gap-2"
              >
                <Printer className="w-4 h-4" />
                Print All Cards
              </Button>
              <Button 
                onClick={handleDownloadPDF} 
                variant="secondary" 
                size="lg"
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Download as PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Print Area */}
        <div className="print-area bg-white">
          {Array.from({ length: Math.ceil(generatedCards.length / 2) }).map((_, pageIndex) => {
            const card1Index = pageIndex * 2;
            const card2Index = pageIndex * 2 + 1;
            const card1 = generatedCards[card1Index];
            const card2 = generatedCards[card2Index];

            return (
              <div key={pageIndex} className="print-page min-h-screen p-8 bg-white">
                {/* Card 1 */}
                {card1 && (
                  <div className="mb-8">
                    <div className="text-center mb-3">
                      <h3 className="text-xl font-bold text-gray-900">
                        Bingo Card #{card1Index + 1}
                      </h3>
                    </div>
                    <div
                      className="grid gap-1 mx-auto border-2 border-gray-900"
                      style={{
                        gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                        maxWidth: "500px",
                      }}
                    >
                      {card1.map((word, i) => (
                        <div
                          key={i}
                          className="border border-gray-900 p-3 flex items-center justify-center text-center text-sm font-medium bg-white"
                          style={{
                            minHeight: gridSize === 3 ? "70px" : gridSize === 4 ? "60px" : "50px",
                            fontSize: gridSize === 3 ? "14px" : gridSize === 4 ? "12px" : "10px",
                          }}
                        >
                          {word}
                        </div>
                      ))}
                    </div>
                    <div className="text-center mt-2 text-sm text-gray-600">
                      ✂ ✂ ✂ ✂ ✂ ✂ ✂ ✂ ✂ ✂
                    </div>
                  </div>
                )}

                {/* Card 2 */}
                {card2 && (
                  <div>
                    <div className="text-center mb-3">
                      <h3 className="text-xl font-bold text-gray-900">
                        Bingo Card #{card2Index + 1}
                      </h3>
                    </div>
                    <div
                      className="grid gap-1 mx-auto border-2 border-gray-900"
                      style={{
                        gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                        maxWidth: "500px",
                      }}
                    >
                      {card2.map((word, i) => (
                        <div
                          key={i}
                          className="border border-gray-900 p-3 flex items-center justify-center text-center text-sm font-medium bg-white"
                          style={{
                            minHeight: gridSize === 3 ? "70px" : gridSize === 4 ? "60px" : "50px",
                            fontSize: gridSize === 3 ? "14px" : gridSize === 4 ? "12px" : "10px",
                          }}
                        >
                          {word}
                        </div>
                      ))}
                    </div>
                    <div className="text-center mt-2 text-sm text-gray-600">
                      ✂ ✂ ✂ ✂ ✂ ✂ ✂ ✂ ✂ ✂
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen gradient-subtle p-6">
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold text-foreground">Generate Your Bingo Cards</h2>
          <p className="text-muted-foreground">
            Choose how many cards to create, then preview and print
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

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button onClick={onBack} variant="outline" size="lg">
            Back to Edit Words
          </Button>
          <Button 
            onClick={handleGeneratePreview} 
            variant="gradient" 
            size="lg"
            className="gap-2"
          >
            <Eye className="w-4 h-4" />
            Generate & Preview Cards
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardGenerator;
