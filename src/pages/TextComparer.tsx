import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, FileText, GitCompare } from "lucide-react";

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

      for (let j = 0; j < maxLength; j++) {
        const char1 = line1[j] || "";
        const char2 = line2[j] || "";
        
        const isDifferent = char1 !== char2;
        if (isDifferent) {
          lineDifferent = true;
          diffCount++;
        }
        
        diffs1.push({ char: char1, isDifferent });
        diffs2.push({ char: char2, isDifferent });
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
        ? `Found ${diffCount} character difference${diffCount > 1 ? 's' : ''}.`
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
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Text Compare!</h1>
            <p className="text-muted-foreground">
              Need a quick and easy way to compare two pieces of text and spot the differences? 
              Text Compare! is designed for exactly that.
            </p>
          </div>

          <div className="glass-card p-4 space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <AlertCircle className="h-5 w-5" />
              <h2 className="font-semibold">How It Works</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Simply paste your two text versions into the provided fields. Our tool highlights 
              additions, deletions, and modifications, making it easy to track changes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <label className="block text-sm font-medium">Original Text</label>
              </div>
              <Textarea
                placeholder="Enter or paste your original text here..."
                value={text1}
                onChange={(e) => setText1(e.target.value)}
                className="h-64 font-mono"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <label className="block text-sm font-medium">Modified Text</label>
              </div>
              <Textarea
                placeholder="Enter or paste your modified text here..."
                value={text2}
                onChange={(e) => setText2(e.target.value)}
                className="h-64 font-mono"
              />
            </div>
          </div>

          <Button 
            onClick={compareTexts} 
            className="w-full"
            size="lg"
          >
            <GitCompare className="mr-2 h-4 w-4" />
            Compare Texts
          </Button>

          {differences.text1Lines.length > 0 && (
            <div className="mt-8 space-y-4">
              <h2 className="text-lg font-semibold">Comparison Results:</h2>
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

          <div className="glass-card p-4 space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <AlertCircle className="h-5 w-5" />
              <h2 className="font-semibold">Why Use Text Compare?</h2>
            </div>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Proofreading and Editing: Quickly spot edits and verify revisions.</li>
              <li>Coding and Development: Do a quick diff check to identify changes in code or config files.</li>
              <li>Version Tracking: Compare different document versions to trace updates in technical documentation, contracts, and more.</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TextComparer;