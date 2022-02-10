import React from 'react';
import PropTypes from "prop-types";
import style from './ImageGalleryItem.module.scss';

export function ImageGalleryItem({ images, onSelectImage }){
  return (
    <li className={style.ImageGalleryItem} key={images.id}>
      <img
        className={style.ImageGalleryItem_image}
        src={images.webformatURL}
        alt={images.tags}
        onClick={() => onSelectImage(images)}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  images: PropTypes.object.isRequired,
  onSelectImage: PropTypes.func.isRequired,
};
