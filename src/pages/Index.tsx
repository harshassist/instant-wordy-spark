import React from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  GraduationCap, 
  Briefcase, 
  Handshake, 
  Info, 
  Clock, 
  Users 
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
        <div className="container max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Find Your Dream Job in Education.
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            Connecting Institutions with Top Talent.
          </p>
          
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-grow">
                <Input 
                  className="h-12" 
                  placeholder="Search for jobs, locations, or keywords" 
                />
              </div>
              <Button className="h-12 px-8" size="lg">
                Search Jobs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardContent className="pt-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <GraduationCap size={28} className="text-blue-700" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
                <p className="text-gray-600">
                  Build your professional profile highlighting your education experience and qualifications.
                </p>
              </CardContent>
            </Card>
            
            {/* Step 2 */}
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardContent className="pt-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Briefcase size={28} className="text-blue-700" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Post or Find Jobs</h3>
                <p className="text-gray-600">
                  Browse open positions or post new opportunities for talented educators.
                </p>
              </CardContent>
            </Card>
            
            {/* Step 3 */}
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardContent className="pt-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Handshake size={28} className="text-blue-700" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Hired or Hire Top Talent</h3>
                <p className="text-gray-600">
                  Connect with the perfect match for your career or institution needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Featured Jobs Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Latest Opportunities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Job Card 1 */}
            <Link to="/jobs/1">
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">Science Teacher</h3>
                  <div className="flex flex-col gap-1 text-gray-600">
                    <p className="flex items-center gap-2">
                      <GraduationCap size={16} />
                      <span>Secondary School</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Info size={16} />
                      <span>San Francisco, CA</span>
                    </p>
                  </div>
                  <Button className="w-full mt-4">View Job</Button>
                </CardContent>
              </Card>
            </Link>
            
            {/* Job Card 2 */}
            <Link to="/jobs/2">
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">Mathematics Professor</h3>
                  <div className="flex flex-col gap-1 text-gray-600">
                    <p className="flex items-center gap-2">
                      <GraduationCap size={16} />
                      <span>College</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Info size={16} />
                      <span>Boston, MA</span>
                    </p>
                  </div>
                  <Button className="w-full mt-4">View Job</Button>
                </CardContent>
              </Card>
            </Link>
            
            {/* Job Card 3 */}
            <Link to="/jobs/3">
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">Elementary Art Teacher</h3>
                  <div className="flex flex-col gap-1 text-gray-600">
                    <p className="flex items-center gap-2">
                      <GraduationCap size={16} />
                      <span>Primary School</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Info size={16} />
                      <span>Austin, TX</span>
                    </p>
                  </div>
                  <Button className="w-full mt-4">View Job</Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Why EduAssist Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why EduAssist?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Benefit 1 */}
            <div className="flex gap-4">
              <div className="p-3 bg-blue-100 rounded-full h-fit">
                <GraduationCap size={24} className="text-blue-700" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Specialized in Education Sector</h3>
                <p className="text-gray-600">
                  Our platform is designed specifically for education professionals, ensuring relevant opportunities and candidates.
                </p>
              </div>
            </div>
            
            {/* Benefit 2 */}
            <div className="flex gap-4">
              <div className="p-3 bg-blue-100 rounded-full h-fit">
                <Users size={24} className="text-blue-700" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Verified Institutions and Candidates</h3>
                <p className="text-gray-600">
                  We verify all institutions and candidates to ensure safe and legitimate connections.
                </p>
              </div>
            </div>
            
            {/* Benefit 3 */}
            <div className="flex gap-4">
              <div className="p-3 bg-blue-100 rounded-full h-fit">
                <Briefcase size={24} className="text-blue-700" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Easy Apply Process</h3>
                <p className="text-gray-600">
                  Streamlined application process saves time for both candidates and institutions.
                </p>
              </div>
            </div>
            
            {/* Benefit 4 */}
            <div className="flex gap-4">
              <div className="p-3 bg-blue-100 rounded-full h-fit">
                <Clock size={24} className="text-blue-700" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600">
                  Our dedicated team is always available to assist you with any questions or issues.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="container max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/jobs">
              <Button variant="secondary" size="lg" className="min-w-[160px]">
                Find Jobs
              </Button>
            </Link>
            <Link to="/candidates">
              <Button variant="outline" size="lg" className="min-w-[160px] bg-transparent text-white border-white hover:bg-white hover:text-blue-600">
                Hire Talent
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-100">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">EduAssist</h3>
              <p className="text-gray-600 max-w-md">
                The premier platform connecting educational institutions with talented professionals.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="flex flex-col gap-2">
                <Link to="#" className="text-gray-600 hover:text-blue-600">About Us</Link>
                <Link to="#" className="text-gray-600 hover:text-blue-600">Contact</Link>
                <Link to="#" className="text-gray-600 hover:text-blue-600">Privacy Policy</Link>
                <Link to="#" className="text-gray-600 hover:text-blue-600">Terms</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect With Us</h4>
              <div className="flex gap-4">
                <a href="#" className="p-2 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                  </svg>
                </a>
                <a href="#" className="p-2 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div className="text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} EduAssist. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
