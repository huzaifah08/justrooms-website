'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HotelSearch() {
  const [tab, setTab] = useState<'hotels' | 'cars'>('hotels');
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [rooms, setRooms] = useState('1 Room, 2 Guests');
  const router = useRouter();

  const handleTabChange = (t: 'hotels' | 'cars') => setTab(t);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Example: navigate to a search page
    router.push(`/search?destination=${destination}&checkIn=${dates}&rooms=${rooms}`);
  };

  return (
    <div className="bg-white border border-gray-300 rounded-md p-4 w-full max-w-3xl mx-auto mt-4">
      {/* Tab Row */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          onClick={() => handleTabChange('hotels')}
          className={`flex-1 py-2 text-center font-bold ${
            tab === 'hotels'
              ? 'border-b-2 border-brandBlue text-brandBlue'
              : 'text-gray-600'
          }`}
        >
          Hotels
        </button>
        <button
          onClick={() => handleTabChange('cars')}
          className={`flex-1 py-2 text-center font-bold ${
            tab === 'cars'
              ? 'border-b-2 border-brandBlue text-brandBlue'
              : 'text-gray-600'
          }`}
        >
          Cars
        </button>
      </div>
      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 justify-center">
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="flex-1 min-w-[200px] p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          placeholder="Fri 25 Aug 2023 - Tue 29 Aug 2023"
          value={dates}
          onChange={(e) => setDates(e.target.value)}
          className="flex-1 min-w-[200px] p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          placeholder="1 Room, 2 Guests"
          value={rooms}
          onChange={(e) => setRooms(e.target.value)}
          className="flex-1 min-w-[200px] p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="bg-brandBlue text-white px-4 py-2 rounded font-medium hover:bg-blue-600"
        >
          Search
        </button>
      </form>
    </div>
  );
}
