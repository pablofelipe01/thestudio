import React, { useState, useEffect } from 'react';
import data from './data.json';
import artObjects from './artobjects.json';
import { Switch, Route, Redirect } from 'react-router-dom';
import CarouselContainer from './CarouselContainer';
import Navigation from './Navigation';
import About from './About';
import Gallery from './Gallery';
import Search from './Search';

function App() {
  const [searchOptions, setSearchOptions] = useState({
    key: process.env.REACT_APP_RIJKS_KEY,
    url: 'https://www.rijksmuseum.nl/api/en/',
    numberOfResults: 50,
  });
  const [galleryImages, setGalleryImages] = useState([]);
  const getGalleryImages = () => {

    const url = `${searchOptions.url}/collection?key=${searchOptions.key}&ps=${searchOptions.numberOfResults}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => setGalleryImages(res.artObjects))
      .catch(console.error);
  };
  
  useEffect(() => {
    getGalleryImages();
  }, []);
  return (
    <>
      <Navigation />
      <main>
        <Switch>
          <Route
            exact
            path="/home"
            render={() => <CarouselContainer data={data} />}
          />
          <Route exact path="/about" component={About} />
          <Route
            exact
            path="/gallery"
            render={() => (
              <Gallery 
              searchOptions={searchOptions} images={galleryImages} 
              getGalleryImages={getGalleryImages}/>)}
              
          />
          <Route
            exact
            path="/search"
            render={() => <Search searchOptions={searchOptions} />}
          />;
          <Redirect path="*" to="/home" />
        </Switch>
      </main>
    </>
  );
}

export default App;