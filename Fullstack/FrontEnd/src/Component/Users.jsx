import React, { useState } from "react";

function Users() {
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

  // Handle input change and update corresponding state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add user handler (this is where you can save the data or reset the form)
  const handleAddUser = () => {
    console.log("Form Data:", formData); // This can be replaced with your save logic
    setShowModal(false); // Close modal after saving
    // Reset form data
    setFormData({
      firstName: "",
      lastName: "",
      dob: "",
      email: "",
      address: "",
      remark: "",
    });
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
          {/* Sample row (You can replace this with dynamic data) */}
          <tr>
            <td>John</td>
            <td>Doe</td>
            <td>06/06/2004</td>
            <td>johndoe123@mail.com</td>
            <td>test</td>
            <td>Lucknow</td>
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

export default Users;