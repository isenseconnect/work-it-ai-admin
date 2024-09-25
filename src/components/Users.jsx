import React, { useEffect, useState } from "react";
import { apiCall } from "../helper/apiHelper";

const Users = () => {
  const [users, setUsers] = useState([]);

const handleBlockUser = () => {
  console.log("handleBlockuser ", )
}
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiCall("allusers");
        const {data} = response; 
        console.log("data ", data);
        setUsers(data);
      } catch (error) {
        console.log("error ", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <h2>Users</h2>
      <div>
      {users.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Location</th>
              <th>Profile Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.location}</td>
                <td>
                  {/* Display profile image if available */}
                  {user.profileImage && <img style={{width: 40}} src={user.profileImage} alt="Profile" />}
                </td>
                <td>
                  <button onClick={() => handleBlockUser(user.id)}>
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {users.length === 0 && <p>No users found.</p>}
    </div>

    </div>
  );
};

export default Users;
