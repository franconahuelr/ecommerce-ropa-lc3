import React from 'react';
import {Navbar} from './Navbar/Navbar';
import {Footer} from './Footer/Footer'
import { useUser } from './../components/Context/userContext'

export const FrecuentsQuestions = () => {

  const faqStyles = {
    backgroundColor: '#f7f7f7',
    padding: '40px 0',
  };

  const containerStyles = {
    maxWidth: '80%',
    margin: '0 auto',
    padding: '0 20px',
   
  };

  const sectionStyles = {
    marginBottom: '10px',
    marginTop: '25px',
  };

  const questionStyles = {
    fontSize: '24px',
    color: '#cc1818',
    marginBottom: '10px',
  };

  const answerStyles = {
    fontSize: '18px',
    color: '#555',
  };

  const user = useUser();

  return (
    <>
    <Navbar  user={user}/>
    <section style={faqStyles}>     
      <div className="containerFaq" style={containerStyles}>
      <h2 style={{ fontSize: '36px', textAlign: 'center', marginBottom: '50px'}}>Preguntas Frecuentes</h2>

<div style={sectionStyles}>
  <h3 style={questionStyles}>1. ¿Qué es Anime Clothing?</h3>
  <p style={answerStyles}>
    Anime Clothing es una tienda independiente especializada en ropa personalizada inspirada en el mundo del anime. Somos conocidos por nuestros diseños únicos, calidad y asequibilidad.
  </p>
</div>

<div style={sectionStyles}>
  <h3 style={questionStyles}>2. ¿Cómo puedo realizar un pedido?</h3>
  <p style={answerStyles}>
    Realizar un pedido es fácil. Simplemente navega por nuestros productos, selecciona los artículos que te gusten y agrégalos a tu carrito. Luego, procede al pago y sigue las instrucciones para completar tu compra.
  </p>
</div>

<div style={sectionStyles}>
  <h3 style={questionStyles}>3. ¿Qué métodos de pago aceptan?</h3>
  <p style={answerStyles}>
    Aceptamos diversos métodos de pago, incluyendo tarjetas de crédito, mercadopago, efectivo y más. Puedes elegir tu opción de pago preferida durante el proceso de pago.
  </p>
</div>

<div style={sectionStyles}>
  <h3 style={questionStyles}>4. ¿Cuánto tiempo llevará recibir mi pedido?</h3>
  <p style={answerStyles}>
    El tiempo de entrega depende de tu ubicación y del método de envío que elijas. Ofrecemos opciones de envío estándar y express. Puedes ver los tiempos estimados de entrega durante el proceso de compra.
  </p>
</div>

<div style={sectionStyles}>
  <h3 style={questionStyles}>5. ¿Cuál es nuestra política de devoluciones?</h3>
  <p style={answerStyles}>
    Tenemos una política de devoluciones flexible. Si no estás satisfecho con tu compra, puedes devolverla en un plazo de 30 días a partir de la entrega para obtener un reembolso completo o un cambio. Por favor, revisa nuestra política de devoluciones completa para más detalles.
  </p>
</div>
</div>
    </section>
    <Footer/> 
    </>
  );
};

export default FrecuentsQuestions;