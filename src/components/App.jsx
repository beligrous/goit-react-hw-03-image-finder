import { Component } from 'react';
import axios from 'axios';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';

class App extends Component {
  state = {
    imageId: '',
    pictures: [],
    search: '',
    loading: false,
    error: null,
  };

  handleSearch = search => {
    this.setState({ search });
  };

  componentDidUpdate(prevProps, prevState) {
    const { search } = this.state;
    if (prevState.search !== search) {
      this.setState({ loading: true });
      axios
        .get(
          `https://pixabay.com/api/?q=${search}&page=1&key=31877726-de77d5eff1f0b572f2213dfa6&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(response => this.setState({ pictures: response.data.hits }))
        .catch(error => this.setState({ error: error.message }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery pictures={this.state.pictures} />
        {this.state.loading && <p>...Loading</p>}
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    );
  }
}

export default App;
