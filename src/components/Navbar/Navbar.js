import React from 'react';
import { Link } from 'react-router-dom';
import logo from './../../Images/logo.png'
import { Icon } from 'react-icons-kit';
import { shoppingCart } from 'react-icons-kit/feather/shoppingCart';
import { auth } from '../../Firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import './Navbar.css';

export const Navbar = ({ user }) => {
  
  const history = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        history('/');
      })
      .catch((error) => {
        console.error('Error during logout:', error);
      });
  };

  return (
    <div className='navbar'>
      <div className='leftside'>
        <div className='logo'>
          <Link to='/'><img src={logo} alt='logo' /></Link>
          
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
            {user.role === 'user' && (<>
              <div className='cart-menu-btn'>
              <Link className='navlink' to='/cart'>
                <Icon icon={shoppingCart} size={20} />
              </Link>
              {/* <span className='cart-indicator'>{totalQty}</span> */}
              
              <div className='btn btn-danger btn-md' onClick={handleLogout}>
              Salir
              </div>
            </div>
             </>)}
           
            {user.role === 'admin' && (
              <div>
                <Link className='navlink' to='/addProducts'>
                  Agregar Productos
                </Link>
                <div className='btn btn-danger btn-md' onClick={handleLogout}>
              Salir
            </div>
              </div>
            )}
       
  
            </>
        
        )}
      </div>
    </div>
  );
};

export default Navbar;