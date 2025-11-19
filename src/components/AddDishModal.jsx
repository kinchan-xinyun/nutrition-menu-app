import React from 'react';

export const AddDishModal = ({ isOpen, category, formData, onFormChange, onImageChange, onSubmit, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'flex-end' }}>
      <div
        style={{
          background: 'white',
          width: '100%',
          borderRadius: '20px 20px 0 0',
          padding: '24px',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>{category} を追加</h3>
          <button onClick={onCancel} style={{ fontSize: '32px', fontWeight: 'bold', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            ×
          </button>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>画像</label>
          <div
            style={{
              width: '100%',
              height: '180px',
              border: '2px dashed #ffe15f',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#ffe15f',
              marginBottom: '15px',
              overflow: 'hidden'
            }}
          >
            {formData.image ? (
              <img src={formData.image} alt="preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            ) : (
              <span style={{ color: '#6b7280', fontSize: '14px' }}>ここに画像が表示されます</span>
            )}
          </div>
          <input type="file" accept="image/*" onChange={onImageChange} style={{ width: '100%', padding: '12px', border: '2px solid #ffe15f', borderRadius: '12px' }} />
        </div>

        {[
          { key: 'dishName', label: '料理名', placeholder: '例：チキンサラダ', type: 'text' },
          { key: 'calories', label: 'カロリー (kcal)', placeholder: '0', type: 'number' },
          { key: 'protein', label: 'タンパク質 (g)', placeholder: '0', type: 'number' },
          { key: 'fat', label: '脂質 (g)', placeholder: '0', type: 'number' },
          { key: 'carbs', label: '炭水化物 (g)', placeholder: '0', type: 'number' }
        ].map(field => (
          <div key={field.key} style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>{field.label}</label>
            <input
              type={field.type}
              value={formData[field.key]}
              onChange={(e) => onFormChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              style={{ width: '100%', padding: '14px 16px', border: '2px solid #ffe15f', borderRadius: '12px', fontSize: '16px', boxSizing: 'border-box' }}
            />
          </div>
        ))}

        <div style={{ display: 'flex', gap: '10px', marginTop: '25px', paddingTop: '20px', borderTop: '1px solid #ffe15f' }}>
          <button
            onClick={onCancel}
            style={{ flex: 1, padding: '14px 24px', background: '#ffe15f', border: '2px solid #ffe15f', borderRadius: '12px', cursor: 'pointer', fontWeight: '600', fontSize: '16px' }}
          >
            キャンセル
          </button>
          <button
            onClick={onSubmit}
            style={{ flex: 1, padding: '14px 24px', background: '#54af46', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '600', fontSize: '16px' }}
          >
            追加
          </button>
        </div>
      </div>
    </div>
  );
};