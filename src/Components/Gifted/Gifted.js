import React, { Component } from "react";
import GiphyCards from "../GiphyCards/GiphyCards";
import axios from "axios";
import NoResults from "../NoResults/NoResults";
import styles from "./Gifted.module.css";

class Gifted extends Component {
  constructor(props) {
    super(props);
    this.state = {
      giphyData: [],
      status: null,
      offset: 0,
      showLoadMore: false,
      limit: 15,
      defaultQuery: "Dogs",
      displayMode: "Dark",
      totalCount: null
    };
    this.query = React.createRef();
  }

  componentDidMount() {
    this.makeGetGifCall(this.state.defaultQuery);
  }

  loadMoreData = () => {
    this.setState(
      {
        offset: this.state.offset + this.state.limit
      },
      () => {
        this.getGiphyData();
      }
    );
  };

  getGiphyData = clearAll => {
    if (clearAll) {
      this.setState({
        giphyData: [],
        offset: 0,
        showLoadMore: false,
        totalCount: null
      });
    }

    const query = this.query.current.value || this.state.defaultQuery;

    if (query && query.trim() !== "") {
      this.makeGetGifCall(query);
    } else {
      alert(" Please enter GIPHY Keyword");
    }
  };

  makeGetGifCall(query) {
    axios
      .get(
        `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=m8OXJh6U1W2hZwr30SaYZUzrBZ8CQlep&limit=${
          this.state.limit
        }&offset=${this.state.offset}`
      )
      .then(response => {
        console.log(response);
        const totalCount = response.data.pagination.total_count;
        this.setState({
          giphyData: [...this.state.giphyData, ...response.data.data],
          status: response.status,
          showLoadMore: this.state.offset + this.state.limit < totalCount,
          totalCount: totalCount
        });
      })
      .catch(error => {
        this.setState({
          status: 404,
          giphyData: null
        });
      });
  }

  enterKeyPressed = e => {
    if (e.key === "Enter") {
      this.getGiphyData(true);
    }
  };

  toggleDisplayMode = () => {
    if (this.state.displayMode === "Light") {
      this.setState({
        displayMode: "Dark"
      });
    } else {
      this.setState({
        displayMode: "Light"
      });
    }
  };

  render() {
    return (
      <div
        className={`${styles.mainContainer} ${styles[this.state.displayMode]}`}
      >
        <h1 className={styles.heading}>GIFted</h1>
        <button
          className={styles.toggleModeButton}
          onClick={this.toggleDisplayMode}
        >
          Click for {this.state.displayMode !== "Light" ? "Light Mode" : "Dark Mode"}
        </button>
        <header className={styles.header}>
          <div className={styles.searchBar}>
            <input
              type="text"
              className={styles.searchInput}
              ref={this.query}
              placeholder="Search yor GIFs like: cat, funny etc"
              value={this.state.searchQuery}
              onKeyPress={this.enterKeyPressed}
            />
            <button
              className={styles.searchButton}
              onClick={() => this.getGiphyData(true)}
            >
              <i className="fas fa-search search-icon" />
            </button>
          </div>
        </header>

        {this.state.giphyData && this.state.giphyData.length > 0 && (
          <div>
            <h3 className={styles.querySearched}>
              Showing Results for:{" "}
              {this.query.current.value || this.state.defaultQuery}
            </h3>
            <GiphyCards
              loadMoreData={this.loadMoreData}
              showLoadMore={this.state.showLoadMore}
              key={this.query}
              responseData={this.state.giphyData}
            />
          </div>
        )}

        <NoResults totalCount={this.state.totalCount} />
      </div>
    );
  }
}

export default Gifted;
