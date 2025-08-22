"use client";

import React, { useState } from "react";

export default function HotelSearch() {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `http://localhost:8080/api/search-hotels?destination=${encodeURIComponent(
          destination
        )}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      const data = await res.json();
      console.log("🔎 Frontend received data:", data);

      // some Ratehawk responses wrap results differently
      setResults(data.hotels || data.results || []);
    } catch (err: any) {
      console.error("Error fetching hotels:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-md p-4 w-full max-w-3xl mx-auto mt-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 justify-center"
      >
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="number"
          min="1"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="bg-brandBlue text-white px-4 py-2 rounded font-medium hover:bg-blue-600"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Results */}
      <div className="mt-6">
        {error && <p className="text-red-500">{error}</p>}

        {results.length > 0 ? (
          results.map((hotel: any, idx: number) => (
            <div key={idx} className="border-b py-2">
              <h3 className="font-bold">{hotel.name}</h3>
              {hotel.address && <p>{hotel.address}</p>}
              {hotel.lowest_price && (
                <p className="text-sm text-gray-600">
                  From {hotel.lowest_price.amount} {hotel.lowest_price.currency}
                </p>
              )}
            </div>
          ))
        ) : (
          !loading && !error && <p>No results yet</p>
        )}
      </div>
    </div>
  );
}
