import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newUrl,author,time} = this.props
    return (
      <div className='container my-3'>
        <div className="card">
          <img src={!imageUrl?"https://mw3.wsj.net/mw5/content/logos/mw_logo_social.png":imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small>author:{author} atTime: {new Date(time).toDateString()}</small></p>
            <a href={newUrl} target="blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}
