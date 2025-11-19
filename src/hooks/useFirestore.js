import { useState, useEffect } from 'react';
import { fetchFoodsFromFirestore, addFoodToFirestore, updateFoodStatusInFirestore } from '../firebase/firebaseService';

export const useFirestore = () => {
  const [nutritionData, setNutritionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Firestoreからデータを読み込み
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchFoodsFromFirestore();
        setNutritionData(data);
      } catch (err) {
        setError(err);
        console.error('データ読み込みエラー:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // 新しい料理を追加
  const addDish = async (dish) => {
    try {
      const newDish = await addFoodToFirestore(dish);
      setNutritionData(prev => [...prev, newDish]);
      return newDish;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  // 販売状態を更新
  const updateDishStatus = async (foodId, status) => {
    try {
      await updateFoodStatusInFirestore(foodId, status);
      setNutritionData(prev =>
        prev.map(dish =>
          dish.id === foodId ? { ...dish, status } : dish
        )
      );
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  return {
    nutritionData,
    loading,
    error,
    addDish,
    updateDishStatus
  };
};