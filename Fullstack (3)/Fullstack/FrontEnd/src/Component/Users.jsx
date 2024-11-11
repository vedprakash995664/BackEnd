import React, { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import Swal from "sweetalert2"; // Import SweetAlert2
import './Users.css';

function User() {
  // State to control modal visibility and form data
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    address: "",
    remark: "", // Added remark field to formData
  });

  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [users, setUsers] = useState([]); // State to manage the list of users

  // Handle input change and update corresponding state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate the form to ensure all required fields are filled
  const validateForm = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.dob &&
      formData.email &&
      formData.address
    );
  };

  // Add user handler (send data to backend)
  const handleAddUser = async () => {
    if (!validateForm()) {
      // Show error alert if validation fails
      Swal.fire({
        title: "Error!",
        text: "Please fill in all the required fields.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    setIsLoading(true); // Set loading state to true

    try {
      // Send POST request to the backend API
      const response = await axios.post('http://localhost:3000/api/adduser', formData);

      // Log the response from the backend
      console.log(response.data);

      // Show success alert using SweetAlert
      Swal.fire({
        title: 'Success!',
        text: 'User added successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      // Add the new user to the users list (dynamic data update)
      setUsers([...users, response.data]);

      // Close modal and reset the form
      setShowModal(false);
      setFormData({
        firstName: "",
        lastName: "",
        dob: "",
        email: "",
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
    } finally {
      setIsLoading(false); // Reset loading state after request
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
            <th>Remark</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {/* Dynamically render users from the state */}
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.dob}</td>
              <td>{user.email}</td>
              <td>{user.remark}</td>
              <td>{user.address}</td>
            </tr>
          ))}
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
                <button type="submit" className="save-btn" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save"}
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

export default User; 