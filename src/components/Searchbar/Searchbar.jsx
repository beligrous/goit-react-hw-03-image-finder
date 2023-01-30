import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './searchbar.module.css';
class Searchbar extends Component {
  state = { searchWord: '' };

  handleChange = e => {
    this.setState({ searchWord: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({ ...this.state });
  };

  render() {
    const { disabled } = this.props;

    return (
      <header className={styles.Searchbar}>
        <form onSubmit={this.handleSubmit} className={styles.SearchForm}>
          <button
            type="submit"
            disabled={disabled}
            className={styles.SearchFormButton}
          >
            <span className={styles.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            onChange={this.handleChange}
            className={styles.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchWord}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  disabled: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
