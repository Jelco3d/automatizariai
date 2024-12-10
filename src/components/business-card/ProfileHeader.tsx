import { User } from "lucide-react";
import { CardTitle, CardDescription } from "@/components/ui/card";

export const ProfileHeader = () => {
  return (
    <div className="text-center space-y-4 pb-8">
      <div className="mx-auto bg-gradient-to-br from-purple-100 to-purple-200 rounded-full p-6 w-fit shadow-inner">
        <User className="w-16 h-16 text-purple-600" />
      </div>
      <CardTitle className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
        AI Automation Expert
      </CardTitle>
      <CardDescription className="text-lg text-gray-600 max-w-lg mx-auto leading-relaxed">
        Helping businesses save 10+ hours weekly through AI automation
      </CardDescription>
    </div>
  );
};