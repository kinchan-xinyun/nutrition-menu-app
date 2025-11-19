import React from 'react';

export const NutritionInfo = ({ totals, pfcBreakdown, selectedDishData, onRemoveDish }) => {
  return (
    <div style={{ padding: '16px', background: 'white', borderBottom: '2px solid #ffe15f' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', gap: '12px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', margin: 0 }}>栄養情報（合計）</h2>
        <div style={{ background: 'linear-gradient(135deg, #9bcc50 0%, #4a9b65 100%)', color: 'white', padding: '12px 20px', borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', fontWeight: '800' }}>{(totals?.calories || 0).toFixed(1)}</div>
          <div style={{ fontSize: '18px', opacity: 0.95 }}>kcal</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
        {[
          { label: 'P', value: (totals?.protein || 0).toFixed(2), color: '#e74c3c', name: 'タンパク質' },
          { label: 'F', value: (totals?.fat || 0).toFixed(2), color: '#f1c40f', name: '脂質' },
          { label: 'C', value: (totals?.carbs || 0).toFixed(2), color: '#9bcc50', name: '炭水化物' }
        ].map(item => (
          <div key={item.label} style={{ background: 'white', border: `2px solid ${item.color}`, borderRadius: '12px', padding: '12px 8px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '900', marginBottom: '4px', color: item.color }}>{item.label}</div>
            <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '2px' }}>{item.name}</div>
            <div style={{ fontSize: '20px', fontWeight: '800', color: item.color, marginBottom: '2px' }}>{item.value}</div>
            <div style={{ fontSize: '16px', fontWeight: '500', color: '#6b7280' }}>g</div>
          </div>
        ))}
      </div>

      {/* PFCバランス */}
      <div style={{ background: '#ffe15f', padding: '16px', borderRadius: '12px', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', borderLeft: '4px solid #54af46', paddingLeft: '10px', margin: '0 0 16px 0' }}>PFCバランス</h3>
        <div style={{ background: 'linear-gradient(135deg, #e8f0eb 0%, #d1e7dd 100%)', padding: '4px', borderRadius: '20px' }}>
          <div style={{ display: 'flex', height: '32px', borderRadius: '16px', overflow: 'hidden' }}>
            <div style={{ background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)', width: `${pfcBreakdown?.proteinPercent || 0}%`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {(pfcBreakdown?.proteinPercent || 0) > 8 && <span style={{ color: 'white', fontWeight: '700', fontSize: '14px' }}>{(pfcBreakdown?.proteinPercent || 0).toFixed(0)}%</span>}
            </div>
            <div style={{ background: 'linear-gradient(135deg, #f1c40f 0%, #d4ac0d 100%)', width: `${pfcBreakdown?.fatPercent || 0}%`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {(pfcBreakdown?.fatPercent || 0) > 8 && <span style={{ color: 'white', fontWeight: '700', fontSize: '14px' }}>{(pfcBreakdown?.fatPercent || 0).toFixed(0)}%</span>}
            </div>
            <div style={{ background: 'linear-gradient(135deg, #9bcc50 0%, #7fb347 100%)', width: `${pfcBreakdown?.carbsPercent || 0}%`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {(pfcBreakdown?.carbsPercent || 0) > 8 && <span style={{ color: 'white', fontWeight: '700', fontSize: '14px' }}>{(pfcBreakdown?.carbsPercent || 0).toFixed(0)}%</span>}
            </div>
          </div>
        </div>
      </div>

      {/* 選択されたメニュー */}
      {selectedDishData && selectedDishData.length > 0 && (
        <div style={{ padding: '16px', background: '#54af46', borderRadius: '16px' }}>
          <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', borderLeft: '4px solid #ffe15f', paddingLeft: '10px', color: 'white' }}>選択されたメニュー</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {selectedDishData.map((dish, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', background: 'white', borderRadius: '12px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', border: '2px solid #54af46', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0, overflow: 'hidden' }}>
                  {dish.image ? (
                    <img 
                      src={dish.image.startsWith('data:') || dish.image.startsWith('http') || dish.image.startsWith('/') ? dish.image : `/${dish.image}`} 
                      alt={dish.dish || '料理'} 
                      style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                      onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '🍽️'; }}
                    />
                  ) : '🍽️'}
                </div>
                <div style={{ flex: 1, fontWeight: '900', fontSize: '14px' }}>{dish.dish || '料理名なし'}</div>
                <button
                  onClick={() => onRemoveDish(dish)}
                  style={{ width: '28px', height: '28px', borderRadius: '50%', border: 'none', background: '#ff4444', color: 'white', fontSize: '20px', cursor: 'pointer', padding: 0, flexShrink: 0 }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};