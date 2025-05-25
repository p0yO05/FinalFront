import React from 'react';
import CreateTradeOffers from '../components/Blackmarket/CreateTradeOffers';

const Market: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center py-8">
      <h1 className="text-3xl font-extrabold text-yellow-300 mb-6">Mercado Negro</h1>
      <CreateTradeOffers />
    </div>
  );
};

export default Market;