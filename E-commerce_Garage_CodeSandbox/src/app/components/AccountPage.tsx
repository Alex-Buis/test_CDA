import React from 'react';
import { User, Package, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockOrders } from '../data/mockData';

interface AccountPageProps {
  onNavigate: (page: string) => void;
}

export const AccountPage = ({ onNavigate }: AccountPageProps) => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6">Connexion requise</h2>
          <button
            onClick={() => onNavigate('login')}
            className="bg-[var(--vw-light-blue)] text-white px-6 py-3 rounded-lg hover:bg-[var(--vw-blue)] transition-colors"
          >
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-[var(--vw-light-blue)]" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Terminée';
      case 'processing':
        return 'En cours';
      case 'pending':
        return 'En attente';
      case 'cancelled':
        return 'Annulée';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="mb-8">Mon Compte</h1>

        {/* User Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-2 border-gray-200">
          <div className="flex items-center gap-4">
            <div className="bg-[var(--vw-light-blue)] w-16 h-16 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="mb-1">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs ${
                user.role === 'admin'
                  ? 'bg-[var(--vw-blue)] text-white'
                  : 'bg-blue-100 text-[var(--vw-blue)]'
              }`}>
                {user.role === 'admin' ? 'Administrateur' : 'Client'}
              </span>
            </div>
          </div>
        </div>

        {/* Orders History */}
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
          <h3 className="mb-6">Mes Commandes</h3>

          {mockOrders.length > 0 ? (
            <div className="space-y-4">
              {mockOrders.map(order => (
                <div
                  key={order.id}
                  className="border-2 border-gray-200 rounded-lg p-4 hover:border-[var(--vw-light-blue)] transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">Commande #{order.id}</span>
                        {getStatusIcon(order.status)}
                        <span className={`text-sm ${
                          order.status === 'completed' ? 'text-green-600' :
                          order.status === 'processing' ? 'text-[var(--vw-light-blue)]' :
                          order.status === 'cancelled' ? 'text-red-600' :
                          'text-gray-600'
                        }`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-[var(--vw-light-blue)]">
                        {order.total.toFixed(2)}€
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {order.paymentMethod === 'stripe' ? 'Carte bancaire' : 'PayPal'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm bg-blue-50 p-2 rounded">
                        <span>
                          {item.product.name} <span className="text-gray-500">x{item.quantity}</span>
                        </span>
                        <span className="font-semibold">
                          {(item.product.price * item.quantity).toFixed(2)}€
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">Aucune commande pour le moment</p>
              <button
                onClick={() => onNavigate('home')}
                className="mt-4 bg-[var(--vw-light-blue)] text-white px-6 py-2 rounded-lg hover:bg-[var(--vw-blue)] transition-colors"
              >
                Découvrir nos services
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
