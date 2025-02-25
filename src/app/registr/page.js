'use client';
import { useRouter } from "next/navigation";

const Home = () => {
    const router = useRouter();
    const handleRegister = async (event) => {
        event.preventDefault();
      
        const formData = {
          email: event.target.email.value,
          password: event.target.password.value,
          confirmPassword: event.target.confirmPassword.value,
        };

        if (formData.password !== formData.confirmPassword) {
            alert('Пароли не совпадают');
            return;
        }

        const response = await fetch(`/api/registr`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
    
        const data = await response.json();
        if (response.ok) { 
            alert(data.message);
            router.push('/login');
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded shadow">
            <h2 className="text-2xl font-semibold text-center mb-6">Регистрация</h2>
            <form onSubmit={handleRegister} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Электронная почта:</label>
                    <input type="email" id="email" name="email" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline" />
                </div>
                
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Пароль:</label>
                    <input type="password" id="password" name="password" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline" />
                </div>
                
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Подтверждение пароля:</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline" />
                </div>
                
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Зарегистрироваться</button>
            </form>
        </div>
    );
};

export default Home;