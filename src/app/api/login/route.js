// src/app/api/signin/route.js
import db from '../../../../lib/db';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';

const secretKey = process.env.SECRET_KEY; 
const encodedKey = new TextEncoder().encode(secretKey); 

export async function POST(request) {
    const { email, password } = await request.json();

    // проверяем существует ли эмайл
    const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (!user) {
        return NextResponse.json({ message: 'Пользователь не найден' }, { status: 404 });
    }

    // сравниваем пароль с хешированным
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
        return NextResponse.json({ message: 'Неверный пароль' }, { status: 401 });
    }

    // создаем токен
    const jwtToken = await new SignJWT({ email: user[0].email }) 
        .setProtectedHeader({ alg: 'HS256' }) // алгоритм
        .setIssuedAt() // время создания
        .setExpirationTime('1h') // время истечения токена
        .sign(encodedKey); // подпись токена

    // устанавливаем токен в куки
    const res = NextResponse.json({ message: 'Успешный вход' });
    res.cookies.set('token', jwtToken, { path: '/' });
    return res;
}