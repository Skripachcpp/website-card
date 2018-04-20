import React, {Component} from 'react';
import LightBox from 'react-images';
import PropTypes from 'prop-types';
import styles from './styles.module.sass'
import cx from 'classnames';

class Gallery extends Component {
  state = {
    currentImage: 0
  };

  openLightBox = (index) => {
    this.setState({
      currentImage: index,
      LightBoxIsOpen: true,
    });
  };

  closeLightBox = () => {
    this.setState({
      currentImage: 0,
      LightBoxIsOpen: false,
    });
  };

  goToPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  };

  goToNext = () => {
    if (this.state.currentImage >= this.props.images.length - 1) this.closeLightBox();
    else this.setState({currentImage: this.state.currentImage + 1,});
  };

  render() {
    const {images, boxClass, boxItemClass} = this.props;
    return [
      <LightBox
        images={images}
        onClose={this.closeLightBox}
        onClickPrev={this.goToPrevious}
        onClickNext={this.goToNext}
        onClickImage={this.goToNext}
        currentImage={this.state.currentImage}
        isOpen={this.state.LightBoxIsOpen}
      />,
      <div className={cx('Gallery', styles.box, boxClass)}>
        {images && images.map((item, index) =>
          <img className={cx(styles.boxItem, boxItemClass)} src={item.thumbnail}
               onClick={() => this.openLightBox(index)}/>
        )}
      </div>
    ];
  }
}

Gallery.propTypes = {
  boxClass: PropTypes.string,
  boxItemClass: PropTypes.string,
  images: PropTypes.arrayOf(
    PropTypes.objectOf({
      src: PropTypes.string
    })
  )
};

export default Gallery;