import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Heart, Reply, Plus, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Discussion {
  id: string;
  title: string;
  content: string;
  likes_count: number;
  replies_count: number;
  created_at: string;
  user_id: string;
  username?: string;
}

interface DiscussionForumProps {
  lessonId: string;
}

const DiscussionForum = ({ lessonId }: DiscussionForumProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchDiscussions();
  }, [lessonId]);

  const fetchDiscussions = async () => {
    try {
      const { data, error } = await supabase
        .from("discussions")
        .select("*")
        .eq("lesson_id", lessonId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Fetch usernames separately to avoid complex joins
      const discussionsWithUsernames = await Promise.all(
        (data || []).map(async (discussion) => {
          const { data: profileData } = await supabase
            .from("profiles")
            .select("username")
            .eq("user_id", discussion.user_id)
            .single();
          
          return {
            ...discussion,
            username: profileData?.username || "Anonymous"
          };
        })
      );

      setDiscussions(discussionsWithUsernames);
    } catch (error) {
      console.error("Error fetching discussions:", error);
      toast({
        title: "Error",
        description: "Failed to load discussions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createDiscussion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newTitle.trim() || !newContent.trim()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from("discussions")
        .insert({
          lesson_id: lessonId,
          user_id: user.id,
          title: newTitle.trim(),
          content: newContent.trim(),
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Discussion created successfully!",
      });

      setNewTitle("");
      setNewContent("");
      setShowCreateForm(false);
      fetchDiscussions();
    } catch (error) {
      console.error("Error creating discussion:", error);
      toast({
        title: "Error",
        description: "Failed to create discussion",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const likeDiscussion = async (discussionId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("discussion_likes")
        .insert({
          user_id: user.id,
          discussion_id: discussionId,
        });

      if (error) throw error;
      fetchDiscussions();
    } catch (error) {
      console.error("Error liking discussion:", error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-20 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-quantum-blue" />
          Discussion Forum
        </h3>
        {user && (
          <Button
            onClick={() => setShowCreateForm(!showCreateForm)}
            variant="glow"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Discussion
          </Button>
        )}
      </div>

      {showCreateForm && (
        <Card className="border-quantum-blue/30">
          <CardHeader>
            <CardTitle>Start a New Discussion</CardTitle>
            <CardDescription>
              Share your thoughts and questions about this lesson
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={createDiscussion} className="space-y-4">
              <Input
                placeholder="Discussion title..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                maxLength={100}
              />
              <Textarea
                placeholder="What would you like to discuss?"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows={4}
                maxLength={1000}
              />
              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={submitting || !newTitle.trim() || !newContent.trim()}
                  variant="glow"
                >
                  Create Discussion
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {discussions.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground">
                <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No discussions yet. Be the first to start one!</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          discussions.map((discussion) => (
            <Card key={discussion.id} className="hover:shadow-quantum transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg hover:text-quantum-blue transition-colors">
                      {discussion.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs">
                          <User className="w-3 h-3" />
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">
                        {discussion.username || "Anonymous"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(discussion.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{discussion.content}</p>
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => likeDiscussion(discussion.id)}
                    className="text-muted-foreground hover:text-red-500"
                    disabled={!user}
                  >
                    <Heart className="w-4 h-4 mr-1" />
                    {discussion.likes_count}
                  </Button>
                  <Badge variant="secondary" className="text-xs">
                    <Reply className="w-3 h-3 mr-1" />
                    {discussion.replies_count} replies
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default DiscussionForum;