import { useState } from "react";
import "./Users.css"

function Users() {
  const [ShowModal, setShowModal] = useState(false);
  const[formdata,setformdata]=useState({
    firstName:"",
    lastName:"",
    dob:"",
    email:"",
    remark:"",
    address:""
  })
  const handleInputChange=(e)=>{
    const{name,value}=e.target;
    setformdata({...formdata,[name]:value});
  }
const handleAddUser=()=>{
    // logicf save data 
    setShowModal(false);

}

  return (
    <div className="users-container">
      <div className="top-bar">
        <input className="search-box" type="text" placeholder="Search ..." />
        <button className="add-use-btn" onClick={() => setShowModal(true)}>
          Add Client
        </button>
      </div>
      {/* table show */}
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
        {/* dynamic data here */}
        <tbody>
          <tr>
            <td>John</td>
            <td>Dow</td>
            <td>09/03/2003</td>
            <td>johndoe123@gmail.com</td>
            <td>test</td>
            <td>Lucknow</td>
          </tr>
        </tbody>
      </table>
      {/* open showmodel */}
      {ShowModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Client</h3>
            <form className="user-form" onSubmit={(e)=>{e.preventDefault();handleAddUser();}}>
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formdata.firstName}
                onChange={handleInputChange}
              />
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formdata.lastName}
                onChange={handleInputChange}
              />
              <label>DOB:</label>
              <input
                type="date"
                name="dob"
                value={formdata.dob}
                onChange={handleInputChange}
              />
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formdata.email}
                onChange={handleInputChange}
              />
              <label>Remark:</label>
              <input
                type="text"
                name="remark"
                value={formdata.remark}
                onChange={handleInputChange}
              />
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={formdata.address}
                onChange={handleInputChange}
              />
              <div className="modal-buttons">
                <button
                  type="button"
                  className="save-btn"
                  onClick={handleAddUser}
                >
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
