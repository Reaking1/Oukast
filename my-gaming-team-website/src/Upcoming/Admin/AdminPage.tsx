// src/Upcoming/Admin/AdminPage.tsx
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Admin } from '../../types';
import './AdminPage.css'; // Your CSS file

const AdminPage: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await api.get('/admins');
        setAdmins(response.data);
      } catch (err: any) {
        console.error('Failed to fetch admins', err);
        setError(err.response?.data?.message || 'Failed to fetch admins');
      }
    };

    fetchAdmins();
  }, []);

  return (
    <div className="admin-page">
      <h2>Admins</h2>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin._id}>
              <td>{admin.name}</td>
              <td>{admin.surname}</td>
              <td>{admin.email}</td>
              <td>{new Date(admin.dateOfBirth).toLocaleDateString()}</td>
              <td>{admin.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
