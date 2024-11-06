// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import AddSensorModal from './AddSensorModal';

// const SensorManagement = () => {
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [editingSensor, setEditingSensor] = useState(null);
//   const [sensors, setSensors] = useState([]);
//   const navigate = useNavigate();

//   // Get userID from localStorage (set during login)
//   const userID = localStorage.getItem('userID');

//   useEffect(() => {
//     const fetchSensorDetails = async () => {
//       try {
//         // Fetch only sensors associated with the logged-in user's userID
//         const response = await axios.get(`https://backend-login-1-xc0i.onrender.com/getsensordetails/${userID}`);
//         console.log("Fetched sensor details:", response.data);
//         setSensors(response.data);
//       } catch (error) {
//         console.error("Error fetching sensor details:", error.response?.data || error.message);
//       }
//     };

//     if (userID) {
//       fetchSensorDetails();
//     } else {
//       console.error("User ID not found. Please log in.");
//       navigate('/login');
//     }
//   }, [userID, navigate]);

//   const handleAddOrUpdateSensor = (sensorDetails) => {
//     if (editingSensor) {
//       setSensors((prevSensors) =>
//         prevSensors.map((sensor) =>
//           sensor.id === editingSensor.id ? { ...sensorDetails, id: sensor.id } : sensor
//         )
//       );
//       setEditingSensor(null);
//     } else {
//       const newSensor = { ...sensorDetails, id: Date.now() };
//       setSensors((prevSensors) => [...prevSensors, newSensor]);
//     }
//     setModalOpen(false);
//   };

//   const handleEditSensor = (sensor) => {
//     setEditingSensor(sensor);
//     setModalOpen(true);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <h1 className="text-3xl font-semibold mb-8">Sensor Management</h1>

//       <button
//         onClick={() => navigate('/dashboard')}
//         className="bg-gray-600 text-white px-4 py-2 rounded mb-4"
//       >
//         ← Back to Dashboard
//       </button>

//       <button
//         onClick={() => setModalOpen(true)}
//         className="bg-blue-600 text-white px-4 py-2 rounded mb-4 ml-4"
//       >
//         + Add Sensor
//       </button>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {sensors.length > 0 ? (
//           sensors.map((sensor) => (
//             <div
//               key={sensor.SensorID || sensor.id}
//               className="bg-white p-6 rounded shadow-lg hover:shadow-xl"
//               onClick={() => handleEditSensor(sensor)}
//             >
//               <h3 className="font-semibold text-xl mb-4">{sensor.SensorType} (ID: {sensor.SensorID})</h3>
//               <div className="text-sm text-gray-700">
//                 <p><strong>Range:</strong> {sensor.RangeMin} - {sensor.RangeMax}</p>
//                 <p><strong>Absolute Range:</strong> {sensor.AbsoluteMin} - {sensor.AbsoluteMax}</p>
//                 <p><strong>Current Value:</strong> {sensor.CurrentValue}</p>
//                 <p><strong>Status:</strong> {sensor.Status}</p>
//                 <p><strong>Patient ID:</strong> {sensor.PatientID}</p>
//                 <p><strong>Location:</strong> {sensor.Location}</p>
//                 <p><strong>Data Collection Frequency:</strong> {sensor.DataCollectionFrequency} minutes</p>
//                 <p><strong>Sensor Category:</strong> {sensor.SensorCategory}</p>
//                 <p><strong>Created At:</strong> {new Date(sensor.CreatedAt).toLocaleString()}</p>
//                 <p><strong>Updated At:</strong> {new Date(sensor.UpdatedAt).toLocaleString()}</p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No sensor details available for this patient.</p>
//         )}
//       </div>

//       {isModalOpen && (
//         <AddSensorModal
//           onClose={() => setModalOpen(false)}
//           onSubmit={handleAddOrUpdateSensor}
//           initialData={editingSensor}
//         />
//       )}
//     </div>
//   );
// };

// export default SensorManagement;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import AddSensorModal from './AddSensorModal';

