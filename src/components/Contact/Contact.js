import React, { useState } from 'react';
import { fs} from './../../Firebase/Firebase'
import { collection, addDoc } from 'firebase/firestore';
import {Footer} from './../Footer/Footer'
import {Navbar} from './../Navbar/Navbar'
import './Contact.css'; 

export const Contact = (user) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const docRef = await addDoc(collection(fs, 'contacts'), {
          name,
          email,
          message,
        });
        console.log('Document written with ID: ', docRef.id);
  
        
        setName('');
        setEmail('');
        setMessage('');
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    };
  
    return (
        <>
        <Navbar user={user}/>
      <div className="contact-container">
        <h2 className="contact-header">Contact Us</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="message">
              Message:
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
      <Footer />
      </>
    );
  };
  
  export default Contact;