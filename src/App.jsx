import React, { useState } from 'react';
import { Header } from './components/Header';
import { CategoryNavigation } from './components/CategoryNavigation';
import { NutritionInfo } from './components/NutritionInfo';
import { CategorySection } from './components/CategorySection';
import { AddDishModal } from './components/AddDishModal';
import { useFirestore } from './hooks/useFirestore';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useNutritionCalculation } from './hooks/useNutritionCalculation';
import { categoryOrder } from './constants/categoryOrder';

export default function App() {
  const { nutritionData, addDish, updateDishStatus } = useFirestore();
  const { selectedDishes, setSelectedDishes, isLoaded } = useLocalStorage();
  const { totals, pfcBreakdown, selectedDishData } = useNutritionCalculation(selectedDishes, nutritionData);

  const [discontinuedDishes, setDiscontinuedDishes] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [formData, setFormData] = useState({
    dishName: '',
    calories: '',
    protein: '',
    fat: '',
    carbs: '',
    image: ''
  });

  const categories = [...new Set(nutritionData.map(d => d.category))].sort(
    (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
  );

  const toggleDishSelection = (category, dishName) => {
    const isDiscontinued = discontinuedDishes[category]?.includes(dishName);
    if (isDiscontinued) return;

    setSelectedDishes(prev => {
      const updated = { ...prev };
      if (!updated[category]) updated[category] = [];

      const isSingleSelect = category === '主食';
      if (updated[category].includes(dishName)) {
        updated[category] = updated[category].filter(d => d !== dishName);
      } else {
        if (isSingleSelect) {
          updated[category] = [dishName];
        } else {
          updated[category] = [...updated[category], dishName];
        }
      }
      return updated;
    });
  };

  const toggleDiscontinued = async (category, dish) => {
    setDiscontinuedDishes(prev => {
      const updated = { ...prev };
      if (!updated[category]) updated[category] = [];

      if (updated[category].includes(dish.dish)) {
        updated[category] = updated[category].filter(d => d !== dish.dish);
      } else {
        updated[category].push(dish.dish);
      }
      return updated;
    });

    try {
      const isDiscontinued = discontinuedDishes[category]?.includes(dish.dish);
      const newStatus = isDiscontinued ? '販売中' : '販売中止';
      if (dish.id) {
        await updateDishStatus(dish.id, newStatus);
      }
    } catch (error) {
      console.error('状態更新エラー:', error);
    }
  };

  const handleAddDish = async () => {
    if (!formData.dishName || !formData.calories) {
      alert('料理名とカロリーは必須です');
      return;
    }

    try {
      await addDish({
        category: currentCategory,
        dish: formData.dishName,  // アプリ内では dish を使用
        protein: parseFloat(formData.protein) || 0,
        fat: parseFloat(formData.fat) || 0,
        carbs: parseFloat(formData.carbs) || 0,
        calories: parseFloat(formData.calories),
        image: formData.image,
        status: '販売中'
      });
      setShowModal(false);
      setFormData({ dishName: '', calories: '', protein: '', fat: '', carbs: '', image: '' });
      alert('料理を追加しました');
    } catch (error) {
      console.error('料理の追加に失敗:', error);
      alert('料理の追加に失敗しました');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, image: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      <Header />
      <CategoryNavigation categories={categories} />

      {/* ヘッダー画像 */}
      <div style={{ background: '#f5f5f5', padding: '16px', textAlign: 'center' }}>
        <div style={{ fontSize: '60px' }}><img src="/images/plate-top.png" alt="One Plate" style={{ width: '100%', height: '100%' }} /></div>
      </div>

      {/* 説明 */}
      <div style={{ textAlign: 'center', background: '#f5f5f5', padding: '16px' }}>
        <p style={{ margin: '8px 0', fontSize: '24px', fontWeight: '900', color: '#54af46' }}>あなたの理想を叶える一皿</p>
        <p style={{ margin: '8px 0', fontSize: '16px', fontWeight: '700' }}>上から順に選ぶだけで</p>
        <p style={{ margin: '8px 0', fontSize: '16px', fontWeight: '700' }}>カロリーと PFC バランスを</p>
        <p style={{ margin: '8px 0', fontSize: '16px', fontWeight: '700' }}>簡単に確認できます</p>
      </div>

      {/* カテゴリーセクション */}
      <div style={{ padding: '16px', background: '#f5f5f5' }}>
        {categories.map((category, idx) => {
          const dishes = nutritionData.filter(d => d.category === category);
          return (
            <CategorySection
              key={category}
              category={category}
              dishes={dishes}
              selectedDishes={selectedDishes}
              discontinuedDishes={discontinuedDishes}
              isLastCategory={idx === categories.length - 1}
              onSelectDish={toggleDishSelection}
              onToggleDiscontinued={toggleDiscontinued}
              onAddDish={(cat) => {
                setCurrentCategory(cat);
                setShowModal(true);
              }}
              onClearCategory={(cat) => {
                setSelectedDishes(prev => ({ ...prev, [cat]: [] }));
              }}
            />
          );
        })}
      </div>

      {/* モーダル */}
      <AddDishModal
        isOpen={showModal}
        category={currentCategory}
        formData={formData}
        onFormChange={(key, value) => setFormData(prev => ({ ...prev, [key]: value }))}
        onImageChange={handleImageChange}
        onSubmit={handleAddDish}
        onCancel={() => setShowModal(false)}
      />

      {/* 栄養情報表示（一番下） */}
      {isLoaded && (
        <NutritionInfo 
          totals={totals} 
          pfcBreakdown={pfcBreakdown} 
          selectedDishData={selectedDishData}
          onRemoveDish={(dish) => {
            setSelectedDishes(prev => {
              const updated = { ...prev };
              updated[dish.category] = updated[dish.category].filter(d => d !== dish.dish);
              return updated;
            });
          }}
        />
      )}
    </div>
  );
}