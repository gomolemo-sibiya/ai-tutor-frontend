
import React, { useState } from "react";
import { User } from "../../pages/Index";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { User as UserIcon, Edit, Save, X, BookOpen, Calendar, Trophy, Star } from "lucide-react";
import { mockModules } from "../../data/mockData";

interface StudentProfileProps {
  user: User;
}

export const StudentProfile: React.FC<StudentProfileProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    phone: '+27 82 123 4567',
    location: '123 Main Rd, Cape Town, 8001, South Africa',
    emergencyContact: 'Sipho Dlamini - +27 83 987 6543',
    dateOfBirth: '2001-08-21',
    studentId: 'UCT2023001',
    enrollmentDate: '2023-02-01',
    program: 'Information Systems',
    year: '2nd Year'
  });

  const handleSave = () => {
    setIsEditing(false);
    console.log('Profile updated:', profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setProfileData({
      name: user.name,
      email: user.email,
      phone: '+27 82 123 4567',
      location: '123 Main Rd, Cape Town, 8001, South Africa',
      emergencyContact: 'Sipho Dlamini - +27 83 987 6543',
      dateOfBirth: '2001-08-21',
      studentId: 'UCT2023001',
      enrollmentDate: '2023-02-01',
      program: 'Information Systems',
      year: '2nd Year'
    });
  };

  return (
    <div className="p-8 bg-[#f7f8f9] min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Student Profile</h1>
            <p className="text-gray-600 mt-1">Manage your personal information and academic details</p>
          </div>
          <div className="flex space-x-3">
            {isEditing ? (
              <>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </Button>
                <Button
                  onClick={handleSave}
                  size="sm"
                  className="flex items-center space-x-2 bg-[#007aff] hover:bg-[#0066cc]"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                size="sm"
                className="flex items-center space-x-2 bg-[#007aff] hover:bg-[#0066cc]"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Card */}
          <div className="lg:col-span-2">
            <Card className="border-[#ebecec]">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <UserIcon className="w-5 h-5" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      disabled={!isEditing}
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student Number</Label>
                    <Input
                      id="studentId"
                      value={profileData.studentId}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      disabled={!isEditing}
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      disabled={!isEditing}
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                      disabled={!isEditing}
                      className="bg-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Academic Info */}
            <Card className="border-[#ebecec]">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Academic Info</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Program</span>
                  <Badge variant="secondary">{profileData.program}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Year</span>
                  <span className="font-medium">{profileData.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Enrolled</span>
                  <span className="font-medium">{profileData.enrollmentDate}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Current Courses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Current Courses</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockModules.slice(0, 6).map((course, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-sm">{course.moduleCode}</p>
                      <p className="text-xs text-gray-600">{course.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
