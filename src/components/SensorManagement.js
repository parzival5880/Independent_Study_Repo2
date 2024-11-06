// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import AddSensorModal from './AddSensorModal';

// const SensorManagement = () => {
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [editingSensor, setEditingSensor] = useState(null);
//   const [sensors, setSensors] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSensorDetails = async () => {
//       const patientID = localStorage.getItem('patientID'); // Retrieve PatientID from localStorage

//       try {
//         const response = await axios.get('https://backend-login-1-xc0i.onrender.com/getsensordetails', {
//           params: { PatientID: patientID }, // Pass PatientID as a query parameter
//         });
//         console.log("Fetched sensor details:", response.data);
//         setSensors(response.data);
//       } catch (error) {
//         console.error("Error fetching sensor details:", error.response?.data || error.message);
//       }
//     };
//     fetchSensorDetails();
//   }, []);

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
//           <p>No sensor details available.</p>
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

  useEffect(() => {
    const fetchSensorDetails = async () => {
      try {
        // Fetch only sensors associated with the logged-in user's userID
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

  const handleAddOrUpdateSensor = (sensorDetails) => {
    if (editingSensor) {
      setSensors((prevSensors) =>
        prevSensors.map((sensor) =>
          sensor.id === editingSensor.id ? { ...sensorDetails, id: sensor.id } : sensor
        )
      );
      setEditingSensor(null);
    } else {
      const newSensor = { ...sensorDetails, id: Date.now() };
      setSensors((prevSensors) => [...prevSensors, newSensor]);
    }
    setModalOpen(false);
  };

  const handleEditSensor = (sensor) => {
    setEditingSensor(sensor);
    setModalOpen(true);
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
              key={sensor.SensorID || sensor.id}
              className="bg-white p-6 rounded shadow-lg hover:shadow-xl"
              onClick={() => handleEditSensor(sensor)}
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