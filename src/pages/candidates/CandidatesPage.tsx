
import React from "react";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Briefcase, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const CandidatesPage = () => {
  // Sample candidates data - in a real app this would come from the API
  const candidates = [
    {
      id: "1",
      fullName: "Sarah Johnson",
      headline: "Science Teacher with 5+ years of experience",
      location: "San Francisco, CA",
      education: ["Master's in Education, Stanford University"],
      skills: ["Chemistry", "Biology", "Curriculum Development"],
      experienceYears: 5,
    },
    {
      id: "2",
      fullName: "Michael Chen",
      headline: "Math Professor specializing in Advanced Calculus",
      location: "Boston, MA",
      education: ["PhD in Mathematics, MIT"],
      skills: ["Calculus", "Linear Algebra", "Statistics"],
      experienceYears: 8,
    },
    {
      id: "3",
      fullName: "Emily Roberts",
      headline: "Elementary Education Expert with Art Focus",
      location: "Austin, TX",
      education: ["Bachelor's in Elementary Education, University of Texas"],
      skills: ["Art Education", "Early Childhood Development", "Special Education"],
      experienceYears: 3,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-8">Available Candidates</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {candidates.map(candidate => (
            <Card key={candidate.id} className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {candidate.fullName.split(' ').map(name => name[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">{candidate.fullName}</h3>
                    <p className="text-sm text-gray-600">{candidate.headline}</p>
                  </div>
                </div>
                
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin size={16} className="text-gray-500" />
                    <span>{candidate.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <GraduationCap size={16} className="text-gray-500" />
                    <span>{candidate.education[0]}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase size={16} className="text-gray-500" />
                    <span>{candidate.experienceYears} years of experience</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {candidate.skills.slice(0, 3).map(skill => (
                      <span key={skill} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="pt-4">
                    <Link to={`/candidates/${candidate.id}`}>
                      <Button variant="outline" className="w-full">View Profile</Button>
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

export default CandidatesPage;
