import React from 'react';
import { SearchBar } from "@/components/SearchBar";
import { StoryCard, StoryCardSkeleton } from "@/components/StoryCard";
import { useQuery } from "@tanstack/react-query";

interface Story {
  objectID: string;
  title: string;
  points: number;
  url: string;
}

const Index = () => {
  console.log("Rendering Index page");
  const [searchTerm, setSearchTerm] = React.useState("");

  const { data: stories, isLoading } = useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
      const response = await fetch('https://hn.algolia.com/api/v1/search?tags=front_page');
      const data = await response.json();
      return data.hits as Story[];
    }
  });

  const filteredStories = stories?.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Hacker News Today</h1>
      <div className="max-w-xl mx-auto mb-8">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 9 }).map((_, index) => (
            <StoryCardSkeleton key={index} />
          ))
        ) : (
          filteredStories?.map((story) => (
            <StoryCard key={story.objectID} story={story} />
          ))
        )}
      </div>
    </div>
  );
};

export default Index;