import { openDB } from 'idb';

export const getDB = () => {
  return openDB('canteen-db', 1, {
    upgrade(db) {
      db.createObjectStore('feedback', { keyPath: 'id', autoIncrement: true });
    },
  });
};

export async function saveFeedback(feedback) {
  const db = await getDB();
  await db.add('feedback', feedback);
}

export async function getAllFeedback() {
  const db = await getDB();
  return await db.getAll('feedback');
}

export async function clearFeedback() {
  const db = await getDB();
  await db.clear('feedback');
}