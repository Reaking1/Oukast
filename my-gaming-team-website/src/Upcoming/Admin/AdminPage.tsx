// src/Upcoming/Admin/AdminPage.tsx

import React, { useEffect, useState } from 'react';
import api from '../../services/api'; // Import the configured Axios instance
import { Admin } from '../../types';

const AdminPage: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await api.get('/admins'); // Ensure this endpoint exists in your backend
      setAdmins(response.data);
    } catch (err) {
      console.error('Failed to fetch admins', err);
      setError('Failed to fetch admins.');
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            {/* Add other headers as needed */}
          </tr>
        </thead>
        <tbody>
          {admins.map(admin => (
            <tr key={admin._id}> 
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              {/* Add other data as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
