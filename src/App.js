// import { Routes, Route } from 'react-router-dom';
// import Dashboard from './components/Dashboard';
// import SensorManagement from './components/SensorManagement';
// import SensorLogs from './components/SensorLogs';
// import AccessLogs from './components/AccessLogs';
// import SensorModifications from './components/SensorModifications';
// import AuthorizedUsers from './components/AuthorizedUsers';
// import AccountRequests from './components/AccountRequests'; // Import AccountRequests

// function App() {
//   return (
//     <Routes>
//       <Route path="/dashboard" element={<Dashboard />} />
//       <Route path="/dashboard/sensors" element={<SensorManagement />} />
//       <Route path="/dashboard/sensor-logs" element={<SensorLogs />} />
//       <Route path="/dashboard/access-logs" element={<AccessLogs />} />
//       <Route path="/dashboard/authorized-users" element={<AuthorizedUsers />} />
//       <Route path="/dashboard/account-requests" element={<AccountRequests />} /> {/* Add Route */}
//       <Route path="/dashboard/modifications" element={<SensorModifications />} />
//     </Routes>
//   );
// }

// export default App;


import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import SensorManagement from './components/SensorManagement';
import SensorLogs from './components/SensorLogs';
import AccessLogs from './components/AccessLogs';
import SensorModifications from './components/SensorModifications';
import AuthorizedUsers from './components/AuthorizedUsers';
import AccountRequests from './components/AccountRequests';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} /> {/* Login page */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/sensors" element={<SensorManagement />} />
      <Route path="/dashboard/sensor-logs" element={<SensorLogs />} />
      <Route path="/dashboard/access-logs" element={<AccessLogs />} />
      <Route path="/dashboard/authorized-users" element={<AuthorizedUsers />} />
      <Route path="/dashboard/account-requests" element={<AccountRequests />} />
      <Route path="/dashboard/modifications" element={<SensorModifications />} />

      {/* Redirect all unknown paths to /login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
