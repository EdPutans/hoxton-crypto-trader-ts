import React from 'react'
import { NewsItem } from '../types';

// you don't necessarily need to assign a type variable. You can just describe it as you use it in the Generic type:
const NewsLink: React.FunctionComponent<{ url: string }> = ({ url }) => {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      {url}
    </a>
  );
}

// Same as above comment, here:
 const NewsCard: React.FunctionComponent<{ newsItem: NewsItem }> = ({ newsItem: { description } }) => {
  return (
    <article className="newsfeed__card">
      <p>
        {description
          .split(/(https?:\/\/.*\b\/?)/g)
          .map((match) =>
            /https?/.test(match) ? <NewsLink url={match} /> : match
          )}
      </p>
    </article>
  );
};

export default NewsCard;