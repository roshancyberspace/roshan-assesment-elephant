
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Camera, ArrowLeft } from 'lucide-react';
import OnboardingStep from './OnboardingStep';

interface ProfileStepProps {
  onNext: (name: string, profileImage: string | null) => void;
  onBack: () => void;
}

const ProfileStep: React.FC<ProfileStepProps> = ({ onNext, onBack }) => {
  const [fullName, setFullName] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError('Please enter your full name');
      return;
    }

    if (fullName.trim().length < 2) {
      setError('Name should be at least 2 characters long');
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      onNext(fullName.trim(), profileImage);
    }, 1000);
  };

  return (
    <OnboardingStep
      title="Complete your profile"
      subtitle="Tell us a bit about yourself"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative group">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="h-12 w-12 text-gray-400" />
              )}
            </div>
            <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <Camera className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isLoading}
            />
          </div>
          <p className="text-sm text-gray-500 text-center font-medium">
            Click to upload your profile picture
          </p>
        </div>

        <div className="space-y-3">
          <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700">
            Full Name
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-12 pl-10 border-gray-200 focus:border-gray-400 focus:ring-gray-400"
              disabled={isLoading}
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2 animate-fade-in">{error}</p>
          )}
        </div>

        <div className="space-y-4">
          <Button
            type="submit"
            className="w-full h-12 font-semibold bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Creating Account...</span>
              </div>
            ) : (
              'Complete Setup'
            )}
          </Button>

          {/* <button
            type="button"
            onClick={onBack}
            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors mx-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </button> */}
        </div>
      </form>
    </OnboardingStep>
  );
};

export default ProfileStep;
