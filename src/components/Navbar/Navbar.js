import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './../../Images/logo.png';
import { Icon } from 'react-icons-kit';
import { shoppingCart } from 'react-icons-kit/feather/shoppingCart';
import { auth } from '../../Firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import './Navbar.css';

export const Navbar = ({ user }) => {
  const history = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        history('/');
      })
      .catch((error) => {
        console.error('Error during logout:', error);
      });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const getCartNumber = window.localStorage.getItem('cartNumber')

  return (
    <div className='navbar'>
      <div className='leftside'>
        <div className='logo'>
          <Link to='/'><img src={logo} alt='logo' /></Link>
        </div>
        <div className={`nav-links ${menuOpen ? 'mobile-menu-open' : ''}`}>
          <Link className='navlink' to='/faq'>Preguntas Frecuentes</Link>
          <Link className='navlink' to='/sizes'>Tabla de Talles</Link>
          <Link className='navlink' to='/contact'>Contacto</Link>
        </div>
        <div className='mobile-menu-icon' onClick={toggleMenu}>
          <div className={`bar ${menuOpen ? 'change' : ''}`}></div>
          <div className={`bar ${menuOpen ? 'change' : ''}`}></div>
          <div className={`bar ${menuOpen ? 'change' : ''}`}></div>
        </div>
      </div>
      <div className='rightside'>
        {!user ? (
          <>
            <div>
              <Link className='navlink' to='/signup'>
                Registrarse
              </Link>
            </div>
            <div>
              <Link className='navlink' to='/login'>
                Ingresar
              </Link>
            </div>
          </>
        ) : (
          <>
            {user.role === 'user' && (
              <>
                <div className='cart-menu-btn'>
                  <Link className='navlink' to='/cart'>
                    <Icon icon={shoppingCart} size={20} />
                  </Link>
                  <span className='cart-indicator'>{getCartNumber}</span>
                </div>
                <div className='btn btn-danger btn-md' onClick={handleLogout}>
                  Salir
                </div>
              </>
            )}

            {user.role === 'admin' && (
              <>
              <div>
                <Link className='navlink' to='/addProducts'>
                  Agregar Productos
                </Link>             
              </div>
              <div className='btn btn-danger btn-md' onClick={handleLogout}>
                 Salir
              </div>
             </>         
            )
            }
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;