// app/page.tsx
import HotelSearch from './components/hotel-search';

export default function HomePage() {
  return (
    <section style={{ textAlign: 'center', padding: '2rem' }}>
      <h1 className="sr-only">JustRooms - Find the Best Hotels</h1>


      <HotelSearch />
    </section>
  );
}
