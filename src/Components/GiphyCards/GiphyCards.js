import React, { Component } from "react";
import GifImage from "../GifImage/GifImage";
import styles from "./GiphyCards.module.css";
require('intersection-observer');

class GiphyCards extends Component {
  constructor(props) {
    super(props);
    this.intersectionCallback = this.intersectionCallback.bind(this);
  }

  componentDidMount() {
    const options = {
      rootMargin: "300px",
      threshold: 0.2
    };
    // this creates a observer;
    this.observer = new IntersectionObserver(
      this.intersectionCallback,
      options
    );

    this.target = document.querySelector("#loadMoreDiv");
    if (this.target) {
      this.observer.observe(this.target);
    }
  }

  componentWillUnmount() {
    if (this.target) {
      this.observer.unobserve(this.target);
    }
  }

  intersectionCallback(entries) {
    if (entries[0].intersectionRatio > 0) {
      this.props.loadMoreData();
    }
  }

  render() {
    const responseData = this.props.responseData;
    if (responseData.length === 0) {
      return null;
    }

    const gifs = responseData.map((data, index) => {
      return <GifImage data={data} key={`gif-${index}`} />;
    });

    return (
      <div>
        <div className={styles.container}>{gifs}</div>
        {this.props.showLoadMore && (
          <div id="loadMoreDiv" className={styles.loadMore}>
            <div className={styles.circle} />
          </div>
        )}
      </div>
    );
  }
}

export default GiphyCards;
