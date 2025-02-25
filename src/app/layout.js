import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <header className="shadow-md py-6">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold">୨୧ Фотовыставка ୨୧</h1>
          </div>
        </header>
        <nav className="my-6">
              <ul className="flex justify-center space-x-24">
              <li>
                  <Link href="/" className="hover:underline text-lg">Главная</Link>
                </li>
                <li>
                  <Link href="/login" className="hover:underline text-lg">Вход</Link>
                </li>
                <li>
                  <Link href="/auth/search" className="hover:underline text-lg">Поиск</Link>
                </li>
                <li>
                  <Link href="" className="hover:underline text-lg">Профиль</Link>
                </li>
              </ul>
            </nav>
        <main className="flex-grow px-6">
          {children}
        </main>
        <footer className="py-4 bg-gray-200 mt-8">
          <div className="container mx-auto text-center">
            <p className="text-gray-600">© 2025 Valera Ezh</p>
          </div>
        </footer>
      </body>
    </html>
  );
}