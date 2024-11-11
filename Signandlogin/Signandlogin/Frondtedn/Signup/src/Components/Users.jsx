import { useEffect, useState } from "react";
import "./Users.css"
import axios from "axios";
import Swal from 'sweetalert2';

function Users() {
  const [users,setusers]=useState([]);
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
  useEffect(()=>{
    fetchusers();
  },[]);
// fecthing data 
const fetchusers=async()=>{
  try{
    const response=await axios.get("http://localhost:3000/api/user");
    setusers(response.data);
  }
  catch(error){
    console.error("Error fetching data",error);
  }
}


// Delete part 
const handleDelete=async (userId)=>{
  console.log(userId);
  // show confirmation alert 
  const result=await Swal.fire({
    title:"Are You Sure?",
    text:"Once Deleted , You will not be able to recover this user!",
    icon:"warning",
    showCancelButton:true,
    cancelButtonColor:"#d33",
    confirmButtonText:"Yes , Delete"
  });
  if(result.isConfirmed){
    try{
      const response=await fetch(`http://localhost:3000/api/user/${userId}`,{method:'DELETE'});
      if(response.ok){
        Swal.fire("Deleted!","User has been deleted","success");
        fetchusers();
      }
      else{
        Swal.fire("Failed","Failed to delete data","error");
      }
    }
    catch(error){
      console.error("error ",error);
Swal.fire("Error","There was an error","error");
    }

  }
  else{
    Swal.fire("Cancelled","Your data is safe","info");
  }
}


const handleAddUser=async()=>{
    // logic save data 
    const apiEndpoint = 'http://localhost:3000/api/user';
  
    try {
      const response = await axios.post(apiEndpoint, formdata);
      console.log('Save Successful', response.data);
      Swal.fire({
        title: 'Save Successful!',
        text: 'You have successfully save.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        setShowModal(false);
        fetchusers();


      });
    } catch (error) {
      if (error.response) {
        console.error('Signup failed', error.response.data);
        setMessage('Signup failed');
      } else if (error.request) {
        console.error('No response from server', error.request);
        setMessage('No response from server');
      } else {
        console.error('Error during signup', error.message);
        Swal.fire({
            title: 'Error!',
            text: 'Signup failed. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
      }
    
   
}
}

  return (
    <div className="users-container">
      <div className="top-bar">
        <input className="search-box" type="text" placeholder="Search ..." />
        <button className="add-use-btn" onClick={() => setShowModal(true)}>
          Add User
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
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        {/* dynamic data here */}
        <tbody>
    {users.map((user, index) => (
        <tr key={index}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.dob}</td>
            <td>{user.email}</td>
            <td>{user.remark}</td>
            <td>{user.address}</td>
           <td><button>Edit</button></td>
           <td><button onClick={()=>handleDelete(user._id)}>Delete</button></td>
        </tr>
    ))}
</tbody>

      </table>
      {/* open showmodel */}
      {ShowModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New User</h3>
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



  
