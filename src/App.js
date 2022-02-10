
import React, { Component } from "react";
import './App.css';
import Loader from './components/Loader/Loader';
import {Searchbar} from './components/Searchbar/Searchbar';
import {ImageGallery} from './components/ImageGallery/ImageGallery';
import {Modal } from './components/Modal/Modal';
import {Button} from "./components/Button/Button";
import {api}  from './services/Images-api';

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export class App extends Component {
  state = {
    searchValue: "",
    page: 1,
    images: [],
    error: null,
    status: Status.IDLE,
    selectedImage: null,
  };

  handleFormSubmit = (searchValue) => {
    this.setState({ searchValue, page: 1, images: [] });
  };

  incrementPage = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  handleSelectImage = (data) => {
    this.setState({ selectedImage: data });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: null });
  };

  componentDidUpdate(prevProps, prevState) {
    const nextValue = this.state.searchValue;
    const prevValue = prevState.searchValue;

    if (prevValue !== nextValue || prevState.page !== this.state.page) {
      this.setState({ status: Status.PENDING });

      api.fetchImages(nextValue, this.state.page)
        .then((data) => {
          this.setState((prevState) => ({
            images: [...prevState.images, ...data.hits],
            status: Status.RESOLVED,
          }));
        })
        .catch((error) => console.log(error));
    }
    if (this.state.page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    };
  }

  render() {
    const { images, status, selectedImage } = this.state;

    if (status === "idle") {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSubmit} />
          {images.length === 0 && (
            <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
              <p style={{ fontSize: "18px", fontWeight: "600" }}>Image gallery is empty</p>
            </div>
          )}
        </>
      );
        
    }
    if (status === "pending") {
      return (
        <div>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <Loader/>
      </div>
      );
    }
    if (status === "resolved") {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSubmit} />
          {this.state.selectedImage && (<Modal image={selectedImage} onCloseModal={this.handleCloseModal} />)}
          <ImageGallery
            images={images}
            onSelectImage={this.handleSelectImage} />
          {images.length > 0 && <Button onClick={this.incrementPage} />}
          
          {images.length === 0 && (
            <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
              <p style={{ fontSize: "18px", fontWeight: "600" }}>No result.</p>
            </div>
          )}
        </>
      );
    }
  }
}


