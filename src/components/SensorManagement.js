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
import { Loader2, ArrowLeft, Eye, Edit2, RefreshCw } from 'lucide-react';

// Custom Card components using Tailwind
const Card = ({ className, children, ...props }) => (
  <div className={`bg-white rounded-lg shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ className, children, ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ className, children, ...props }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`} {...props}>
    {children}
  </h3>
);

const CardContent = ({ className, children, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const SensorManagement = () => {
  const [isValuesModalOpen, setValuesModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [sensors, setSensors] = useState([]);
  const [sensorValues, setSensorValues] = useState([]);
  const [editingSensor, setEditingSensor] = useState(null);
  const [loading, setLoading] = useState(true);

  const userID = localStorage.getItem('userID');
  const API_BASE_URL = 'https://backend-login-1-xc0i.onrender.com';

  const logSensorAction = async (sensorID, action) => {
    try {
      await fetch(`${API_BASE_URL}/sensoraccesslogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          SensorID: sensorID,
          UserID: userID,
          Action: action
        })
      });
    } catch (error) {
      console.error("Error logging sensor action:", error);
    }
  };

  useEffect(() => {
    const fetchSensorDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/getsensordetails/${userID}`);
        const data = await response.json();
        setSensors(data);
      } catch (error) {
        console.error("Error fetching sensor details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userID) {
      fetchSensorDetails();
    }
  }, [userID]);

  const handleViewSensorValues = async (sensorID) => {
    try {
      const response = await fetch(`${API_BASE_URL}/getsensorvalues/${sensorID}?limit=10`);
      const data = await response.json();
      setSensorValues(data);
      setValuesModalOpen(true);
      await logSensorAction(sensorID, "Read");
    } catch (error) {
      console.error("Error fetching sensor values:", error);
    }
  };

  const handleUpdateSensor = async (updatedSensor) => {
    try {
      await fetch(`${API_BASE_URL}/updatesensordetails/${updatedSensor.SensorID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSensor)
      });
      setSensors(sensors.map((sensor) => 
        sensor.SensorID === updatedSensor.SensorID ? updatedSensor : sensor
      ));
      setEditModalOpen(false);
      await logSensorAction(updatedSensor.SensorID, "Update");
    } catch (error) {
      console.error("Error updating sensor:", error);
    }
  };

  const handleBackToDashboard = () => {
    window.location.href = '/dashboard';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Sensor Management</h1>
          <div className="flex space-x-4">
            <button
              onClick={handleBackToDashboard}
              className="flex items-center px-4 py-2 bg-white text-gray-700 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200 border border-gray-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sensors.length > 0 ? (
            sensors.map((sensor) => (
              <Card key={sensor.SensorID} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-xl font-semibold">{sensor.SensorType}</span>
                    <span className="text-sm text-gray-500">ID: {sensor.SensorID}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-gray-500">Range</p>
                        <p className="font-medium">{sensor.RangeMin} - {sensor.RangeMax}</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-gray-500">Current Value</p>
                        <p className="font-medium">{sensor.CurrentValue}</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-gray-500">Status</p>
                      <p className={`font-medium ${sensor.Status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                        {sensor.Status}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-gray-500">Location</p>
                      <p className="font-medium">{sensor.Location}</p>
                    </div>
                    <div className="flex space-x-3 mt-4">
                      <button
                        onClick={() => { setEditingSensor(sensor); setEditModalOpen(true); }}
                        className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Update
                      </button>
                      <button
                        onClick={() => handleViewSensorValues(sensor.SensorID)}
                        className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Values
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500">No sensor details available for this patient.</p>
            </div>
          )}
        </div>
      </div>

      {isValuesModalOpen && (
        <SensorValuesModal values={sensorValues} onClose={() => setValuesModalOpen(false)} />
      )}

      {isEditModalOpen && (
        <EditSensorModal sensor={editingSensor} onSave={handleUpdateSensor} onClose={() => setEditModalOpen(false)} />
      )}
    </div>
  );
};

const SensorValuesModal = ({ values, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
    <div className="bg-white rounded-xl shadow-xl max-w-lg w-full m-4 transform transition-all">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Recent Sensor Values</h2>
        <div className="max-h-96 overflow-y-auto">
          {values.length > 0 ? (
            <div className="space-y-3">
              {values.map((value, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-blue-600">{value.SensorValue}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(value.UpdatedAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No values found.</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
        >
          Close
        </button>
      </div>
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full m-4 transform transition-all">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Edit Sensor</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(updatedSensor).map(([key, value]) => (
              <div key={key} className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">{key}</label>
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => onSave(updatedSensor)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Save Changes
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorManagement;