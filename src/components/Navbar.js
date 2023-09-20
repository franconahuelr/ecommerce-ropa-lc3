import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../Images/logo.png'
import {Icon} from 'react-icons-kit'
import { shoppingCart } from 'react-icons-kit/feather/shoppingCart';
import {auth} from '../Firebase/Firebase'
import {useNavigate} from 'react-router-dom'
import { signOut } from 'firebase/auth'

export const Navbar = ({user}) => {

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
              <img src={logo} alt='logo' />
            </div>
          </div>
          <div className='rightside'>
            {!user&&(
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
            )}
    
            {user&&(
              <>
                <div>
                  <Link className='navlink' to='/'>
                    {user.displayName}
                  </Link>
                </div>
                <div className='cart-menu-btn'>
                  <Link className='navlink' to='/cart'>
                    <Icon icon={shoppingCart} size={20} />
                  </Link>
                  {/* <span className='cart-indicator'>{totalQty}</span> */}
                </div>
                <div className='btn btn-danger btn-md' onClick={handleLogout}>
                  Salir
                </div>
              </>
            )}
          </div>
        </div>
      );
    };

export default Navbar;