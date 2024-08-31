import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
export default class News extends Component {
  static defaultprop = {
    country:'in',
    pageSize:6
  };
  static propTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number
  };
  capitalize=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props){
    super(props)
      this.state={
        articles: [],
        loading:false,
        page:1,
        totalResults:true
      }
      document.title = `${this.capitalize(this.props.category)}-NewsApp`
  }
async update() {
  this.props.setProgress(10);
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  this.setState({loading:true}) 
  await fetch(url)
      .then((response)=>{
         return response.json();
})
.then((json) => {
    this.setState({
      articles:json.articles,
      totalResults: json.totalResults,
      loading:false

    });
  });
  this.props.setProgress(100);
}
async componentDidMount(){
  this.update();
}
handlerPrevClick= ()=>{
  console.log("Previous Button")
    this.setState({
      page: this.state.page-1,
    });
  this.update()
  
}
handlerNextClick= ()=>{
  console.log("Next Button")
    //  this.setState({
    //       page: this.state.page + 1,
    //     });
       this.update()
} 

fetchMoreData = async() => {
  this.setState({page : this.state.page + 1});
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`; 
  await fetch(url)
      .then((response)=>{
          return response.json();
          })
.then((json) => {
    this.setState({
      articles:this.state.articles.concat(json.articles),
      totalResults: json.totalResults,
      loading:false
    });
  });
  
} 
  render() {
    return (
      <>
          <h1 className='text-center' style={{backgroundColor:'ButtonFace'}}>Top Headlines Today</h1>
          {/* {this.state.loading &&<Spinner/>} */}
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader= {<Spinner/>}
        > 
       <div className="container my-3">
          <div className="row">
          {!this.state.loading && this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newUrl={element.url} author={element.author} time={element.publishedAt}/>
                </div>
          })}
          </div>
          {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1}  type="button" className="btn btn-info" onClick={this.handlerPrevClick}>&larr; previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-info" onClick={this.handlerNextClick}>Next &rarr;</button>
          </div> */}
        </div>
        </InfiniteScroll>
      </>
    )
  }
}
