import React, { useState } from 'react';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { ProductsPage } from './components/ProductsPage';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { LoginPage } from './components/LoginPage';
import { AccountPage } from './components/AccountPage';
import { AdminDashboard } from './components/AdminDashboard';

type Page = 'home' | 'services' | 'rentals' | 'cart' | 'checkout' | 'login' | 'account' | 'admin';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'services':
        return <ProductsPage category="service" />;
      case 'rentals':
        return <ProductsPage category="rental" />;
      case 'cart':
        return <CartPage onNavigate={setCurrentPage} />;
      case 'checkout':
        return <CheckoutPage onNavigate={setCurrentPage} />;
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} />;
      case 'account':
        return <AccountPage onNavigate={setCurrentPage} />;
      case 'admin':
        return <AdminDashboard onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-[var(--vw-light-grey)]">
          <Header onNavigate={setCurrentPage} currentPage={currentPage} />
          <main>{renderPage()}</main>
          <footer className="bg-[var(--vw-blue)] text-white py-8 mt-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-white mb-4">VW Garage</h3>
                  <p className="text-sm text-[var(--vw-sky-blue)]">
                    Spécialiste Volkswagen - Qualité et expertise depuis 2005
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-[var(--vw-light-blue)]">Contact</h4>
                  <p className="text-sm text-[var(--vw-sky-blue)]">Email: contact@vwgarage.fr</p>
                  <p className="text-sm text-[var(--vw-sky-blue)]">Tél: 01 23 45 67 89</p>
                  <p className="text-sm text-[var(--vw-sky-blue)]">Adresse: 123 Rue des Golfeurs, 75000 Paris</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-[var(--vw-light-blue)]">Horaires</h4>
                  <p className="text-sm text-[var(--vw-sky-blue)]">Lun - Ven: 8h - 18h</p>
                  <p className="text-sm text-[var(--vw-sky-blue)]">Sam: 9h - 13h</p>
                  <p className="text-sm text-[var(--vw-sky-blue)]">Dim: Fermé</p>
                </div>
              </div>
              <div className="border-t border-[var(--vw-dark-blue)] mt-8 pt-6 text-center">
                <p className="text-sm text-[var(--vw-sky-blue)]">
                  © 2025 VW Garage - Tous droits réservés
                </p>
              </div>
            </div>
          </footer>
          <Toaster position="bottom-right" richColors />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}
