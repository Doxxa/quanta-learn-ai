import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Link, 
  ArrowRight, 
  CheckCircle, 
  Zap,
  Target,
  Brain,
  RotateCcw,
  Play,
  Atom,
  Eye
} from "lucide-react";

const EntanglementLesson = ({ onComplete }: { onComplete: () => void }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [entangledState, setEntangledState] = useState<'bell' | 'separated' | 'measured'>('separated');
  const [measurementResults, setMeasurementResults] = useState<{alice: string, bob: string} | null>(null);

  const sections = [
    {
      title: "What is Quantum Entanglement?",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-quantum-purple/5 to-quantum-cyan/5 rounded-lg p-6">
            <p className="text-muted-foreground leading-relaxed text-lg">
              <strong>Quantum entanglement</strong> occurs when two or more qubits become correlated 
              in such a way that the quantum state of each qubit cannot be described independently, 
              even when separated by large distances.
            </p>
          </div>
          
          <div className="bg-quantum-purple/10 border border-quantum-purple/20 rounded-lg p-4">
            <h4 className="font-semibold text-quantum-purple mb-2 flex items-center gap-2">
              <Link className="w-5 h-5" />
              "Spooky Action at a Distance"
            </h4>
            <p className="text-sm mb-2">
              Einstein famously called entanglement "spooky action at a distance" because 
              measuring one entangled particle instantly affects its partner, regardless of distance.
            </p>
            <p className="text-sm text-muted-foreground">
              This isn't because information travels faster than light - it's because the particles 
              share a single quantum state that exists across space.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card/50 border border-border/50 rounded-lg p-4">
              <h5 className="font-medium mb-2 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Classical Correlation
              </h5>
              <p className="text-sm text-muted-foreground">
                Two coins flipped together might both land heads, but they each have 
                definite states independent of observation.
              </p>
            </div>
            <div className="bg-quantum-purple/5 border border-quantum-purple/20 rounded-lg p-4">
              <h5 className="font-medium mb-2 flex items-center gap-2">
                <Atom className="w-4 h-4 text-quantum-purple" />
                Quantum Entanglement
              </h5>
              <p className="text-sm text-muted-foreground">
                Two qubits in a shared quantum state have correlated properties that 
                only become defined when one is measured.
              </p>
            </div>
          </div>

          <div className="bg-card/50 border border-border/20 rounded-lg p-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Play className="w-5 h-5 text-red-500" />
              Introduction Videos
            </h4>
            <div className="space-y-2">
              <a 
                href="https://www.youtube.com/watch?v=JFozGfxmi8A" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-quantum-blue hover:text-quantum-purple transition-colors"
              >
                📺 "Quantum Entanglement Explained" by MinutePhysics
              </a>
              <a 
                href="https://www.youtube.com/watch?v=ZuvK-od647c" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-quantum-blue hover:text-quantum-purple transition-colors"
              >
                📺 "Einstein's Spooky Action at a Distance" by Veritasium
              </a>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Bell States - Perfect Entanglement",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-quantum-cyan/10 to-quantum-blue/10 rounded-lg p-4">
            <p className="text-muted-foreground">
              <strong>Bell states</strong> are the four maximally entangled two-qubit states. 
              They form the foundation for quantum communication and quantum computing protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">The Four Bell States</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-background/50 p-3 rounded font-mono text-sm space-y-1">
                  <div>|Φ⁺⟩ = (|00⟩ + |11⟩)/√2</div>
                  <div>|Φ⁻⟩ = (|00⟩ - |11⟩)/√2</div>
                  <div>|Ψ⁺⟩ = (|01⟩ + |10⟩)/√2</div>
                  <div>|Ψ⁻⟩ = (|01⟩ - |10⟩)/√2</div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Each state represents perfect correlation between two qubits
                </p>
              </CardContent>
            </Card>

            <Card className="border-quantum-purple/30 bg-quantum-purple/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Most Common: |Φ⁺⟩</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">The |Φ⁺⟩ state means:</p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• 50% chance of measuring |00⟩</li>
                  <li>• 50% chance of measuring |11⟩</li>
                  <li>• Never |01⟩ or |10⟩</li>
                  <li>• Perfect correlation: both qubits always match</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-600 mb-2">🧪 Creating Bell States</h4>
            <p className="text-sm mb-2">
              To create a Bell state, start with |00⟩ and apply:
            </p>
            <div className="bg-background/50 p-3 rounded font-mono text-sm">
              H ⊗ I → CNOT → |Φ⁺⟩ = (|00⟩ + |11⟩)/√2
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Apply Hadamard to first qubit, then CNOT with first as control
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Interactive Entanglement Demo",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-quantum-cyan/10 to-quantum-purple/10 rounded-lg p-4">
            <p className="text-muted-foreground">
              🧪 <strong>Experiment:</strong> Create entangled qubits and see how measuring one instantly affects the other!
            </p>
          </div>
          
          <div className="bg-card/30 border border-border/50 rounded-lg p-6">
            <div className="text-center space-y-6">
              <h4 className="font-semibold">Quantum Entanglement Simulator</h4>
              
              {/* Alice and Bob's qubits */}
              <div className="flex justify-center items-center gap-8">
                <div className="text-center space-y-2">
                  <h5 className="font-medium">Alice's Qubit</h5>
                  <div className={`w-24 h-24 rounded-full border-4 transition-all duration-500 ${
                    entangledState === 'separated' ? 'border-gray-400 bg-gray-100' :
                    entangledState === 'bell' ? 'border-quantum-purple bg-gradient-quantum animate-pulse' :
                    measurementResults?.alice === '0' ? 'border-blue-500 bg-blue-500/20' : 'border-red-500 bg-red-500/20'
                  }`}>
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-xl font-bold">
                        {entangledState === 'separated' ? '?' :
                         entangledState === 'bell' ? '|ψ⟩' :
                         measurementResults?.alice}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Entanglement visualization */}
                <div className="flex flex-col items-center">
                  {entangledState === 'bell' && (
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-0.5 bg-gradient-to-r from-quantum-purple to-quantum-cyan animate-pulse"></div>
                      <Zap className="w-6 h-6 text-quantum-purple animate-bounce" />
                      <div className="w-16 h-0.5 bg-gradient-to-r from-quantum-cyan to-quantum-purple animate-pulse"></div>
                    </div>
                  )}
                  <Badge variant="outline" className={
                    entangledState === 'bell' 
                      ? 'border-quantum-purple text-quantum-purple mt-2'
                      : 'border-border mt-2'
                  }>
                    {entangledState === 'separated' ? 'Not Entangled' :
                     entangledState === 'bell' ? 'Entangled!' :
                     'Measured'}
                  </Badge>
                </div>

                <div className="text-center space-y-2">
                  <h5 className="font-medium">Bob's Qubit</h5>
                  <div className={`w-24 h-24 rounded-full border-4 transition-all duration-500 ${
                    entangledState === 'separated' ? 'border-gray-400 bg-gray-100' :
                    entangledState === 'bell' ? 'border-quantum-purple bg-gradient-quantum animate-pulse' :
                    measurementResults?.bob === '0' ? 'border-blue-500 bg-blue-500/20' : 'border-red-500 bg-red-500/20'
                  }`}>
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-xl font-bold">
                        {entangledState === 'separated' ? '?' :
                         entangledState === 'bell' ? '|ψ⟩' :
                         measurementResults?.bob}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Control buttons */}
              <div className="flex gap-3 justify-center flex-wrap">
                <Button 
                  variant={entangledState === 'bell' ? 'quantum' : 'outline'}
                  onClick={() => {
                    setEntangledState('bell');
                    setMeasurementResults(null);
                  }}
                  disabled={entangledState === 'bell'}
                >
                  <Link className="w-4 h-4 mr-2" />
                  Create Bell State
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => {
                    if (entangledState === 'bell') {
                      // Perfect correlation - both get same result
                      const result = Math.random() < 0.5 ? '0' : '1';
                      setMeasurementResults({ alice: result, bob: result });
                      setEntangledState('measured');
                    }
                  }}
                  disabled={entangledState !== 'bell'}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Measure Alice
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => {
                    setEntangledState('separated');
                    setMeasurementResults(null);
                  }}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>

              {measurementResults && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <p className="text-sm font-medium text-green-600">
                    🎯 Perfect Correlation Observed!
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Alice measured {measurementResults.alice}, Bob instantly became {measurementResults.bob}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-quantum-blue/10 border border-quantum-blue/20 rounded-lg p-4">
            <h4 className="font-semibold text-quantum-blue mb-2">🔬 What's Happening?</h4>
            <ul className="text-sm space-y-1">
              <li>• The Bell state creates perfect correlation between qubits</li>
              <li>• Before measurement, neither qubit has a definite state</li>
              <li>• Measuring Alice forces both qubits to choose correlated states</li>
              <li>• This happens instantly, regardless of distance!</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Real-World Applications",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg p-4">
            <p className="text-muted-foreground leading-relaxed">
              Quantum entanglement isn't just a curiosity - it's the foundation for revolutionary 
              technologies that are being developed and deployed today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border/50 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  Quantum Communication
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">Secure communication using entanglement:</p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Quantum Key Distribution (QKD)</li>
                  <li>• Unhackable communication channels</li>
                  <li>• Quantum internet protocols</li>
                  <li>• Already deployed in China and Europe</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="w-5 h-5 text-quantum-purple" />
                  Quantum Computing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">Entanglement powers quantum algorithms:</p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Multi-qubit gate operations</li>
                  <li>• Quantum error correction</li>
                  <li>• Quantum teleportation protocols</li>
                  <li>• Distributed quantum computing</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-quantum-cyan/10 border border-quantum-cyan/20 rounded-lg p-4">
            <h4 className="font-semibold text-quantum-cyan mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Current Achievements
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              <div className="bg-background/30 p-3 rounded">
                <h5 className="font-medium mb-1">1,400 km</h5>
                <p className="text-xs text-muted-foreground">Longest quantum communication achieved</p>
              </div>
              <div className="bg-background/30 p-3 rounded">
                <h5 className="font-medium mb-1">100+ Qubits</h5>
                <p className="text-xs text-muted-foreground">Current maximum entangled systems</p>
              </div>
              <div className="bg-background/30 p-3 rounded">
                <h5 className="font-medium mb-1">Quantum Internet</h5>
                <p className="text-xs text-muted-foreground">Networks connecting quantum computers</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-quantum-purple/10 to-quantum-cyan/10 border border-quantum-purple/20 rounded-lg p-4">
            <h4 className="font-semibold text-quantum-purple mb-2">🚀 The Future</h4>
            <p className="text-sm">
              Global quantum networks will enable perfectly secure communication, 
              distributed quantum computing, and new forms of sensing and metrology 
              that will revolutionize science and technology.
            </p>
          </div>

          <div className="bg-card/50 border border-border/20 rounded-lg p-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Play className="w-5 h-5 text-red-500" />
              Deep Dive Videos
            </h4>
            <div className="space-y-2">
              <a 
                href="https://www.youtube.com/watch?v=ta909iKmkV8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-quantum-blue hover:text-quantum-purple transition-colors"
              >
                📺 "Quantum Internet Explained" by IBM Research
              </a>
              <a 
                href="https://www.youtube.com/watch?v=Wim9WJeDTHQ" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-quantum-blue hover:text-quantum-purple transition-colors"
              >
                📺 "Quantum Teleportation Achieved" by Nature Video
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
          <Link className="w-8 h-8 text-quantum-purple" />
          <h1 className="text-3xl font-bold">Quantum Entanglement</h1>
        </div>
        <p className="text-muted-foreground">
          Explore the mysterious connections between quantum particles
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

export default EntanglementLesson;