// const SensorManagement = () => {
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [editingSensor, setEditingSensor] = useState(null);
//   const [sensors, setSensors] = useState([]);
//   const navigate = useNavigate();

//   // Get userID from localStorage (set during login)
//   const userID = localStorage.getItem('userID');

//   useEffect(() => {
//     const fetchSensorDetails = async () => {
//       try {
//         // Fetch only sensors associated with the logged-in user's userID
//         const response = await axios.get(`https://backend-login-1-xc0i.onrender.com/getsensordetails/${userID}`);
//         console.log("Fetched sensor details:", response.data);
//         setSensors(response.data);
//       } catch (error) {
//         console.error("Error fetching sensor details:", error.response?.data || error.message);
//       }
//     };

//     if (userID) {
//       fetchSensorDetails();
//     } else {
//       console.error("User ID not found. Please log in.");
//       navigate('/login');
//     }
//   }, [userID, navigate]);

//   const handleAddOrUpdateSensor = (sensorDetails) => {
//     if (editingSensor) {
//       setSensors((prevSensors) =>
//         prevSensors.map((sensor) =>
//           sensor.id === editingSensor.id ? { ...sensorDetails, id: sensor.id } : sensor
//         )
//       );
//       setEditingSensor(null);
//     } else {
//       const newSensor = { ...sensorDetails, id: Date.now() };
//       setSensors((prevSensors) => [...prevSensors, newSensor]);
//     }
//     setModalOpen(false);
//   };

//   const handleEditSensor = (sensor) => {
//     setEditingSensor(sensor);
//     setModalOpen(true);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <h1 className="text-3xl font-semibold mb-8">Sensor Management</h1>

//       <button
//         onClick={() => navigate('/dashboard')}
//         className="bg-gray-600 text-white px-4 py-2 rounded mb-4"
//       >
//         ← Back to Dashboard
//       </button>

//       <button
//         onClick={() => setModalOpen(true)}
//         className="bg-blue-600 text-white px-4 py-2 rounded mb-4 ml-4"
//       >
//         + Add Sensor
//       </button>

//       {/* Set grid to align items to the left */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-start">
//         {sensors.length > 0 ? (
//           sensors.map((sensor) => (
//             <div
//               key={sensor.SensorID || sensor.id}
//               className="bg-white p-6 rounded shadow-lg hover:shadow-xl"
//               onClick={() => handleEditSensor(sensor)}
//             >
//               <h3 className="font-semibold text-xl mb-4">{sensor.SensorType} (ID: {sensor.SensorID})</h3>
//               <div className="text-sm text-gray-700">
//                 <p><strong>Range:</strong> {sensor.RangeMin} - {sensor.RangeMax}</p>
//                 <p><strong>Absolute Range:</strong> {sensor.AbsoluteMin} - {sensor.AbsoluteMax}</p>
//                 <p><strong>Current Value:</strong> {sensor.CurrentValue}</p>
//                 <p><strong>Status:</strong> {sensor.Status}</p>
//                 <p><strong>Patient ID:</strong> {sensor.PatientID}</p>
//                 <p><strong>Location:</strong> {sensor.Location}</p>
//                 <p><strong>Data Collection Frequency:</strong> {sensor.DataCollectionFrequency} minutes</p>
//                 <p><strong>Sensor Category:</strong> {sensor.SensorCategory}</p>
//                 <p><strong>Created At:</strong> {new Date(sensor.CreatedAt).toLocaleString()}</p>
//                 <p><strong>Updated At:</strong> {new Date(sensor.UpdatedAt).toLocaleString()}</p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No sensor details available for this patient.</p>
//         )}
//       </div>

//       {isModalOpen && (
//         <AddSensorModal
//           onClose={() => setModalOpen(false)}
//           onSubmit={handleAddOrUpdateSensor}
//           initialData={editingSensor}
//         />
//       )}
//     </div>
//   );
// };

// export default SensorManagement;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddSensorModal from './AddSensorModal';

