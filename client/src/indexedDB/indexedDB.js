import { openDB } from 'idb'

export const dbPromise = openDB('learningAppDB', 1, {
    upgrade(db) {
        if (!db.objectStoreNames.contains('boughtCourses')) {
            const store = db.createObjectStore('boughtCourses', {
                keyPath: 'courseId',
            })
            store.createIndex('title', 'title', { unique: false });
            store.createIndex('instructorId', 'instructorId', { unique: false });
        }
    }
})

export async function saveBoughtCourses(courses) {
    const db = await dbPromise;
    const tx = db.transaction('boughtCourses', 'readwrite');
    const store = tx.store;
    for (const course of courses) {
        await store.put(course);   // put is insert-or-update
    }
    await tx.done;
}

export async function getBoughtCourses() {
  const db = await dbPromise;
  return await db.getAll('boughtCourses');
}

export async function clearBoughtCourses() {
  const db = await dbPromise;
  const tx = db.transaction('boughtCourses', 'readwrite');
  await tx.store.clear();
  await tx.done;
}
