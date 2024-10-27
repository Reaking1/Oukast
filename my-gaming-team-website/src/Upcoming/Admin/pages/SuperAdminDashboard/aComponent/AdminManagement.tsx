import axios from "axios";
import React, { useState } from "react";


const AdminManagement: React.FC = () => {
    const [email, setEmail] = useState('');
    const [action, setAction] = useState('add'); // 'add' or 'delete


    const handleAdminAction = async () => {
        const url = action === 'add' ? '/api/admin/add' : '/api/admin/delete';
        try {
            await axios.post(url, {email});
            alert(`Admin ${action === 'add' ? 'added' : 'deleted'} successfully`);
        } catch (error) {
            console.error(`Failed to ${action} admin`, error);
        }
    };

    return (
        <div>
            <h2>{action === 'add' ? 'Add Admin': 'Delete Admin'}</h2>
            <input type="email" placeholder="Admin Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={handleAdminAction}>
                {action === 'add' ? 'Addd Admin' : 'Delete Admin'}
            </button>
              <button onClick={() => setAction(action === 'add' ? 'delete' : 'add')}>
                Swicth to {action === 'add' ? 'Delete Admin': 'Add Admin'}
              </button>
        </div>
    );
}


export default AdminManagement