// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// const SensorLogs = () => {
//   const [logs, setLogs] = useState([]);
//   const [newLog, setNewLog] = useState({
//     SensorID: '',
//     Value: '',
//     WarningFlag: 'Normal',
//   });
//   const navigate = useNavigate(); // Initialize navigate function

//   // Mock fetching logs (replace with real API fetch when integrating)
//   useEffect(() => {
//     const mockLogs = [
//       { LogID: '1', SensorID: '101', Value: '45', WarningFlag: 'Normal' },
//       { LogID: '2', SensorID: '102', Value: '60', WarningFlag: 'Warning' },
//     ];
//     setLogs(mockLogs);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewLog((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddLog = (e) => {
//     e.preventDefault();
//     const logID = logs.length + 1; // Mock LogID
//     const newLogEntry = { LogID: logID.toString(), ...newLog };
//     setLogs((prev) => [...prev, newLogEntry]);
//     setNewLog({ SensorID: '', Value: '', WarningFlag: 'Normal' });
//   };

//   return (
//     <div className="max-w-4xl mx-auto py-8">
//       <h2 className="text-2xl font-bold mb-4">Sensor Logs</h2>

//       {/* Back to Dashboard Button */}
//       <button
//         onClick={() => navigate('/dashboard')}
//         className="bg-gray-600 text-white px-4 py-2 rounded mb-4"
//       >
//         ← Back to Dashboard
//       </button>

//       {/* Log Form */}
//       <form onSubmit={handleAddLog} className="mb-6">
//         <div className="grid grid-cols-3 gap-4 mb-4">
//           <input
//             type="text"
//             name="SensorID"
//             value={newLog.SensorID}
//             onChange={handleChange}
//             placeholder="Sensor ID"
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="number"
//             name="Value"
//             value={newLog.Value}
//             onChange={handleChange}
//             placeholder="Value"
//             className="border p-2 rounded"
//             required
//           />
//           <select
//             name="WarningFlag"
//             value={newLog.WarningFlag}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           >
//             <option value="Normal">Normal</option>
//             <option value="Warning">Warning</option>
//             <option value="Danger">Danger</option>
//           </select>
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Add Log
//         </button>
//       </form>

//       {/* Log Table */}
//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border px-4 py-2">Log ID</th>
//             <th className="border px-4 py-2">Sensor ID</th>
//             <th className="border px-4 py-2">Value</th>
//             <th className="border px-4 py-2">Warning Flag</th>
//           </tr>
//         </thead>
//         <tbody>
//           {logs.map((log) => (
//             <tr key={log.LogID}>
//               <td className="border px-4 py-2">{log.LogID}</td>
//               <td className="border px-4 py-2">{log.SensorID}</td>
//               <td className="border px-4 py-2">{log.Value}</td>
//               <td className="border px-4 py-2">{log.WarningFlag}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SensorLogs;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const SensorLogs = () => {
//   const [logs, setLogs] = useState([]);
//   const [newLog, setNewLog] = useState({
//     SensorID: '',
//     Value: '',
//     WarningFlag: 'Normal',
//   });
//   const navigate = useNavigate();

//   // Fetch logs from the backend API
//   useEffect(() => {
//     const fetchLogs = async () => {
//       try {
//         const response = await axios.get('https://backend-login-1-xc0i.onrender.com/sensordatalogs');
//         setLogs(response.data);
//       } catch (error) {
//         console.error('Error fetching sensor logs:', error);
//       }
//     };

//     fetchLogs();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewLog((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddLog = (e) => {
//     e.preventDefault();
//     const logID = logs.length + 1; // Mock LogID for the added log
//     const newLogEntry = { LogID: logID.toString(), ...newLog };
//     setLogs((prev) => [...prev, newLogEntry]);
//     setNewLog({ SensorID: '', Value: '', WarningFlag: 'Normal' });
//   };

//   return (
//     <div className="max-w-4xl mx-auto py-8">
//       <h2 className="text-2xl font-bold mb-4">Sensor Logs</h2>

//       {/* Back to Dashboard Button */}
//       <button
//         onClick={() => navigate('/dashboard')}
//         className="bg-gray-600 text-white px-4 py-2 rounded mb-4"
//       >
//         ← Back to Dashboard
//       </button>

//       {/* Log Form */}
//       <form onSubmit={handleAddLog} className="mb-6">
//         <div className="grid grid-cols-3 gap-4 mb-4">
//           <input
//             type="text"
//             name="SensorID"
//             value={newLog.SensorID}
//             onChange={handleChange}
//             placeholder="Sensor ID"
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="number"
//             name="Value"
//             value={newLog.Value}
//             onChange={handleChange}
//             placeholder="Value"
//             className="border p-2 rounded"
//             required
//           />
//           <select
//             name="WarningFlag"
//             value={newLog.WarningFlag}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           >
//             <option value="Normal">Normal</option>
//             <option value="Warning">Warning</option>
//             <option value="Danger">Danger</option>
//           </select>
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Add Log
//         </button>
//       </form>

