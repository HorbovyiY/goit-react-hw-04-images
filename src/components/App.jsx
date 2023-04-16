import React from "react";

import { ImageGallery } from "./ImageGallery/ImageGallery";
import { SearchBar } from "./Searchbar/Searchbar";

export class App extends React.Component {
  state = {
    searchText: '',
  }

  onSubmit = (text) => { 
    this.setState({searchText: text})
  }

  render() { 
    return(
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <SearchBar onSubmit={this.onSubmit} />
        <ImageGallery searchText={this.state.searchText}/>
      </div>
    )
  };
};
