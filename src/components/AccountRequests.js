import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AccountRequests = () => {
  const [requests, setRequests] = useState([
    {
      RequestID: 'REQ001',
      RequesterID: 'User001',
      RequestedRole: 'Admin',
      Status: 'Pending',
    },
    {
      RequestID: 'REQ002',
      RequesterID: 'User002',
      RequestedRole: 'User',
      Status: 'Approved',
    },
  ]);

  const [newRequest, setNewRequest] = useState({
    RequesterID: '',
    RequestedRole: '',
    Status: 'Pending',
  });

  const navigate = useNavigate(); // Initialize navigate function

  const handleAddRequest = () => {
    const newRequestID = `REQ${String(requests.length + 1).padStart(3, '0')}`;
    const newEntry = { ...newRequest, RequestID: newRequestID };
    setRequests([...requests, newEntry]);
    setNewRequest({ RequesterID: '', RequestedRole: '', Status: 'Pending' });
  };

  const handleUpdateStatus = (requestID, newStatus) => {
    const updatedRequests = requests.map((req) =>
      req.RequestID === requestID ? { ...req, Status: newStatus } : req
    );
    setRequests(updatedRequests);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Account Requests</h2>

      {/* Back to Dashboard Button */}
      <button
        onClick={() => navigate('/dashboard')}
        className="bg-gray-600 text-white px-4 py-2 rounded mb-4"
      >
        ← Back to Dashboard
      </button>

      {/* New Account Request Form */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Requester ID"
          value={newRequest.RequesterID}
          onChange={(e) => setNewRequest({ ...newRequest, RequesterID: e.target.value })}
          className="border p-2 rounded mb-2 mr-2"
        />
        <input
          type="text"
          placeholder="Requested Role"
          value={newRequest.RequestedRole}
          onChange={(e) => setNewRequest({ ...newRequest, RequestedRole: e.target.value })}
          className="border p-2 rounded mb-2 mr-2"
        />
        <button onClick={handleAddRequest} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Request
        </button>
      </div>

      {/* Account Requests Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Request ID</th>
            <th className="border px-4 py-2">Requester ID</th>
            <th className="border px-4 py-2">Requested Role</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.RequestID}>
              <td className="border px-4 py-2">{req.RequestID}</td>
              <td className="border px-4 py-2">{req.RequesterID}</td>
              <td className="border px-4 py-2">{req.RequestedRole}</td>
              <td className="border px-4 py-2">{req.Status}</td>
              <td className="border px-4 py-2">
                {req.Status !== 'Approved' && (
                  <button
                    onClick={() => handleUpdateStatus(req.RequestID, 'Approved')}
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Approve
                  </button>
                )}
                {req.Status !== 'Rejected' && (
                  <button
                    onClick={() => handleUpdateStatus(req.RequestID, 'Rejected')}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Reject
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountRequests;
