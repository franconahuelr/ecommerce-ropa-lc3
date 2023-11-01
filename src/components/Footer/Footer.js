import React from 'react';
import { useNavigate } from 'react-router-dom';
import FacebookIcon from './../../Images/icons8-facebook.svg'
import InstagramIcon from './../../Images/icons8-instagram.svg'
import './Footer.css';

export const Footer = () => {

  const navigate = useNavigate();

  return (
    <footer className='footer'>
      <div className="containerFooter">
        <div className="column">
          <h3>Sobre Nosotros</h3>
          <p>
            Somos una tienda independiente <br /> especializada en ropa personalizada <br /> sobre el mundo Geek!
          </p>
          <div className='social-media'>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <img src={FacebookIcon} alt="Facebook"/>
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <img src={InstagramIcon} alt="Instagram"/>
            </a>
          </div>
        </div>

        <div className="column">
          <h3>Navegacion</h3>
          <ul>
            <li>
              <a href="#" onClick={() => navigate('/')}>Home</a>
            </li>
            <li>
              <a href="#" onClick={() => navigate('/faq')}>Preguntas Frecuentes</a>
            </li>
            <li>
              <a href="#" onClick={() => navigate('/contact')}>Contacto</a>
            </li>
            <li>
              <a href="#" onClick={() => navigate('/sizes')}>Guia de Talles</a>
            </li>
          </ul>
        </div>

        <div className="column">
          <h3>Contacto</h3>
          <address>
            <p>
              123 Main Street<br />
              Rosario, Santa Fe<br />
              Email: <a href="mailto:info@animeclothing.com" style={{ color: '#fff' }}>info@animeclothing.com</a><br />
              Tel: (341) 456-7890
            </p>
          </address>
        </div>
      </div>
    </footer>
  );
};

export default Footer;