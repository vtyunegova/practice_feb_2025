import db from '../../../../lib/db';
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function GET(request) {
    const token = request.cookies.get('token');

    if (!token) {
        return NextResponse.json({ message: 'Не авторизован' }, { status: 401 });
    }

    try {
        const secretKey = process.env.SECRET_KEY;
        const { payload } = await jwtVerify(token, new TextEncoder().encode(secretKey));

        const email = payload.email;

        const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (!user || user.length === 0) {
            return NextResponse.json({ message: 'Пользователь не найден' }, { status: 404 });
        }
        return NextResponse.json(user[0], { status: 200 });
    } catch (error) {
        console.error('Ошибка при декодировании токена:', error);
        return NextResponse.json({ message: 'Ошибка при авторизации' }, { status: 500 });
    }
}