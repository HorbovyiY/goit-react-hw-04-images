import { useState} from "react";

import { ImageGallery } from "./ImageGallery/ImageGallery";
import { SearchBar } from "./Searchbar/Searchbar";

export const App =()=> {
  const [searchText, setSearchText] = useState('');

  const onSubmit = (text) => { 
    setSearchText(text)
  }

  return(
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <SearchBar onSubmitForm={onSubmit} />
        <ImageGallery searchText={searchText}/>
      </div>
    )
};
