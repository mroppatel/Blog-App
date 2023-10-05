import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function AllUsers() {

    const [userss, setUserss] = useState([]);
    useEffect( () => {
        getAllUsers();
    },[]);

    const getUsers = async () => {
        try {
            return await axios.get(`/api/v1/user/all-users`);
        } catch (error) {
            console.log('Error while calling getUsers API', error);
        }
    
    }
    const getAllUsers = async () => {
        const{ data } =  await getUsers();
        console.log(data.users);
        setUserss(data?.users);
    }

    const deleteUser = async (id) => {
      try {
        if (window.confirm("sure you want to delete this user ?")) {
          const { data } = await axios.delete(`/api/v1/user/delete-user/${id}`);
          if (data?.success) {
            toast.success("User Deleted");
            window.location.reload();
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <div className="all-user">
    <center>
    <h1 style={{marginTop:"50px", marginBottom:"20px" }}> All User Details</h1>
    <table border="1">
      
     <thead height="50px">
      <tr>
        <th width="70px">S. No</th>
        <th width="200px">User Name</th>
        <th width="300px">Email</th>
        <th width="150px">Operation</th>
      </tr>
      </thead>
      <tbody>
      {
        userss.map((item, index) => (
          <tr key={item._id}>
            <td height="50px">{index + 1}</td>
            <td>{item.username}</td>
            <td>{item.email}</td>
            {/* <li>{item.blogs}</li> */}
            <td>
              <button
                onClick={() => {
                  deleteUser(item._id);
                }}
              >
                Delete
              </button>
              <Link to={"/update/" + item._id}> Update</Link>
            </td>
          </tr>
        ))
      }
    </tbody>
    </table>
    </center>
    </div>
  )
}

export default AllUsers