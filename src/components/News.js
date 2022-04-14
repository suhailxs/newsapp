import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'


export class News extends Component {
  
  static defaultProps = {
    country:"in",
    pageSize : "6",
    category : "science"
  }

  static propTypes ={
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string
  }



  article = [];
  constructor() {
    super();
    this.state = {
      // articles: this.article,
      articles: [],
      loading: false,
      page: 1,
    };
  }


  async updateNews(){
    const url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=eb24a76fe9814646849290f123e34134&page=${this.state.page}&pageSize=${this.props.pageSize}`;
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


  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState({page:this.state.page-1});
    this.updateNews();
  };
  handleNextClick = async () => {
    this.setState({page:this.state.page+1});
    this.updateNews();
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsMonkey - Top Headlines</h1>
        {this.state.loading&&<Spinner/>}
        <div className="row">
          {!this.state.loading&&this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 100) : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author = {element.author}
                  date = {element.publishedAt}
                  source = {element.source.name}
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
