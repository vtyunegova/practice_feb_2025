'use client';

import React, { useEffect, useState } from 'react';

const UserPage = () => {
    const [user, setUser ] = useState(null); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchUser  = async () => {
            const response = await fetch('/api/person', {
                method: 'GET',
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message); 
                return;
            }

            const userData = await response.json();
            setUser (userData); 
        };

        fetchUser ();
    }, []);

    if (error) {
        return <div>{error}</div>; 
    }

    if (!user) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Профиль пользователя</h1>
            <p className="mt-2">Email: {user.email}</p>
            <p className="mt-2">ID: {user.id}</p>
        </div>
    );
};

export default UserPage;