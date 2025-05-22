
import { AdminAPI, approveAdmin } from '../../services/api';
import { FullAdmin } from '../../Types/Admin';
import React, { useEffect, useState } from 'react';

const SuperAdminDashboard: React.FC = () => {
  const [admins, setAdmins] = useState<FullAdmin[]>([]); 

  const fecthAdmins = async () => {
    try {
      const respones = await AdminAPI.getAllAdmins();
      setAdmins(respones.data)
    } catch (error) {
      console.error("Failed to fetch admins", error)
    }
  };


  const handleApprove = async (adminId: string) => {
     try {
      await approveAdmin(adminId);
      alert('✅ Admin approved');
      fecthAdmins()
     } catch (error) {
      alert('❌ Failed to approved admin')
     }
  }

  useEffect(() => {
   fecthAdmins()
  }, [])


  return (
    <div>
      <h2 className="text-xl font-blod">Pending Admin Approvals</h2>
      {admins.filter(admin => !admin.isApproved).map((admin) => (
        <div key={admin._id} className="p-2 border rounded mb-2">
          <p>{admin.name}  {admin.surname} - {admin.email}</p>
          <button
          onClick={() => handleApprove(admin._id)}
           className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
          >
            Approved
          </button>
        </div>
      ))}
    </div>
  )

}
export default SuperAdminDashboard;
