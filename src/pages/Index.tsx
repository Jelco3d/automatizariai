import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchBar } from "@/components/SearchBar";
import { StoryCard, StoryCardSkeleton } from "@/components/StoryCard";
import { useDebounce } from "@/hooks/use-debounce";

interface HNStory {
  objectID: string;
  title: string;
  points: number;
  url: string;
}

interface HNResponse {
  hits: HNStory[];
}

const fetchStories = async (query: string): Promise<HNResponse> => {
  console.log("Fetching stories with query:", query);
  const response = await fetch(
    `https://hn.algolia.com/api/v1/${
      query ? "search" : "search_by_date"
    }?query=${query}&tags=story&hitsPerPage=100`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 300);

  const { data, isLoading } = useQuery({
    queryKey: ["stories", debouncedQuery],
    queryFn: () => fetchStories(debouncedQuery),
  });

  console.log("Current query:", debouncedQuery);
  console.log("Loading state:", isLoading);
  console.log("Stories data:", data);

  return (
    <div className="container py-8 mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Hacker News Today</h1>
      
      <div className="max-w-xl mx-auto mb-8">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 12 }).map((_, i) => (
              <StoryCardSkeleton key={i} />
            ))
          : data?.hits.map((story) => (
              <StoryCard key={story.objectID} story={story} />
            ))}
      </div>
    </div>
  );
};

export default Index;