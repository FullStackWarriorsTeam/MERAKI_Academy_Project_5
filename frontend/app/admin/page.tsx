"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios'; 

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
    const [newProductDescription, setNewProductDescription] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [products]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addProduct = async () => {
    try {
      await axios.post('http://localhost:5000/api/products', {
        title: newProductName,
        price: parseFloat(newProductPrice),
        description : newProductDescription,
      });
      setNewProductName('');
      setNewProductPrice('');
      setNewProductDescription('')
      fetchProducts(); 
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const deleteProduct = async (id:any) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts(); 
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h1>Admin Panel - Products</h1>

      <h2>Add New Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={newProductName}
        onChange={(e) => setNewProductName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Product Price"
        value={newProductPrice}
        onChange={(e) => setNewProductPrice(e.target.value)}
      />
      

        <input
        type="string"
        placeholder="Product Description"
        value={newProductDescription}
        onChange={(e) => setNewProductDescription(e.target.value)}
      />
      <button onClick={addProduct}>Add Product</button>

      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.title} - ${product.price}-{product.description}
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProductsPage;