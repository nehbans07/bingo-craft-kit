import { Button } from "@/components/ui/button";
import { Sparkles, Users, Lightbulb, GraduationCap } from "lucide-react";

interface BingoIntroProps {
  onStart: () => void;
}

const BingoIntro = ({ onStart }: BingoIntroProps) => {
  return (
    <div className="min-h-screen gradient-subtle flex items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-primary mb-4 animate-pulse">
            <Sparkles className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent gradient-primary bg-gradient-to-r from-primary to-secondary">
            Bingo Builder
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create custom, randomized Bingo cards in seconds for learning, team building, or just pure fun!
          </p>
        </div>

        {/* What is Bingo Card */}
        <div className="bg-card shadow-card-hover rounded-2xl p-8 space-y-4 border border-border">
          <h2 className="text-2xl font-bold text-foreground">What is Bingo?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Bingo is an interactive group game where each player receives a card filled with unique words or phrases. 
            A host calls out items, and players mark them off on their cards. The first person to complete a pattern—like 
            a full row, column, diagonal, or even a full house—wins! It's perfect for breaking the ice, reinforcing learning, 
            or sparking fun discussions.
          </p>

          {/* Example Grid */}
          <div className="bg-muted rounded-xl p-6 mt-4">
            <p className="text-sm font-medium text-muted-foreground mb-3">Example 3×3 Card:</p>
            <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
              {["Coffee", "Remote Work", "Zoom Call", "Deadline", "Email", "Meeting", "Laptop", "Team Chat", "Project"].map(
                (word, i) => (
                  <div
                    key={i}
                    className="bg-card border-2 border-primary/30 rounded-lg p-3 text-center text-sm font-medium shadow-card hover:shadow-card-hover transition-all hover:scale-105"
                  >
                    {word}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-card shadow-card rounded-xl p-6 border border-border hover:shadow-card-hover transition-all">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Learning & Education</h3>
                <p className="text-sm text-muted-foreground">Vocabulary practice, historical events, science terms</p>
              </div>
            </div>
          </div>

          <div className="bg-card shadow-card rounded-xl p-6 border border-border hover:shadow-card-hover transition-all">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Team Building</h3>
                <p className="text-sm text-muted-foreground">Icebreakers, getting-to-know-you activities</p>
              </div>
            </div>
          </div>

          <div className="bg-card shadow-card rounded-xl p-6 border border-border hover:shadow-card-hover transition-all">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Creative Workshops</h3>
                <p className="text-sm text-muted-foreground">Brainstorming topics, feedback sessions</p>
              </div>
            </div>
          </div>

          <div className="bg-card shadow-card rounded-xl p-6 border border-border hover:shadow-card-hover transition-all">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Fun & Games</h3>
                <p className="text-sm text-muted-foreground">Party games, taboo topics, trivia nights</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center pt-4">
          <Button 
            onClick={onStart} 
            variant="gradient" 
            size="lg"
            className="text-lg font-semibold px-12"
          >
            Start Building Your Bingo Cards
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BingoIntro;
