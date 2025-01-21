import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleNumber = (number: string) => {
    if (display === '0') {
      setDisplay(number);
    } else {
      setDisplay(display + number);
    }
  };

  const handleOperator = (operator: string) => {
    setEquation(display + ' ' + operator + ' ');
    setDisplay('0');
  };

  const handleEqual = () => {
    try {
      const result = eval(equation + display);
      setDisplay(String(result));
      setEquation('');
    } catch (error) {
      setDisplay('Error');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  return (
    <div className="container mx-auto p-4 max-w-md animate-fade-in">
      <div className="bg-white/30 backdrop-blur-lg rounded-lg p-6 shadow-lg">
        <div className="mb-4">
          <div className="text-right text-sm text-gray-600 h-6">{equation}</div>
          <div className="text-right text-3xl font-bold">{display}</div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <Button variant="outline" onClick={handleClear} className="col-span-2">
            Clear
          </Button>
          <Button variant="outline" onClick={() => handleOperator('/')}>/</Button>
          <Button variant="outline" onClick={() => handleOperator('*')}>×</Button>
          
          {[7, 8, 9].map((num) => (
            <Button key={num} variant="outline" onClick={() => handleNumber(String(num))}>
              {num}
            </Button>
          ))}
          <Button variant="outline" onClick={() => handleOperator('-')}>-</Button>
          
          {[4, 5, 6].map((num) => (
            <Button key={num} variant="outline" onClick={() => handleNumber(String(num))}>
              {num}
            </Button>
          ))}
          <Button variant="outline" onClick={() => handleOperator('+')}>+</Button>
          
          {[1, 2, 3].map((num) => (
            <Button key={num} variant="outline" onClick={() => handleNumber(String(num))}>
              {num}
            </Button>
          ))}
          <Button variant="outline" onClick={handleEqual}>=</Button>
          
          <Button variant="outline" onClick={() => handleNumber('0')} className="col-span-2">
            0
          </Button>
          <Button variant="outline" onClick={() => handleNumber('.')}>.</Button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;