import {db} from '../api';

const categoryRef = db.collection('categories');

export const fetchCategories = async () => {
    try {
        return await categoryRef
            .where('isFeaturedCategory', '==', true)
            .orderBy('weight', 'desc')//TODO: 현재 weight가 문자열로 들어가 있음 => admin panel 수정 예정
            .get()
            .then(async res => await res.docs.map(x => x.data()));

    } catch (e) {
        console.log(e);
    }
};

export const fetchCategory = async (name) => {
    try {
        return await categoryRef
            .doc(name)
            .get()
            .then(res => res.data());
    } catch (e) {
        console.log(e);
    }
};

export const fetchRelatedStores = async (name) => { // count가 속한 컬렉션이 relatedStore 이기 때문에 storeRef와 where를 활용한 호출 불가
    try {
        return await categoryRef
            .doc(name)
            .collection('relatedStore')
            .where('hide', '==', false)
            .orderBy('count', 'desc')
            .limit(15)
            .get()
            .then((snapshots) => {
                let lastVisible = snapshots.docs[snapshots.docs.length - 1];
                let stores = [];
                snapshots.docs.map(x => stores.push(x.data()));
                return {stores, lastVisible};
            });
    } catch (e) {
        console.log(e);
    }
};

export const fetchMore = (name, lastVisible) => {
    return categoryRef
        .doc(name)
        .collection('relatedStore')
        .where('hide', '==', false)
        .orderBy('count', 'desc')
        .startAfter(lastVisible)
        .limit(15)
        .get()
        .then((snapshots) => {
            let lastVisible;
            let stores = [];
            snapshots.docs
                .map(x => {
                    stores.push(x.data());
                })
                .length < 5 ? (lastVisible = null) : (lastVisible = snapshots.docs[snapshots.docs.length - 1]);
            return {stores, lastVisible};
        });
};
