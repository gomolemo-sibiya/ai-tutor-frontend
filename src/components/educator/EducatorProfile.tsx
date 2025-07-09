
import React, { useState } from 'react';
import { User } from '../../pages/Index';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { User as UserIcon, Mail, Phone, MapPin, Calendar, BookOpen, Users, Award } from 'lucide-react';

interface EducatorProfileProps {
  user: User;
}

export const EducatorProfile: React.FC<EducatorProfileProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    phone: '+1 (555) 987-6543',
    office: 'Room 305, Science Building',
    department: 'Computer Science',
    position: 'Assistant Professor',
    employeeId: 'EDU001',
    hireDate: '2022-08-15',
    bio: 'Passionate educator with 8+ years of experience in computer science and software engineering. Specializes in data structures, algorithms, and machine learning.',
    officeHours: 'Mon-Wed-Fri: 2:00 PM - 4:00 PM',
    qualifications: 'Ph.D. in Computer Science, Stanford University'
  });

  const handleSave = () => {
    setIsEditing(false);
  };

  const teachingCourses = [
    { code: 'CS201', name: 'Data Structures', students: 45, semester: 'Fall 2024' },
    { code: 'CS301', name: 'Algorithms', students: 38, semester: 'Fall 2024' },
    { code: 'CS401', name: 'Machine Learning', students: 22, semester: 'Fall 2024' }
  ];

  const publications = [
    { title: 'Efficient Algorithms for Large-Scale Data Processing', year: '2024', journal: 'IEEE Computer Science' },
    { title: 'Machine Learning in Educational Technology', year: '2023', journal: 'ACM Education Review' }
  ];

  return (
    <div className="min-h-screen bg-[#f7f8f9] p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Educator Profile</h1>
          <Button
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className="bg-[#007aff] hover:bg-[#0056b3] text-white"
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Card */}
          <div className="lg:col-span-2">
            <Card className="border-[#ebecec]">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-900">
                  <UserIcon className="w-5 h-5" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      disabled={!isEditing}
                      className="bg-white border-gray-300 text-gray-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employeeId" className="text-gray-700">Staff Number</Label>
                    <Input
                      id="employeeId"
                      value={profileData.employeeId}
                      disabled
                      className="bg-gray-50 border-gray-300 text-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700">Email</Label>
                    <Input
                      id="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      disabled={!isEditing}
                      className="bg-white border-gray-300 text-gray-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700">Phone</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      disabled={!isEditing}
                      className="bg-white border-gray-300 text-gray-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="office" className="text-gray-700">Office</Label>
                    <Input
                      id="office"
                      value={profileData.office}
                      onChange={(e) => setProfileData({...profileData, office: e.target.value})}
                      disabled={!isEditing}
                      className="bg-white border-gray-300 text-gray-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="officeHours" className="text-gray-700">Office Hours</Label>
                    <Input
                      id="officeHours"
                      value={profileData.officeHours}
                      onChange={(e) => setProfileData({...profileData, officeHours: e.target.value})}
                      disabled={!isEditing}
                      className="bg-white border-gray-300 text-gray-900"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-gray-700">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    disabled={!isEditing}
                    className="bg-white border-gray-300 text-gray-900 min-h-20"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Academic Info */}
            <Card className="border-[#ebecec]">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-900">
                  <BookOpen className="w-5 h-5" />
                  <span>Academic Info</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Department</span>
                  <Badge variant="secondary">{profileData.department}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Position</span>
                  <span className="font-medium text-gray-900">{profileData.position}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hire Date</span>
                  <span className="font-medium text-gray-900">{profileData.hireDate}</span>
                </div>
              </CardContent>
            </Card>

            {/* Qualifications */}
            <Card className="border-[#ebecec]">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-900">
                  <Award className="w-5 h-5" />
                  <span>Qualifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm">{profileData.qualifications}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Teaching Courses */}
        <Card className="border-[#ebecec]">
          <CardHeader>
            <CardTitle className="text-gray-900">Current Teaching Load</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {teachingCourses.map((course, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{course.code}</p>
                      <p className="text-xs text-gray-600">{course.name}</p>
                    </div>
                    <Badge variant="outline" className="border-gray-300 text-gray-700">
                      {course.students} students
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600">{course.semester}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Publications */}
        <Card className="border-[#ebecec]">
          <CardHeader>
            <CardTitle className="text-gray-900">Recent Publications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {publications.map((pub, index) => (
              <div key={index} className="border-l-2 border-[#007aff] pl-4">
                <h4 className="font-medium text-gray-900">{pub.title}</h4>
                <p className="text-sm text-gray-600">{pub.journal} • {pub.year}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
