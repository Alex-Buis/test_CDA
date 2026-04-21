import React, { useState } from 'react';
import { LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export const LoginPage = ({ onNavigate }: LoginPageProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      const success = await login(email, password);
      if (success) {
        toast.success('Connexion réussie !');
        onNavigate('home');
      } else {
        toast.error('Email ou mot de passe incorrect');
      }
    } else {
      const success = await register(email, password, name);
      if (success) {
        toast.success('Compte créé avec succès !');
        onNavigate('home');
      } else {
        toast.error('Erreur lors de la création du compte');
      }
    }
  };

  return (
    <div className="min-h-screen py-12 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 border-2 border-gray-200">
          <div className="text-center mb-8">
            <h2 className="mb-2">{isLogin ? 'Connexion' : 'Créer un compte'}</h2>
            <p className="text-gray-600">
              {isLogin ? 'Accédez à votre espace client' : 'Rejoignez le Garage VW'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold mb-2">Nom complet</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jean Dupont"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--vw-light-blue)]"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--vw-light-blue)]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--vw-light-blue)]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[var(--vw-light-blue)] text-white py-3 rounded-lg hover:bg-[var(--vw-blue)] transition-colors flex items-center justify-center gap-2"
            >
              {isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
              {isLogin ? 'Se connecter' : 'Créer mon compte'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[var(--vw-blue)] hover:text-[var(--vw-light-blue)] transition-colors"
            >
              {isLogin ? "Pas encore de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
            </button>
          </div>

          {isLogin && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-semibold mb-2">Comptes de démonstration:</p>
              <p className="text-xs text-gray-600">Client: client@example.com / client123</p>
              <p className="text-xs text-gray-600">Admin: admin@garage-vw.com / admin123</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
