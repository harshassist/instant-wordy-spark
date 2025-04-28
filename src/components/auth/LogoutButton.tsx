
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export default function LogoutButton() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;

      toast({
        title: "Logged out successfully",
        description: "You have been signed out of your account",
      });

      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        variant: "destructive",
        title: "Error logging out",
        description: "There was a problem signing you out. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      disabled={isLoading}
      className="gap-2"
    >
      {isLoading ? (
        "Logging out..."
      ) : (
        <>
          <LogOut className="h-4 w-4" />
          Log Out
        </>
      )}
    </Button>
  );
}

