import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    return (
        <div>
            <h1 className='text-xl'>Welcome, <b>{user?.displayName}</b></h1>
        </div>
    );
};

export default Dashboard;