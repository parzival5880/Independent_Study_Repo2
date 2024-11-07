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
  const [isValuesModalOpen, setValuesModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [sensors, setSensors] = useState([]);
  const [sensorValues, setSensorValues] = useState([]);
  const [editingSensor, setEditingSensor] = useState(null);
  const navigate = useNavigate();

  const userID = localStorage.getItem('userID');

  // Function to log actions in the access log
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

  const handleViewSensorValues = async (sensorID) => {
    try {
      const response = await axios.get(`https://backend-login-1-xc0i.onrender.com/getsensorvalues/${sensorID}?limit=10`);
      setSensorValues(response.data);
      setValuesModalOpen(true);

      // Log the "Read" action for viewing sensor values
      await logSensorAction(sensorID, "Read");
    } catch (error) {
      console.error("Error fetching sensor values:", error.response?.data || error.message);
    }
  };

  const handleUpdateSensor = async (updatedSensor) => {
    try {
      await axios.put(`https://backend-login-1-xc0i.onrender.com/updatesensordetails/${updatedSensor.SensorID}`, updatedSensor);
      setSensors(sensors.map((sensor) => sensor.SensorID === updatedSensor.SensorID ? updatedSensor : sensor));
      setEditModalOpen(false);

      // Log the "Update" action after successfully updating the sensor
      await logSensorAction(updatedSensor.SensorID, "Update");
    } catch (error) {
      console.error("Error updating sensor:", error.response?.data || error.message);
    }
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
          onClick={() => setValuesModalOpen(true)}
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
              <button
                onClick={() => { setEditingSensor(sensor); setEditModalOpen(true); }}
                className="bg-green-600 text-white px-4 py-2 rounded mt-4"
              >
                Update
              </button>
              <button
                onClick={() => handleViewSensorValues(sensor.SensorID)}
                className="bg-blue-600 text-white px-4 py-2 rounded mt-4 ml-2"
              >
                View Sensor Values
              </button>
            </div>
          ))
        ) : (
          <p>No sensor details available for this patient.</p>
        )}
      </div>

      {isValuesModalOpen && (
        <SensorValuesModal
          values={sensorValues}
          onClose={() => setValuesModalOpen(false)}
        />
      )}

      {isEditModalOpen && (
        <EditSensorModal
          sensor={editingSensor}
          onSave={handleUpdateSensor}
          onClose={() => setEditModalOpen(false)}
        />
      )}
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
      <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
        Close
      </button>
    </div>
  </div>
);

const EditSensorModal = ({ sensor, onSave, onClose }) => {
  const [updatedSensor, setUpdatedSensor] = useState(sensor);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedSensor((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Edit Sensor</h2>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(updatedSensor).map(([key, value]) => (
            <React.Fragment key={key}>
              <label className="text-gray-700 font-semibold">{key}:</label>
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded"
              />
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => onSave(updatedSensor)}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            Save Changes
          </button>
          <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SensorManagement;