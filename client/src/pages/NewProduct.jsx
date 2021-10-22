/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NewProductForm() {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    author: '',
    category: '',
    image: '',
  });

  const handleOnChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <Link to="/admin" style={{ textDecoration: 'none' }}>
        <button type="button" className="btn btn-primary">Go back</button>
      </Link>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="htmlF-label">Title</label>
          <input name="title" value={formData.title} onChange={handleOnChange} type="text" className="form-control" id="title" />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="htmlF-label">Price</label>
          <input name="price" value={formData.price} onChange={handleOnChange} type="number" className="form-control" id="price" />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input name="description" value={formData.description} onChange={handleOnChange} type="text" className="form-control" id="description" />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">Author</label>
          <select onChange={handleOnChange} value={formData.author} name="author" id="author" className="form-select" aria-label="Default select example">
            {/* loopa igenom de authors som finns i databasen och skriv ut här sen */}
            <option value="1">author 1 </option>
            <option value="2">author 2</option>
            <option value="3">author 3</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select onChange={handleOnChange} value={formData.category} name="category" id="category" className="form-select" aria-label="Default select example">
            <option value="1">category 1</option>
            <option value="2">category 2</option>
            <option value="3">category 3</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image</label>
          <input name="image" value={formData.image} onChange={handleOnChange} className="form-control" id="image" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
