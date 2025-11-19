import { useMemo } from 'react';

export const useNutritionCalculation = (selectedDishes, nutritionData) => {
  const totals = useMemo(() => {
    let protein = 0;
    let fat = 0;
    let carbs = 0;
    let calories = 0;

    Object.entries(selectedDishes).forEach(([category, dishNames]) => {
      dishNames.forEach(dishName => {
        const dish = nutritionData.find(
          d => d.category === category && d.dish === dishName
        );
        if (dish) {
          protein += dish.protein || 0;
          fat += dish.fat || 0;
          carbs += dish.carbs || 0;
          calories += dish.calories || 0;
        }
      });
    });

    return { protein, fat, carbs, calories };
  }, [selectedDishes, nutritionData]);

  const pfcBreakdown = useMemo(() => {
    const proteinKcal = totals.protein * 4;
    const fatKcal = totals.fat * 9;
    const carbsKcal = totals.carbs * 4;
    const totalPfcKcal = proteinKcal + fatKcal + carbsKcal;

    return {
      proteinKcal,
      fatKcal,
      carbsKcal,
      totalPfcKcal,
      proteinPercent: totalPfcKcal > 0 ? (proteinKcal / totalPfcKcal) * 100 : 0,
      fatPercent: totalPfcKcal > 0 ? (fatKcal / totalPfcKcal) * 100 : 0,
      carbsPercent: totalPfcKcal > 0 ? (carbsKcal / totalPfcKcal) * 100 : 0
    };
  }, [totals]);

  const selectedDishData = useMemo(() => {
    const data = [];
    Object.entries(selectedDishes).forEach(([category, dishNames]) => {
      dishNames.forEach(dishName => {
        const dish = nutritionData.find(
          d => d.category === category && d.dish === dishName
        );
        if (dish) data.push(dish);
      });
    });
    return data;
  }, [selectedDishes, nutritionData]);

  return {
    totals,
    pfcBreakdown,
    selectedDishData
  };
};