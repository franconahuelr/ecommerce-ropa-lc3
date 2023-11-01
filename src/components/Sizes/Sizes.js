import React from 'react';
import './Sizes.css'
import {Navbar} from './../Navbar/Navbar'
import {Footer} from '../Footer/Footer'
import { useUser } from '../Context/userContext';

export function Sizes() {

  const user = useUser();

  return (
    <>
    <Navbar user={user}/>
    <div className="containerSize">
      <div className="row">
        <div className="col-md-12">
          <p>&nbsp;</p>
          <h3>TABLA DE TALLES Y COMO MEDIR</h3>
          <p>&nbsp;</p>
          <div className="faqContent" id="calidad">
            <p><strong>- TE RECOMENDAMOS, QUE TOMES LA MEDIDA DE UNA REMERA TUYA, QUE TE QUEDE BIEN, Y LA COMPARES CON LA TABLA DE TALLES</strong></p>
            <p><strong>- TENÉ EN CUENTA QUE LA PRIMERA MEDIDA ES EL ANCHO DE AXILA A AXILA, Y LA SEGUNDA ES EL LARGO.</strong></p>
            <p><strong>- LAS REMERAS SE MIDEN ESTIRADAS SOBRE UNA SUPERFICIE PLANA Y PUEDEN TENER UN MARGEN DE ERROR DE 1,5 CM APROX (POR LO QUE EN CASO DE DUDA ENTRE DOS TALLES, TE RECOMENDAMOS PEDIR UN TALLE MAS).</strong></p>
          </div>
          <h3>Remeras Personalizadas Animeclothing</h3>
          <p>&nbsp;</p>
          <table>
            <tr>
              <th>
                <p>TABLA</p>
                <p>DE TALLES</p>
              </th>              
              <th>
                <p>AXILA A</p>
                <p>AXILA</p>
              </th>
              <th>
                <p>LARGO TOTAL</p>
              </th>
            </tr>
            <tr>
              <td>XS</td>              
              <td>45 CM</td>
              <td>68 CM</td>
            </tr>
            <tr>
              <td>S</td>            
              <td>48 CM</td>
              <td>71 CM</td>
            </tr>
            <tr>
              <td>M</td>            
              <td>51 CM</td>
              <td>72 CM</td>
            </tr>
            <tr>
              <td>L</td>            
              <td>53 CM</td>
              <td>75 CM</td>
            </tr>
            <tr>
              <td>XL</td>            
              <td>55.5 CM</td>
              <td>79 CM</td>
            </tr>
            <tr>
              <td>XXL</td>            
              <td>58 CM</td>
              <td>82 CM</td>
            </tr>
            <tr>
              <td>XXXL</td>            
              <td>62 CM</td>
              <td>85 CM</td>
            </tr>
          </table>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <h3>QUE CALIDAD TRABAJAMOS ?</h3>
          <div className="faqContent" id="calidad">
            <p><strong>- REMERAS DE ALGODON PEINADO 24/1, CON COSTURAS REFORZADAS, CUELLO CON REEB COCIDO Y TAPA COSTURA DE HOMBRO A HOMBRO.</strong></p>
            <p><strong>- LAS ESTAMPAS SON EN SERIGRAFIA, COLOR POR COLOR, LLEGANDO COLORES VIBRANTES Y DURADEROS.</strong></p>
            <p><strong>- LAS IMAGENES QUE VES EN LA WEB SON UN PREVIEW DIGITAL DE LAS ESTAMPAS / REMERAS, PERO PODRAS VER FOTOS DE LAS MISMAS REALES EN NUESTRO <a href="https://www.instagram.com">INSTRAGRAM</a></strong></p>
          </div>
        </div>
      </div>
    </div>
    <Footer/> 
    </>
  );
}

export default Sizes;