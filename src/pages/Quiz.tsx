import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const questions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correct: 2,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct: 1,
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correct: 1,
  },
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const { toast } = useToast();

  const handleAnswerClick = (selectedOption: number) => {
    if (selectedOption === questions[currentQuestion].correct) {
      setScore(score + 1);
      toast({
        title: "Correct!",
        description: "Good job! Keep going!",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Incorrect",
        description: `The correct answer was: ${
          questions[currentQuestion].options[questions[currentQuestion].correct]
        }`,
      });
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div className="container max-w-2xl mx-auto py-8">
      <Card className="p-6">
        {showScore ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
            <p className="text-xl mb-4">
              You scored {score} out of {questions.length}
            </p>
            <Button onClick={handleRestart}>Restart Quiz</Button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">
                Question {currentQuestion + 1}/{questions.length}
              </h2>
              <p className="text-lg">{questions[currentQuestion].question}</p>
            </div>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  variant="outline"
                  className="w-full text-left justify-start"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Quiz;