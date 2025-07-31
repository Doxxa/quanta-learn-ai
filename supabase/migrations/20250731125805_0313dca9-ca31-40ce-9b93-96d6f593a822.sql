-- Add RLS policies for all tables to fix security warnings

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
CREATE POLICY "Users can insert their own streaks" ON public.learning_streaks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own streaks" ON public.learning_streaks FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for discussion likes
CREATE POLICY "Users can view likes" ON public.discussion_likes FOR SELECT USING (true);
CREATE POLICY "Users can like content" ON public.discussion_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike content" ON public.discussion_likes FOR DELETE USING (auth.uid() = user_id);

-- Add sample data
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
('Challenge Accepted', 'Complete your first daily challenge', 'Calendar', 'challenges', 25, 'challenges_completed', 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.daily_challenges (title, description, challenge_type, target_value, points_reward) VALUES
('Daily Learning Goal', 'Complete 1 lesson today', 'lesson', 1, 50)
ON CONFLICT DO NOTHING;