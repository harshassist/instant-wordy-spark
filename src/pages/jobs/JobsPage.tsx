
import React from "react";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Info, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useJobs } from "@/hooks/useJobs";
import { Skeleton } from "@/components/ui/skeleton";

const JobsPage = () => {
  const { data: jobs, isLoading, error } = useJobs();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Available Teaching Positions</h1>
          <Link to="/jobs/create">
            <Button>Post a Job</Button>
          </Link>
        </div>
        
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(idx => (
              <Card key={idx} className="h-full">
                <CardHeader>
                  <Skeleton className="h-8 w-4/5" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="pt-4">
                    <Skeleton className="h-10 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {error && (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium text-gray-600">Failed to load jobs</h2>
            <p className="mt-2">Please try again later</p>
          </div>
        )}
        
        {jobs && jobs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map(job => (
              <Card key={job.id} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <GraduationCap size={16} className="text-gray-500" />
                      <span>{job.organization_id || "Organization"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin size={16} className="text-gray-500" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock size={16} className="text-gray-500" />
                      <span>Posted: {new Date(job.created_at).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="pt-4">
                      <Link to={`/jobs/${job.id}`}>
                        <Button variant="outline" className="w-full">View Details</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {jobs && jobs.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium text-gray-600">No jobs found</h2>
            <p className="mt-2">Check back later for new opportunities</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default JobsPage;
