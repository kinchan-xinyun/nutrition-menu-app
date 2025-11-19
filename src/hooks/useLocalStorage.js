import { useState, useEffect } from 'react';

const STORAGE_KEY = 'selectedDishes';

export const useLocalStorage = () => {
  const [selectedDishes, setSelectedDishes] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  // LocalStorageから初期値を読み込み
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setSelectedDishes(JSON.parse(saved));
      }
    } catch (error) {
      console.error('LocalStorageからの読み込みに失敗:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // selectedDishesが変更されたときにLocalStorageに保存
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedDishes));
      } catch (error) {
        console.error('LocalStorageへの保存に失敗:', error);
      }
    }
  }, [selectedDishes, isLoaded]);

  return {
    selectedDishes,
    setSelectedDishes,
    isLoaded
  };
};