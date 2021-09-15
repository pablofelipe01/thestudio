import React, { useState } from 'react';
import SearchForm from './SearchForm';
import Container from 'react-bootstrap/Container';
import Gallery from './Gallery';

function Search({ searchOptions }) {
  const [searchString, setSearchString] = useState('');
  const [lastSearch, setLastSearch] = useState('');
  const [galleryImages, setGalleryImages] = useState('');
  const [search, setSearch] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    setSearchString(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getData(searchString);
  };

  const getData = (searchString) => {
    if (searchString) {
      const url = `${searchOptions.url}/collection?key=${searchOptions.key}&q=${searchString}&ps=50`;
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          setError(false);
          setGalleryImages(res.artObjects);
          setLastSearch(searchString);
          setSearch(true);
          setSearchString('');
        })
        .then((res) => {
          if (!galleryImages.length) {
            setError(true);
          }
        })
        .catch((err) => {
          console.error(err);
          setError(true);
        });
    }
  };

  return (
    <Container>
      <SearchForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        searchString={searchString}
      />
      {setSearch && !error && (
        <>
          <p>
            Showing results for{' '}
            <span style={{ fontStyle: 'italic' }}>{lastSearch}:</span>{' '}
          </p>
          <Gallery
            images={galleryImages}
            getGalleryImages={getData}
            searchOptions={searchOptions}
          />
        </>
      )}
      {setSearch && error && (
        <p>
          No results found for{' '}
          <span style={{ fontStyle: 'italic' }}>{lastSearch}</span>. Please try
          another search
        </p>
      )}
    </Container>
  );
}

export default Search;