import React from 'react';

export const MenuOverlay = ({ isOpen, categories, onClose }) => {
  if (!isOpen) return null;

  const scrollToCategory = (category) => {
    const section = document.getElementById(`category-${category}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    onClose();
  };

  return (
    <>
      <div className={`menu-overlay ${isOpen ? 'show' : ''}`} onClick={onClose}>
        <div className="menu-content" onClick={(e) => e.stopPropagation()}>
          <div className="menu-header">
            <h3>メニュー</h3>
            <button className="menu-close" onClick={onClose}>×</button>
          </div>
          <div className="menu-items">
            {categories.map((category) => (
              <button
                key={category}
                className="menu-item"
                onClick={() => scrollToCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
