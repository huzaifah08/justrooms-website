import React from 'react';

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: '1rem',
  background: '#333',
  color: '#fff',
  marginTop: '2rem'
};

export default function Footer() {
  return (
    <footer style={footerStyle}>
      <p>&copy; {new Date().getFullYear()} JustRooms. All rights reserved.</p>
    </footer>
  );
}
