import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <header className="shadow-md py-6">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold">Фото-выставка ♥</h1>
            <nav className="mt-4">
              <ul className="flex justify-center space-x-6">
                <li>
                  <a href="/login" className="hover:underline">Вход</a>
                </li>
                <li>
                  <a href="/registr" className="hover:underline">Регистрация</a>
                </li>
                <li>
                  <a href="/auth/search" className="hover:underline">Поиск</a>
                </li>
                <li>
                  <a href="/" className="hover:underline">Профиль</a>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="container mx-auto px-4 py-6">
          {children}
        </main>
        <footer className="py-4 mt-6">
          <div className="container mx-auto text-center">
            <p className="text-gray-600">© 2025 Valera Ezh</p>
          </div>
        </footer>
      </body>
    </html>
  );
}