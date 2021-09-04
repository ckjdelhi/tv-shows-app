import React from "react";
import Link from "next/link";
import fetch from "isomorphic-fetch";

export default class extends React.Component {
  static async getInitialProps({ query }) {
    const { id } = query;
    const data = await fetch(`https://api.tvmaze.com/shows/${id}`);
    const item = await data.json();
    return {
      item,
    };
  }
  render() {
    const { item } = this.props;
    return (
      <section>
        <div class="card-container ">
          {item.image && (
            <div class="card u-clearfix">
              <div class="card-body">
                <span class="card-number card-circle subtle">
                  {item.rating.average ? item.rating.average : "N/A"}
                </span>
                <span class="card-author subtle">
                  Language: {item.language}
                </span>
                <span class="card-author subtle">
                  Premiered: {item.premiered}
                </span>
                <span class="card-author subtle">
                  Genres: {item.genres && item.genres.map((v) => v + " ")}
                </span>
                <h2 class="card-title">{item.name}</h2>
                <span class="card-description subtle">{item.summary}</span>
              </div>
              <img
                src={`${item.image.original}`}
                style={{ width: "50%", margin: 0 }}
                alt=""
              />
            </div>
          )}
          <Link href="/tv-shows">Back to home</Link>
        </div>
      </section>
    );
  }
}
