import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Globe, 
  ArrowRight, 
  CheckCircle, 
  RotateCcw,
  Zap,
  Target,
  Brain,
  Play
} from "lucide-react";

const QuantumGatesLesson = ({ onComplete }: { onComplete: () => void }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [selectedGate, setSelectedGate] = useState<'X' | 'Y' | 'Z' | 'H' | null>(null);
  const [qubitState, setQubitState] = useState<'0' | '1' | 'superposition'>('0');
  const [gateHistory, setGateHistory] = useState<string[]>([]);

  const sections = [
    {
      title: "What are Quantum Gates?",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            <strong>Quantum gates</strong> are the building blocks of quantum circuits. They are 
            unitary operations that manipulate qubits in precise ways. Unlike classical logic gates, 
            quantum gates are reversible and can create and manipulate superposition.
          </p>
          
          <div className="bg-quantum-blue/10 border border-quantum-blue/20 rounded-lg p-4">
            <h4 className="font-semibold text-quantum-blue mb-2">Key Properties</h4>
            <ul className="text-sm space-y-1">
              <li>• <strong>Reversible:</strong> Every quantum gate has an inverse</li>
              <li>• <strong>Unitary:</strong> Preserve quantum information</li>
              <li>• <strong>Linear:</strong> Transform superposition states predictably</li>
            </ul>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card/50 border border-border/50 rounded-lg p-4">
              <h5 className="font-medium mb-2 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Classical Gates
              </h5>
              <p className="text-sm text-muted-foreground">
                Irreversible operations like AND, OR, NOT that destroy information
              </p>
            </div>
            <div className="bg-quantum-blue/5 border border-quantum-blue/20 rounded-lg p-4">
              <h5 className="font-medium mb-2 flex items-center gap-2">
                <Globe className="w-4 h-4 text-quantum-blue" />
                Quantum Gates
              </h5>
              <p className="text-sm text-muted-foreground">
                Reversible operations that preserve and manipulate quantum information
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Single-Qubit Gates",
      content: (
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Single-qubit gates operate on individual qubits. Here are the most fundamental ones:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-red-200 hover:border-red-300 cursor-pointer transition-colors" 
                  onClick={() => setSelectedGate('X')}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-500 text-white rounded flex items-center justify-center font-bold">
                    X
                  </div>
                  Pauli-X Gate
                </CardTitle>
                <CardDescription>Quantum NOT gate - flips qubit state</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm space-y-1">
                  <div>|0⟩ → |1⟩</div>
                  <div>|1⟩ → |0⟩</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-blue-200 hover:border-blue-300 cursor-pointer transition-colors"
                  onClick={() => setSelectedGate('H')}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded flex items-center justify-center font-bold">
                    H
                  </div>
                  Hadamard Gate
                </CardTitle>
                <CardDescription>Creates superposition</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm space-y-1">
                  <div>|0⟩ → (|0⟩ + |1⟩)/√2</div>
                  <div>|1⟩ → (|0⟩ - |1⟩)/√2</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-green-200 hover:border-green-300 cursor-pointer transition-colors"
                  onClick={() => setSelectedGate('Y')}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-500 text-white rounded flex items-center justify-center font-bold">
                    Y
                  </div>
                  Pauli-Y Gate
                </CardTitle>
                <CardDescription>Rotation around Y-axis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm space-y-1">
                  <div>|0⟩ → i|1⟩</div>
                  <div>|1⟩ → -i|0⟩</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-purple-200 hover:border-purple-300 cursor-pointer transition-colors"
                  onClick={() => setSelectedGate('Z')}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded flex items-center justify-center font-bold">
                    Z
                  </div>
                  Pauli-Z Gate
                </CardTitle>
                <CardDescription>Phase flip gate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm space-y-1">
                  <div>|0⟩ → |0⟩</div>
                  <div>|1⟩ → -|1⟩</div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {selectedGate && (
            <div className="bg-card/50 border border-border/50 rounded-lg p-4">
              <h4 className="font-semibold mb-2">
                {selectedGate === 'X' ? 'Pauli-X Gate Details' :
                 selectedGate === 'H' ? 'Hadamard Gate Details' :
                 selectedGate === 'Y' ? 'Pauli-Y Gate Details' :
                 'Pauli-Z Gate Details'}
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                {selectedGate === 'X' ? 'The quantum NOT gate flips the state of a qubit. It\'s equivalent to a 180° rotation around the X-axis of the Bloch sphere.' :
                 selectedGate === 'H' ? 'The Hadamard gate creates equal superposition. It\'s the most important gate for creating quantum parallelism.' :
                 selectedGate === 'Y' ? 'The Pauli-Y gate combines a bit flip with a phase flip. It rotates the qubit 180° around the Y-axis.' :
                 'The Pauli-Z gate applies a phase flip to the |1⟩ state while leaving |0⟩ unchanged.'}
              </p>
              
              <div className="bg-quantum-blue/5 border border-quantum-blue/10 rounded p-3">
                <h5 className="text-sm font-medium mb-2">Matrix Representation:</h5>
                <div className="font-mono text-sm bg-background/50 p-2 rounded">
                  {selectedGate === 'X' ? '[0 1]\n[1 0]' :
                   selectedGate === 'H' ? '[1/√2  1/√2]\n[1/√2 -1/√2]' :
                   selectedGate === 'Y' ? '[0 -i]\n[i  0]' :
                   '[1  0]\n[0 -1]'}
                </div>
              </div>
            </div>
          )}

          <div className="bg-card/50 border border-border/20 rounded-lg p-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Play className="w-5 h-5 text-red-500" />
              Learn More with Videos
            </h4>
            <div className="space-y-2">
              <a 
                href="https://www.youtube.com/watch?v=F2okky5vD8k" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-quantum-blue hover:text-quantum-purple transition-colors"
              >
                📺 "Quantum Gates Explained" by IBM Research
              </a>
              <a 
                href="https://www.youtube.com/watch?v=mAHC1dWKNYE" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-quantum-blue hover:text-quantum-purple transition-colors"
              >
                📺 "Introduction to Quantum Gates" by Microsoft Quantum
              </a>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Interactive Gate Simulator",
      content: (
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Try applying quantum gates to see how they transform qubit states:
          </p>
          
          <div className="bg-card/30 border border-border/50 rounded-lg p-6">
            <div className="text-center space-y-4">
              {/* Qubit State Display */}
              <div className="w-24 h-24 mx-auto relative">
                <div className={`w-24 h-24 rounded-full border-4 transition-all duration-500 ${
                  qubitState === '0' ? 'border-blue-500 bg-blue-500/20' :
                  qubitState === '1' ? 'border-red-500 bg-red-500/20' :
                  'border-quantum-purple bg-gradient-quantum animate-pulse'
                }`}>
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-2xl font-bold">
                      {qubitState === 'superposition' ? '|+⟩' : `|${qubitState}⟩`}
                    </span>
                  </div>
                </div>
              </div>
              
              <Badge variant="outline" className={
                qubitState === 'superposition' 
                  ? 'border-quantum-purple text-quantum-purple'
                  : 'border-border'
              }>
                Current State: {qubitState === 'superposition' ? 'Superposition |+⟩' : `|${qubitState}⟩`}
              </Badge>
              
              {/* Gate Buttons - Fixed and Enhanced */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button 
                  variant="outline"
                  className="border-red-200 hover:bg-red-50 hover:scale-105 transition-all"
                  onClick={() => {
                    if (qubitState === '0') setQubitState('1');
                    else if (qubitState === '1') setQubitState('0');
                    else {
                      // For superposition, randomly collapse to opposite state
                      const newState = Math.random() < 0.5 ? '1' : '0';
                      setQubitState(newState);
                    }
                    setGateHistory(prev => [...prev, 'X']);
                  }}
                >
                  <div className="w-6 h-6 bg-red-500 text-white rounded flex items-center justify-center text-sm font-bold mr-2">
                    X
                  </div>
                  X Gate
                </Button>
                
                <Button 
                  variant="outline"
                  className="border-blue-200 hover:bg-blue-50 hover:scale-105 transition-all"
                  onClick={() => {
                    if (qubitState === '0') setQubitState('superposition');
                    else if (qubitState === '1') setQubitState('superposition');
                    else {
                      // H on superposition creates different superposition
                      const newState = Math.random() < 0.5 ? '0' : '1';
                      setQubitState(newState);
                    }
                    setGateHistory(prev => [...prev, 'H']);
                  }}
                >
                  <div className="w-6 h-6 bg-blue-500 text-white rounded flex items-center justify-center text-sm font-bold mr-2">
                    H
                  </div>
                  H Gate
                </Button>
                
                <Button 
                  variant="outline"
                  className="border-green-200 hover:bg-green-50 hover:scale-105 transition-all"
                  onClick={() => {
                    // Y gate effect (bit flip + phase flip)
                    if (qubitState === '0') setQubitState('1');
                    else if (qubitState === '1') setQubitState('0');
                    else {
                      // For superposition, apply Y transformation
                      const newState = Math.random() < 0.5 ? '1' : '0';
                      setQubitState(newState);
                    }
                    setGateHistory(prev => [...prev, 'Y']);
                  }}
                >
                  <div className="w-6 h-6 bg-green-500 text-white rounded flex items-center justify-center text-sm font-bold mr-2">
                    Y
                  </div>
                  Y Gate
                </Button>
                
                <Button 
                  variant="outline"
                  className="border-purple-200 hover:bg-purple-50 hover:scale-105 transition-all"
                  onClick={() => {
                    // Z gate applies phase flip to |1⟩ state
                    // Visually doesn't change computational basis states but adds to history
                    setGateHistory(prev => [...prev, 'Z']);
                    // Add visual feedback for Z gate
                    if (qubitState === '1' || qubitState === 'superposition') {
                      // Brief visual indication
                      const originalState = qubitState;
                      setQubitState('0');
                      setTimeout(() => setQubitState(originalState), 200);
                    }
                  }}
                >
                  <div className="w-6 h-6 bg-purple-500 text-white rounded flex items-center justify-center text-sm font-bold mr-2">
                    Z
                  </div>
                  Z Gate
                </Button>
              </div>
              
              <Button 
                variant="outline"
                onClick={() => {
                  setQubitState('0');
                  setGateHistory([]);
                }}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset to |0⟩
              </Button>
              
              {gateHistory.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Gate Sequence Applied:</p>
                  <div className="flex gap-1 justify-center flex-wrap">
                    {gateHistory.map((gate, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary"
                        className={`${
                          gate === 'X' ? 'bg-red-100 text-red-700' :
                          gate === 'H' ? 'bg-blue-100 text-blue-700' :
                          gate === 'Y' ? 'bg-green-100 text-green-700' :
                          'bg-purple-100 text-purple-700'
                        }`}
                      >
                        {gate}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Quantum circuit: |0⟩ → {gateHistory.join(' → ')} → |ψ⟩
                  </p>
                </div>
              )}
              
              <div className="bg-quantum-blue/10 border border-quantum-blue/20 rounded-lg p-3">
                <p className="text-sm text-center">
                  🎯 <strong>Pro Tip:</strong> Try applying H → X → H sequence to see how gates combine!
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Multi-Qubit Gates",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Multi-qubit gates operate on two or more qubits simultaneously. They're essential 
            for creating <strong>quantum entanglement</strong> and building complex quantum algorithms.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="w-8 h-8 bg-quantum-cyan text-white rounded flex items-center justify-center text-sm font-bold">
                    CX
                  </div>
                  CNOT Gate
                </CardTitle>
                <CardDescription>Controlled-NOT gate</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">Flips target qubit if control qubit is |1⟩</p>
                <div className="text-xs space-y-1 text-muted-foreground">
                  <div>|00⟩ → |00⟩</div>
                  <div>|01⟩ → |01⟩</div>
                  <div>|10⟩ → |11⟩</div>
                  <div>|11⟩ → |10⟩</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="w-8 h-8 bg-quantum-purple text-white rounded flex items-center justify-center text-sm font-bold">
                    CZ
                  </div>
                  Controlled-Z Gate
                </CardTitle>
                <CardDescription>Controlled phase gate</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">Applies Z gate to target if control is |1⟩</p>
                <div className="text-xs space-y-1 text-muted-foreground">
                  <div>|00⟩ → |00⟩</div>
                  <div>|01⟩ → |01⟩</div>
                  <div>|10⟩ → |10⟩</div>
                  <div>|11⟩ → -|11⟩</div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-quantum-cyan/10 border border-quantum-cyan/20 rounded-lg p-4">
            <h4 className="font-semibold text-quantum-cyan mb-2">Universal Gate Sets</h4>
            <p className="text-sm">
              Any quantum computation can be performed using just a universal set of gates. 
              For example: {'{H, T, CNOT}'} or {'{Ry(θ), Rz(θ), CNOT}'} are universal.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-quantum-blue/10 to-quantum-purple/10 border border-quantum-blue/20 rounded-lg p-4">
            <h4 className="font-semibold text-quantum-blue mb-2">Quantum Circuits</h4>
            <p className="text-sm">
              Quantum gates are combined in sequence to form quantum circuits, which implement 
              quantum algorithms like Shor's algorithm or Grover's search.
            </p>
          </div>

          <div className="bg-card/50 border border-border/20 rounded-lg p-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Play className="w-5 h-5 text-red-500" />
              Advanced Topics
            </h4>
            <div className="space-y-2">
              <a 
                href="https://www.youtube.com/watch?v=hvO7-LKGqQE" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-quantum-blue hover:text-quantum-purple transition-colors"
              >
                📺 "Quantum Entanglement with CNOT Gates" by MinutePhysics
              </a>
              <a 
                href="https://www.youtube.com/watch?v=X2q1PuI2RFI" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-quantum-blue hover:text-quantum-purple transition-colors"
              >
                📺 "Building Quantum Circuits" by Qiskit
              </a>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Quantum Algorithm Building Blocks",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-quantum-purple/10 to-quantum-cyan/10 rounded-lg p-4">
            <p className="text-muted-foreground leading-relaxed">
              Quantum gates combine to create powerful algorithms that solve problems exponentially 
              faster than classical computers. Let's explore some fundamental patterns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border/50 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  Quantum Parallelism
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">Create superposition with Hadamard gates:</p>
                <div className="bg-background/50 p-3 rounded font-mono text-sm">
                  H⊗H⊗H |000⟩ = |+++⟩
                </div>
                <p className="text-xs text-muted-foreground">
                  This creates a superposition of all 8 possible 3-bit states simultaneously!
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-500" />
                  Quantum Interference
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">Amplify correct answers, cancel wrong ones:</p>
                <div className="bg-background/50 p-3 rounded font-mono text-sm">
                  Oracle → Diffuser → Measure
                </div>
                <p className="text-xs text-muted-foreground">
                  This is the core of Grover's search algorithm for database search.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-quantum-cyan/10 border border-quantum-cyan/20 rounded-lg p-4">
            <h4 className="font-semibold text-quantum-cyan mb-2 flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Famous Quantum Algorithms
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              <div className="bg-background/30 p-3 rounded">
                <h5 className="font-medium mb-1">Shor's Algorithm</h5>
                <p className="text-xs text-muted-foreground">Factors large numbers exponentially faster</p>
              </div>
              <div className="bg-background/30 p-3 rounded">
                <h5 className="font-medium mb-1">Grover's Search</h5>
                <p className="text-xs text-muted-foreground">Searches databases quadratically faster</p>
              </div>
              <div className="bg-background/30 p-3 rounded">
                <h5 className="font-medium mb-1">VQE Algorithm</h5>
                <p className="text-xs text-muted-foreground">Simulates molecular chemistry</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-600 mb-2">🎯 Try This Challenge</h4>
            <p className="text-sm">
              Go back to the simulator and try this sequence: H → Z → H. 
              Notice how this creates a different superposition state than just H alone!
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
          <Globe className="w-8 h-8 text-quantum-blue" />
          <h1 className="text-3xl font-bold">Quantum Gates</h1>
        </div>
        <p className="text-muted-foreground">
          The building blocks of quantum circuits and quantum computation
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

export default QuantumGatesLesson;