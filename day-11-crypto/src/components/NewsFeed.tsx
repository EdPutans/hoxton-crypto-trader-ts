import { STATUS_UPDATES } from "../constants";
import { NewsItem } from "../types";
import useFetch from "../hooks/useFetch";
import NewsCard from "./NewsCard";

export default function NewsFeed() {
  // if you're not using the setNewsList function, you don't beed to deconstruct it:
  const [newsList] = useFetch<NewsItem>(STATUS_UPDATES, "status_updates");

  return (
    <ul className="newsfeed">
      {newsList.map((newsItem) => (
        <li>
          <NewsCard newsItem={newsItem} />
        </li>
      ))}
    </ul>
  );
}
