/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';

export default function ProductUpdateForm({ product }) {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    setFormData({
      title: product.title,
      price: product.price,
      description:
            product.description,
      author: product.author,
      category: product.category,
      image: product.img,
    });
  }, []);

  const handleOnChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div>
      {formData
      && (
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
          <input name="author" value={formData.author} onChange={handleOnChange} type="text" className="form-control" id="author" />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select onChange={handleOnChange} value={formData.category} name="category" id="category" className="form-select" aria-label="Default select example">
            <option value="Deckare">Deckare</option>
            <option value="Skönlitteratur">Skönlitteratur</option>
            <option value="Data &amp; IT">Data &amp; IT</option>
            <option value="Samhälle och politik">Samhälle och politik</option>
            <option value="Djur &amp; natur">Djur &amp; natur</option>
            <option value="Mat &amp; dryck">Mat &amp; dryck</option>
            <option value="Ekonomi &amp; ledarskap">Ekonomi &amp; ledarskap</option>
            <option value="Biografier">Biografier</option>
            <option value="Resor">Resor</option>
            <option value="Kultur">Kultur</option>
            <option value="Medicin">Medicin</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image</label>
          <input name="image" value={formData.image} onChange={handleOnChange} className="form-control" id="image" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      )}
    </div>
  );
}
