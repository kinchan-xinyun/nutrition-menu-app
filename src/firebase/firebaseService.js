import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from './config';

export const fetchFoodsFromFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'menuItems'));
    const data = [];
    querySnapshot.forEach((docSnapshot) => {
      const rawData = docSnapshot.data();
      // Firestoreのフィールド名をアプリの形式に変換
      const mappedData = {
        id: docSnapshot.id,
        category: rawData.category,
        dish: rawData.dishName || rawData.dish,
        protein: rawData.protein || 0,
        fat: rawData.fat || 0,
        carbs: rawData.carbohydrates || rawData.carbs || 0,
        calories: rawData.totalCalories || rawData.calories || 0,
        image: rawData.imageUrl || rawData.image || '',
        status: rawData.status || '販売中',
        discontinued: rawData.status === '販売中止'
      };
      data.push(mappedData);
    });
    return data;
  } catch (error) {
    console.error('Firestoreからの読み込みに失敗:', error);
    return [];
  }
};

export const addFoodToFirestore = async (dish) => {
  try {
    // アプリの形式からFirestoreの形式に変換
    const firestoreData = {
      category: dish.category,
      dishName: dish.dish,
      protein: dish.protein || 0,
      fat: dish.fat || 0,
      carbohydrates: dish.carbs || 0,
      totalCalories: dish.calories || 0,
      imageUrl: dish.image || '',
      status: dish.status || '販売中'
    };
    
    const docRef = await addDoc(collection(db, 'menuItems'), firestoreData);
    
    // 追加したデータをアプリの形式で返す
    return {
      id: docRef.id,
      category: dish.category,
      dish: dish.dish,
      protein: dish.protein || 0,
      fat: dish.fat || 0,
      carbs: dish.carbs || 0,
      calories: dish.calories || 0,
      image: dish.image || '',
      status: dish.status || '販売中'
    };
  } catch (error) {
    console.error('Firestoreへの追加に失敗:', error);
    throw error;
  }
};

export const updateFoodStatusInFirestore = async (foodId, status) => {
  try {
    await updateDoc(doc(db, 'menuItems', foodId), { status });
  } catch (error) {
    console.error('Firestoreの更新に失敗:', error);
    throw error;
  }
};