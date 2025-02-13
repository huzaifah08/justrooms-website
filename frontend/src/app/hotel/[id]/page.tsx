// app/hotel/[id]/page.tsx
'use client';

import { useSearchParams, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HotelDetailsPage() {
  const { id } = useParams() || {};
  const [hotel, setHotel] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/hotel?id=${id}`)
        .then(res => res.json())
        .then(data => setHotel(data))
        .catch(err => console.error(err));
    }
  }, [id]);

  if (!hotel) return <p>Loading hotel details...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{hotel.name}</h1>
      <p>{hotel.description}</p>
      {/* More details, images, etc. */}
    </div>
  );
}
