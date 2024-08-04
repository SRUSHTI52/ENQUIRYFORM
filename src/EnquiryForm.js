// src/EnquiryForm.js
import React, { useState } from 'react';
import axios from 'axios';

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    property: '',
    checkin: '',
    checkout: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData)

    axios.post('http://localhost:5000/enquiry', formData)
      .then(response => {
        alert('Enquiry submitted successfully!');
        setFormData({
          name: '',
          phone: '',
          email: '',
          property: '',
          checkin: '',
          checkout: ''
        });
      })
      .catch(error => {
        console.log('Error:', error);
        alert('Error submitting enquiry');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Property:</label>
        <input
          type="text"
          name="property"
          value={formData.property}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Check-in Date:</label>
        <input
          type="date"
          name="checkin"
          value={formData.checkin}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Check-out Date:</label>
        <input
          type="date"
          name="checkout"
          value={formData.checkout}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EnquiryForm;
