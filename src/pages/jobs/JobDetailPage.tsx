
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useJob } from "@/hooks/useJobs";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { GraduationCap, MapPin, Briefcase, DollarSign, Clock } from "lucide-react";

const JobDetailPage = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const { data: job, isLoading, error } = useJob(jobId || "");

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container py-8">
          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
              <Skeleton className="h-10 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-6">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-36 w-full" />
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container py-8">
          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Job Not Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p>The job you're looking for doesn't exist or has been removed.</p>
            </CardContent>
            <CardFooter>
              <Link to="/jobs">
                <Button>Back to Jobs</Button>
              </Link>
            </CardFooter>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-8">
        <div className="mb-6">
          <Link to="/jobs">
            <Button variant="outline">Back to Jobs</Button>
          </Link>
        </div>

        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>{job.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Organization and Location */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <GraduationCap size={18} className="text-primary" />
                <span className="font-medium">{job.organization_id || "Organization"}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-primary" />
                <span>{job.location}</span>
              </div>
            </div>

            {/* Employment Type and Salary */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Briefcase size={18} className="text-primary" />
                <span>
                  {job.employment_type === "full_time"
                    ? "Full-time"
                    : job.employment_type === "part_time"
                    ? "Part-time"
                    : job.employment_type === "contract"
                    ? "Contract"
                    : job.employment_type === "temporary"
                    ? "Temporary"
                    : job.employment_type === "internship"
                    ? "Internship"
                    : "Remote"}
                </span>
              </div>
              {job.salary_range && (
                <div className="flex items-center gap-2">
                  <DollarSign size={18} className="text-primary" />
                  <span>{job.salary_range}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-primary" />
                <span>Posted: {new Date(job.created_at).toLocaleDateString()}</span>
              </div>
            </div>

            {/* School Level and Subject */}
            <div className="pt-2 border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {job.school_level && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">School Level</h3>
                    <p className="mt-1">{job.school_level}</p>
                  </div>
                )}
                {job.subject_required && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Subject</h3>
                    <p className="mt-1">{job.subject_required}</p>
                  </div>
                )}
                {job.experience_required && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Experience</h3>
                    <p className="mt-1">{job.experience_required}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Job Description */}
            <div className="pt-4 border-t">
              <h3 className="text-lg font-medium mb-3">Job Description</h3>
              <p className="whitespace-pre-line">{job.description}</p>
            </div>

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-3">Requirements</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {job.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
            <Link to={`/jobs/${job.id}/apply`} className="w-full sm:w-auto">
              <Button className="w-full">Apply Now</Button>
            </Link>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default JobDetailPage;
