import React, { useState } from 'react';
import { Trash2, Plus, Minus, CreditCard, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

interface CartPageProps {
  onNavigate: (page: string) => void;
}

export const CartPage = ({ onNavigate }: CartPageProps) => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const { user } = useAuth();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleApplyPromo = () => {
    const codes: { [key: string]: number } = {
      'VWBLUE': 15,
      'WINTER25': 20,
      'CLASSIC': 10
    };

    if (codes[promoCode.toUpperCase()]) {
      setDiscount(codes[promoCode.toUpperCase()]);
      toast.success(`Code promo appliqué ! -${codes[promoCode.toUpperCase()]}%`);
    } else {
      toast.error('Code promo invalide');
    }
  };

  const finalPrice = totalPrice - (totalPrice * discount / 100);

  const handleCheckout = () => {
    if (!user) {
      toast.error('Veuillez vous connecter pour finaliser votre commande');
      onNavigate('login');
      return;
    }
    onNavigate('checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6">Votre panier est vide</h2>
          <p className="text-gray-600 mb-8">Découvrez nos prestations et outils de location</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => onNavigate('services')}
              className="bg-[var(--vw-light-blue)] text-white px-6 py-3 rounded-lg hover:bg-[var(--vw-blue)] transition-colors"
            >
              Voir les Prestations
            </button>
            <button
              onClick={() => onNavigate('rentals')}
              className="bg-[var(--vw-blue)] text-white px-6 py-3 rounded-lg hover:bg-[var(--vw-dark-blue)] transition-colors"
            >
              Voir les Locations
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-[var(--vw-blue)] hover:text-[var(--vw-light-blue)] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Continuer mes achats
        </button>

        <h1 className="mb-8">Mon Panier</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.map(item => (
                <div
                  key={item.product.id}
                  className="bg-white rounded-lg shadow-md p-4 border-2 border-gray-200 hover:border-[var(--vw-light-blue)] transition-colors"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg">{item.product.name}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            item.product.category === 'service'
                              ? 'bg-[var(--vw-light-blue)] text-white'
                              : 'bg-[var(--vw-blue)] text-white'
                          }`}>
                            {item.product.category === 'service' ? 'Prestation' : 'Location'}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[var(--vw-accent-red)] hover:bg-red-50 p-2 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="bg-gray-200 hover:bg-[var(--vw-blue)] hover:text-white p-1 rounded transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="bg-gray-200 hover:bg-[var(--vw-blue)] hover:text-white p-1 rounded transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{item.product.price.toFixed(2)}€ x {item.quantity}</p>
                          <p className="text-xl font-bold text-[var(--vw-light-blue)]">
                            {(item.product.price * item.quantity).toFixed(2)}€
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200 sticky top-24">
              <h3 className="mb-4">Récapitulatif</h3>

              {/* Promo Code */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Code promo</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="VWBLUE"
                    className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--vw-light-blue)]"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="bg-[var(--vw-blue)] text-white px-4 py-2 rounded-lg hover:bg-[var(--vw-dark-blue)] transition-colors"
                  >
                    OK
                  </button>
                </div>
              </div>

              <div className="border-t-2 border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Sous-total</span>
                  <span>{totalPrice.toFixed(2)}€</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[var(--vw-light-blue)]">
                    <span>Réduction (-{discount}%)</span>
                    <span>-{(totalPrice * discount / 100).toFixed(2)}€</span>
                  </div>
                )}
                <div className="border-t-2 border-gray-200 pt-2 flex justify-between items-center">
                  <span className="font-bold">Total</span>
                  <span className="text-2xl font-bold text-[var(--vw-light-blue)]">
                    {finalPrice.toFixed(2)}€
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-[var(--vw-light-blue)] text-white py-3 rounded-lg hover:bg-[var(--vw-blue)] transition-colors mt-6 flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Procéder au paiement
              </button>

              <button
                onClick={clearCart}
                className="w-full text-[var(--vw-accent-red)] py-2 rounded-lg hover:bg-red-50 transition-colors mt-2"
              >
                Vider le panier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
