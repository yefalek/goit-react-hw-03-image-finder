import React from 'react';
import PropTypes from 'prop-types';
import {ImageGalleryItem} from '../ImageGalleryItem/ImageGalleryItem';
import style from './ImageGallery.module.scss';

export function ImageGallery ({ images, onSelectImage   }) {
     return (
    <ul className={style.ImageGallery}>
        {images.map((image) => {
            return (
                <ImageGalleryItem
                    key={image.id}
                    id={image.id}
                    images={image}
                    onSelectImage={onSelectImage}
                />);
        })}
        
    </ul>
);
}

ImageGallery.propTypes = {
    images: PropTypes.array.isRequired,
    onSelectImage : PropTypes.func.isRequired,
};