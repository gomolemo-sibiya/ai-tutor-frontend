
import React, { useState } from 'react';
import { User } from '../../pages/Index';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { User as UserIcon, Shield } from 'lucide-react';

interface AdminProfileProps {
  user: User;
}

export const AdminProfile: React.FC<AdminProfileProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    phone: '+1 (555) 111-2222',
    office: 'Room 101, Administration Building',
    department: 'IT Administration',
    position: 'System Administrator',
    employeeId: 'ADM001',
    hireDate: '2021-03-10',
    accessLevel: 'Super Admin'
  });

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#f7f8f9] p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Administrator Profile</h1>
          <Button
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className="bg-[#090909] hover:bg-[#2c2c36] text-white"
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
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Admin Info */}
            <Card className="border-[#ebecec]">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-900">
                  <Shield className="w-5 h-5" />
                  <span>Admin Info</span>
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
                  <span className="text-gray-600">Access Level</span>
                  <Badge className="bg-[#090909] text-white">{profileData.accessLevel}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hire Date</span>
                  <span className="font-medium text-gray-900">{profileData.hireDate}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
