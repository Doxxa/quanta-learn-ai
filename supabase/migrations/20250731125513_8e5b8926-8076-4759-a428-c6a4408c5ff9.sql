-- Create discussion forums for lessons
CREATE TABLE public.discussions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  likes_count INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0
);

-- Create discussion replies
CREATE TABLE public.discussion_replies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  discussion_id UUID NOT NULL REFERENCES public.discussions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  likes_count INTEGER DEFAULT 0
);

-- Create study groups
CREATE TABLE public.study_groups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  creator_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  member_count INTEGER DEFAULT 1,
  is_public BOOLEAN DEFAULT true
);

-- Create study group members
CREATE TABLE public.study_group_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID NOT NULL REFERENCES public.study_groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'moderator', 'member')),
  UNIQUE(group_id, user_id)
);

-- Create achievements system
CREATE TABLE public.achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  category TEXT NOT NULL,
  points INTEGER NOT NULL DEFAULT 0,
  requirement_type TEXT NOT NULL CHECK (requirement_type IN ('lessons_completed', 'points_earned', 'streak_days', 'discussions_created', 'challenges_completed')),
  requirement_value INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user achievements
CREATE TABLE public.user_achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Create daily challenges
CREATE TABLE public.daily_challenges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  challenge_type TEXT NOT NULL CHECK (challenge_type IN ('quiz', 'lesson', 'discussion', 'circuit_build')),
  target_value INTEGER NOT NULL,
  points_reward INTEGER NOT NULL DEFAULT 50,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(date)
);

-- Create user challenge completions
CREATE TABLE public.user_challenge_completions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  challenge_id UUID NOT NULL REFERENCES public.daily_challenges(id) ON DELETE CASCADE,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, challenge_id)
);

-- Create learning streaks
CREATE TABLE public.learning_streaks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create discussion likes
CREATE TABLE public.discussion_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  discussion_id UUID REFERENCES public.discussions(id) ON DELETE CASCADE,
  reply_id UUID REFERENCES public.discussion_replies(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, discussion_id),
  UNIQUE(user_id, reply_id),
  CHECK ((discussion_id IS NOT NULL AND reply_id IS NULL) OR (discussion_id IS NULL AND reply_id IS NOT NULL))
);

-- Enable RLS on all tables
ALTER TABLE public.discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discussion_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_challenge_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discussion_likes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for discussions
CREATE POLICY "Anyone can view discussions" ON public.discussions FOR SELECT USING (true);
CREATE POLICY "Users can create discussions" ON public.discussions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own discussions" ON public.discussions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own discussions" ON public.discussions FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for discussion replies
CREATE POLICY "Anyone can view replies" ON public.discussion_replies FOR SELECT USING (true);
CREATE POLICY "Users can create replies" ON public.discussion_replies FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own replies" ON public.discussion_replies FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own replies" ON public.discussion_replies FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for study groups
CREATE POLICY "Anyone can view public study groups" ON public.study_groups FOR SELECT USING (is_public = true);
CREATE POLICY "Users can create study groups" ON public.study_groups FOR INSERT WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "Group creators can update their groups" ON public.study_groups FOR UPDATE USING (auth.uid() = creator_id);

-- RLS Policies for study group members
CREATE POLICY "Group members can view group members" ON public.study_group_members FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.study_group_members sgm WHERE sgm.group_id = study_group_members.group_id AND sgm.user_id = auth.uid())
);
CREATE POLICY "Users can join groups" ON public.study_group_members FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can leave groups" ON public.study_group_members FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for achievements
CREATE POLICY "Anyone can view achievements" ON public.achievements FOR SELECT USING (true);

-- RLS Policies for user achievements
CREATE POLICY "Users can view their own achievements" ON public.user_achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can earn achievements" ON public.user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for daily challenges
CREATE POLICY "Anyone can view daily challenges" ON public.daily_challenges FOR SELECT USING (true);

