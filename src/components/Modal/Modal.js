import React, { Component } from 'react';
import style from './Modal.module.scss'

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.code === "Escape") {
      this.props.onCloseModal();
    }
  };

  handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      this.props.onCloseModal();
    }
  };

  render() {
    const image = this.props.image;
    return (
      <div className={style.Overlay} onClick={this.handleBackdropClick}>
        <div className={style.Modal}>
        <img src={image.largeImageURL} alt={image.tags} />
        </div>
      </div>
    );
  }
}