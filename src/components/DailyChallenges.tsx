import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Trophy, CheckCircle, Clock, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  challenge_type: string;
  target_value: number;
  points_reward: number;
  date: string;
  completed?: boolean;
}

const DailyChallenges = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [challenges, setChallenges] = useState<DailyChallenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [completedToday, setCompletedToday] = useState(0);

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data: challengeData, error: challengeError } = await supabase
        .from("daily_challenges")
        .select("*")
        .gte("date", today)
        .order("date", { ascending: true });

      if (challengeError) throw challengeError;

      if (user) {
        const { data: completionData, error: completionError } = await supabase
          .from("user_challenge_completions")
          .select("challenge_id")
          .eq("user_id", user.id);

        if (completionError) throw completionError;

        const completedIds = new Set(completionData?.map(c => c.challenge_id) || []);
        
        const challengesWithCompletion = (challengeData || []).map(challenge => ({
          ...challenge,
          completed: completedIds.has(challenge.id)
        }));

        setChallenges(challengesWithCompletion);
        setCompletedToday(challengesWithCompletion.filter(c => c.completed && c.date === today).length);
      } else {
        setChallenges(challengeData || []);
      }
    } catch (error) {
      console.error("Error fetching challenges:", error);
      toast({
        title: "Error",
        description: "Failed to load daily challenges",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const completeChallenge = async (challengeId: string, pointsReward: number) => {
    if (!user) return;

    try {
      const { error: completionError } = await supabase
        .from("user_challenge_completions")
        .insert({
          user_id: user.id,
          challenge_id: challengeId,
        });

      if (completionError) throw completionError;

      // Update user points
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("total_points")
        .eq("user_id", user.id)
        .single();

      if (profileError) throw profileError;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          total_points: (profileData.total_points || 0) + pointsReward
        })
        .eq("user_id", user.id);

      if (updateError) throw updateError;

      toast({
        title: "Challenge Completed!",
        description: `You earned ${pointsReward} XP!`,
      });

      fetchChallenges();
    } catch (error) {
      console.error("Error completing challenge:", error);
      toast({
        title: "Error",
        description: "Failed to complete challenge",
        variant: "destructive",
      });
    }
  };

  const getChallengeTypeIcon = (type: string) => {
    switch (type) {
      case "lesson": return <Calendar className="w-4 h-4" />;
      case "quiz": return <Trophy className="w-4 h-4" />;
      case "discussion": return <Star className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getChallengeTypeColor = (type: string) => {
    switch (type) {
      case "lesson": return "bg-blue-500/20 text-blue-700 border-blue-200";
      case "quiz": return "bg-green-500/20 text-green-700 border-green-200";
      case "discussion": return "bg-purple-500/20 text-purple-700 border-purple-200";
      default: return "bg-gray-500/20 text-gray-700 border-gray-200";
    }
  };

  const isToday = (date: string) => {
    const today = new Date().toISOString().split('T')[0];
    return date === today;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(2)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-16 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const todaysChallenges = challenges.filter(c => isToday(c.date));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Calendar className="w-5 h-5 text-quantum-blue" />
          Daily Challenges
        </h3>
        {user && (
          <Badge variant="secondary" className="bg-quantum-blue/20 text-quantum-blue">
            {completedToday} completed today
          </Badge>
        )}
      </div>

      {user && (
        <Card className="bg-gradient-to-r from-quantum-blue/10 to-quantum-purple/10 border-quantum-blue/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Today's Progress</span>
              <span className="text-sm text-muted-foreground">
                {completedToday}/{todaysChallenges.length}
              </span>
            </div>
            <Progress 
              value={todaysChallenges.length > 0 ? (completedToday / todaysChallenges.length) * 100 : 0} 
              className="h-2"
            />
            {completedToday === todaysChallenges.length && todaysChallenges.length > 0 && (
              <div className="mt-3 flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">All challenges completed!</span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {challenges.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No challenges available. Check back tomorrow!</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          challenges.map((challenge) => (
            <Card 
              key={challenge.id} 
              className={`transition-all duration-300 ${
                challenge.completed 
                  ? "bg-green-50 border-green-200" 
                  : isToday(challenge.date)
                    ? "hover:shadow-quantum border-quantum-blue/30"
                    : "opacity-60"
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {challenge.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        getChallengeTypeIcon(challenge.challenge_type)
                      )}
                      {challenge.title}
                      {!isToday(challenge.date) && (
                        <Badge variant="outline" className="text-xs">
                          {new Date(challenge.date).toLocaleDateString()}
                        </Badge>
                      )}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getChallengeTypeColor(challenge.challenge_type)}`}
                      >
                        {challenge.challenge_type}
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-yellow-500/20 text-yellow-700">
                        +{challenge.points_reward} XP
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{challenge.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Target: {challenge.target_value} {challenge.challenge_type}
                  </span>
                  {user && isToday(challenge.date) && !challenge.completed && (
                    <Button
                      size="sm"
                      variant="glow"
                      onClick={() => completeChallenge(challenge.id, challenge.points_reward)}
                    >
                      Complete Challenge
                    </Button>
                  )}
                  {challenge.completed && (
                    <Badge variant="default" className="bg-green-500 text-white">
                      Completed
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default DailyChallenges;