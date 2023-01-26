import { Component } from 'react';
import axios from 'axios';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';

class App extends Component {
  state = { imageId: '', pictures: [] };

  handleSearch = data => {
    this.getPictures(data);
  };

  getPictures = data => {
    this.setState({
      pictures: [
        ...axios
          .get(
            `https://pixabay.com/api/?q=${data}&page=1&key=31877726-de77d5eff1f0b572f2213dfa6&image_type=photo&orientation=horizontal&per_page=12`
          )
          .then(response => this.setState({ pictures: response.data.hits })),
      ],
    });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery pictures={this.state.pictures} />
      </div>
    );
  }
}

export default App;
