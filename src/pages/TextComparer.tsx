import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface DiffChar {
  char: string;
  isDifferent: boolean;
}

interface DiffLine {
  line: number;
  text: string;
  diffs: DiffChar[];
}

const TextComparer = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [differences, setDifferences] = useState<{
    text1Lines: DiffLine[];
    text2Lines: DiffLine[];
  }>({ text1Lines: [], text2Lines: [] });
  const { toast } = useToast();

  const compareTexts = () => {
    if (!text1 || !text2) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter text in both fields.",
      });
      return;
    }

    const lines1 = text1.split("\n");
    const lines2 = text2.split("\n");
    const maxLines = Math.max(lines1.length, lines2.length);
    
    const text1Lines: DiffLine[] = [];
    const text2Lines: DiffLine[] = [];
    let diffCount = 0;

    for (let i = 0; i < maxLines; i++) {
      const line1 = lines1[i] || "";
      const line2 = lines2[i] || "";
      const maxLength = Math.max(line1.length, line2.length);
      
      const diffs1: DiffChar[] = [];
      const diffs2: DiffChar[] = [];
      let lineDifferent = false;

      // First pass: find exact matches and differences
      for (let j = 0; j < maxLength; j++) {
        const char1 = line1[j] || "";
        const char2 = line2[j] || "";
        
        if (char1 !== char2) {
          lineDifferent = true;
          diffs1.push({ char: char1, isDifferent: true });
          diffs2.push({ char: char2, isDifferent: true });
        } else {
          diffs1.push({ char: char1, isDifferent: false });
          diffs2.push({ char: char2, isDifferent: false });
        }
      }

      if (lineDifferent) {
        diffCount++;
      }

      text1Lines.push({
        line: i + 1,
        text: line1,
        diffs: diffs1,
      });

      text2Lines.push({
        line: i + 1,
        text: line2,
        diffs: diffs2,
      });
    }

    setDifferences({ text1Lines, text2Lines });
    
    toast({
      title: diffCount > 0 ? "Differences Found" : "No Differences",
      description: diffCount > 0 
        ? `Found differences in ${diffCount} line${diffCount > 1 ? 's' : ''}.`
        : "The texts are identical!",
    });
  };

  const LineNumbers = ({ count }: { count: number }) => (
    <div className="select-none text-right pr-2 border-r border-border/50 text-muted-foreground text-sm min-w-[3rem]">
      {Array.from({ length: count }, (_, i) => (
        <div key={i + 1} className="leading-6">
          {i + 1}
        </div>
      ))}
    </div>
  );

  const renderDiffLine = (line: DiffLine) => (
    <div key={line.line} className="leading-6 whitespace-pre">
      {line.diffs.map((char, idx) => (
        <span
          key={idx}
          className={char.isDifferent ? "bg-destructive/20 text-destructive font-medium" : ""}
        >
          {char.char || "\u00A0"}
        </span>
      ))}
    </div>
  );

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Text Comparison Tool</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium mb-2">Original Text</label>
            <Textarea
              placeholder="Enter first text..."
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              className="h-64 font-mono"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium mb-2">Modified Text</label>
            <Textarea
              placeholder="Enter second text..."
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              className="h-64 font-mono"
            />
          </div>
        </div>

        <Button onClick={compareTexts} className="mt-6 w-full">
          Compare Texts
        </Button>

        {differences.text1Lines.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Comparison Results:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card rounded-lg overflow-hidden">
                <div className="p-4 bg-secondary/30 border-b border-border/50">
                  <h3 className="font-medium">Original Text</h3>
                </div>
                <div className="overflow-x-auto">
                  <div className="flex min-w-full font-mono p-4">
                    <LineNumbers count={differences.text1Lines.length} />
                    <div className="flex-1 pl-4">
                      {differences.text1Lines.map(renderDiffLine)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-lg overflow-hidden">
                <div className="p-4 bg-secondary/30 border-b border-border/50">
                  <h3 className="font-medium">Modified Text</h3>
                </div>
                <div className="overflow-x-auto">
                  <div className="flex min-w-full font-mono p-4">
                    <LineNumbers count={differences.text2Lines.length} />
                    <div className="flex-1 pl-4">
                      {differences.text2Lines.map(renderDiffLine)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default TextComparer;