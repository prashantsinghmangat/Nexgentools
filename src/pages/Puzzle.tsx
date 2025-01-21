import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Puzzle = () => {
  const [tiles, setTiles] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const { toast } = useToast();

  const shuffle = (array: number[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const initializePuzzle = () => {
    const numbers = Array.from({ length: 16 }, (_, i) => i);
    setTiles(shuffle(numbers));
    setMoves(0);
  };

  useEffect(() => {
    initializePuzzle();
  }, []);

  const canMove = (index: number) => {
    const emptyIndex = tiles.indexOf(0);
    const row = Math.floor(index / 4);
    const emptyRow = Math.floor(emptyIndex / 4);
    const col = index % 4;
    const emptyCol = emptyIndex % 4;

    return (
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow)
    );
  };

  const moveTile = (index: number) => {
    if (!canMove(index)) return;

    const newTiles = [...tiles];
    const emptyIndex = tiles.indexOf(0);
    [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
    setTiles(newTiles);
    setMoves(moves + 1);

    if (isComplete(newTiles)) {
      toast({
        title: "Congratulations!",
        description: `You solved the puzzle in ${moves + 1} moves!`,
      });
    }
  };

  const isComplete = (currentTiles: number[]) => {
    return currentTiles.every((tile, index) => 
      index === 15 ? tile === 0 : tile === index + 1
    );
  };

  return (
    <div className="max-w-md mx-auto space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">15 Puzzle</h1>
        <p className="text-muted-foreground">Moves: {moves}</p>
      </div>

      <div className="grid grid-cols-4 gap-2 aspect-square">
        {tiles.map((tile, index) => (
          <Button
            key={index}
            onClick={() => moveTile(index)}
            disabled={!canMove(index)}
            variant={tile === 0 ? "ghost" : "default"}
            className={`aspect-square text-xl font-bold ${
              tile === 0 ? 'invisible' : ''
            }`}
          >
            {tile === 0 ? '' : tile}
          </Button>
        ))}
      </div>

      <Button onClick={initializePuzzle} className="w-full">
        New Game
      </Button>
    </div>
  );
};

export default Puzzle;