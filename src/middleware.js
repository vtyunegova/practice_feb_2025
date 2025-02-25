import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secretKey = process.env.SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey); 

export async function middleware(request) {
  const cookie = request.cookies.get('token'); // получаем токен из куки
  const token =  cookie ? cookie.value : null; // записываем значение токена, чтобы это была строка
  const { pathname } = request.nextUrl; 

  // Если токена нет и мы не на странице авторизации
  if (!token && !pathname.startsWith('/login')) {
    console.log('Редирект на /login');
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (token) {
    try {
      await jwtVerify(token, encodedKey, {
        algorithms: ['HS256'], 
      });
      console.log('Токен действителен:', pathname);
    } catch (error) {
      console.log('Недействительный токен, редирект на /login');
      return NextResponse.redirect(new URL('/login', request.url)); // Перенаправляем на страницу авторизации
    }
  }

  console.log('Доступ для:', pathname);
  return NextResponse.next(); 
}

export const config = {
  matcher: ['/auth/:path*'], 
};