-- RLS Policies for user challenge completions
CREATE POLICY "Users can view their own completions" ON public.user_challenge_completions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can complete challenges" ON public.user_challenge_completions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for learning streaks
CREATE POLICY "Users can view their own streaks" ON public.learning_streaks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own streaks" ON public.learning_streaks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own streaks" ON public.learning_streaks FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for discussion likes
CREATE POLICY "Users can view likes" ON public.discussion_likes FOR SELECT USING (true);
CREATE POLICY "Users can like content" ON public.discussion_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike content" ON public.discussion_likes FOR DELETE USING (auth.uid() = user_id);

-- Add triggers for updated_at columns
CREATE TRIGGER update_discussions_updated_at
  BEFORE UPDATE ON public.discussions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_discussion_replies_updated_at
  BEFORE UPDATE ON public.discussion_replies
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_study_groups_updated_at
  BEFORE UPDATE ON public.study_groups
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_learning_streaks_updated_at
  BEFORE UPDATE ON public.learning_streaks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample achievements
INSERT INTO public.achievements (name, description, icon, category, points, requirement_type, requirement_value) VALUES
('First Steps', 'Complete your first lesson', 'BookOpen', 'learning', 10, 'lessons_completed', 1),
('Knowledge Seeker', 'Complete 5 lessons', 'Target', 'learning', 50, 'lessons_completed', 5),
('Quantum Master', 'Complete 20 lessons', 'Crown', 'learning', 200, 'lessons_completed', 20),
('Point Collector', 'Earn 100 points', 'Star', 'points', 25, 'points_earned', 100),
('High Achiever', 'Earn 500 points', 'Trophy', 'points', 100, 'points_earned', 500),
('Streak Starter', 'Maintain a 3-day learning streak', 'Flame', 'streaks', 30, 'streak_days', 3),
('Consistency King', 'Maintain a 7-day learning streak', 'Zap', 'streaks', 75, 'streak_days', 7),
('Discussion Starter', 'Create your first discussion', 'MessageCircle', 'social', 20, 'discussions_created', 1),
('Community Builder', 'Create 5 discussions', 'Users', 'social', 100, 'discussions_created', 5),
('Challenge Accepted', 'Complete your first daily challenge', 'Calendar', 'challenges', 25, 'challenges_completed', 1);

-- Insert sample daily challenge
INSERT INTO public.daily_challenges (title, description, challenge_type, target_value, points_reward) VALUES
('Daily Learning Goal', 'Complete 1 lesson today', 'lesson', 1, 50);

-- Function to update discussion reply count
CREATE OR REPLACE FUNCTION update_discussion_reply_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.discussions 
    SET replies_count = replies_count + 1 
    WHERE id = NEW.discussion_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.discussions 
    SET replies_count = replies_count - 1 
    WHERE id = OLD.discussion_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update reply count
CREATE TRIGGER update_discussion_reply_count_trigger
  AFTER INSERT OR DELETE ON public.discussion_replies
  FOR EACH ROW
  EXECUTE FUNCTION update_discussion_reply_count();

-- Function to update like counts
CREATE OR REPLACE FUNCTION update_like_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.discussion_id IS NOT NULL THEN
      UPDATE public.discussions 
      SET likes_count = likes_count + 1 
      WHERE id = NEW.discussion_id;
    ELSIF NEW.reply_id IS NOT NULL THEN
      UPDATE public.discussion_replies 
      SET likes_count = likes_count + 1 
      WHERE id = NEW.reply_id;
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.discussion_id IS NOT NULL THEN
      UPDATE public.discussions 
      SET likes_count = likes_count - 1 
      WHERE id = OLD.discussion_id;
    ELSIF OLD.reply_id IS NOT NULL THEN
      UPDATE public.discussion_replies 
      SET likes_count = likes_count - 1 
      WHERE id = OLD.reply_id;
    END IF;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update like counts
CREATE TRIGGER update_like_counts_trigger
  AFTER INSERT OR DELETE ON public.discussion_likes
  FOR EACH ROW
  EXECUTE FUNCTION update_like_counts();