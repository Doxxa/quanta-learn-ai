import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import AchievementCard from "@/components/AchievementCard";
import StudyGroups from "@/components/StudyGroups";
import DailyChallenges from "@/components/DailyChallenges";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Trophy, Users, Calendar, Target, Crown, Flame, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  points: number;
  requirement_type: string;
  requirement_value: number;
  earned?: boolean;
  progress?: number;
}

interface LeaderboardEntry {
  username: string;
  total_points: number;
  completed_lessons: number;
  current_level: string;
}

const Social = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userStats, setUserStats] = useState({
    total_points: 0,
    completed_lessons: 0,
    current_streak: 0,
    longest_streak: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      // Fetch achievements
      const { data: achievementData, error: achievementError } = await supabase
        .from("achievements")
        .select("*")
        .order("points", { ascending: false });

      if (achievementError) throw achievementError;

      if (user) {
        // Fetch user achievements
        const { data: userAchievements, error: userAchievementError } = await supabase
          .from("user_achievements")
          .select("achievement_id")
          .eq("user_id", user.id);

        if (userAchievementError) throw userAchievementError;

        const earnedIds = new Set(userAchievements?.map(ua => ua.achievement_id) || []);

        // Fetch user profile for progress calculation
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (profileError) throw profileError;

        // Fetch user streak data
        const { data: streakData, error: streakError } = await supabase
          .from("learning_streaks")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (streakError && streakError.code !== 'PGRST116') throw streakError;

        setUserStats({
          total_points: profile?.total_points || 0,
          completed_lessons: profile?.completed_lessons || 0,
          current_streak: streakData?.current_streak || 0,
          longest_streak: streakData?.longest_streak || 0,
        });

        // Calculate progress for each achievement
        const achievementsWithProgress = (achievementData || []).map(achievement => {
          const earned = earnedIds.has(achievement.id);
          let progress = 0;

          if (!earned) {
            switch (achievement.requirement_type) {
              case "lessons_completed":
                progress = profile?.completed_lessons || 0;
                break;
              case "points_earned":
                progress = profile?.total_points || 0;
                break;
              case "streak_days":
                progress = streakData?.longest_streak || 0;
                break;
              default:
                progress = 0;
            }
          }

          return {
            ...achievement,
            earned,
            progress,
          };
        });

        setAchievements(achievementsWithProgress);
      } else {
        setAchievements(achievementData || []);
      }

      // Fetch leaderboard
      const { data: leaderboardData, error: leaderboardError } = await supabase
        .from("profiles")
        .select("username, total_points, completed_lessons, current_level")
        .order("total_points", { ascending: false })
        .limit(10);

      if (leaderboardError) throw leaderboardError;
      setLeaderboard(leaderboardData || []);

    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to load social features",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const shareProgress = () => {
    if (navigator.share) {
      navigator.share({
        title: "QuantaLearn Progress",
        text: `I've completed ${userStats.completed_lessons} quantum computing lessons and earned ${userStats.total_points} XP on QuantaLearn!`,
        url: window.location.origin,
      });
    } else {
      navigator.clipboard.writeText(
        `I've completed ${userStats.completed_lessons} quantum computing lessons and earned ${userStats.total_points} XP on QuantaLearn! Check it out at ${window.location.origin}`
      );
      toast({
        title: "Copied to clipboard!",
        description: "Share your progress on social media",
      });
    }
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 1: return <Trophy className="w-5 h-5 text-gray-400" />;
      case 2: return <Trophy className="w-5 h-5 text-orange-600" />;
      default: return <Target className="w-4 h-4 text-muted-foreground" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-20 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-quantum bg-clip-text text-transparent">
              Social & Gamification Hub
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect with other learners, track your achievements, and take on daily challenges
            </p>
          </div>

          {user && (
            <Card className="bg-gradient-to-r from-quantum-blue/10 to-quantum-purple/10 border-quantum-blue/30">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Your Progress Overview</span>
                  <Button onClick={shareProgress} variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Progress
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-quantum-blue">{userStats.total_points}</div>
                    <div className="text-sm text-muted-foreground">Total XP</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-quantum-purple">{userStats.completed_lessons}</div>
                    <div className="text-sm text-muted-foreground">Lessons</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500">{userStats.current_streak}</div>
                    <div className="text-sm text-muted-foreground">Current Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">{userStats.longest_streak}</div>
                    <div className="text-sm text-muted-foreground">Best Streak</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Tabs defaultValue="achievements" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="challenges">Daily Challenges</TabsTrigger>
              <TabsTrigger value="groups">Study Groups</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            </TabsList>

            <TabsContent value="achievements" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-quantum-blue" />
                    Achievements
                  </CardTitle>
                  <CardDescription>
                    Unlock achievements by completing lessons, earning points, and engaging with the community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {achievements.map((achievement) => (
                      <AchievementCard key={achievement.id} achievement={achievement} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="challenges" className="space-y-6">
              <DailyChallenges />
            </TabsContent>

            <TabsContent value="groups" className="space-y-6">
              <StudyGroups />
            </TabsContent>

            <TabsContent value="leaderboard" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-quantum-blue" />
                    Leaderboard
                  </CardTitle>
                  <CardDescription>
                    See how you rank against other quantum learners
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leaderboard.map((entry, index) => (
                      <div
                        key={entry.username}
                        className={`flex items-center justify-between p-4 rounded-lg border ${
                          index < 3 ? "bg-gradient-to-r from-quantum-blue/5 to-quantum-purple/5 border-quantum-blue/20" : "bg-card border-border"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            {getRankIcon(index)}
                            <span className="font-bold text-lg">#{index + 1}</span>
                          </div>
                          <div>
                            <div className="font-medium">{entry.username || "Anonymous"}</div>
                            <div className="text-sm text-muted-foreground">
                              Level: {entry.current_level || "Beginner"}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-quantum-blue">{entry.total_points} XP</div>
                          <div className="text-sm text-muted-foreground">
                            {entry.completed_lessons} lessons
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Social;