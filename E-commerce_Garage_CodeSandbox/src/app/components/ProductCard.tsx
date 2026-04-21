import React from 'react';
import { ShoppingCart, Clock, Calendar } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow border-2 border-gray-200 hover:border-[var(--vw-light-blue)]">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            product.category === 'service'
              ? 'bg-[var(--vw-light-blue)] text-white'
              : 'bg-[var(--vw-blue)] text-white'
          }`}>
            {product.category === 'service' ? 'Prestation' : 'Location'}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
          {product.duration && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{product.duration}</span>
            </div>
          )}
          {product.rentalPeriod && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>
                {product.rentalPeriod === 'hour' && 'Par heure'}
                {product.rentalPeriod === 'day' && 'Par jour'}
                {product.rentalPeriod === 'week' && 'Par semaine'}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-2xl font-bold text-[var(--vw-light-blue)]">
              {product.price.toFixed(2)}€
            </span>
            {product.rentalPeriod && (
              <span className="text-xs text-gray-500 ml-1">
                /{product.rentalPeriod === 'hour' ? 'h' : product.rentalPeriod === 'day' ? 'j' : 'sem'}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-[var(--vw-light-blue)] text-white px-4 py-2 rounded-lg hover:bg-[var(--vw-blue)] transition-colors flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Ajouter
          </button>
        </div>

        {product.category === 'rental' && (
          <p className="text-xs text-gray-500 mt-2">
            Stock disponible: {product.stock} unité(s)
          </p>
        )}
      </div>
    </div>
  );
};
