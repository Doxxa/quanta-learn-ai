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
  Brain,
  Play,
  Target
} from "lucide-react";

const QubitLesson = ({ onComplete }: { onComplete: () => void }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [qubitState, setQubitState] = useState<'0' | '1' | 'superposition'>('0');

  const sections = [
    {
      title: "What is a Qubit?",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-quantum-blue/5 to-quantum-purple/5 rounded-lg p-6">
            <p className="text-muted-foreground leading-relaxed text-lg">
              A <strong>qubit</strong> (quantum bit) is the fundamental unit of quantum information. 
              Unlike classical bits that can only be in state 0 or 1, qubits can exist in a 
              <strong> superposition</strong> of both states simultaneously.
            </p>
          </div>
          
          <div className="bg-quantum-blue/10 border border-quantum-blue/20 rounded-lg p-4">
            <h4 className="font-semibold text-quantum-blue mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Key Concept
            </h4>
            <p className="text-sm">
              While a classical bit is like a coin that's either heads or tails, 
              a qubit is like a spinning coin that's both heads AND tails until observed.
            </p>
          </div>

          <div className="bg-card/50 border border-border/20 rounded-lg p-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Play className="w-5 h-5 text-red-500" />
              Recommended Videos
            </h4>
            <div className="space-y-2">
              <a 
                href="https://www.youtube.com/watch?v=F_Riqjdh2oM" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-quantum-blue hover:text-quantum-purple transition-colors"
              >
                📺 "Quantum Mechanics Explained" by MinutePhysics
              </a>
              <a 
                href="https://www.youtube.com/watch?v=JvIbrDR1G_c" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-quantum-blue hover:text-quantum-purple transition-colors"
              >
                📺 "What is a Qubit?" by IBM Research
              </a>
            </div>
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
          <div className="bg-gradient-to-r from-quantum-cyan/10 to-quantum-blue/10 rounded-lg p-4">
            <p className="text-muted-foreground">
              🧪 <strong>Interactive Simulation:</strong> Try changing the qubit state below to see how it differs from classical bits:
            </p>
          </div>
          
          <div className="bg-card/30 border border-border/50 rounded-lg p-6">
            <div className="text-center space-y-4">
              <div className="w-32 h-32 mx-auto relative">
                <div className={`w-32 h-32 rounded-full border-4 transition-all duration-500 ${
                  qubitState === '0' ? 'border-red-500 bg-red-500/20 shadow-lg shadow-red-500/25' :
                  qubitState === '1' ? 'border-blue-500 bg-blue-500/20 shadow-lg shadow-blue-500/25' :
                  'border-quantum-purple bg-gradient-quantum animate-pulse shadow-lg shadow-quantum-purple/25'
                }`}>
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-3xl font-bold">
                      {qubitState === 'superposition' ? '|ψ⟩' : qubitState}
                    </span>
                  </div>
                </div>
                {/* Probability visualization */}
                {qubitState === 'superposition' && (
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="flex gap-1">
                      <div className="w-2 h-8 bg-blue-500 rounded animate-bounce" style={{animationDelay: '0ms'}}></div>
                      <div className="w-2 h-8 bg-red-500 rounded animate-bounce" style={{animationDelay: '100ms'}}></div>
                    </div>
                  </div>
                )}
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
                
                {/* State description */}
                <div className="text-sm text-muted-foreground mt-2">
                  {qubitState === '0' ? '100% probability of measuring 0' :
                   qubitState === '1' ? '100% probability of measuring 1' :
                   '50% probability of measuring 0 or 1'}
                </div>
              </div>
              
              <div className="flex gap-2 justify-center flex-wrap">
                <Button 
                  variant={qubitState === '0' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setQubitState('0')}
                  className="hover:scale-105 transition-transform"
                >
                  Set to |0⟩
                </Button>
                <Button 
                  variant={qubitState === '1' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setQubitState('1')}
                  className="hover:scale-105 transition-transform"
                >
                  Set to |1⟩
                </Button>
                <Button 
                  variant={qubitState === 'superposition' ? 'quantum' : 'outline'}
                  size="sm"
                  onClick={() => setQubitState('superposition')}
                  className="hover:scale-105 transition-transform"
                >
                  <Zap className="w-4 h-4 mr-1" />
                  Superposition
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-600 mb-2">💡 Try This</h4>
            <p className="text-sm">
              Notice how the superposition state is fundamentally different - it's not just "unknown" 
              like a classical bit, but truly existing in both states simultaneously!
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Bloch Sphere Representation",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-quantum-cyan/10 to-quantum-purple/10 rounded-lg p-4">
            <p className="text-muted-foreground leading-relaxed">
              The <strong>Bloch sphere</strong> is a geometric representation of qubit states. 
              Every point on the sphere corresponds to a possible qubit state.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h4 className="font-semibold">Key Points on the Bloch Sphere:</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm bg-blue-500/10 p-3 rounded-lg">
                  <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                  <span><strong>North Pole:</strong> |0⟩ state (Ground state)</span>
                </div>
                <div className="flex items-center gap-3 text-sm bg-red-500/10 p-3 rounded-lg">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                  <span><strong>South Pole:</strong> |1⟩ state (Excited state)</span>
                </div>
                <div className="flex items-center gap-3 text-sm bg-quantum-purple/10 p-3 rounded-lg">
                  <div className="w-4 h-4 bg-quantum-purple rounded-full animate-pulse"></div>
                  <span><strong>Equator:</strong> Superposition states (|+⟩, |-⟩, |i⟩, |-i⟩)</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-quantum-blue/5 to-quantum-purple/5 p-4 rounded-lg">
                <h5 className="font-medium mb-2">Mathematical Representation:</h5>
                <div className="text-sm font-mono bg-background/50 p-2 rounded">
                  |ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Where θ and φ are spherical coordinates
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-background to-muted/30 border border-border/50 rounded-lg p-6">
              <div className="text-center">
                <div className="w-40 h-40 mx-auto relative border-2 border-dashed border-quantum-blue/50 rounded-full bg-gradient-to-br from-quantum-blue/5 to-quantum-purple/5">
                  {/* Coordinate lines */}
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border/30"></div>
                  <div className="absolute top-0 left-1/2 w-0.5 h-full bg-border/30"></div>
                  
                  {/* State points */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 -translate-y-1">
                    <div className="w-3 h-3 bg-blue-500 rounded-full shadow-lg animate-pulse"></div>
                    <span className="text-xs text-blue-500 block mt-1 font-bold">|0⟩</span>
                  </div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 translate-y-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg animate-pulse"></div>
                    <span className="text-xs text-red-500 block mt-1 font-bold">|1⟩</span>
                  </div>
                  <div className="absolute top-1/2 right-2 transform translate-x-1 -translate-y-1/2">
                    <div className="w-3 h-3 bg-quantum-purple rounded-full shadow-lg animate-pulse"></div>
                    <span className="text-xs text-quantum-purple block mt-1 font-bold">|+⟩</span>
                  </div>
                  <div className="absolute top-1/2 left-2 transform -translate-x-1 -translate-y-1/2">
                    <div className="w-3 h-3 bg-quantum-cyan rounded-full shadow-lg animate-pulse"></div>
                    <span className="text-xs text-quantum-cyan block mt-1 font-bold">|-⟩</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3 font-medium">3D Bloch Sphere (2D Projection)</p>
              </div>
            </div>
          </div>
          
          <div className="bg-quantum-cyan/10 border border-quantum-cyan/20 rounded-lg p-4">
            <h4 className="font-semibold text-quantum-cyan mb-2 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Why This Matters
            </h4>
            <p className="text-sm mb-2">
              The Bloch sphere helps us visualize quantum operations as rotations, 
              making it easier to understand how quantum gates manipulate qubits.
            </p>
            <ul className="text-sm space-y-1">
              <li>• Any single-qubit operation is a rotation on the Bloch sphere</li>
              <li>• Pure states are on the surface, mixed states are inside</li>
              <li>• Measurement collapses the state to one of the poles</li>
            </ul>
          </div>

          <div className="bg-card/50 border border-border/20 rounded-lg p-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Play className="w-5 h-5 text-red-500" />
              Deep Dive Videos
            </h4>
            <div className="space-y-2">
              <a 
                href="https://www.youtube.com/watch?v=PzystCo7FsY" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-quantum-blue hover:text-quantum-purple transition-colors"
              >
                📺 "Bloch Sphere Explained" by Quantum Computing Explained
              </a>
              <a 
                href="https://www.youtube.com/watch?v=Bxn_TJrB2hc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-quantum-blue hover:text-quantum-purple transition-colors"
              >
                📺 "Visualizing Quantum States" by 3Blue1Brown
              </a>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Real-World Applications",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg p-4">
            <h4 className="font-semibold text-green-600 mb-2">🚀 Where Qubits Are Used Today</h4>
            <p className="text-sm">
              Qubits aren't just theoretical - they're powering real quantum computers right now!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border/50 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="w-5 h-5 text-blue-500" />
                  Quantum Computing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">IBM, Google, and others use qubits for:</p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Drug discovery simulations</li>
                  <li>• Cryptography and security</li>
                  <li>• Financial modeling</li>
                  <li>• Machine learning optimization</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Atom className="w-5 h-5 text-quantum-purple" />
                  Quantum Sensors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">Qubits enable ultra-precise measurements:</p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Gravitational wave detection</li>
                  <li>• Medical imaging (MRI)</li>
                  <li>• Navigation systems</li>
                  <li>• Mineral exploration</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-quantum-purple/10 to-quantum-cyan/10 border border-quantum-purple/20 rounded-lg p-4">
            <h4 className="font-semibold text-quantum-purple mb-2">🔮 The Future</h4>
            <p className="text-sm">
              As we scale up from today's ~1000 qubit systems to millions of qubits, 
              we'll unlock applications we can barely imagine - from simulating entire molecules 
              to solving optimization problems that would take classical computers millennia!
            </p>
          </div>

          <div className="bg-card/50 border border-border/20 rounded-lg p-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Play className="w-5 h-5 text-red-500" />
              Applications in Action
            </h4>
            <div className="space-y-2">
              <a 
                href="https://www.youtube.com/watch?v=F8U1d2Hqark" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-quantum-blue hover:text-quantum-purple transition-colors"
              >
                📺 "Real Quantum Computer Demo" by IBM
              </a>
              <a 
                href="https://www.youtube.com/watch?v=6qD5PYcFMg8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-quantum-blue hover:text-quantum-purple transition-colors"
              >
                📺 "Quantum Computing Applications" by Nature Video
              </a>
            </div>
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