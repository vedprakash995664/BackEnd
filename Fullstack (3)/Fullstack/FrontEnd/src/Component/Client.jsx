import React, { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import Swal from "sweetalert2"; // Import SweetAlert2
import './Users.css';

function Client() {
  // State to control modal visibility and form data
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    number: "",
    address: "",
    remark: "", // Added remark field to formData
  });

  // Handle input change and update corresponding state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add user handler (send data to backend)
  const handleAddUser = async () => {
    try {
      // Send POST request to the backend API
      const response = await axios.post('http://localhost:3000/api/addclient', formData);

      // Log the response from the backend
      console.log(response.data); 

      // Show success alert using SweetAlert
      Swal.fire({
        title: 'Success!',
        text: 'User added successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      // Close modal and reset the form
      setShowModal(false);
      setFormData({
        firstName: "",
        lastName: "",
        dob: "",
        email: "",
        number: "",
        address: "",
        remark: "",
      });
    } catch (error) {
      console.error("Error adding user:", error);
      // Show error alert using SweetAlert
      Swal.fire({
        title: 'Error!',
        text: 'There was an error adding the user. Please try again.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };

  return (
    <div className="users-container">
      <div className="top-bar">
        <input className="search-box" type="text" placeholder="Search" />
        <button className="add-user-btn" onClick={() => setShowModal(true)}>
          Add User
        </button>
      </div>

      {/* Table to show user data */}
      <table className="user-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Number</th>
            <th>Remark</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample row (You can replace this with dynamic data) */}
          <tr>
            <td>Bill</td>
            <td>Gates</td>
            <td>06/06/2004</td>
            <td>billi123@mail.com</td>
            <td>0000111100</td>
            <td>Very Good Web Designer</td>
            <td>America</td>
          </tr>
        </tbody>
      </table>

      {/* Modal for adding a new user */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New User</h3>
            <form
              className="user-form"
              onSubmit={(e) => {
                e.preventDefault(); // Prevent form submission
                handleAddUser(); // Call handleAddUser on form submit
              }}
            >
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />

              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />

              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
              />

              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />

              <label>Phone Number</label>
              <input
                type="number"
                name="number"
                value={formData.number}
                onChange={handleInputChange}
              />

              <label>Remark</label>
              <input
                type="text"
                name="remark"
                value={formData.remark}
                onChange={handleInputChange}
              />

              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />

              <div className="modal-buttons">
                <button type="submit" className="save-btn">
                  Save
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Client;