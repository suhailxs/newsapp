import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
      let {title, description,imageUrl,newsUrl} = this.props

    return (
        <>
      <div className='container my-5'>
          <div className="card" style={{width: "18rem"}}>
            <img src={imageUrl?imageUrl:"https://image.cnbcfm.com/api/v1/image/106967182-1635440101315-Kroger_Ocado2.jpg?v=1635440251&amp;w=1920&amp;h=1080"} className="card-img-top" alt="..." height={"200px"} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}...</p>
                <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read more</a>
            </div>
            </div>
      </div>
      </>
    )
  }
}

export default NewsItem