import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizData: QuizQuestion[] = [
  {
    id: '1',
    question: 'What is a qubit?',
    options: [
      'A classical bit that can be 0 or 1',
      'A quantum bit that can be in superposition of 0 and 1',
      'A type of quantum gate',
      'A measurement device'
    ],
    correctAnswer: 1,
    explanation: 'A qubit is the fundamental unit of quantum information that can exist in a superposition of both 0 and 1 states simultaneously.'
  },
  {
    id: '2',
    question: 'What does the Hadamard gate do?',
    options: [
      'Flips a qubit from 0 to 1',
      'Measures a qubit',
      'Creates superposition',
      'Entangles two qubits'
    ],
    correctAnswer: 2,
    explanation: 'The Hadamard gate creates an equal superposition of |0⟩ and |1⟩ states, putting a qubit into a quantum superposition.'
  },
  {
    id: '3',
    question: 'What is quantum entanglement?',
    options: [
      'When qubits are physically connected',
      'When qubits share a quantum state and measuring one affects the other',
      'When qubits are in superposition',
      'When qubits are measured simultaneously'
    ],
    correctAnswer: 1,
    explanation: 'Quantum entanglement is a phenomenon where qubits become correlated and the quantum state of each qubit cannot be described independently.'
  },
  {
    id: '4',
    question: 'What happens when you measure a qubit in superposition?',
    options: [
      'It remains in superposition',
      'It becomes entangled',
      'It collapses to either 0 or 1',
      'It gets destroyed'
    ],
    correctAnswer: 2,
    explanation: 'When a qubit in superposition is measured, the wave function collapses and the qubit takes on a definite state of either 0 or 1.'
  },
  {
    id: '5',
    question: 'Which gate is its own inverse?',
    options: [
      'Pauli-X gate',
      'Pauli-Y gate',
      'Pauli-Z gate',
      'All of the above'
    ],
    correctAnswer: 3,
    explanation: 'All Pauli gates (X, Y, and Z) are their own inverse, meaning applying them twice returns the qubit to its original state.'
  }
];

const QuizComponent = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(quizData.length).fill(null));
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { toast } = useToast();

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);
    setShowResult(true);

    if (selectedAnswer === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
      toast({
        title: 'Quiz Completed!',
        description: `You scored ${score + (selectedAnswer === quizData[currentQuestion].correctAnswer ? 1 : 0)} out of ${quizData.length}`,
      });
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers(new Array(quizData.length).fill(null));
    setQuizCompleted(false);
  };

  const progress = ((currentQuestion + (showResult ? 1 : 0)) / quizData.length) * 100;
  const finalScore = score + (showResult && selectedAnswer === quizData[currentQuestion].correctAnswer ? 1 : 0);

  if (quizCompleted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Quiz Completed!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="text-6xl font-bold text-primary">
            {finalScore}/{quizData.length}
          </div>
          <div className="space-y-2">
            <p className="text-xl">
              {finalScore === quizData.length ? '🎉 Perfect Score!' : 
               finalScore >= quizData.length * 0.8 ? '🌟 Great Job!' :
               finalScore >= quizData.length * 0.6 ? '👍 Good Work!' : '📚 Keep Learning!'}
            </p>
            <p className="text-muted-foreground">
              You answered {finalScore} out of {quizData.length} questions correctly
            </p>
          </div>
          <Button onClick={resetQuiz} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const question = quizData[currentQuestion];

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Quantum Computing Quiz</CardTitle>
          <Badge variant="outline">
            {currentQuestion + 1} / {quizData.length}
          </Badge>
        </div>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
          <div className="space-y-2">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctAnswer;
              const isIncorrect = showResult && isSelected && !isCorrect;
              const shouldHighlight = showResult && isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full p-4 text-left rounded-lg border transition-colors ${
                    isSelected && !showResult
                      ? 'border-primary bg-primary/10'
                      : shouldHighlight
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : isIncorrect
                      ? 'border-red-500 bg-red-50 text-red-800'
                      : 'border-border hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showResult && (
                      <>
                        {isCorrect && <CheckCircle className="w-5 h-5 text-green-600" />}
                        {isIncorrect && <XCircle className="w-5 h-5 text-red-600" />}
                      </>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {showResult && (
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-medium mb-2">Explanation:</p>
            <p className="text-sm text-muted-foreground">{question.explanation}</p>
          </div>
        )}

        <div className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Score: {score} / {currentQuestion + (showResult ? 1 : 0)}
          </div>
          <div className="space-x-2">
            {!showResult ? (
              <Button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
              >
                Submit Answer
              </Button>
            ) : (
              <Button onClick={handleNextQuestion}>
                {currentQuestion < quizData.length - 1 ? 'Next Question' : 'Complete Quiz'}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizComponent;