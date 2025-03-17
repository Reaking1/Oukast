import { approveAdmin } from '@/services/api';
import React from 'react';

const SuperAdminDashboard: React.FC = () => {
  const handleApprove = async (adminId: string) => {
    try {
      await approveAdmin(adminId, superAdminToken);
      alert('Admin approved successfully!');
      fetchAdmins(); // Refresh the list after approval
    } catch (error) {
      alert('Failed to approve admin');
    }
  };
  
  return (
    <div>
      {admins.map((admin) => (
        <div key={admin._id}>
          <p>{admin.name} {admin.surname} - {admin.email}</p>
          {!admin.isApproved && (
            <button onClick={() => handleApprove(admin._id)}>Approve</button>
          )}
        </div>
      ))}
    </div>
  ); //issue with api

}
export default SuperAdminDashboard;
