'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleLogin(event) {
    event.preventDefault();

    const response = await fetch(`/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      alert('Вход успешен'); 
      router.push('/'); // Перенаправление на главную страницу
    } else {
      const errorData = await response.json();
      console.log('Login failed:', errorData); // Логирование ошибки
      alert('Ошибка входа');
    }
};

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded shadow">
            <h2 className="text-2xl font-semibold text-center mb-6">Авторизация</h2>
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Электронная почта:</label>
                    <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline" />
                </div>
                
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Пароль:</label>
                    <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    required 
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline" />
                </div>
                
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Войти</button>
            </form>
        </div>
    );
};

export default LoginForm;