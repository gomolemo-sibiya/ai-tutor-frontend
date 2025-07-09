
import React from "react";
import { User } from "../../pages/Index";
import {
  LogOut,
  BookOpen,
  Upload,
  Users,
  Settings,
  Building,
  GraduationCap,
  MapPin,
  FileText,
  UserCheck,
  MessageSquare,
  User as UserIcon,
} from "lucide-react";

interface SidebarProps {
  user: User;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  user,
  activeTab,
  onTabChange,
  onLogout,
}) => {
  const getMenuItems = () => {
    switch (user.role) {
      case "student":
        return [
          { id: "modules", label: "Modules", icon: BookOpen },
          { id: "chat", label: "Chat", icon: MessageSquare },
          { id: "profile", label: "Profile", icon: UserIcon },
        ];
      case "educator":
        return [
          { id: "files", label: "Files", icon: FileText },
          { id: "profile", label: "Profile", icon: UserIcon },
        ];
      case "admin":
        return [
          { id: "lecturers", label: "Lecturers", icon: UserCheck },
          { id: "students", label: "Students", icon: Users },
          { id: "files", label: "Files", icon: FileText },
          { id: "faculty", label: "Faculty", icon: Building },
          { id: "departments", label: "Departments", icon: Users },
          { id: "courses", label: "Courses", icon: BookOpen },
          { id: "modules", label: "Module List", icon: GraduationCap },
          { id: "campus", label: "Campus", icon: MapPin },
          { id: "profile", label: "Profile", icon: UserIcon },
          { id: "settings", label: "Settings", icon: Settings },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-64 bg-[#0046cf] h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-blue-500">
        <h1 className="text-white text-2xl font-bold">AI TUTOR</h1>
      </div>

      {/* Menu Items */}
      <div className="flex-1 p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  activeTab === item.id
                    ? "bg-[#007bff16] text-white font-semibold"
                    : "text-blue-200 hover:bg-blue-700 hover:text-white"
                }`}
              >
                <Icon
                  className={` ${
                    activeTab === item.id ? "w-6 h-6" : "w-5 h-5"
                  }`}
                />
                <span
                  className={`${
                    activeTab === item.id ? "text-m" : "text-base"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-blue-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white text-sm font-medium">{user.name}</p>
            <p className="text-blue-300 text-xs capitalize">{user.role}</p>
          </div>
          <button
            onClick={onLogout}
            className="text-blue-300 hover:text-white transition-colors duration-200"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
