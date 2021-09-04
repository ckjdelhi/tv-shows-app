import React from "react";
import Link from "next/link";
import fetch from "isomorphic-fetch";

export default class extends React.Component {
  static async getInitialProps() {
    const data = await fetch("https://api.tvmaze.com/search/shows?q=avengers");
    const items = await data.json();
    return {
      items,
    };
  }
  render() {
    const { items } = this.props;
    return (
      <div class="card-container ">
        {items.map(
          (movie, index) =>
            movie.show.image && (
              <div class="card-container">
                <div class="card u-clearfix">
                  <div class="card-body">
                    <span class="card-number card-circle subtle">
                      {movie.show.rating.average
                        ? movie.show.rating.average
                        : "N/A"}
                    </span>
                    <span class="card-author subtle">
                      Language: {movie.show.language}
                    </span>
                    <span class="card-author subtle">
                      Premiered: {movie.show.premiered}
                    </span>
                    <span class="card-author subtle">
                      Genres:{" "}
                      {movie.show.genres &&
                        movie.show.genres.map((v) => v + " ")}
                    </span>
                    <h2 class="card-title">
                      <Link
                        as={`/tv-shows/details/${movie.show.id}`}
                        href={`/tv-shows/details/[id]`}
                      >
                        <a>{movie.show.name}</a>
                      </Link>
                    </h2>
                    <span class="card-description subtle">
                      {movie.show.summary}
                    </span>
                  </div>
                  <img
                    src={`${movie.show.image.medium}`}
                    alt=""
                    class="card-media"
                  />
                </div>
                <div class="card-shadow"></div>
              </div>
            )
        )}
      </div>
    );
  }
}
