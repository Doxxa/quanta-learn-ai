import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Atom, 
  ArrowRight, 
  CheckCircle, 
  RotateCcw,
  Zap,
  Binary,
  Brain
} from "lucide-react";

const QubitLesson = ({ onComplete }: { onComplete: () => void }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [qubitState, setQubitState] = useState<'0' | '1' | 'superposition'>('0');

  const sections = [
    {
      title: "What is a Qubit?",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            A <strong>qubit</strong> (quantum bit) is the fundamental unit of quantum information. 
            Unlike classical bits that can only be in state 0 or 1, qubits can exist in a 
            <strong> superposition</strong> of both states simultaneously.
          </p>
          <div className="bg-quantum-blue/10 border border-quantum-blue/20 rounded-lg p-4">
            <h4 className="font-semibold text-quantum-blue mb-2">Key Concept</h4>
            <p className="text-sm">
              While a classical bit is like a coin that's either heads or tails, 
              a qubit is like a spinning coin that's both heads AND tails until observed.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Classical vs Quantum Bits",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Binary className="w-5 h-5 text-quantum-cyan" />
                  Classical Bit
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm">State: 0 OR 1</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm">Deterministic</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm">Limited processing</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-quantum-blue/30 bg-quantum-blue/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Atom className="w-5 h-5 text-quantum-blue" />
                  Quantum Bit (Qubit)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-quantum-blue rounded-full"></div>
                  <span className="text-sm">State: 0 AND 1 (superposition)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-quantum-blue rounded-full"></div>
                  <span className="text-sm">Probabilistic</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-quantum-blue rounded-full"></div>
                  <span className="text-sm">Exponential processing power</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-gradient-to-r from-quantum-purple/10 to-quantum-cyan/10 border border-quantum-purple/20 rounded-lg p-4">
            <h4 className="font-semibold text-quantum-purple mb-2">Processing Power</h4>
            <p className="text-sm mb-2">
              With n classical bits, you can represent 2^n different states, but only one at a time.
            </p>
            <p className="text-sm">
              With n qubits, you can represent 2^n states simultaneously through superposition!
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Interactive Qubit Demo",
      content: (
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Try changing the qubit state below to see how it differs from classical bits:
          </p>
          
          <div className="bg-card/30 border border-border/50 rounded-lg p-6">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 mx-auto relative">
                <div className={`w-24 h-24 rounded-full border-4 transition-all duration-500 ${
                  qubitState === '0' ? 'border-red-500 bg-red-500/20' :
                  qubitState === '1' ? 'border-blue-500 bg-blue-500/20' :
                  'border-quantum-purple bg-gradient-quantum animate-pulse'
                }`}>
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-2xl font-bold">
                      {qubitState === 'superposition' ? '|ψ⟩' : qubitState}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Current State</h4>
                <Badge variant="outline" className={
                  qubitState === 'superposition' 
                    ? 'border-quantum-purple text-quantum-purple'
                    : 'border-border'
                }>
                  {qubitState === '0' ? 'Classical |0⟩' :
                   qubitState === '1' ? 'Classical |1⟩' :
                   'Quantum Superposition |0⟩ + |1⟩'}
                </Badge>
              </div>
              
              <div className="flex gap-2 justify-center">
                <Button 
                  variant={qubitState === '0' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setQubitState('0')}
                >
                  Set to |0⟩
                </Button>
                <Button 
                  variant={qubitState === '1' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setQubitState('1')}
                >
                  Set to |1⟩
                </Button>
                <Button 
                  variant={qubitState === 'superposition' ? 'quantum' : 'outline'}
                  size="sm"
                  onClick={() => setQubitState('superposition')}
                >
                  <Zap className="w-4 h-4 mr-1" />
                  Superposition
                </Button>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Bloch Sphere Representation",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            The <strong>Bloch sphere</strong> is a geometric representation of qubit states. 
            Every point on the sphere corresponds to a possible qubit state.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold">Key Points on the Bloch Sphere:</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span><strong>North Pole:</strong> |0⟩ state</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span><strong>South Pole:</strong> |1⟩ state</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-quantum-purple rounded-full"></div>
                  <span><strong>Equator:</strong> Superposition states</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-background to-muted/50 border border-border/50 rounded-lg p-4">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto relative border-2 border-dashed border-quantum-blue/50 rounded-full">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-xs text-blue-500 block mt-1">|0⟩</span>
                  </div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-xs text-red-500 block mt-1">|1⟩</span>
                  </div>
                  <div className="absolute top-1/2 right-0 transform translate-x-1 -translate-y-1/2">
                    <div className="w-2 h-2 bg-quantum-purple rounded-full"></div>
                    <span className="text-xs text-quantum-purple block mt-1">|+⟩</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Simplified Bloch Sphere</p>
              </div>
            </div>
          </div>
          
          <div className="bg-quantum-cyan/10 border border-quantum-cyan/20 rounded-lg p-4">
            <h4 className="font-semibold text-quantum-cyan mb-2">Why This Matters</h4>
            <p className="text-sm">
              The Bloch sphere helps us visualize quantum operations as rotations, 
              making it easier to understand how quantum gates manipulate qubits.
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
          <Atom className="w-8 h-8 text-quantum-blue" />
          <h1 className="text-3xl font-bold">Introduction to Qubits</h1>
        </div>
        <p className="text-muted-foreground">
          Learn the fundamental building block of quantum computing
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
                      ? 'bg-quantum-blue'
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

export default QubitLesson;