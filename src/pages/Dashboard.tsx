import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Trophy, 
  BookOpen, 
  Clock, 
  Star,
  TrendingUp,
  Award,
  Target,
  Calendar,
  Edit3
} from "lucide-react";
import { Link } from "react-router-dom";
import ChatBot from '@/components/ChatBot';
import QuizComponent from '@/components/QuizComponent';

interface UserProfile {
  id: string;
  user_id: string;
  username: string | null;
  avatar_url: string | null;
  total_points: number;
  completed_lessons: number;
  current_level: string;
  created_at: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Failed to load user profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getLevelProgress = (level: string) => {
    const levels = ['beginner', 'intermediate', 'advanced', 'expert'];
    const currentIndex = levels.indexOf(level.toLowerCase());
    return ((currentIndex + 1) / levels.length) * 100;
  };

  const getNextLevel = (level: string) => {
    const levels = {
      'beginner': 'Intermediate',
      'intermediate': 'Advanced', 
      'advanced': 'Expert',
      'expert': 'Quantum Master'
    };
    return levels[level.toLowerCase() as keyof typeof levels] || 'Expert';
  };

  const achievements = [
    {
      title: "First Steps",
      description: "Complete your first lesson",
      icon: BookOpen,
      unlocked: (profile?.completed_lessons || 0) >= 1,
      progress: Math.min((profile?.completed_lessons || 0), 1) * 100
    },
    {
      title: "Knowledge Seeker",
      description: "Complete 5 lessons",
      icon: Trophy,
      unlocked: (profile?.completed_lessons || 0) >= 5,
      progress: Math.min((profile?.completed_lessons || 0) / 5, 1) * 100
    },
    {
      title: "Quantum Explorer",
      description: "Reach 100 points",
      icon: Star,
      unlocked: (profile?.total_points || 0) >= 100,
      progress: Math.min((profile?.total_points || 0) / 100, 1) * 100
    },
    {
      title: "Dedicated Learner",
      description: "Learn for 7 consecutive days",
      icon: Calendar,
      unlocked: false,
      progress: 43 // Mock progress
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-16 h-16 ring-2 ring-quantum-blue/20">
              <AvatarImage src={profile?.avatar_url || ""} />
              <AvatarFallback className="bg-gradient-quantum text-primary-foreground text-lg">
                {profile?.username?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">
                Welcome back, <span className="bg-gradient-quantum bg-clip-text text-transparent">
                  {profile?.username || user?.email?.split('@')[0] || 'Quantum Learner'}
                </span>!
              </h1>
              <p className="text-muted-foreground">Ready to explore quantum computing today?</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Points</p>
                  <p className="text-2xl font-bold text-quantum-blue">{profile?.total_points || 0}</p>
                </div>
                <Trophy className="w-8 h-8 text-quantum-cyan" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Lessons Completed</p>
                  <p className="text-2xl font-bold text-quantum-purple">{profile?.completed_lessons || 0}</p>
                </div>
                <BookOpen className="w-8 h-8 text-quantum-purple" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Level</p>
                  <p className="text-2xl font-bold capitalize text-quantum-blue">{profile?.current_level || 'Beginner'}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-quantum-blue" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Study Streak</p>
                  <p className="text-2xl font-bold text-quantum-cyan">3 days</p>
                </div>
                <Clock className="w-8 h-8 text-quantum-cyan" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress & Learning Path */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Progress */}
            <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-quantum-blue" />
                  Learning Progress
                </CardTitle>
                <CardDescription>Your journey through quantum computing concepts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Level Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {profile?.current_level || 'Beginner'} → {getNextLevel(profile?.current_level || 'beginner')}
                    </span>
                  </div>
                  <Progress value={getLevelProgress(profile?.current_level || 'beginner')} className="h-3" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-quantum-blue">{profile?.completed_lessons || 0}/12</div>
                    <div className="text-xs text-muted-foreground">Lessons Complete</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-quantum-purple">{Math.round(((profile?.completed_lessons || 0) / 12) * 100)}%</div>
                    <div className="text-xs text-muted-foreground">Course Progress</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Continue Learning</CardTitle>
                <CardDescription>Pick up where you left off</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link to="/learn">
                  <Button variant="quantum" className="w-full">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Continue Quantum Gates Lesson
                  </Button>
                </Link>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="border-quantum-blue/20 hover:bg-quantum-blue/10">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" className="border-quantum-purple/20 hover:bg-quantum-purple/10">
                    <Star className="w-4 h-4 mr-2" />
                    View Achievements
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <div className="space-y-6">
            <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-quantum-cyan" />
                  Achievements
                </CardTitle>
                <CardDescription>Your learning milestones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`p-3 rounded-lg border transition-all ${
                    achievement.unlocked 
                      ? 'border-quantum-cyan/20 bg-quantum-cyan/5' 
                      : 'border-border/50 bg-muted/50'
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        achievement.unlocked 
                          ? 'bg-quantum-cyan/20 text-quantum-cyan' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        <achievement.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium">{achievement.title}</h4>
                          {achievement.unlocked && (
                            <Badge variant="outline" className="bg-quantum-cyan/20 text-quantum-cyan border-quantum-cyan/30 text-xs">
                              Unlocked
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{achievement.description}</p>
                        <Progress value={achievement.progress} className="h-1.5" />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-quantum-cyan rounded-full"></div>
                  <span className="text-muted-foreground">Completed "Superposition" lesson</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-quantum-blue rounded-full"></div>
                  <span className="text-muted-foreground">Earned 25 points</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-quantum-purple rounded-full"></div>
                  <span className="text-muted-foreground">Unlocked "Knowledge Seeker" achievement</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Assistant and Quiz Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-quantum-blue/20 flex items-center justify-center">
                <User className="w-4 h-4 text-quantum-blue" />
              </div>
              QuantaBot Assistant
            </h2>
            <ChatBot />
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-quantum-purple/20 flex items-center justify-center">
                <Trophy className="w-4 h-4 text-quantum-purple" />
              </div>
              Quick Quiz
            </h2>
            <QuizComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;