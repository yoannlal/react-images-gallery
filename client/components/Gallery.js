
import React from 'react';
import ReactDOM from 'react-dom';
import Lightbox from './Lightbox';

const Gallery = React.createClass({

  getInitialState: () => {
    return {
      containerWidth: 0,
      currentPhoto: 0,
      lightboxIsOpen: false
      //isEditable
    };
  },


  /*
    Events handlers for resizing the container
  */

  componentDidMount(){
	   this.setState({containerWidth: Math.floor(ReactDOM.findDOMNode(this).clientWidth)});
     window.addEventListener('resize', this.handleResize);
  },

  componentDidUpdate(){
  	if (ReactDOM.findDOMNode(this).clientWidth !== this.state.containerWidth){
	    this.setState({containerWidth: Math.floor(ReactDOM.findDOMNode(this).clientWidth)});
  	}
  },

  componentWillUnmount(){
	   window.removeEventListener('resize', this.handleResize, false);
  },

  handleResize(e){
    this.setState({containerWidth: Math.floor(ReactDOM.findDOMNode(this).clientWidth)});
  },

  /*
    LIGHTBOX functions
  */

  openLightbox(index, event){
    event.preventDefault();
    this.setState({
       currentPhoto: index,
       lightboxIsOpen: true
    });
  },

  closeLightbox(){
    this.setState({
       currentPhoto: 0,
       lightboxIsOpen: false,
    });
  },

  nextImage(){
  	this.setState({
	    currentPhoto: this.state.currentPhoto + 1,
  	});
  },

  previousImage(){
    this.setState({
      currentPhoto: this.state.currentPhoto - 1,
    });
  },

  render(){

    let style = {
     display: 'block',
     margin: 1,
     float: 'left'
    };

    let photos = this.props.photos;
    let gallery_Div = [];

    let limit = 1;

    if (this.state.containerWidth >= 380) limit = 2;
    if (this.state.containerWidth >= 760) limit = 3;
    if (this.state.containerWidth >= 1024) limit = 4;

    let container_Width = this.state.containerWidth - (limit*2);

    for (let i=0;i<photos.length;i+=limit){

      let ratio=0;
      let ratioTotal=0;
      let commonHeight = 0;
      let rowItems = [];

      for (let j=i; j<i+limit; j++){
        if (j == photos.length){
          break;
        }
        ratioTotal += photos[j].ratio;
        commonHeight = container_Width / ratioTotal;
      }

      for (let k=i; k<i+limit; k++){
        if (k == photos.length){
          break;
        }
        let url = photos[k].url.small;

        gallery_Div.push(
          <div key={k} style={style}>
            <a href='#'>
              <img className='imgGallery' src={url} onClick={this.openLightbox.bind(this,k)} onLoad={this.imageLoaded} style={{display:'block', border:0}} height={commonHeight} width={commonHeight * photos[k].ratio} alt="" /></a>
          </div>
        );
      }

    }

    return (
        <div id='gallery'>
          {gallery_Div}
          <Lightbox
  					currentImage={this.state.currentPhoto}
  					photos={photos}
  					isOpen={this.state.lightboxIsOpen}
  					nextImage={this.nextImage}
  					previousImage={this.previousImage}
  					onClose={this.closeLightbox}
	        />
        </div>
    );
  }
});

module.exports = Gallery;