//       {/* Log Table */}
//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border px-4 py-2">Log ID</th>
//             <th className="border px-4 py-2">Sensor ID</th>
//             <th className="border px-4 py-2">Value</th>
//             <th className="border px-4 py-2">Warning Flag</th>
//           </tr>
//         </thead>
//         <tbody>
//           {logs.map((log) => (
//             <tr key={log.LogID}>
//               <td className="border px-4 py-2">{log.LogID}</td>
//               <td className="border px-4 py-2">{log.SensorID}</td>
//               <td className="border px-4 py-2">{log.Value}</td>
//               <td className="border px-4 py-2">{log.WarningFlag}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SensorLogs;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const SensorLogs = () => {
//   const [logs, setLogs] = useState([]);
//   const navigate = useNavigate();

//   // Fetch logs from the backend API
//   useEffect(() => {
//     const fetchLogs = async () => {
//       try {
//         const userID = localStorage.getItem('UserID'); // Retrieve UserID from localStorage
//         if (!userID) {
//           console.error('No UserID found in localStorage');
//           return;
//         }

//         // Make the API request with the UserID as a query parameter
//         const response = await axios.get(
//           `https://backend-login-1-xc0i.onrender.com/sensordatalogs?userID=${userID}`
//         );
//         setLogs(response.data);
//       } catch (error) {
//         console.error('Error fetching sensor logs:', error);
//       }
//     };

//     fetchLogs();
//   }, []);

//   return (
//     <div className="max-w-4xl mx-auto py-8">
//       <h2 className="text-2xl font-bold mb-4">Sensor Logs</h2>

//       {/* Back to Dashboard Button */}
//       <button
//         onClick={() => navigate('/dashboard')}
//         className="bg-gray-600 text-white px-4 py-2 rounded mb-4"
//       >
//         ← Back to Dashboard
//       </button>

//       {/* Log Table */}
//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border px-4 py-2">Timestamp</th>
//             <th className="border px-4 py-2">Value</th>
//             <th className="border px-4 py-2">Warning Flag</th>
//           </tr>
//         </thead>
//         <tbody>
//           {logs.map((log) => (
//             <tr key={log.TimeStamp}>
//               <td className="border px-4 py-2">{log.TimeStamp}</td>
//               <td className="border px-4 py-2">{log.Value}</td>
//               <td className="border px-4 py-2">{log.WarningFlag}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SensorLogs;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SensorTable = () => {
  const [sensors, setSensors] = useState([]);
  const navigate = useNavigate();

  // Fetch sensor data from the backend
  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await axios.get(
          'https://backend-login-1-xc0i.onrender.com/sensors'
        );
        setSensors(response.data);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    fetchSensorData();
  }, []);

  return (
    <div className="max-w-full mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Sensor Information</h1>

      {/* Back to Dashboard Button */}
      <button
        onClick={() => navigate('/dashboard')}
        className="bg-blue-600 text-white px-6 py-2 rounded mb-6 hover:bg-blue-700"
      >
        ← Back to Dashboard
      </button>

      {/* Sensor Details Table */}
      <div className="overflow-x-auto shadow-lg">
        <table className="w-full border-collapse border border-gray-300 text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Sensor ID</th>
              <th className="border border-gray-300 px-4 py-2">Sensor Type</th>
              <th className="border border-gray-300 px-4 py-2">Range Min</th>
              <th className="border border-gray-300 px-4 py-2">Range Max</th>
              <th className="border border-gray-300 px-4 py-2">Absolute Min</th>
              <th className="border border-gray-300 px-4 py-2">Absolute Max</th>
              <th className="border border-gray-300 px-4 py-2">Current Value</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Patient ID</th>
              <th className="border border-gray-300 px-4 py-2">Location</th>
              <th className="border border-gray-300 px-4 py-2">Data Collection Frequency</th>
              <th className="border border-gray-300 px-4 py-2">Sensor Category</th>
              <th className="border border-gray-300 px-4 py-2">Created At</th>
              <th className="border border-gray-300 px-4 py-2">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {sensors.map((sensor) => (
              <tr key={sensor.SensorID} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{sensor.SensorID}</td>
                <td className="border border-gray-300 px-4 py-2">{sensor.SensorType}</td>
                <td className="border border-gray-300 px-4 py-2">{sensor.RangeMin}</td>
                <td className="border border-gray-300 px-4 py-2">{sensor.RangeMax}</td>
                <td className="border border-gray-300 px-4 py-2">{sensor.AbsoluteMin}</td>
                <td className="border border-gray-300 px-4 py-2">{sensor.AbsoluteMax}</td>
                <td className="border border-gray-300 px-4 py-2">{sensor.CurrentValue}</td>
                <td className={`border border-gray-300 px-4 py-2 ${sensor.Status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                  {sensor.Status}
                </td>
                <td className="border border-gray-300 px-4 py-2">{sensor.PatientID}</td>
                <td className="border border-gray-300 px-4 py-2">{sensor.Location}</td>
                <td className="border border-gray-300 px-4 py-2">{sensor.DataCollectionFrequency}</td>
                <td className="border border-gray-300 px-4 py-2">{sensor.SensorCategory}</td>
                <td className="border border-gray-300 px-4 py-2">{sensor.CreatedAt}</td>
                <td className="border border-gray-300 px-4 py-2">{sensor.UpdatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SensorTable;