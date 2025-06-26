import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {
  user: {
    name: string;
    email: string;
    profileImage: string | null;
  };
  onLogout: () => Promise<void>; 
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    window.location.href = '/';
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center animate-fade-in">
        <div className="text-center space-y-4">
          <div className="relative">
            <Loader2 className="h-12 w-12 text-purple-600 animate-spin mx-auto" />
            <div className="absolute inset-0 rounded-full border-2 border-purple-200 animate-pulse-opacity"></div>
          </div>
          <h2 className="text-xl font-semibold text-purple-800 animate-pulse-opacity">
            Preparing your dashboard...
          </h2>
          <p className="text-purple-600 max-w-md mx-auto">
            Loading your personalized experience
          </p>
          <div className="w-full bg-purple-100 rounded-full h-1.5 mt-4">
            <div 
              className="bg-purple-600 h-1.5 rounded-full animate-[width-animation_2s_ease-in-out]" 
              style={{ width: '0%' }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 animate-fade-in">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 animate-slide-up">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center overflow-hidden animate-scale-in">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-lg text-primary-foreground">👤</div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Welcome back, {user.name}!
              </h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="animate-scale-in hover:bg-red-50 hover:text-red-600 transition-colors"
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging out...
              </>
            ) : (
              'Logout'
            )}
          </Button>
        </div>

        {/* Welcome Card */}
        <Card className="mt-8 mb-8 bg-gradient-to-r from-black to-blue-900 text-white animate-slide-in-right">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">
              🎉 Congratulations!
            </h2>
            <p className="opacity-90">
              You've successfully completed the account onboarding process. 
            </p>
          </CardContent>
        </Card>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: '📊', title: 'Analytics', desc: 'View your account analytics and insights here.' },
            { icon: '⚙️', title: 'Settings', desc: 'Manage your account settings and preferences.' },
            { icon: '💬', title: 'Support', desc: 'Get help and support when you need it.' },
            { icon: '🚀', title: 'Quick Actions', desc: 'Perform common tasks quickly and efficiently.' },
            { icon: '📈', title: 'Growth', desc: 'Track your progress and growth metrics.' },
            { icon: '🎯', title: 'Goals', desc: 'Set and track your personal and professional goals.' },
          ].map((item, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">{item.icon}</span>
                  <span>{item.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {item.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;