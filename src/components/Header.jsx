import React from 'react';
import { Menu } from 'lucide-react';

export const Header = ({ onMenuClick }) => {
  return (
    <div style={{ background: '#FFD93D', textAlign: 'center', padding: '10px 0', position: 'sticky', top: 0, zIndex: 100 }}>
      <h1 style={{ fontSize: '24px', fontWeight: '900', margin: 0 }}>栄養メニュー</h1>
    </div>
  );
};