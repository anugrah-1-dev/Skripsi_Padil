  import { Outlet, useLocation } from 'react-router';
  import { Header } from './components/Header';
  import { Footer } from './components/Footer';
  
  export function Root() {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
  
    return (
      <div className="min-h-screen flex flex-col">
        {!isLoginPage && <Header />}
        <main className="flex-1">
          <Outlet />
        </main>
        {!isLoginPage && <Footer />}
      </div>
    );
  }