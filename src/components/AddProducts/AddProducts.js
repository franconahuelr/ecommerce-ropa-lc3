import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { fs } from '../../Firebase/Firebase'
import { storage } from '../../Firebase/Firebase';
import { Navbar } from './../Navbar/Navbar';
import { useUser } from '../Context/userContext';

export const AddProducts = () => {

  const user = useUser();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
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
          setImageError('Selecciona un valor de imagen valido, png or jpg');
        }
      } else {
        //console.log('Please select your file');
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
          category,
        });
      } else {
        // The user provided a URL
        await addDoc(collection(fs, 'Products'), {
          title,
          description,
          price: Number(price),
          url: image,
          category,
        });
      }

      setSuccessMsg('Producto añadido con exito');
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
    <>
    <Navbar user={user} />
    <div className='container'>
      
      <br></br>
      <br></br>
      <h1>Agregar Productos</h1>
      <hr></hr>
      {successMsg && (
        <>
          <div className='success-msg'>{successMsg}</div>
          <br></br>
        </>
      )}
      <form autoComplete='off' className='form-group' onSubmit={handleAddProducts}>
        <label>Titulo del Producto</label>
        <input
          type='text'
          className='form-control'
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        ></input>
        <br></br>
        <label>Descripcion del Producto</label>
        <input
          type='text'
          className='form-control'
          required
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></input>
        <br></br>
        <label>Precio del Producto</label>
        <input
          type='number'
          className='form-control'
          required
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        ></input>
        <br />
        <label>Categoria</label>
          <select
            className="form-control"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Selecciona una Categoria</option>
            <option value="Remeras">Remera</option>
            <option value="Buzos">Buzo</option>
            <option value="Shorts">Short</option>
            
          </select>
        <br></br>
        <label>Subir imagen del producto</label>
        <input type='file' id='file' className='form-control' onChange={handleProductImg}></input>
        <label>O</label>
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
          <button type='submit' className='btn btn-danger btn-md'>
            Agregar
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
    </>
  );
};