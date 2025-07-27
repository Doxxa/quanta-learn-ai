import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import FeatureCard from "@/components/FeatureCard";
import StatsCard from "@/components/StatsCard";
import { 
  BookOpen, 
  Cpu, 
  Brain, 
  Trophy, 
  Zap, 
  Target, 
  Clock,
  Star,
  ArrowRight
} from "lucide-react";
import quantumHero from "@/assets/quantum-hero.jpg";
import circuitIcon from "@/assets/circuit-icon.jpg";
import aiAssistant from "@/assets/ai-assistant.jpg";

const Index = () => {
  const [userName] = useState("Quantum Explorer");

  const features = [
    {
      title: "Learn Quantum",
      description: "Interactive lessons covering qubits, superposition, entanglement, and quantum algorithms with visual explanations.",
      icon: BookOpen,
      gradient: "bg-gradient-quantum",
      buttonText: "Start Learning"
    },
    {
      title: "Circuit Simulator", 
      description: "Build and test quantum circuits with drag-and-drop gates. See real-time results and visualizations.",
      icon: Cpu,
      gradient: "bg-gradient-circuit",
      buttonText: "Open Simulator"
    },
    {
      title: "AI Assistant",
      description: "Get instant help with quantum concepts, code generation, and circuit debugging from Quanta AI.",
      icon: Brain,
      gradient: "bg-gradient-quantum",
      buttonText: "Ask Quanta"
    },
    {
      title: "Quantum Quizzes",
      description: "Test your knowledge with interactive quizzes and challenges. Earn badges and track your progress.",
      icon: Trophy,
      gradient: "bg-gradient-circuit",
      buttonText: "Take Quiz"
    }
  ];

  const stats = [
    {
      title: "Lessons Completed",
      value: "12",
      icon: BookOpen,
      change: "+3 this week",
      gradient: "bg-gradient-quantum"
    },
    {
      title: "Circuits Built",
      value: "8",
      icon: Cpu,
      change: "+2 today",
      gradient: "bg-gradient-circuit"
    },
    {
      title: "Quiz Score",
      value: "85%",
      icon: Target,
      change: "Personal best!",
      gradient: "bg-gradient-quantum"
    },
    {
      title: "Study Streak",
      value: "7 days",
      icon: Clock,
      change: "Keep it up!",
      gradient: "bg-gradient-circuit"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-50"></div>
        <div 
          className="relative h-[60vh] bg-cover bg-center bg-no-repeat flex items-center"
          style={{ backgroundImage: `url(${quantumHero})` }}
        >
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm"></div>
          <div className="container relative z-10">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-4 bg-quantum-blue/20 text-quantum-glow border-quantum-blue/30">
                <Zap className="w-3 h-3 mr-1" />
                AI-Powered Quantum Education
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Welcome back, <span className="bg-gradient-quantum bg-clip-text text-transparent">{userName}</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Continue your quantum computing journey with interactive lessons, 
                hands-on simulations, and AI-powered assistance. Master the future of computing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="quantum" size="lg" className="text-lg px-8">
                  Continue Learning
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="glow" size="lg" className="text-lg px-8">
                  <Brain className="w-5 h-5 mr-2" />
                  Ask Quanta AI
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Dashboard */}
      <section className="py-12 container">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <Star className="w-6 h-6 text-quantum-glow" />
            Your Progress
          </h2>
          <p className="text-muted-foreground">Track your quantum learning journey</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Explore <span className="bg-gradient-quantum bg-clip-text text-transparent">Quantum Computing</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dive into the fascinating world of quantum mechanics through interactive experiences
            designed to make complex concepts accessible and engaging.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 container">
        <div className="bg-card/30 backdrop-blur-sm rounded-2xl border border-border/50 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Ready to Dive Deeper?</h3>
              <p className="text-muted-foreground mb-6">
                Explore advanced quantum algorithms, build complex circuits, or challenge 
                yourself with expert-level quizzes. Your quantum future starts now.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="circuit" className="flex-1">
                  <img src={circuitIcon} alt="Circuit" className="w-5 h-5 mr-2 rounded" />
                  Advanced Circuits
                </Button>
                <Button variant="quantum" className="flex-1">
                  <img src={aiAssistant} alt="AI" className="w-5 h-5 mr-2 rounded" />
                  AI Tutor Mode
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-64 bg-gradient-glow rounded-xl border border-quantum-blue/30 flex items-center justify-center">
                <div className="text-center">
                  <Cpu className="w-16 h-16 text-quantum-glow mx-auto mb-4 animate-quantum-pulse" />
                  <p className="text-quantum-glow font-semibold">Quantum Circuit Visualizer</p>
                  <p className="text-sm text-muted-foreground">Interactive quantum gate simulator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;