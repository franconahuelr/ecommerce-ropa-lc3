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
                src="https://acdn.mitiendanube.com/stores/001/029/315/products/pizza-time1-dfc67727b9474296dd16747890035712-640-0.webp"
                alt="Segunda imagen"
              
                
              />
              <Carousel.Caption>
                <h3>Slide 2 Title</h3>
                <p>Slide 2 Description</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block m-auto"
                src="https://acdn.mitiendanube.com/stores/001/029/315/products/chimichangas-free1-3c3c851975132757e216769174584434-640-0.webp"
                alt="Tercera imagen"
               
              />
              <Carousel.Caption>
                <h3>Slide 3 Title</h3>
                <p>Slide 3 Description</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      );
    };
export default CarouselImages;