import React, { useState } from 'react';
import { CreditCard, ArrowLeft, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

interface CheckoutPageProps {
  onNavigate: (page: string) => void;
}

export const CheckoutPage = ({ onNavigate }: CheckoutPageProps) => {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulation de paiement
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setOrderComplete(true);
    toast.success('Paiement effectué avec succès !');
    
    // Clear cart après 2 secondes
    setTimeout(() => {
      clearCart();
      onNavigate('account');
    }, 3000);
  };

  if (!user) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6">Connexion requise</h2>
          <p className="text-gray-600 mb-8">Veuillez vous connecter pour finaliser votre commande</p>
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

  if (orderComplete) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center border-2 border-gray-200">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="mb-4">Commande confirmée !</h2>
            <p className="text-gray-600 mb-6">
              Votre commande a été enregistrée avec succès. Vous recevrez un email de confirmation sous peu.
            </p>
            <p className="text-sm text-gray-500">
              Redirection vers votre compte...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <button
          onClick={() => onNavigate('cart')}
          className="flex items-center gap-2 text-[var(--vw-blue)] hover:text-[var(--vw-light-blue)] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour au panier
        </button>

        <h1 className="mb-8">Paiement</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div>
            <form onSubmit={handlePayment} className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
              <h3 className="mb-4">Informations de paiement</h3>

              {/* Payment Method */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">Méthode de paiement</label>
                <div className="space-y-2">
                  <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === 'stripe' 
                      ? 'border-[var(--vw-light-blue)] bg-blue-50' 
                      : 'border-gray-200 hover:border-[var(--vw-blue)]'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="stripe"
                      checked={paymentMethod === 'stripe'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'stripe')}
                      className="w-4 h-4 accent-[var(--vw-light-blue)]"
                    />
                    <CreditCard className="w-5 h-5" />
                    <span>Carte Bancaire (Stripe)</span>
                  </label>

                  <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === 'paypal' 
                      ? 'border-[var(--vw-light-blue)] bg-blue-50' 
                      : 'border-gray-200 hover:border-[var(--vw-blue)]'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'paypal')}
                      className="w-4 h-4 accent-[var(--vw-light-blue)]"
                    />
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#003087">
                      <path d="M20.905 9.5c.178-1.135.098-1.904-.254-2.522-.446-.779-1.336-1.178-2.644-1.178h-5.618c-.395 0-.731.286-.794.676l-2.338 14.719c-.047.295.181.555.481.555h3.5l.879-5.548-.028.176c.063-.39.395-.676.789-.676h1.644c3.232 0 5.762-1.315 6.5-5.117.023-.118.042-.232.06-.343-.093-.052-.093-.052 0 0 .223-1.436.024-2.417-.677-3.242z"/>
                    </svg>
                    <span>PayPal</span>
                  </label>
                </div>
              </div>

              {/* Card Details (Demo) */}
              {paymentMethod === 'stripe' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Numéro de carte</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--vw-light-blue)]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Expiration</label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--vw-light-blue)]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--vw-light-blue)]"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-[var(--vw-light-blue)] text-white py-3 rounded-lg hover:bg-[var(--vw-blue)] transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Traitement en cours...' : `Payer ${totalPrice.toFixed(2)}€`}
              </button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                🔒 Paiement sécurisé - Vos données sont protégées
              </p>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
              <h3 className="mb-4">Récapitulatif de la commande</h3>

              <div className="space-y-3 mb-4">
                {cart.map(item => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <div>
                      <p className="font-semibold">{item.product.name}</p>
                      <p className="text-gray-500">Quantité: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-[var(--vw-light-blue)]">
                      {(item.product.price * item.quantity).toFixed(2)}€
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold">Total</span>
                  <span className="text-2xl font-bold text-[var(--vw-light-blue)]">
                    {totalPrice.toFixed(2)}€
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Note:</strong> Ceci est une démonstration. Aucun paiement réel n'est effectué.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
