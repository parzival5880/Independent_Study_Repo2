// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import AddSensorModal from './AddSensorModal';

// const SensorManagement = () => {
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [editingSensor, setEditingSensor] = useState(null); // For updating sensors
//   const [sensors, setSensors] = useState([]); // Store the sensors data
//   const navigate = useNavigate(); // Initialize navigate function

//   // Handle submission for both creating and updating sensors
//   const handleAddOrUpdateSensor = (sensorDetails) => {
//     if (editingSensor) {
//       // Update sensor in the list
//       setSensors((prevSensors) =>
//         prevSensors.map((sensor) =>
//           sensor.id === editingSensor.id ? { ...sensorDetails, id: sensor.id } : sensor
//         )
//       );
//       setEditingSensor(null); // Clear the editing state
//     } else {
//       // Create new sensor
//       const newSensor = { ...sensorDetails, id: Date.now() }; // Assign a unique ID
//       setSensors((prevSensors) => [...prevSensors, newSensor]);
//     }

//     setModalOpen(false); // Close the modal
//   };

//   // Open modal for editing a specific sensor
//   const handleEditSensor = (sensor) => {
//     setEditingSensor(sensor);
//     setModalOpen(true);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <h1 className="text-3xl font-semibold mb-8">Sensor Management</h1>

//       <button
//         onClick={() => navigate('/dashboard')} // Redirect to dashboard on click
//         className="bg-gray-600 text-white px-4 py-2 rounded mb-4"
//       >
//         ← Back to Dashboard
//       </button>

//       <button
//         onClick={() => setModalOpen(true)}
//         className="bg-blue-600 text-white px-4 py-2 rounded mb-4 ml-4"
//       >
//         + Add Sensor
//       </button>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {sensors.map((sensor) => (
//           <div
//             key={sensor.id}
//             className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg"
//             onClick={() => handleEditSensor(sensor)} // Enable editing on click
//           >
//             <h3 className="font-semibold text-lg">{sensor.SensorType}</h3>
//             <p>Range: {sensor.RangeMin} - {sensor.RangeMax}</p>
//             <p>Location: {sensor.Location}</p>
//             <p>Status: {sensor.Status}</p>
//           </div>
//         ))}
//       </div>

//       {isModalOpen && (
//         <AddSensorModal
//           onClose={() => setModalOpen(false)}
//           onSubmit={handleAddOrUpdateSensor}
//           initialData={editingSensor} // Pass the data for editing, if any
//         />
//       )}
//     </div>
//   );
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

  useEffect(() => {
    const fetchSensorDetails = async () => {
      try {
        const response = await axios.get('https://backend-login-1-xc0i.onrender.com/getsensordetails');
        console.log("Fetched sensor details:", response.data); // Log response data for debugging
        setSensors(response.data);
      } catch (error) {
        console.error("Error fetching sensor details:", error.response?.data || error.message);
      }
    };
    fetchSensorDetails();
  }, []);

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
              className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg"
              onClick={() => handleEditSensor(sensor)}
            >
              <h3 className="font-semibold text-lg">{sensor.SensorType}</h3>
              <p>Range: {sensor.RangeMin} - {sensor.RangeMax}</p>
              <p>Location: {sensor.Location}</p>
              <p>Status: {sensor.Status}</p>
            </div>
          ))
        ) : (
          <p>No sensor details available.</p>
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