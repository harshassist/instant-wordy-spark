import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useProfile, useUpdateProfile } from "@/hooks/useProfiles";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";
import { ProfileSkillsInput } from "./components/ProfileSkillsInput";
import { ProfileEducationInput } from "./components/ProfileEducationInput";

const profileSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  headline: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  experience_years: z.number().min(0, "Experience years must be 0 or greater"),
  education: z.array(z.string()).optional(),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  cv_url: z.string().optional()
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function EditProfile() {
  const navigate = useNavigate();
  const { data: profile, isLoading: isLoadingProfile } = useProfile("me");
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: "",
      headline: "",
      bio: "",
      location: "",
      experience_years: 0,
      education: [],
      skills: [],
      cv_url: ""
    }
  });

  React.useEffect(() => {
    if (profile) {
      form.reset({
        full_name: profile.full_name || "",
        headline: profile.headline || "",
        bio: profile.bio || "",
        location: profile.location || "",
        experience_years: profile.experience_years || 0,
        education: profile.education || [],
        skills: profile.skills || [],
        cv_url: profile.cv_url || ""
      });
    }
  }, [profile, form]);

  const onSubmit = (data: ProfileFormValues) => {
    updateProfile(
      { ...data },
      {
        onSuccess: () => {
          toast({
            title: "Profile updated",
            description: "Your profile has been successfully updated."
          });
          navigate("/"); // optional - go back to home after save
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to update profile. Please try again.",
            variant: "destructive"
          });
        }
      }
    );
  };

  if (isLoadingProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Form fields here - unchanged */}
          {/* ... (same as your working version) */}
        </form>
      </Form>
    </div>
  );
}
