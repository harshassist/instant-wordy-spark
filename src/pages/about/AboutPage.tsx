
import React from "react";
import Header from "@/components/layout/Header";
import { GraduationCap, Users, Award, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-blue-50 py-16">
          <div className="container">
            <h1 className="text-4xl font-bold mb-4">About EduAssist</h1>
            <p className="text-xl text-gray-700 max-w-3xl">
              Connecting educational institutions with talented professionals to create 
              better learning environments for students across the globe.
            </p>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-12 container">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-4">
              At EduAssist, we believe that education is the foundation for a better future. 
              Our mission is to simplify the process of connecting qualified educators with 
              institutions that need them, ensuring that students everywhere have access to 
              the best possible education.
            </p>
            <p className="text-lg text-gray-700">
              We're dedicated to transforming the way educators find meaningful work, and how 
              educational institutions discover exceptional talent to inspire the next generation.
            </p>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="bg-white py-12">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-blue-600">500+</p>
                <p className="text-gray-600">Schools</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-600">10,000+</p>
                <p className="text-gray-600">Teachers</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-600">2,500+</p>
                <p className="text-gray-600">Successful Placements</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-600">50+</p>
                <p className="text-gray-600">Countries</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-12 container">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="p-3 bg-blue-100 rounded-full h-fit">
                    <GraduationCap size={24} className="text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Excellence in Education</h3>
                    <p className="text-gray-600">
                      We believe in maintaining the highest standards for educators and institutions,
                      ensuring quality education for all students.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="p-3 bg-blue-100 rounded-full h-fit">
                    <Users size={24} className="text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Community & Collaboration</h3>
                    <p className="text-gray-600">
                      We foster a supportive community of educators and institutions working 
                      together to improve educational outcomes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="p-3 bg-blue-100 rounded-full h-fit">
                    <Award size={24} className="text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Recognition & Growth</h3>
                    <p className="text-gray-600">
                      We celebrate educators' achievements and provide opportunities for 
                      professional development and career advancement.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="p-3 bg-blue-100 rounded-full h-fit">
                    <Globe size={24} className="text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Global Impact</h3>
                    <p className="text-gray-600">
                      We're committed to making quality education accessible across borders,
                      connecting talented educators with opportunities worldwide.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-12 bg-gray-50">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8 text-center">Our Team</h2>
            <p className="text-center max-w-3xl mx-auto mb-12">
              EduAssist was founded by education professionals who understand the challenges
              of both educators and institutions in finding the perfect match.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  name: "Dr. Emma Wilson",
                  role: "Founder & CEO",
                  bio: "Former university dean with 15 years of experience in education administration.",
                },
                {
                  name: "James Thompson",
                  role: "Chief Technology Officer",
                  bio: "EdTech specialist with a passion for using technology to improve education.",
                },
                {
                  name: "Sophia Lee",
                  role: "Head of Educator Relations",
                  bio: "Former teacher who understands the needs of education professionals.",
                },
              ].map(member => (
                <div key={member.name} className="text-center">
                  <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-blue-600 mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-12 container">
          <Separator className="mb-12" />
          
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="mb-6">Have questions about EduAssist? We'd love to hear from you.</p>
            <p className="text-blue-600 font-medium">contact@eduassist.example.com</p>
            <p className="text-gray-600">123 Education Lane, San Francisco, CA 94107</p>
          </div>
        </section>
      </main>
      
      {/* Simple Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} EduAssist. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
