import React from 'react';
import { getCategoryNames } from '../constants/categoryNames';

export const CategoryNavigation = ({ categories }) => {
  return (
    <div style={{ background: '#FFD93D', display: 'flex', gap: '8px', padding: '8px', overflowX: 'auto', position: 'sticky', top: '70px', zIndex: 99 }}>
      {categories.map(cat => {
        const names = getCategoryNames(cat);
        return (
          <button
            key={cat}
            style={{
              padding: '3px 4px',
              background: '#FFD93D',
              border: 'none',
              fontSize: '10px',
              fontWeight: '500',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {names.en}
          </button>
        );
      })}
    </div>
  );
};