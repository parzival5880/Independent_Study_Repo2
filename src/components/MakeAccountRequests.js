import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MakeAccountRequests = () => {
  const [roles, setRoles] = useState([]); // List of roles from the Roles table
  const [requestedRole, setRequestedRole] = useState(''); // Selected role
  const [userDetails, setUserDetails] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    Number: '',
  }); // User-entered details
  const [requests, setRequests] = useState([]); // List of account requests
  const BASE_URL = 'https://backend-login-1-xc0i.onrender.com'; // Backend base URL
  const navigate = useNavigate(); // Hook for navigation

  // Fetch roles from the backend on component mount
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch(`${BASE_URL}/roles`);
        if (response.ok) {
          const data = await response.json();
          setRoles(data);
        } else {
          console.error('Error fetching roles:', await response.text());
        }
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    const fetchRequests = async () => {
      const userID = localStorage.getItem('UserID');
      if (!userID) return;

      try {
        const response = await fetch(`${BASE_URL}/myaccountrequests?RequesterID=${userID}`);
        if (response.ok) {
          const data = await response.json();
          setRequests(data);
        } else {
          console.error('Error fetching requests:', await response.text());
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRoles();
    fetchRequests();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!requestedRole || !userDetails.FirstName || !userDetails.LastName || !userDetails.Email || !userDetails.Number) {
      alert('Please fill out all fields');
      return;
    }

    try {
      // Validate user details and fetch UserID
      const userResponse = await fetch(`${BASE_URL}/getuserid`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails),
      });

      if (!userResponse.ok) {
        alert('Invalid user details. Please check and try again.');
        return;
      }

      const { UserID } = await userResponse.json();

      // Submit the account request
      const requestResponse = await fetch(`${BASE_URL}/postaccountrequests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          RequestedRole: requestedRole,
          RequestedID: UserID,
          UserID: localStorage.getItem('UserID'), // Requester ID from local storage
        }),
      });

      if (requestResponse.ok) {
        const newRequest = await requestResponse.json();
        setRequests((prevRequests) => [...prevRequests, newRequest]); // Add new request to the list
        alert('Request submitted successfully');
        setUserDetails({
          FirstName: '',
          LastName: '',
          Email: '',
          Number: '',
        });
        setRequestedRole('');
      } else {
        const errorText = await requestResponse.text();
        alert(`Error submitting request: ${errorText}`);
      }
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Make Account Requests</h2>

      {/* Back to Dashboard */}
      <button
        onClick={() => navigate('/dashboard')}
        className="bg-gray-600 text-white px-4 py-2 rounded mb-4"
      >
        ← Back to Dashboard
      </button>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input
            type="text"
            value={userDetails.FirstName}
            onChange={(e) => setUserDetails({ ...userDetails, FirstName: e.target.value })}
            className="border px-4 py-2 w-full"
            placeholder="Enter First Name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <input
            type="text"
            value={userDetails.LastName}
            onChange={(e) => setUserDetails({ ...userDetails, LastName: e.target.value })}
            className="border px-4 py-2 w-full"
            placeholder="Enter Last Name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={userDetails.Email}
            onChange={(e) => setUserDetails({ ...userDetails, Email: e.target.value })}
            className="border px-4 py-2 w-full"
            placeholder="Enter Email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="text"
            value={userDetails.Number}
            onChange={(e) => setUserDetails({ ...userDetails, Number: e.target.value })}
            className="border px-4 py-2 w-full"
            placeholder="Enter Phone Number"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Requested Role</label>
          <select
            value={requestedRole}
            onChange={(e) => setRequestedRole(e.target.value)}
            className="border px-4 py-2 w-full"
          >
            <option value="">Select a Role</option>
            {roles.map((role) => (
              <option key={role.RoleID} value={role.RoleID}>
                {role.RoleName}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit Request
        </button>
      </form>

      {/* Display Requests */}
      <h3 className="text-xl font-bold mb-4">Your Account Requests</h3>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Request ID</th>
            <th className="border px-4 py-2">Requested Role</th>
            <th className="border px-4 py-2">First Name</th>
            <th className="border px-4 py-2">Last Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((req) => (
              <tr key={req.RequestID}>
                <td className="border px-4 py-2">{req.RequestID}</td>
                <td className="border px-4 py-2">{req.RequestedRole}</td>
                <td className="border px-4 py-2">{req.RFName}</td>
                <td className="border px-4 py-2">{req.RLName}</td>
                <td className="border px-4 py-2">{req.REmail}</td>
                <td className="border px-4 py-2">{req.RPhoneNumber}</td>
                <td className="border px-4 py-2">{req.Status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4">
                No account requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MakeAccountRequests;