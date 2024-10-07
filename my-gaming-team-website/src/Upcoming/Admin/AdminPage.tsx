// src/Upcoming/Admin/AdminPage.tsx

import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Admin } from '../../types';
import './admin.css'; // Your CSS file

const AdminPage: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]); // Fixed: Replace any[] with Admin[]

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await api.get<Admin[]>('/admins');
        setAdmins(response.data);
      } catch (err: unknown) { // Replace any with unknown
        console.error('Failed to fetch admins', err);
      }
    };

    fetchAdmins();
  }, []);

  return (
    <div className="admin-page">
      <h2>Admins</h2>
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
          {admins.map((admin: Admin) => ( // Fixed: Replace any with Admin
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
