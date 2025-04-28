
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useProfile, useUpdateProfile, useCreateProfile } from "@/hooks/useProfiles";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";
import { ProfileSkillsInput } from "./components/ProfileSkillsInput";
import { ProfileEducationInput } from "./components/ProfileEducationInput";
import { getCurrentUser } from "@/lib/fake-auth";
import { Card, CardContent } from "@/components/ui/card";

const phoneRegex = /^\+?[1-9]\d{1,14}$/;

const profileSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  phone_number: z.string()
    .min(1, "Phone number is required")
    .regex(phoneRegex, "Please enter a valid phone number"),
  headline: z.string().optional(),
  bio: z.string().max(500, "Bio must be 500 characters or less").optional(),
  location: z.string().min(1, "Location is required"),
  experience_years: z.number()
    .min(0, "Experience years must be 0 or greater")
    .max(50, "Experience years must be 50 or less")
    .optional(),
  education: z.array(z.string()).optional(),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  cv_url: z.string().optional(),
  // New fields
  education_level: z.string().optional(),
  subject_expertise: z.string().optional(),
  years_of_experience: z.number()
    .min(0, "Years of experience must be 0 or greater")
    .max(50, "Years of experience must be 50 or less")
    .optional(),
  preferred_location: z.string().optional()
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function EditProfile() {
  const navigate = useNavigate();
  const { data: profile, isLoading: isLoadingProfile } = useProfile();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const { mutate: createProfile, isPending: isCreating } = useCreateProfile();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: "",
      phone_number: "",
      headline: "",
      bio: "",
      location: "",
      experience_years: 0,
      education: [],
      skills: [],
      cv_url: "",
      // New fields with default values
      education_level: "",
      subject_expertise: "",
      years_of_experience: 0,
      preferred_location: ""
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
        cv_url: profile.cv_url || "",
        // Set values for new fields from profile if they exist
        education_level: profile.education_level || "",
        subject_expertise: profile.subject_expertise || "",
        years_of_experience: profile.years_of_experience || 0,
        preferred_location: profile.preferred_location || ""
      });
    }
  }, [profile, form]);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const { data: { user } } = await getCurrentUser();
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to update your profile.",
          variant: "destructive"
        });
        return;
      }

      if (profile) {
        updateProfile(
          { id: profile.id, ...data },
          {
            onSuccess: () => {
              toast({
                title: "Profile updated",
                description: "Your profile has been successfully updated."
              });
              navigate("/");
            }
          }
        );
      } else {
        createProfile(
          data,
          {
            onSuccess: () => {
              toast({
                title: "Profile created",
                description: "Your profile has been successfully created."
              });
              navigate("/");
            }
          }
        );
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    }
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
      <h1 className="text-2xl font-bold mb-6">
        {profile ? "Edit Profile" : "Create Profile"}
      </h1>
      
      <p className="text-sm text-muted-foreground mb-6">
        Fields marked with an asterisk (*) are required
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Information */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="+1234567890" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Professional Details - New Section */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h2 className="text-lg font-semibold mb-4">Professional Details</h2>
              
              <FormField
                control={form.control}
                name="education_level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Education Level</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Bachelor's, Master's, Ph.D., etc." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject_expertise"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject Expertise</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Computer Science, Marketing, etc." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="years_of_experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Experience</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                        min={0}
                        max={50}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferred_location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Location</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="City, Country or Remote" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Qualifications */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h2 className="text-lg font-semibold mb-4">Qualifications</h2>
              
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills *</FormLabel>
                    <FormControl>
                      <ProfileSkillsInput 
                        value={field.value || []} 
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="education"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Education</FormLabel>
                    <FormControl>
                      <ProfileEducationInput 
                        value={field.value || []} 
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h2 className="text-lg font-semibold mb-4">Additional Information</h2>
              
              <FormField
                control={form.control}
                name="experience_years"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Experience</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                        min={0}
                        max={50}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Tell us about yourself..."
                        className="resize-none"
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isUpdating || isCreating}
            >
              {(isUpdating || isCreating) ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  {profile ? "Saving..." : "Creating..."}
                </>
              ) : (
                profile ? 'Save Changes' : 'Create Profile'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
