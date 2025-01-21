import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

const CodeFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const formatCode = () => {
    try {
      // Try to parse as JSON first
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
    } catch {
      try {
        // If not JSON, try to format as JavaScript/TypeScript
        // Basic indentation-based formatting
        const lines = input.split('\n');
        let indentLevel = 0;
        const formatted = lines.map(line => {
          const trimmed = line.trim();
          
          // Decrease indent for closing braces/brackets
          if (trimmed.startsWith('}') || trimmed.startsWith(']')) {
            indentLevel = Math.max(0, indentLevel - 1);
          }
          
          const formatted = '  '.repeat(indentLevel) + trimmed;
          
          // Increase indent for opening braces/brackets
          if (trimmed.endsWith('{') || trimmed.endsWith('[')) {
            indentLevel += 1;
          }
          
          return formatted;
        }).join('\n');
        
        setOutput(formatted);
      } catch (error) {
        setOutput('Error: Unable to format code. Please check your input.');
      }
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl animate-fade-in">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Code Formatter</h1>
          <p className="text-muted-foreground">
            Format your code with proper indentation
          </p>
        </div>

        <div className="grid gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Input Code:</label>
            <ScrollArea className="h-[300px] rounded-md border">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your code here..."
                className="min-h-[300px] resize-none border-0"
              />
            </ScrollArea>
          </div>

          <div className="flex justify-center">
            <Button onClick={formatCode} className="w-full max-w-xs">
              Format Code
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Formatted Code:</label>
            <ScrollArea className="h-[300px] rounded-md border">
              <Textarea
                value={output}
                readOnly
                className="min-h-[300px] resize-none border-0"
              />
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeFormatter;