import React from 'react';
import { DishCard } from './DishCard';
import { getCategoryNames } from '../constants/categoryNames';

export const CategorySection = ({
  category,
  dishes,
  selectedDishes,
  discontinuedDishes,
  isLastCategory,
  onSelectDish,
  onToggleDiscontinued,
  onAddDish,
  onClearCategory
}) => {
  const names = getCategoryNames(category);

  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '40px', fontWeight: '800', margin: 0, color: '#54af46', borderBottom: '3px solid #ffe15f', paddingBottom: '8px' }}>{names.en}</h3>
          <div style={{ fontSize: '18px', fontWeight: '900', marginTop: '8px' }}>{names.ja}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', padding: '40px 20px', background: 'white', borderRadius: '12px', marginBottom: '12px' }}>
        {dishes.map((dish, index) => (
          <DishCard
            key={`${category}-${dish.dish || index}`}
            dish={dish}
            category={category}
            isSelected={(selectedDishes[category] || []).includes(dish.dish)}
            isDiscontinued={(discontinuedDishes[category] || []).includes(dish.dish)}
            onSelect={onSelectDish}
            onToggleDiscontinued={onToggleDiscontinued}
          />
        ))}
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <button
          onClick={() => onAddDish(category)}
          style={{ padding: '10px 16px', background: '#54af46', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '900', flex: 1 }}
        >
          + 追加
        </button>

        <button
          onClick={() => onClearCategory(category)}
          style={{ padding: '10px 16px', background: '#ffe15f', color: '#92400e', border: '2px solid #ffe15f', borderRadius: '12px', cursor: 'pointer', fontWeight: '900', flex: 1 }}
        >
          クリア
        </button>
      </div>

      {!isLastCategory && (
        <div style={{ textAlign: 'center', padding: '16px 0', fontSize: '50px', color: '#54af46' }}>
          ↓
        </div>
      )}
    </div>
  );
};