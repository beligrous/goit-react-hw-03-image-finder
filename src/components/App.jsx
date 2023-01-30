import { Component } from 'react';
import { Blocks } from 'react-loader-spinner';
import styles from './app.module.css';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import getPictures from 'api/api';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    pictures: [],
    search: '',
    loading: false,
    error: null,
    page: 1,
    finish: false,
    showModal: false,
    imageURL: '',
    searchButtonDisabled: false,
  };

  handleSearch = ({ searchWord }) => {
    const { search } = this.state;
    if (search !== searchWord) {
      this.setState({ search: searchWord, page: 1, pictures: [] });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page, pictures } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.setState({ loading: true, searchButtonDisabled: true });
      getPictures(search, page)
        .then(response => {
          if (response.totalHits === pictures.length) {
            this.setState({ finish: true });
          }
          this.setState(prevState => ({
            pictures: [...pictures, ...response.hits],
          }));
        })
        .catch(error => this.setState({ error: error.message }))
        .finally(() =>
          this.setState({ loading: false, searchButtonDisabled: false })
        );
    }
  }

  getMorePictures = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  handlePicture = url => {
    this.setState({ showModal: true, imageURL: url });
  };

  closeModal = () => {
    this.setState({ showModal: false, imageURL: '' });
  };

  render() {
    const {
      pictures,
      error,
      loading,
      finish,
      showModal,
      imageURL,
      searchButtonDisabled,
    } = this.state;
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
        <Searchbar
          onSubmit={this.handleSearch}
          disabled={searchButtonDisabled}
        />
        <ImageGallery pictures={pictures} showPicture={this.handlePicture} />
        {loading && loadingSpiner}
        {error && <p>{error}</p>}
        {pictures.length > 0 && finish === false && (
          <button
            className={styles.Button}
            type="button"
            onClick={this.getMorePictures}
          >
            Load more.
          </button>
        )}
        {showModal && (
          <Modal onClose={this.closeModal}>
            <img src={imageURL} alt="big" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
