import React from 'react';
import { ShoppingCart, User, LogOut, Wrench, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Header = ({ onNavigate, currentPage }: HeaderProps) => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  return (
    <header className="bg-[var(--vw-blue)] text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onNavigate('home')}
          >
            <div className="bg-[var(--vw-light-blue)] p-2 rounded-lg">
              <Wrench className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-white m-0 p-0">VW GARAGE</h1>
              <p className="text-xs text-[var(--vw-sky-blue)] m-0">Professional Service</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => onNavigate('home')}
              className={`px-4 py-2 rounded transition-colors ${
                currentPage === 'home'
                  ? 'bg-[var(--vw-light-blue)] text-white'
                  : 'hover:bg-[var(--vw-dark-blue)] text-[var(--vw-sky-blue)]'
              }`}
            >
              Accueil
            </button>
            <button
              onClick={() => onNavigate('services')}
              className={`px-4 py-2 rounded transition-colors ${
                currentPage === 'services'
                  ? 'bg-[var(--vw-light-blue)] text-white'
                  : 'hover:bg-[var(--vw-dark-blue)] text-[var(--vw-sky-blue)]'
              }`}
            >
              Prestations
            </button>
            <button
              onClick={() => onNavigate('rentals')}
              className={`px-4 py-2 rounded transition-colors ${
                currentPage === 'rentals'
                  ? 'bg-[var(--vw-light-blue)] text-white'
                  : 'hover:bg-[var(--vw-dark-blue)] text-[var(--vw-sky-blue)]'
              }`}
            >
              Location
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <button
              onClick={() => onNavigate('cart')}
              className="relative p-2 hover:bg-[var(--vw-dark-blue)] rounded-lg transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--vw-light-blue)] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center gap-3">
                {user.role === 'admin' && (
                  <button
                    onClick={() => onNavigate('admin')}
                    className="p-2 hover:bg-[var(--vw-dark-blue)] rounded-lg transition-colors"
                  >
                    <Settings className="w-6 h-6" />
                  </button>
                )}
                <button
                  onClick={() => onNavigate('account')}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-[var(--vw-dark-blue)] rounded-lg transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden md:inline text-sm">{user.name}</span>
                </button>
                <button
                  onClick={logout}
                  className="p-2 hover:bg-[var(--vw-accent-red)] rounded-lg transition-colors"
                  title="Déconnexion"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="bg-[var(--vw-light-blue)] px-4 py-2 rounded-lg hover:bg-[var(--vw-sky-blue)] transition-colors"
              >
                Connexion
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