const SensorManagement = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingSensor, setEditingSensor] = useState(null);
  const [sensors, setSensors] = useState([]);
  const navigate = useNavigate();

  // Get userID from localStorage (set during login)
  const userID = localStorage.getItem('userID');

  // Fetch sensors for the logged-in user
  useEffect(() => {
    const fetchSensorDetails = async () => {
      try {
        const response = await axios.get(`https://backend-login-1-xc0i.onrender.com/getsensordetails/${userID}`);
        console.log("Fetched sensor details:", response.data);
        setSensors(response.data);
      } catch (error) {
        console.error("Error fetching sensor details:", error.response?.data || error.message);
      }
    };

    if (userID) {
      fetchSensorDetails();
    } else {
      console.error("User ID not found. Please log in.");
      navigate('/login');
    }
  }, [userID, navigate]);

  // Function to log actions (Read or Update) for a specific sensor
  const logSensorAction = async (sensorID, action) => {
    try {
      await axios.post('https://backend-login-1-xc0i.onrender.com/sensoraccesslogs', {
        SensorID: sensorID,
        UserID: userID,
        Action: action
      });
      console.log(`Logged action: ${action} for SensorID: ${sensorID}`);
    } catch (error) {
      console.error("Error logging sensor action:", error.response?.data || error.message);
    }
  };

  // Handle click to open sensor details (Read action)
  const handleViewSensor = (sensor) => {
    logSensorAction(sensor.SensorID, "Read");  // Log the Read action
    setEditingSensor(sensor);
    setModalOpen(true);
  };

  // Handle sensor update (Update action)
  const handleAddOrUpdateSensor = (sensorDetails) => {
    if (editingSensor) {
      setSensors((prevSensors) =>
        prevSensors.map((sensor) =>
          sensor.SensorID === editingSensor.SensorID ? { ...sensorDetails, SensorID: sensor.SensorID } : sensor
        )
      );
      logSensorAction(editingSensor.SensorID, "Update");  // Log the Update action
      setEditingSensor(null);
    } else {
      const newSensor = { ...sensorDetails, SensorID: Date.now().toString() };
      setSensors((prevSensors) => [...prevSensors, newSensor]);
    }
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-semibold mb-8">Sensor Management</h1>

      <button
        onClick={() => navigate('/dashboard')}
        className="bg-gray-600 text-white px-4 py-2 rounded mb-4"
      >
        ← Back to Dashboard
      </button>

      <button
        onClick={() => setModalOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 ml-4"
      >
        + Add Sensor
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sensors.length > 0 ? (
          sensors.map((sensor) => (
            <div
              key={sensor.SensorID}
              className="bg-white p-6 rounded shadow-lg hover:shadow-xl cursor-pointer"
              onClick={() => handleViewSensor(sensor)}  // Handle Read action on click
            >
              <h3 className="font-semibold text-xl mb-4">{sensor.SensorType} (ID: {sensor.SensorID})</h3>
              <div className="text-sm text-gray-700">
                <p><strong>Range:</strong> {sensor.RangeMin} - {sensor.RangeMax}</p>
                <p><strong>Absolute Range:</strong> {sensor.AbsoluteMin} - {sensor.AbsoluteMax}</p>
                <p><strong>Current Value:</strong> {sensor.CurrentValue}</p>
                <p><strong>Status:</strong> {sensor.Status}</p>
                <p><strong>Patient ID:</strong> {sensor.PatientID}</p>
                <p><strong>Location:</strong> {sensor.Location}</p>
                <p><strong>Data Collection Frequency:</strong> {sensor.DataCollectionFrequency} minutes</p>
                <p><strong>Sensor Category:</strong> {sensor.SensorCategory}</p>
                <p><strong>Created At:</strong> {new Date(sensor.CreatedAt).toLocaleString()}</p>
                <p><strong>Updated At:</strong> {new Date(sensor.UpdatedAt).toLocaleString()}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No sensor details available for this patient.</p>
        )}
      </div>

      {isModalOpen && (
        <AddSensorModal
          onClose={() => setModalOpen(false)}
          onSubmit={handleAddOrUpdateSensor}
          initialData={editingSensor}
        />
      )}
    </div>
  );
};

export default SensorManagement;