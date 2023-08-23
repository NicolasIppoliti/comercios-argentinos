import { getFirestore, collection, query, where, getDocs, getDoc, addDoc, updateDoc, doc } from 'firebase/firestore';

const saveRating = async (userId, businessId, rating) => {
    const db = getFirestore();
    const ratingsRef = collection(db, 'ratings');
    const q = query(ratingsRef, where('userId', '==', userId), where('businessId', '==', businessId));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        // Create a new rating document
        await addDoc(ratingsRef, {
            userId,
            businessId,
            rating,
        });
    } else {
        // Update the existing rating document
        const ratingDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, 'ratings', ratingDoc.id), {
            rating,
        });
    }
};

const getAverageRating = async (businessId) => {
    const db = getFirestore();
    const ratingsRef = collection(db, 'ratings');
    const q = query(ratingsRef, where('businessId', '==', businessId));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        return 0;
    }

    let totalRating = 0;
    querySnapshot.forEach((doc) => {
        totalRating += doc.data().rating;
    });

    return totalRating / querySnapshot.size;
};

const getUserRating = async (userId, businessId) => {
    const db = getFirestore();
    const ratingRef = doc(db, 'users', userId, 'ratings', businessId);
    const ratingDoc = await getDoc(ratingRef);

    if (ratingDoc.exists()) {
        return ratingDoc.data().rating;
    }
    return null;
};

const getRatingCount = async (businessId) => {
    const db = getFirestore();
    const ratingsRef = collection(db, 'ratings');
    const q = query(ratingsRef, where('businessId', '==', businessId));

    const querySnapshot = await getDocs(q);

    return querySnapshot.size;
};

export { saveRating, getAverageRating, getUserRating, getRatingCount };