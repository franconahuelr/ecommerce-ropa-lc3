import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { fs } from '../../Firebase/Firebase'
import { storage } from '../../Firebase/Firebase';
import './AddProducts.css';

export const AddProducts = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const [imageError, setImageError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [uploadError, setUploadError] = useState('');

  const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG'];

  const handleProductImg = (e) => {
    const inputType = e.target.type;
    if (inputType === 'file') {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        if (selectedFile && types.includes(selectedFile.type)) {
          setImage(selectedFile);
          setImageError('');
        } else {
          setImage(null);
          setImageError('Please select a valid image file type (png or jpg)');
        }
      } else {
        console.log('Please select your file');
      }
    } else if (inputType === 'text') {
      const imageUrl = e.target.value;
      setImage(imageUrl);
      setImageError('');
    }
  };

  const handleAddProducts = async (e) => {
    e.preventDefault();
    const storageRef = ref(storage, `product-images/${image.name}`);

    try {
      if (image instanceof File) {
        await uploadBytes(storageRef, image);
        const imageUrl = await getDownloadURL(storageRef);
        await addDoc(collection(fs, 'Products'), {
          title,
          description,
          price: Number(price),
          url: imageUrl,
        });
      } else {
        // The user provided a URL
        await addDoc(collection(fs, 'Products'), {
          title,
          description,
          price: Number(price),
          url: image,
        });
      }

      setSuccessMsg('Product added successfully');
      setTitle('');
      setDescription('');
      setPrice('');
      document.getElementById('file').value = '';
      setImageError('');
      setUploadError('');
      setTimeout(() => {
        setSuccessMsg('');
      }, 3000);
    } catch (error) {
      setUploadError(error.message);
    }
  };
  return (
    <div className='container'>
      <br></br>
      <br></br>
      <h1>Add Products</h1>
      <hr></hr>
      {successMsg && (
        <>
          <div className='success-msg'>{successMsg}</div>
          <br></br>
        </>
      )}
      <form autoComplete='off' className='form-group' onSubmit={handleAddProducts}>
        <label>Product Title</label>
        <input
          type='text'
          className='form-control'
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        ></input>
        <br></br>
        <label>Product Description</label>
        <input
          type='text'
          className='form-control'
          required
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></input>
        <br></br>
        <label>Product Price</label>
        <input
          type='number'
          className='form-control'
          required
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        ></input>
        <br></br>
        <label>Upload Product Image</label>
        <input type='file' id='file' className='form-control' onChange={handleProductImg}></input>
        <label>Or</label>
        <input type="text" placeholder="Enter Image URL" className="form-control" onChange={handleProductImg} />
        <div>
        {image && <img src={image} alt="Product" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
        </div>

        {imageError && (
          <>
            <br></br>
            <div className='error-msg'>{imageError}</div>
          </>
        )}
        <br></br>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type='submit' className='btn btn-success btn-md'>
            SUBMIT
          </button>
        </div>
      </form>
      {uploadError && (
        <>
          <br></br>
          <div className='error-msg'>{uploadError}</div>
        </>
      )}
    </div>
  );
};