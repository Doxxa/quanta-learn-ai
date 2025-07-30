import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import QubitLesson from "@/components/lessons/QubitLesson";
import SuperpositionLesson from "@/components/lessons/SuperpositionLesson";
import QuantumGatesLesson from "@/components/lessons/QuantumGatesLesson";
import EntanglementLesson from "@/components/lessons/EntanglementLesson";

const LessonViewer = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const lessonComponents: Record<string, React.ComponentType<{ onComplete: () => void }>> = {
    'qubits': QubitLesson,
    'superposition': SuperpositionLesson,
    'quantum-gates': QuantumGatesLesson,
    'entanglement': EntanglementLesson,
  };

  const lessonTitles: Record<string, string> = {
    'qubits': 'Introduction to Qubits',
    'superposition': 'Quantum Superposition',
    'quantum-gates': 'Quantum Gates',
    'entanglement': 'Quantum Entanglement',
  };

  const handleLessonComplete = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to save your progress",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Get current progress
      const { data: profile, error: fetchError } = await supabase
        .from('profiles')
        .select('completed_lessons, total_points, current_level')
        .eq('user_id', user.id)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (profile) {
        const newCompletedLessons = profile.completed_lessons + 1;
        const newTotalPoints = profile.total_points + 25;
        
        // Determine new level
        let newLevel = profile.current_level;
        if (newCompletedLessons >= 8) newLevel = 'advanced';
        else if (newCompletedLessons >= 4) newLevel = 'intermediate';

        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            completed_lessons: newCompletedLessons,
            total_points: newTotalPoints,
            current_level: newLevel
          })
          .eq('user_id', user.id);

        if (updateError) throw updateError;

        toast({
          title: "Lesson Completed! 🎉",
          description: `You earned 25 points! Total: ${newTotalPoints}`,
        });

        // Navigate back to learn page after a delay
        setTimeout(() => {
          navigate('/learn');
        }, 2000);
      }
    } catch (error) {
      console.error('Error updating progress:', error);
      toast({
        title: "Error",
        description: "Failed to update progress. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const LessonComponent = lessonId ? lessonComponents[lessonId] : null;

  if (!lessonId || !LessonComponent) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The requested lesson could not be found.
          </p>
          <Button onClick={() => navigate('/learn')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Learn
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/learn')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Lessons
          </Button>
        </div>

        {/* Lesson Content */}
        <LessonComponent onComplete={handleLessonComplete} />
      </div>
    </div>
  );
};

export default LessonViewer;