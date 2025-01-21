import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const TextComparer = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [differences, setDifferences] = useState<string[]>([]);
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
    const diffs: string[] = [];

    const maxLines = Math.max(lines1.length, lines2.length);

    for (let i = 0; i < maxLines; i++) {
      if (lines1[i] !== lines2[i]) {
        diffs.push(`Line ${i + 1}:`);
        if (i < lines1.length) {
          diffs.push(`< ${lines1[i]}`);
        }
        if (i < lines2.length) {
          diffs.push(`> ${lines2[i]}`);
        }
        diffs.push("---");
      }
    }

    setDifferences(diffs);
    
    if (diffs.length === 0) {
      toast({
        title: "Result",
        description: "The texts are identical!",
      });
    } else {
      toast({
        title: "Differences Found",
        description: `Found ${Math.floor(diffs.length / 4)} differences between the texts.`,
      });
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Text Comparer</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Text 1</label>
            <Textarea
              placeholder="Enter first text..."
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              className="h-64"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Text 2</label>
            <Textarea
              placeholder="Enter second text..."
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              className="h-64"
            />
          </div>
        </div>
        <Button onClick={findDifferences} className="mt-4 w-full">
          Compare Texts
        </Button>
        {differences.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Differences:</h2>
            <pre className="bg-secondary/10 p-4 rounded-lg whitespace-pre-wrap">
              {differences.join("\n")}
            </pre>
          </div>
        )}
      </Card>
    </div>
  );
};

export default TextComparer;