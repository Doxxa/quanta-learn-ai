import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, 
  ArrowRight, 
  CheckCircle, 
  Eye,
  Shuffle,
  Target,
  Brain,
  RotateCcw
} from "lucide-react";

const SuperpositionLesson = ({ onComplete }: { onComplete: () => void }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [coinFlips, setCoinFlips] = useState<string[]>([]);
  const [isFlipping, setIsFlipping] = useState(false);
  const [measured, setMeasured] = useState(false);
  const [measurementResult, setMeasurementResult] = useState<'0' | '1' | null>(null);

  const sections = [
    {
      title: "Understanding Superposition",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            <strong>Superposition</strong> is the ability of a quantum system to exist in multiple 
            states simultaneously until it is observed or measured. This is one of the most 
            counterintuitive yet powerful principles in quantum mechanics.
          </p>
          
          <div className="bg-quantum-purple/10 border border-quantum-purple/20 rounded-lg p-4">
            <h4 className="font-semibold text-quantum-purple mb-2">The Superposition Principle</h4>
            <p className="text-sm">
              If a quantum system can be in state |0⟩ and in state |1⟩, then it can also be in 
              any linear combination (superposition) of these states: α|0⟩ + β|1⟩
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card/50 border border-border/50 rounded-lg p-4">
              <h5 className="font-medium mb-2">Classical World</h5>
              <p className="text-sm text-muted-foreground">
                A light switch is either ON or OFF. A coin is either heads or tails when at rest.
              </p>
            </div>
            <div className="bg-quantum-purple/5 border border-quantum-purple/20 rounded-lg p-4">
              <h5 className="font-medium mb-2">Quantum World</h5>
              <p className="text-sm text-muted-foreground">
                A qubit can be |0⟩, |1⟩, or any combination of both states simultaneously.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "The Spinning Coin Analogy",
      content: (
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Imagine a coin spinning in the air. While it's spinning, it's neither purely heads 
            nor tails—it's in a superposition of both states.
          </p>
          
          <div className="bg-card/30 border border-border/50 rounded-lg p-6">
            <div className="text-center space-y-4">
              <h4 className="font-semibold">Classical Coin Simulation</h4>
              <p className="text-sm text-muted-foreground">
                Click to flip the coin multiple times and see the random results:
              </p>
              
              <Button 
                onClick={() => {
                  setIsFlipping(true);
                  setTimeout(() => {
                    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
                    setCoinFlips(prev => [...prev.slice(-4), result]);
                    setIsFlipping(false);
                  }, 500);
                }}
                disabled={isFlipping}
                variant="outline"
              >
                <Shuffle className="w-4 h-4 mr-2" />
                {isFlipping ? 'Flipping...' : 'Flip Classical Coin'}
              </Button>
              
              {coinFlips.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Recent Results:</p>
                  <div className="flex gap-2 justify-center">
                    {coinFlips.map((flip, index) => (
                      <Badge key={index} variant="outline">
                        {flip}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-quantum-purple/10 border border-quantum-purple/20 rounded-lg p-4">
            <h4 className="font-semibold text-quantum-purple mb-2">Quantum Difference</h4>
            <p className="text-sm">
              In quantum superposition, the qubit isn't randomly switching between states—
              it's genuinely in both states at once until measured!
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Measurement and Collapse",
      content: (
        <div className="space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            When we <strong>measure</strong> a qubit in superposition, the quantum state 
            "collapses" to either |0⟩ or |1⟩. The probability of each outcome depends on 
            the quantum amplitudes in the superposition.
          </p>
          
          <div className="bg-card/30 border border-border/50 rounded-lg p-6">
            <div className="text-center space-y-4">
              <h4 className="font-semibold">Quantum Measurement Demo</h4>
              
              <div className="w-32 h-32 mx-auto relative">
                <div className={`w-32 h-32 rounded-full border-4 transition-all duration-500 ${
                  !measured 
                    ? 'border-quantum-purple bg-gradient-quantum animate-pulse' 
                    : measurementResult === '0'
                    ? 'border-blue-500 bg-blue-500/20'
                    : 'border-red-500 bg-red-500/20'
                }`}>
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-3xl font-bold">
                      {!measured ? '|ψ⟩' : measurementResult}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Badge variant="outline" className={
                  !measured 
                    ? 'border-quantum-purple text-quantum-purple'
                    : 'border-border'
                }>
                  {!measured ? 'In Superposition |0⟩ + |1⟩' : `Measured: |${measurementResult}⟩`}
                </Badge>
                
                <div className="flex gap-2 justify-center">
                  <Button 
                    variant={!measured ? 'quantum' : 'outline'}
                    onClick={() => {
                      if (!measured) {
                        const result = Math.random() < 0.5 ? '0' : '1';
                        setMeasurementResult(result);
                        setMeasured(true);
                      }
                    }}
                    disabled={measured}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Measure Qubit
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setMeasured(false);
                      setMeasurementResult(null);
                    }}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-600 mb-2">⚠️ Important Note</h4>
            <p className="text-sm">
              Once measured, the quantum superposition is destroyed! The qubit is now in a 
              definite classical state and cannot be "unmeasured."
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Probability Amplitudes",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            In quantum mechanics, the coefficients α and β in the superposition α|0⟩ + β|1⟩ 
            are called <strong>probability amplitudes</strong>. The probability of measuring 
            each state is given by the square of these amplitudes.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Equal Superposition</CardTitle>
                <CardDescription>|ψ⟩ = (1/√2)|0⟩ + (1/√2)|1⟩</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">P(|0⟩) = |1/√2|²</span>
                    <Badge variant="outline">50%</Badge>
                  </div>
                  <Progress value={50} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">P(|1⟩) = |1/√2|²</span>
                    <Badge variant="outline">50%</Badge>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-quantum-blue/30 bg-quantum-blue/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Biased Superposition</CardTitle>
                <CardDescription>|ψ⟩ = (√3/2)|0⟩ + (1/2)|1⟩</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">P(|0⟩) = |√3/2|²</span>
                    <Badge variant="outline">75%</Badge>
                  </div>
                  <Progress value={75} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">P(|1⟩) = |1/2|²</span>
                    <Badge variant="outline">25%</Badge>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-quantum-cyan/10 border border-quantum-cyan/20 rounded-lg p-4">
            <h4 className="font-semibold text-quantum-cyan mb-2">Normalization</h4>
            <p className="text-sm">
              The probability amplitudes must satisfy |α|² + |β|² = 1, ensuring that the 
              total probability of measuring any state is always 100%.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-quantum-purple/10 to-quantum-blue/10 border border-quantum-purple/20 rounded-lg p-4">
            <h4 className="font-semibold text-quantum-purple mb-2">Quantum Advantage</h4>
            <p className="text-sm">
              Superposition allows quantum computers to process multiple possibilities 
              simultaneously, providing exponential speedups for certain algorithms!
            </p>
          </div>
        </div>
      )
    }
  ];

  const handleNextSection = () => {
    if (!completedSections.includes(currentSection)) {
      setCompletedSections([...completedSections, currentSection]);
    }
    
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      onComplete();
    }
  };

  const handlePreviousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const progress = ((currentSection + 1) / sections.length) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Zap className="w-8 h-8 text-quantum-purple" />
          <h1 className="text-3xl font-bold">Quantum Superposition</h1>
        </div>
        <p className="text-muted-foreground">
          Understanding how qubits exist in multiple states simultaneously
        </p>
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <span>Section {currentSection + 1} of {sections.length}</span>
          <Progress value={progress} className="w-32 h-2" />
          <span>{Math.round(progress)}% Complete</span>
        </div>
      </div>

      {/* Main Content */}
      <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {completedSections.includes(currentSection) && (
              <CheckCircle className="w-5 h-5 text-green-500" />
            )}
            {sections[currentSection].title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {sections[currentSection].content}
          
          <Separator />
          
          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePreviousSection}
              disabled={currentSection === 0}
            >
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
              Previous
            </Button>
            
            <div className="flex items-center gap-2">
              {sections.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSection
                      ? 'bg-quantum-purple'
                      : completedSections.includes(index)
                      ? 'bg-green-500'
                      : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            
            <Button
              variant={currentSection === sections.length - 1 ? "quantum" : "default"}
              onClick={handleNextSection}
            >
              {currentSection === sections.length - 1 ? (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Complete Lesson
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperpositionLesson;