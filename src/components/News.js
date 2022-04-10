import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class News extends Component {
  article = [];
  constructor() {
    super();
    this.state = {
      articles: this.article,
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    // console.log("cdn")
    let url =
      `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=eb24a76fe9814646849290f123e34134&page=1&pageSize=${this.props.pageSize}`;
      this.setState({loading:true})
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading : false
    });
  }

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=eb24a76fe9814646849290f123e34134&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({
      loading:true
    })
    let data = await fetch(url);
    let parseData = await data.json();
    // console.log(parseData)
    this.setState({
      page: this.state.page - 1,
      articles: parseData.articles,
      loading :false
    });
  };
  handleNextClick = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / 20))) {
    }
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=eb24a76fe9814646849290f123e34134&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({
        loading:true
      })
      let data = await fetch(url);
      let parseData = await data.json();
      // console.log(parseData)
      this.setState({
        page: this.state.page + 1,
        articles: parseData.articles,
        loading : false
      });
    
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsMonkey - Top Headlines</h1>
        {this.state.loading&&<Spinner/>}
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 100) : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn-dark btn"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
          disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
            type="button"
            className="btn-dark btn"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
