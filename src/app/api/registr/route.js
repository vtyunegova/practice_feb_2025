// src/app/api/registr/route.js
import db from '../../../../lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    const { email, password, confirmPassword } = await req.json();

    if (password !== confirmPassword) {
        return new Response(JSON.stringify({ message: 'Пароли не совпадают' }), { status: 400 });
    }

    const [existingUser ] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser .length > 0) {
        return new Response(JSON.stringify({ message: 'Пользователь с такой электронной почтой уже существует' }), { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [
        email,
        hashedPassword,
    ]);

    return new Response(JSON.stringify({ message: 'Пользователь успешно зарегистрирован' }), { status: 201 });
}