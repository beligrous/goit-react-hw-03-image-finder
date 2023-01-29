import { Component } from 'react';
import { Blocks } from 'react-loader-spinner';
import styles from './app.module.css';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import getPictures from 'api/api';

class App extends Component {
  state = {
    imageId: '',
    pictures: [],
    search: '',
    loading: false,
    error: null,
    page: 1,
  };

  handleSearch = search => {
    this.setState({ search: search.searchWord, page: 1, pictures: [] });
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page, pictures } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.setState({ loading: true });
      getPictures(search, page)
        .then(response => {
          this.setState(prevState => ({
            pictures: [...pictures, ...response.hits],
          }));
        })
        .catch(error => this.setState({ error: error.message }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  getMorePictures = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { pictures, error, loading } = this.state;
    const loadingSpiner = (
      <div className={styles.loading}>
        <Blocks
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperClass="blocks-wrapper"
        />
        <p>Loading, please wait</p>
      </div>
    );
    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery pictures={pictures} />
        {loading && loadingSpiner}
        {error && <p>{error}</p>}
        {pictures.length > 0 && (
          <button
            className={styles.button}
            type="button"
            onClick={this.getMorePictures}
          >
            Load more.
          </button>
        )}
      </div>
    );
  }
}

export default App;
