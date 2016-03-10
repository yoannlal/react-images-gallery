import React from 'react';
import ReactDOM from 'react-dom';

const Lightbox = React.createClass({

  componentWillReceiveProps (nextProps) {
		if (nextProps.isOpen) {
			window.addEventListener('keydown', this.handleKeyboardInput);
			window.addEventListener('resize', this.handleResize);
			this.handleResize();
		} else {
			window.removeEventListener('keydown', this.handleKeyboardInput);
			window.removeEventListener('resize', this.handleResize);
		}
	},

  close () {
		this.props.onClose();
	},

  gotoNext (e) {
		if (this.props.currentImage === (this.props.photos.length - 1)) return;
		if (e) {
			event.preventDefault();
			event.stopPropagation();
		}
		this.props.nextImage();
	},

  gotoPrev (e) {
		if (this.props.currentImage === 0) return;
		if (e) {
			event.preventDefault();
			event.stopPropagation();
		}
		this.props.previousImage();
	},

  handleKeyboardInput (e) {

    switch(e.keyCode){
      case 37:
        this.gotoPrev(e);
        break;
      case 39:
        this.gotoNext(e);
        break;
      case 27:
        this.props.onClose();
        break;
      default:
        return;
    }

	},

  handleResize () {
		this.setState({
      width_screen: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      height_screen: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight});
	},

	handleClick (e) {

		this.gotoNext(e);

	},

  renderArrowNext () {

		return (
      <div id='react_lightbox_arrow_right' className='react_lightbox_arrow'>

			</div>
		);
	},

  renderArrowPrev () {
		return (
      <div id='react_lightbox_arrow_left' className='react_lightbox_arrow'>

			</div>
		);
	},

    renderImages () {
  		const { photos, currentImage } = this.props;

  		const image = photos[currentImage];

  		return (
        <div id='react_lightbox_image' onClick={this.handleClick}>
          <Image url={image.url.large} photo={photos[currentImage]} currentImage={currentImage} width={this.state.width_screen*0.95} height={this.state.height_screen-20}  />
        </div>
  		);
  	},

  renderDialog () {

		return (

      <div id='react_lightbox_content' >

        {this.props.currentImage !== 0 ?
          <svg className='arrows arrows-left' onClick={this.gotoPrev} onTouchEnd={this.gotoPrev}>
            <path d="M20 0 L0 20 L20 40"></path>
          </svg>:
          null
        }

				{this.renderImages()}

        {this.props.currentImage !== (this.props.photos.length - 1) ?
          <svg className='arrows arrows-right' onClick={this.gotoNext} onTouchEnd={this.gotoNext}>
            <path d="M0 0 L20 20 L0 40"></path>
          </svg>:
          null
        }
			</div>

		);
	},

  render(){

    return (
      this.props.isOpen ?
        <div id='react_lightbox'>
          <svg className='close' onClick={this.props.onClose}>
            <path d="M0 0 L30 30Z"></path>
            <path d="M30 0 L0 30Z"></path>
          </svg>

          {this.renderDialog()}
        </div>
        : null
    );
  }
});

/*

  IMAGE COMPONENT

*/

const Image = React.createClass({

  getInitialState: function(){
    return {
      loading: true
    };
  },

  imageLoaded: function(){
    this.setState({loading: false});
  },

  componentWillReceiveProps: function() {
    this.setState({loading: true});
  },

  render(){

    let styleImg={
      maxWidth: this.props.width,
      maxHeight:this.props.height
    };

    return (
      <figure>
        {this.state.loading ? <div><p className='text-center'>Loading...</p> </div>: null}
        <img key={'image' + this.props.currentImage} src={this.props.url} className={this.state.loading ? 'hidden' : ''} style={styleImg} onLoad={this.imageLoaded}/>
      </figure>


    );
  }
});

module.exports = Lightbox;
