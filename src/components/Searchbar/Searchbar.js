import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from './Searchbar.module.scss';

export class Searchbar extends Component {

  state = {
    searchValue: '',
  };

  handleNameChange = (event) => {
    this.setState({ searchValue: event.currentTarget.value});
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.searchValue.trim() === "") {
      toast.error('Type for search...');
      return;
    }
    this.props.onSubmit(this.state.searchValue);
    this.setState({ searchValue: "" });
  };

  render() {
    return (
      <div>
      <header className={style.Searchbar}>
        <form className={style.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={style.SearchForm_button}>
            <span className={style.SearchForm_label}>Search</span>
          </button>

          <input className={style.SearchForm_input}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.searchValue}
              onChange={this.handleNameChange}
            />
        </form>
        </header>
        <ToastContainer position="top-right" autoClose={1000}/>
    </div>
    );
  }
}