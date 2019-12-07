import {db} from '../api';

const storeRef = db.collection('stores');

export const fetchStore = async (name) => {
    try {
        return await storeRef.doc(name).get().then(res => res.data());
    } catch (e) {
        console.log(e);
    }
};

export const voteDocRef = async (storeName, categoryName) => {
    const ref = await db.collection(`categories/${categoryName}/relatedStore`).doc(`${storeName}`);
    return db.runTransaction(transaction => {
        return transaction.get(ref).then((voteDoc) => {
            if (!voteDoc.exists) {
                throw 'Doesn\'t exist!';
            }

            const newCount = voteDoc.data().count + 17;

            try {
                const timeNow = Date.now();

                const obj = {count: newCount, updatedAt: timeNow};

                transaction.update(ref, obj);
                return newCount;
            } catch (e) {
                console.log(e);
            }
        });
    });
};
