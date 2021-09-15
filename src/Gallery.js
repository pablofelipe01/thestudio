import React, { useState } from 'react';

import Detail from './Detail';

import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

import objectDetail from './artobjects.json';

const Gallery = ({ images, searchOptions }) => {
 
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setError(false);
    setActiveItem(null);
  };

  const handleError = () => {
    setError(true);
  };

  const getDetail = (itemId) => {
    fetch(`${searchOptions.url}/collection/${itemId}?key=${searchOptions.key}`)
      .then((res) => res.json())
      .then((res) => {
        setActiveItem(res);
      })
      .then((res) => handleShow())
      .catch((err) => {
        handleError();
        handleShow();
      });
  };
  if (!images.length) {
    return (
  <Container
    className="d-flex  justify-content-center align-items-center align-content-center"
    style={{ minHeight: '90vh' }}
  >
    <span style={{ paddingRight: '1em' }}>Loading results{'  '}</span>
    <Spinner animation="border" variant="dark" size="sm" />
  </Container>)
}
  return (
    <CardColumns>
      {images.map((object) => {
        return (
          <Card key={object.id}>
            {object.webImage && (
              <Card.Img
                variant="top"
                src={object.webImage ? object.webImage.url : ''}
                alt={object.title}
              />
            )}
            <Card.Body>
              {object.webImage ? (
                ''
              ) : (
                <Card.Title>No Image Available</Card.Title>
              )}
              <Card.Text className="text-muted">{object.longTitle}</Card.Text>
              <Button
                onClick={() => getDetail(object.objectNumber)}
                variant="outline-dark"
              >
                Details
              </Button>
            </Card.Body>
          </Card>
        );
      })}
      {(activeItem || error) && (
        <Detail
          objectDetail={activeItem}
          show={show}
          handleClose={handleClose}
          error={error}
        />
      )}
    </CardColumns>
  );
};

export default Gallery;