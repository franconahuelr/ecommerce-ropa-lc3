import React from 'react';
import { Carousel } from 'react-bootstrap';
import './CarouselImages.css';

export const CarouselImages = () => {

      return (
        <div className="carousel-container">
          <Carousel>
            
            <Carousel.Item>
              <img
                className="d-block m-auto"
                src="https://http2.mlstatic.com/D_795968-MLA44953308983_022021-O.jpg"
                alt="BUZOS"
                style={{ maxWidth: '100%', maxHeight: '400px' }}
              
                
              />
              <Carousel.Caption>
                <h3>BUZOS</h3>
                <p>Diseños Unicos!</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block m-auto"
                src="https://acdn.mitiendanube.com/stores/115/314/products/larusso-blanco1-f86e863e4c0722b89e16032068993851-480-0.png"
                alt="REMERAS"
                style={{ maxWidth: '100%', maxHeight: '400px' }}
               
              />
              <Carousel.Caption>
                <h3>REMERAS</h3>
                <p>De tus series, peliculas y juegos favoritos</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      );
    };
export default CarouselImages;