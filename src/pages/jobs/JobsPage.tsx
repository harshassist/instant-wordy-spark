
import React from "react";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Info, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const JobsPage = () => {
  // Sample job data - in a real app this would come from the API
  const jobs = [
    {
      id: "1",
      title: "Science Teacher",
      organization: "Oakridge Secondary School",
      location: "San Francisco, CA",
      employmentType: "full_time",
      postedDate: "2025-04-10",
    },
    {
      id: "2",
      title: "Mathematics Professor",
      organization: "Bay Area College",
      location: "Boston, MA",
      employmentType: "part_time",
      postedDate: "2025-04-15",
    },
    {
      id: "3",
      title: "Elementary Art Teacher",
      organization: "Creative Minds Primary",
      location: "Austin, TX",
      employmentType: "contract",
      postedDate: "2025-04-18",
    },
  ];

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
                    <span>{job.organization}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin size={16} className="text-gray-500" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock size={16} className="text-gray-500" />
                    <span>Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
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
      </main>
    </div>
  );
};

export default JobsPage;
