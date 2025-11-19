import React, { useState } from "react";
import {
  Edit3,
  Heart,
  MessageSquare,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Award,
  Users,
  Clock,
  Star,
  Camera,
  Settings,
  Shield,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../services/userServices";
import { set } from "date-fns";

const Profile = () => {
  const auth = useAuth();
  const userDetails = auth.user;
  const [activeTab, setActiveTab] = useState("overview");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user", "userId"],
    queryFn: () => getUserById("userId"),
  });

  console.log("User Profile Data:", data);
  console.log("error:", error);

  const profileData = {
    name: userDetails ? userDetails?.name : "Sarah Johnson",
    role: "mentor",
    avatar:
      "https://images.pexels.com/photos/33081680/pexels-photo-33081680.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
    joinDate: "January 2023",
    location: "San Francisco, CA",
    email: userDetails ? userDetails.email : "sarah.johnson@healconnect.com",
    phone: "+1 (555) 123-4567",
    specialty: "Cancer Recovery & Mental Health",
    bio: "I'm a cancer survivor who completed treatment 3 years ago. After going through the challenges of chemotherapy and recovery, I'm passionate about helping others navigate their own healing journey. I believe in the power of community and peer support.",
    recoveryStory:
      "My journey began in 2020 when I was diagnosed with breast cancer. The initial shock and fear were overwhelming, but with the support of amazing mentors and a strong medical team, I learned to find strength I didn't know I had. Through 6 months of chemotherapy and surgery, I discovered the importance of mental health support alongside medical treatment. Today, I'm 3 years cancer-free and dedicated to helping others find hope during their darkest moments.",
    experience: "3 years cancer-free",
    mentees: 12,
    forumPosts: 248,
    helpfulResponses: 1204,
    rating: 4.9,
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: Users },
    { id: "story", label: "Recovery Story", icon: Heart },
    { id: "contributions", label: "Forum Contributions", icon: MessageSquare },
    { id: "sessions", label: "Chat History", icon: Clock },
  ];

  const forumContributions = [
    {
      id: 1,
      title: "Tips for managing chemotherapy side effects",
      type: "post",
      likes: 156,
      replies: 24,
      timeAgo: "2 days ago",
    },
    {
      id: 2,
      title: "Finding strength during treatment",
      type: "post",
      likes: 89,
      replies: 12,
      timeAgo: "1 week ago",
    },
    {
      id: 3,
      title: "How to cope with treatment anxiety",
      type: "comment",
      likes: 45,
      replies: 8,
      timeAgo: "2 weeks ago",
    },
  ];

  const chatSessions = [
    {
      id: 1,
      mentee: "Lisa Chang",
      lastActive: "2 hours ago",
      duration: "45 min",
      topic: "Pre-treatment anxiety",
    },
    {
      id: 2,
      mentee: "Marcus Thompson",
      lastActive: "1 day ago",
      duration: "30 min",
      topic: "Mental health support",
    },
    {
      id: 3,
      mentee: "Jennifer Adams",
      lastActive: "3 days ago",
      duration: "60 min",
      topic: "Recovery milestones",
    },
  ];

  const achievements = [
    { id: 1, title: "Mentor of the Month", date: "October 2024", icon: Award },
    {
      id: 2,
      title: "1000+ Helpful Responses",
      date: "September 2024",
      icon: Heart,
    },
    { id: 3, title: "Top Forum Contributor", date: "August 2024", icon: Star },
    { id: 4, title: "Community Champion", date: "July 2024", icon: Users },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
            {profileData.mentees}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Active Mentees
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {profileData.forumPosts}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Forum Posts
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {profileData.helpfulResponses}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Helpful Responses
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl text-center">
          <div className="flex items-center justify-center gap-1">
            <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {profileData.rating}
            </span>
            <Star size={20} className="text-yellow-500 fill-current" />
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Rating</div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          About Me
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {profileData.bio}
        </p>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Achievements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <div
                key={achievement.id}
                className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
              >
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center">
                  <Icon
                    size={20}
                    className="text-teal-600 dark:text-teal-400"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {achievement.date}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderStory = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          My Recovery Journey
        </h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          {profileData.recoveryStory}
        </p>
        <div className="flex items-center gap-4 text-sm text-teal-700 dark:text-teal-300">
          <div className="flex items-center gap-2">
            <Heart size={16} />
            <span>{profileData.experience}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>Started mentoring {profileData.joinDate}</span>
          </div>
        </div>
      </div>

      {/* Recovery Timeline */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recovery Milestones
        </h3>
        <div className="space-y-4">
          {[
            {
              date: "January 2024",
              milestone: "3 Years Cancer-Free Celebration",
              type: "celebration",
            },
            {
              date: "March 2023",
              milestone: "Became HealConnect Mentor",
              type: "achievement",
            },
            {
              date: "August 2022",
              milestone: "Completed Recovery Program",
              type: "milestone",
            },
            {
              date: "February 2021",
              milestone: "Finished Chemotherapy Treatment",
              type: "treatment",
            },
          ].map((item, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0 w-3 h-3 mt-2 bg-teal-500 rounded-full"></div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {item.milestone}
                  </h4>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      item.type === "celebration"
                        ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                        : item.type === "achievement"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                          : item.type === "milestone"
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                            : "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                    }`}
                  >
                    {item.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContributions = () => (
    <div className="space-y-4">
      {forumContributions.map((contribution) => (
        <div
          key={contribution.id}
          className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                {contribution.title}
              </h4>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    contribution.type === "post"
                      ? "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300"
                      : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                  }`}
                >
                  {contribution.type}
                </span>
                <span className="flex items-center gap-1">
                  <Heart size={14} />
                  {contribution.likes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare size={14} />
                  {contribution.replies}
                </span>
                <span>{contribution.timeAgo}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSessions = () => (
    <div className="space-y-4">
      {chatSessions.map((session) => (
        <div
          key={session.id}
          className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {session.mentee}
            </h4>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {session.lastActive}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            {session.topic}
          </p>
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Clock size={12} />
              Duration: {session.duration}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center md:items-start">
              <div className="relative group">
                <img
                  src={profileData.avatar}
                  alt={profileData.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-teal-200 dark:border-teal-700"
                />
                <button className="absolute bottom-2 right-2 w-10 h-10 bg-teal-500 hover:bg-teal-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <Camera size={16} />
                </button>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {profileData.name}
                  </h1>
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                    <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full text-sm font-medium">
                      {profileData.role === "mentor" ? "Mentor" : "Mentee"}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {profileData.specialty}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsDialogOpen(!isDialogOpen)}
                    className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
                  >
                    <Edit3 size={16} />
                    Edit Profile
                  </button>
                  <button className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-lg transition-all duration-200">
                    <Settings size={16} />
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{profileData.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>Joined {profileData.joinDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>{profileData.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? "text-teal-600 dark:text-teal-400 border-b-2 border-teal-500"
                        : "text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
                    }`}
                  >
                    <Icon size={18} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "overview" && renderOverview()}
            {activeTab === "story" && renderStory()}
            {activeTab === "contributions" && renderContributions()}
            {activeTab === "sessions" && renderSessions()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
