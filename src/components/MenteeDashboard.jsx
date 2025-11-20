"use client";
import {
  Book,
  Calendar,
  CheckCircle,
  MessageSquare,
  Target,
  TrendingUp,
  Video,
} from "lucide-react";
import NewsFeed from "./NewsFeed";
import SearchCard from "./SearchCard";

const colorClasses = {
  teal: { bg: "bg-teal-500/10", text: "text-teal-500" },
  blue: { bg: "bg-blue-500/10", text: "text-blue-500" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-500" },
  yellow: { bg: "bg-yellow-500/10", text: "text-yellow-500" },
};

const StatCard = ({ icon: Icon, title, value, change, color }) => {
  const { bg, text } = colorClasses[color];
  return (
    <div
      className={`flex items-center gap-4 rounded-2xl p-4 shadow-lg ${bg} dark:bg-gray-800/60`}
    >
      <div className={`rounded-full bg-white p-3 ${text}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {value}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{change}</p>
      </div>
    </div>
  );
};

const QuickActionButton = ({ icon: Icon, label }) => (
  <button className="flex flex-col items-center gap-2 rounded-2xl bg-gray-100/50 p-4 text-center transition-colors duration-200 hover:bg-teal-100/60 dark:bg-gray-800/60 dark:hover:bg-gray-700/50">
    <div className="rounded-full bg-white p-3 text-teal-500">
      <Icon size={24} />
    </div>
    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
      {label}
    </span>
  </button>
);

const MenteeDashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50/50 p-4 text-gray-900 dark:bg-gray-900/95 dark:text-white">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Welcome, Alex!</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Here is your progress and what is next for you.
        </p>
      </header>

      <main className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="col-span-1 flex flex-col gap-6 lg:col-span-2">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <StatCard
              icon={TrendingUp}
              title="Overall Progress"
              value="75%"
              change="+5% this month"
              color="teal"
            />
            <StatCard
              icon={CheckCircle}
              title="Tasks Completed"
              value="24"
              change="+3 this week"
              color="blue"
            />
            <StatCard
              icon={Calendar}
              title="Upcoming Sessions"
              value="2"
              change="Next: July 28th"
              color="purple"
            />
            <StatCard
              icon={MessageSquare}
              title="Unread Messages"
              value="3"
              change="From your mentor"
              color="yellow"
            />
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800/40">
            <h2 className="mb-4 text-lg font-bold">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <QuickActionButton icon={Calendar} label="Book a Session" />
              <QuickActionButton icon={Video} label="Join Meeting" />
              <QuickActionButton icon={Target} label="View Goals" />
              <QuickActionButton icon={Book} label="Browse Resources" />
            </div>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800/40">
            <h2 className="mb-4 text-lg font-bold">Progress Tracker</h2>
            {/* Placeholder for a more complex progress tracking component */}
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex justify-between">
                  <span className="text-sm font-medium">Goal Setting</span>
                  <span className="text-sm font-medium">80%</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-2.5 rounded-full bg-teal-500"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between">
                  <span className="text-sm font-medium">
                    Public Speaking Confidence
                  </span>
                  <span className="text-sm font-medium">60%</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-2.5 rounded-full bg-blue-500"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="col-span-1 flex flex-col gap-6">
          <SearchCard />
          <NewsFeed />
        </aside>
      </main>
    </div>
  );
};

export default MenteeDashboardPage;
