import React, { useState } from 'react';
import { Package, DollarSign, ShoppingCart, TrendingUp, Users, Tag, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockOrders, mockProducts, mockPromotions } from '../data/mockData';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

export const AdminDashboard = ({ onNavigate }: AdminDashboardProps) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'stock' | 'promos'>('overview');

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6">Accès réservé aux administrateurs</h2>
          <button
            onClick={() => onNavigate('home')}
            className="bg-[var(--vw-light-blue)] text-white px-6 py-3 rounded-lg hover:bg-[var(--vw-blue)] transition-colors"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = mockOrders.length;
  const pendingOrders = mockOrders.filter(o => o.status === 'pending').length;

  return (
    <div className="min-h-screen py-8 bg-[var(--vw-light-grey)]">
      <div className="container mx-auto px-4">
        <h1 className="mb-8">Tableau de Bord Admin</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-gray-600">Revenus Total</h3>
              <DollarSign className="w-6 h-6 text-[var(--vw-light-blue)]" />
            </div>
            <p className="text-3xl font-bold text-[var(--vw-blue)]">
              {totalRevenue.toFixed(2)}€
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-gray-600">Commandes</h3>
              <ShoppingCart className="w-6 h-6 text-[var(--vw-sky-blue)]" />
            </div>
            <p className="text-3xl font-bold text-[var(--vw-blue)]">{totalOrders}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-gray-600">En Attente</h3>
              <Package className="w-6 h-6 text-[var(--vw-blue)]" />
            </div>
            <p className="text-3xl font-bold text-[var(--vw-blue)]">{pendingOrders}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-gray-600">Produits</h3>
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-[var(--vw-blue)]">{mockProducts.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md border-2 border-gray-200 overflow-hidden">
          <div className="flex border-b-2 border-gray-200">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 px-6 py-4 transition-colors ${
                activeTab === 'overview'
                  ? 'bg-[var(--vw-light-blue)] text-white'
                  : 'hover:bg-blue-50'
              }`}
            >
              Vue d'ensemble
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 px-6 py-4 transition-colors ${
                activeTab === 'orders'
                  ? 'bg-[var(--vw-light-blue)] text-white'
                  : 'hover:bg-blue-50'
              }`}
            >
              Commandes
            </button>
            <button
              onClick={() => setActiveTab('stock')}
              className={`flex-1 px-6 py-4 transition-colors ${
                activeTab === 'stock'
                  ? 'bg-[var(--vw-light-blue)] text-white'
                  : 'hover:bg-blue-50'
              }`}
            >
              Stock
            </button>
            <button
              onClick={() => setActiveTab('promos')}
              className={`flex-1 px-6 py-4 transition-colors ${
                activeTab === 'promos'
                  ? 'bg-[var(--vw-light-blue)] text-white'
                  : 'hover:bg-blue-50'
              }`}
            >
              Promotions
            </button>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h3 className="mb-4">Résumé de l'activité</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Dernières commandes
                    </h4>
                    <div className="space-y-2">
                      {mockOrders.slice(0, 3).map(order => (
                        <div key={order.id} className="flex justify-between text-sm">
                          <span>#{order.id}</span>
                          <span className={`font-semibold ${
                            order.status === 'completed' ? 'text-green-600' :
                            order.status === 'processing' ? 'text-[var(--vw-light-blue)]' :
                            'text-gray-600'
                          }`}>
                            {order.status === 'completed' ? 'Terminée' :
                             order.status === 'processing' ? 'En cours' :
                             'En attente'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <Tag className="w-5 h-5" />
                      Promotions actives
                    </h4>
                    <div className="space-y-2">
                      {mockPromotions.filter(p => p.active).map(promo => (
                        <div key={promo.id} className="flex justify-between text-sm">
                          <span className="font-mono font-semibold">{promo.code}</span>
                          <span className="text-[var(--vw-light-blue)]">-{promo.discount}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <h3 className="mb-4">Gestion des Commandes</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-4">Commande</th>
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Client</th>
                        <th className="text-left py-3 px-4">Montant</th>
                        <th className="text-left py-3 px-4">Statut</th>
                        <th className="text-left py-3 px-4">Paiement</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockOrders.map(order => (
                        <tr key={order.id} className="border-b border-gray-200 hover:bg-blue-50">
                          <td className="py-3 px-4 font-semibold">#{order.id}</td>
                          <td className="py-3 px-4 text-sm">
                            {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                          </td>
                          <td className="py-3 px-4 text-sm">Client #{order.userId}</td>
                          <td className="py-3 px-4 font-semibold text-[var(--vw-light-blue)]">
                            {order.total.toFixed(2)}€
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs ${
                              order.status === 'completed' ? 'bg-green-100 text-green-700' :
                              order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                              order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {order.status === 'completed' ? 'Terminée' :
                               order.status === 'processing' ? 'En cours' :
                               order.status === 'cancelled' ? 'Annulée' :
                               'En attente'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm capitalize">{order.paymentMethod}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Stock Tab */}
            {activeTab === 'stock' && (
              <div>
                <h3 className="mb-4">Gestion du Stock</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-4">Produit</th>
                        <th className="text-left py-3 px-4">Catégorie</th>
                        <th className="text-left py-3 px-4">Prix</th>
                        <th className="text-left py-3 px-4">Stock</th>
                        <th className="text-left py-3 px-4">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockProducts.map(product => (
                        <tr key={product.id} className="border-b border-gray-200 hover:bg-blue-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <span className="font-semibold">{product.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs ${
                              product.category === 'service'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-[var(--vw-blue)] text-white'
                            }`}>
                              {product.category === 'service' ? 'Prestation' : 'Location'}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-semibold text-[var(--vw-light-blue)]">
                            {product.price.toFixed(2)}€
                          </td>
                          <td className="py-3 px-4">
                            {product.category === 'rental' ? (
                              <span className={product.stock < 3 ? 'text-red-600 font-semibold' : ''}>
                                {product.stock} unité(s)
                              </span>
                            ) : (
                              <span className="text-gray-500">Service</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            {product.category === 'rental' && product.stock < 3 ? (
                              <span className="text-red-600 text-sm">⚠️ Stock faible</span>
                            ) : (
                              <span className="text-green-600 text-sm">✓ OK</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Promotions Tab */}
            {activeTab === 'promos' && (
              <div>
                <h3 className="mb-4">Gestion des Promotions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockPromotions.map(promo => (
                    <div
                      key={promo.id}
                      className={`p-6 rounded-lg border-2 ${
                        promo.active
                          ? 'border-[var(--vw-light-blue)] bg-blue-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Code promo</p>
                          <p className="text-2xl font-bold font-mono">{promo.code}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          promo.active
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-200 text-gray-700'
                        }`}>
                          {promo.active ? 'Actif' : 'Inactif'}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Réduction</span>
                          <span className="font-semibold text-[var(--vw-light-blue)]">
                            -{promo.discount}%
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Valide jusqu'au</span>
                          <span className="font-semibold">
                            {new Date(promo.validUntil).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
