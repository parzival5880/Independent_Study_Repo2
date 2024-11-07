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

//   // Fetch sensors for the logged-in user
//   useEffect(() => {
//     const fetchSensorDetails = async () => {
//       try {
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

//   // Function to log actions (Read or Update) for a specific sensor
//   const logSensorAction = async (sensorID, action) => {
//     try {
//       await axios.post('https://backend-login-1-xc0i.onrender.com/sensoraccesslogs', {
//         SensorID: sensorID,
//         UserID: userID,
//         Action: action
//       });
//       console.log(`Logged action: ${action} for SensorID: ${sensorID}`);
//     } catch (error) {
//       console.error("Error logging sensor action:", error.response?.data || error.message);
//     }
//   };

//   // Handle click to open sensor details (Read action)
//   const handleViewSensor = (sensor) => {
//     logSensorAction(sensor.SensorID, "Read");  // Log the Read action
//     setEditingSensor(sensor);
//     setModalOpen(true);
//   };

//   // Handle sensor update (Update action)
//   const handleAddOrUpdateSensor = (sensorDetails) => {
//     if (editingSensor) {
//       setSensors((prevSensors) =>
//         prevSensors.map((sensor) =>
//           sensor.SensorID === editingSensor.SensorID ? { ...sensorDetails, SensorID: sensor.SensorID } : sensor
//         )
//       );
//       logSensorAction(editingSensor.SensorID, "Update");  // Log the Update action
//       setEditingSensor(null);
//     } else {
//       const newSensor = { ...sensorDetails, SensorID: Date.now().toString() };
//       setSensors((prevSensors) => [...prevSensors, newSensor]);
//     }
//     setModalOpen(false);
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
//               key={sensor.SensorID}
//               className="bg-white p-6 rounded shadow-lg hover:shadow-xl cursor-pointer"
//               onClick={() => handleViewSensor(sensor)}  // Handle Read action on click
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

const SensorManagement = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isValuesModalOpen, setValuesModalOpen] = useState(false);
  const [editingSensor, setEditingSensor] = useState(null);
  const [sensors, setSensors] = useState([]);
  const [sensorValues, setSensorValues] = useState([]);
  const navigate = useNavigate();

  // Get userID from localStorage (set during login)
  const userID = localStorage.getItem('userID');

  // Fetch sensors for the logged-in user
  useEffect(() => {
    const fetchSensorDetails = async () => {
      try {
        const response = await axios.get(`https://backend-login-1-xc0i.onrender.com/getsensordetails/${userID}`);
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

  // Log actions (Read or Update) for a specific sensor
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

  // Handle click to fetch and view top 10 sensor values
  const handleViewSensorValues = async (sensorID) => {
    try {
      const response = await axios.get(`https://backend-login-1-xc0i.onrender.com/getsensorvalues/${sensorID}`);
      setSensorValues(response.data);
      setValuesModalOpen(true);
    } catch (error) {
      console.error("Error fetching sensor values:", error.response?.data || error.message);
    }
  };

  // Handle sensor update (Update action)
  const handleAddOrUpdateSensor = async (sensorDetails) => {
    if (editingSensor) {
      try {
        await axios.put(`https://backend-login-1-xc0i.onrender.com/updatesensordetails/${editingSensor.SensorID}`, sensorDetails);
        setSensors((prevSensors) =>
          prevSensors.map((sensor) =>
            sensor.SensorID === editingSensor.SensorID ? { ...sensorDetails, SensorID: sensor.SensorID } : sensor
          )
        );
        logSensorAction(editingSensor.SensorID, "Update");  // Log the Update action
        setEditingSensor(null);
      } catch (error) {
        console.error("Error updating sensor details:", error.response?.data || error.message);
      }
    } else {
      const newSensor = { ...sensorDetails, SensorID: Date.now().toString() };
      setSensors((prevSensors) => [...prevSensors, newSensor]);
    }
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-semibold mb-8">Sensor Management</h1>

      <div className="flex mb-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-gray-600 text-white px-4 py-2 rounded mr-4"
        >
          ← Back to Dashboard
        </button>

        <button
          onClick={() => handleViewSensorValues(editingSensor?.SensorID)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          View Sensor Values
        </button>
      </div>

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

      {isModalOpen && editingSensor && (
        <EditSensorModal
          sensor={editingSensor}
          onSave={handleAddOrUpdateSensor}
          onClose={() => setModalOpen(false)}
        />
      )}

      {isValuesModalOpen && (
        <SensorValuesModal
          values={sensorValues}
          onClose={() => setValuesModalOpen(false)}
        />
      )}
    </div>
  );
};

const EditSensorModal = ({ sensor, onSave, onClose }) => {
  const [formData, setFormData] = useState({ ...sensor });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-6 text-center">Edit Sensor</h2>
        <form className="grid grid-cols-2 gap-4">
          {/* Input fields for sensor properties */}
        </form>
        <div className="flex justify-end mt-6 space-x-4">
          <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save Changes</button>
          <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Cancel</button>
        </div>
      </div>
    </div>
  );
};

const SensorValuesModal = ({ values, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
      <h2 className="text-xl font-semibold mb-4">Sensor Values (Top 10)</h2>
      <ul className="space-y-2">
        {values.length > 0 ? (
          values.map((value, index) => (
            <li key={index} className="text-gray-700">
              <strong>Value:</strong> {value.SensorValue} | <strong>Updated At:</strong> {new Date(value.UpdatedAt).toLocaleString()}
            </li>
          ))
        ) : (
          <p>No values found.</p>
        )}
      </ul>
      <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Close</button>
    </div>
  </div>
);

export default SensorManagement;