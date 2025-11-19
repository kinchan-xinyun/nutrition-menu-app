import React from 'react';

export const DishCard = ({ dish, category, isSelected, isDiscontinued, onSelect, onToggleDiscontinued }) => {
  return (
    <div
      onClick={() => !isDiscontinued && onSelect(category, dish.dish)}
      style={{
        minWidth: '160px',
        maxWidth: '120px',
        padding: '12px',
        border: `2px solid ${isSelected ? '#c3b990' : 'transparent'}`,
        borderRadius: '12px',
        background: isSelected ? '#faeeb8' : 'transparent',
        cursor: isDiscontinued ? 'not-allowed' : 'pointer',
        opacity: isDiscontinued ? 0.5 : 1,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexShrink: 0
      }}
    >
      <div style={{ width: '75%', height: '80px', borderRadius: '50%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', marginBottom: '8px', overflow: 'hidden' }}>
        {dish.image ? (
          <img 
            src={dish.image.startsWith('data:') || dish.image.startsWith('http') || dish.image.startsWith('/') ? dish.image : `/${dish.image}`} 
            alt={dish.dish || '料理'} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '🍽️';
            }}
          />
        ) : (
          '🍽️'
        )}
      </div>

      <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: '12px', padding: '12px 8px', width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: '12px', fontWeight: '900', marginBottom: '4px' }}>{dish.dish}</div>
        <div style={{ fontSize: '16px', fontWeight: '700', color: '#54af46', marginBottom: '2px' }}>{(dish.calories || 0).toFixed(0)}</div>
        <div style={{ fontSize: '9px', color: '#6b7280', marginBottom: '8px' }}>kcal</div>
        
        {/* PFC表示 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
            <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(231, 76, 60, 0.15)', color: '#e74c3c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '900' }}>P</div>
            <span style={{ fontWeight: '700', fontSize: '12px', color: '#e74c3c' }}>{(dish.protein || 0).toFixed(1)}</span>
            <span style={{ fontSize: '9px', color: '#6b7280' }}>g</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
            <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(241, 196, 15, 0.15)', color: '#f1c40f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '900' }}>F</div>
            <span style={{ fontWeight: '700', fontSize: '12px', color: '#f1c40f' }}>{(dish.fat || 0).toFixed(1)}</span>
            <span style={{ fontSize: '9px', color: '#6b7280' }}>g</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
            <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(155, 204, 80, 0.15)', color: '#9bcc50', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '900' }}>C</div>
            <span style={{ fontWeight: '700', fontSize: '12px', color: '#9bcc50' }}>{(dish.carbs || 0).toFixed(1)}</span>
            <span style={{ fontSize: '9px', color: '#6b7280' }}>g</span>
          </div>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleDiscontinued(category, dish);
        }}
        style={{ position: 'absolute', top: '2px', left: '2px', width: '24px', height: '24px', borderRadius: '50%', border: 'none', background: '#ff6b6b', color: 'white', fontSize: '16px', fontWeight: '700', cursor: 'pointer', padding: 0 }}
      >
        ×
      </button>
    </div>
  );
};