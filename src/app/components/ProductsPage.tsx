import React, { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { mockProducts } from '../data/mockData';
import { Product } from '../types';

interface ProductsPageProps {
  category?: 'service' | 'rental';
}

export const ProductsPage = ({ category }: ProductsPageProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price-asc' | 'price-desc'>('name');
  const [priceRange, setPriceRange] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  const filteredProducts = useMemo(() => {
    let filtered = category
      ? mockProducts.filter(p => p.category === category)
      : mockProducts;

    // Recherche
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtre par prix
    if (priceRange !== 'all') {
      filtered = filtered.filter(p => {
        if (priceRange === 'low') return p.price < 50;
        if (priceRange === 'medium') return p.price >= 50 && p.price < 150;
        if (priceRange === 'high') return p.price >= 150;
        return true;
      });
    }

    // Tri
    if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [category, searchQuery, sortBy, priceRange]);

  const title = category === 'service' 
    ? 'Nos Prestations de Garage'
    : category === 'rental'
    ? 'Location d\'Outils Professionnels'
    : 'Tous nos Produits et Services';

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="mb-8">{title}</h1>

        {/* Filters Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8 border-2 border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--vw-light-blue)]"
              />
            </div>

            {/* Price Range */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value as any)}
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--vw-light-blue)] bg-white appearance-none cursor-pointer"
              >
                <option value="all">Tous les prix</option>
                <option value="low">Moins de 50€</option>
                <option value="medium">50€ - 150€</option>
                <option value="high">Plus de 150€</option>
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--vw-light-blue)] bg-white cursor-pointer"
            >
              <option value="name">Trier par nom</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-gray-600 mb-4">
          {filteredProducts.length} résultat{filteredProducts.length > 1 ? 's' : ''}
        </p>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun résultat trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
};
