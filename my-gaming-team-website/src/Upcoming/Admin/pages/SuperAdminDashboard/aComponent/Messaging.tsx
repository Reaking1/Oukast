import React, { useState } from 'react';
import axios from 'axios';

const Messaging: React.FC = () => {
    const [message, setMessage] = useState('');

    const handleSendMessage = async () => {
        try {
            await axios.post('/api/messaging/send', { message });
            alert('Message sent successfully');
            setMessage('');
        } catch (error) {
            console.error('Failed to send message', error);
        }
    };

    return (
        <div>
            <h2>Messaging</h2>
            <textarea
                placeholder="Type your message here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send Message</button>
        </div>
    );
};

export default Messaging;
