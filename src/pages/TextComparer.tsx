import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const TextComparer = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [differences, setDifferences] = useState<{
    text1Lines: { line: number; text: string; isDifferent: boolean }[];
    text2Lines: { line: number; text: string; isDifferent: boolean }[];
  }>({ text1Lines: [], text2Lines: [] });
  const { toast } = useToast();

  const findDifferences = () => {
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

    const text1Lines = [];
    const text2Lines = [];

    for (let i = 0; i < maxLines; i++) {
      const line1 = lines1[i] || "";
      const line2 = lines2[i] || "";
      const isDifferent = line1 !== line2;

      text1Lines.push({
        line: i + 1,
        text: line1,
        isDifferent,
      });

      text2Lines.push({
        line: i + 1,
        text: line2,
        isDifferent,
      });
    }

    setDifferences({ text1Lines, text2Lines });
    
    const diffCount = text1Lines.filter(line => line.isDifferent).length;
    toast({
      title: diffCount > 0 ? "Differences Found" : "No Differences",
      description: diffCount > 0 
        ? `Found ${diffCount} different lines between the texts.`
        : "The texts are identical!",
    });
  };

  const LineNumbers = ({ count }: { count: number }) => (
    <div className="select-none text-right pr-2 border-r border-border/50 text-muted-foreground text-sm">
      {Array.from({ length: count }, (_, i) => (
        <div key={i + 1} className="leading-6">
          {i + 1}
        </div>
      ))}
    </div>
  );

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Advanced Text Comparer</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium mb-2">Text 1</label>
            <Textarea
              placeholder="Enter first text..."
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              className="h-64 font-mono"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium mb-2">Text 2</label>
            <Textarea
              placeholder="Enter second text..."
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              className="h-64 font-mono"
            />
          </div>
        </div>

        <Button onClick={findDifferences} className="mt-6 w-full">
          Compare Texts
        </Button>

        {/* Comparison Results */}
        {differences.text1Lines.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Comparison Results:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left comparison */}
              <div className="glass-card rounded-lg overflow-hidden">
                <div className="p-4 bg-secondary/30 border-b border-border/50">
                  <h3 className="font-medium">Text 1</h3>
                </div>
                <div className="overflow-x-auto">
                  <div className="flex min-w-full font-mono">
                    <LineNumbers count={differences.text1Lines.length} />
                    <div className="flex-1 p-4">
                      {differences.text1Lines.map((line, idx) => (
                        <div
                          key={idx}
                          className={`leading-6 ${
                            line.isDifferent
                              ? "bg-destructive/10 text-destructive"
                              : ""
                          }`}
                        >
                          {line.text || " "}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right comparison */}
              <div className="glass-card rounded-lg overflow-hidden">
                <div className="p-4 bg-secondary/30 border-b border-border/50">
                  <h3 className="font-medium">Text 2</h3>
                </div>
                <div className="overflow-x-auto">
                  <div className="flex min-w-full font-mono">
                    <LineNumbers count={differences.text2Lines.length} />
                    <div className="flex-1 p-4">
                      {differences.text2Lines.map((line, idx) => (
                        <div
                          key={idx}
                          className={`leading-6 ${
                            line.isDifferent
                              ? "bg-destructive/10 text-destructive"
                              : ""
                          }`}
                        >
                          {line.text || " "}
                        </div>
                      ))}
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