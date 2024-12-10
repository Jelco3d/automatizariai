import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowUpCircle, ExternalLink } from "lucide-react";

interface Story {
  objectID: string;
  title: string;
  points: number;
  url: string;
}

interface StoryCardProps {
  story: Story;
}

export const StoryCard = ({ story }: StoryCardProps) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <h3 className="font-medium text-lg mb-2 line-clamp-2">{story.title}</h3>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Badge variant="secondary" className="flex items-center gap-1">
          <ArrowUpCircle className="w-4 h-4 text-orange-500" />
          <span>{story.points}</span>
        </Badge>
        <a
          href={story.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          Read more
          <ExternalLink className="w-4 h-4" />
        </a>
      </CardFooter>
    </Card>
  );
};

export const StoryCardSkeleton = () => {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="h-6 bg-gray-200 rounded w-16"></div>
        <div className="h-6 bg-gray-200 rounded w-24"></div>
      </CardFooter>
    </Card>
  );
};