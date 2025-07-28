import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  Lock, 
  Clock,
  Star,
  ArrowRight,
  Atom,
  Zap,
  Globe
} from "lucide-react";

const Learn = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedModule, setSelectedModule] = useState(0);
  const [userProgress, setUserProgress] = useState({ completed_lessons: 0, total_points: 0 });

  const modules = [
    {
      id: 1,
      title: "Introduction to Qubits",
      description: "Learn the fundamental building block of quantum computing",
      duration: "15 min",
      difficulty: "Beginner",
      status: "completed",
      progress: 100,
      topics: ["What is a qubit?", "Classical vs Quantum bits", "Bloch sphere representation"],
      icon: Atom
    },
    {
      id: 2,
      title: "Superposition",
      description: "Understanding how qubits can exist in multiple states simultaneously",
      duration: "20 min", 
      difficulty: "Beginner",
      status: "completed",
      progress: 100,
      topics: ["Superposition principle", "Measurement collapse", "Probability amplitudes"],
      icon: Zap
    },
    {
      id: 3,
      title: "Quantum Gates",
      description: "The operations that manipulate qubits in quantum circuits",
      duration: "25 min",
      difficulty: "Intermediate",
      status: "current",
      progress: 60,
      topics: ["Pauli gates (X, Y, Z)", "Hadamard gate", "Phase gates", "Multi-qubit gates"],
      icon: Globe
    },
    {
      id: 4,
      title: "Entanglement",
      description: "Explore the mysterious quantum correlation between particles",
      duration: "30 min",
      difficulty: "Intermediate", 
      status: "locked",
      progress: 0,
      topics: ["Bell states", "EPR paradox", "Quantum correlations", "Non-locality"],
      icon: Globe
    },
    {
      id: 5,
      title: "Quantum Algorithms",
      description: "Famous algorithms that showcase quantum advantage",
      duration: "45 min",
      difficulty: "Advanced",
      status: "locked", 
      progress: 0,
      topics: ["Deutsch's algorithm", "Grover's search", "Shor's factoring", "Quantum supremacy"],
      icon: Star
    }
  ];

  useEffect(() => {
    if (user) {
      fetchUserProgress();
    }
  }, [user]);

  const fetchUserProgress = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('completed_lessons, total_points')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setUserProgress(data);
      }
    } catch (error) {
      console.error('Error fetching user progress:', error);
    }
  };

  const handleLessonComplete = async (moduleId: number) => {
    if (!user) return;

    try {
      const newCompletedLessons = userProgress.completed_lessons + 1;
      const newTotalPoints = userProgress.total_points + 25;

      const { error } = await supabase
        .from('profiles')
        .update({
          completed_lessons: newCompletedLessons,
          total_points: newTotalPoints,
          current_level: newCompletedLessons >= 8 ? 'advanced' : newCompletedLessons >= 4 ? 'intermediate' : 'beginner'
        })
        .eq('user_id', user.id);

      if (error) throw error;

      setUserProgress({
        completed_lessons: newCompletedLessons,
        total_points: newTotalPoints
      });

      toast({
        title: "Lesson Completed!",
        description: `You earned 25 points! Total: ${newTotalPoints}`,
      });
    } catch (error) {
      console.error('Error updating progress:', error);
      toast({
        title: "Error",
        description: "Failed to update progress",
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-quantum-cyan" />;
      case "current":
        return <Play className="w-5 h-5 text-quantum-blue" />;
      case "locked":
        return <Lock className="w-5 h-5 text-muted-foreground" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-quantum-cyan/20 text-quantum-cyan border-quantum-cyan/30";
      case "Intermediate":
        return "bg-quantum-blue/20 text-quantum-blue border-quantum-blue/30";
      case "Advanced":
        return "bg-quantum-purple/20 text-quantum-purple border-quantum-purple/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Learn <span className="bg-gradient-quantum bg-clip-text text-transparent">Quantum Computing</span>
          </h1>
          <p className="text-muted-foreground">
            Master quantum computing through interactive lessons and hands-on exercises
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Module List */}
          <div className="lg:col-span-2 space-y-4">
            {modules.map((module, index) => (
              <Card 
                key={module.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-quantum border-border/50 bg-card/30 backdrop-blur-sm
                  ${selectedModule === index ? 'ring-2 ring-quantum-blue border-quantum-blue/50' : ''}`}
                onClick={() => setSelectedModule(index)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-quantum rounded-lg flex items-center justify-center">
                        <module.icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {getStatusIcon(module.status)}
                          <CardTitle className="text-lg">{module.title}</CardTitle>
                        </div>
                        <CardDescription>{module.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className={getDifficultyColor(module.difficulty)}>
                      {module.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {module.duration}
                        </span>
                        <span className="text-muted-foreground">
                          {module.progress}% complete
                        </span>
                      </div>
                    </div>
                    
                    <Progress value={module.progress} className="h-2" />
                    
                    <div className="flex flex-wrap gap-2">
                      {module.topics.slice(0, 3).map((topic, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                      {module.topics.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{module.topics.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Module Details */}
          <div className="space-y-6">
            <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {(() => {
                    const IconComponent = modules[selectedModule].icon;
                    return <IconComponent className="w-5 h-5 text-quantum-blue" />;
                  })()}
                  {modules[selectedModule].title}
                </CardTitle>
                <CardDescription>
                  {modules[selectedModule].description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={getDifficultyColor(modules[selectedModule].difficulty)}>
                    {modules[selectedModule].difficulty}
                  </Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {modules[selectedModule].duration}
                  </span>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">What you'll learn:</h4>
                  <ul className="space-y-1">
                    {modules[selectedModule].topics.map((topic, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-quantum-blue rounded-full"></div>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  {modules[selectedModule].status === "locked" ? (
                    <Button disabled className="w-full">
                      <Lock className="w-4 h-4 mr-2" />
                      Complete previous lessons
                    </Button>
                  ) : modules[selectedModule].status === "completed" ? (
                    <Button variant="glow" className="w-full">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Review Lesson
                    </Button>
                  ) : (
                    <Button 
                      variant="quantum" 
                      className="w-full"
                      onClick={() => handleLessonComplete(modules[selectedModule].id)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Continue Learning
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Progress Summary */}
            <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-quantum-blue">{userProgress.completed_lessons}/12</div>
                  <div className="text-sm text-muted-foreground">Lessons completed</div>
                </div>
                <Progress value={(userProgress.completed_lessons / 12) * 100} className="h-3" />
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    You're making great progress!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;