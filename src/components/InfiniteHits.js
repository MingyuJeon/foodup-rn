import React from 'react';
import {StyleSheet, Text, View, FlatList, TouchableWithoutFeedback, KeyboardAvoidingView} from 'react-native';
import {connectInfiniteHits} from 'react-instantsearch-native';
import Highlight from './Highlight';
import EStyleSheet from 'react-native-extended-stylesheet';
import debounce from 'lodash.debounce';

const InfiniteHits = ({flag, hits, hasMore, refine, moveTo}) => {
    let data;

    if (flag === 'stores') {
        data = hits.filter(hit => hit.hasOwnProperty('addr'))
    } else {
        data = hits
    }
    return (
        <>
            {
                data.length ?
                    <KeyboardAvoidingView style={{
                        flex: 1,
                    }} behavior={Platform.OS === 'ios' ? 'padding' : null}>
                        <FlatList
                            data={data}
                            keyExtractor={item => item.objectID}
                            onEndReached={() => hasMore && refine()}
                            renderItem={({item}) => {
                                if (!item.hide) {
                                    return (
                                        <TouchableWithoutFeedback onPress={debounce(() => moveTo(item.name), 250)}>
                                            <View style={styles.item}>
                                                <Highlight attribute="name" hit={item}/>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )
                                } else {
                                    return null;
                                }
                            }}
                            style={{flex: 1}}
                        />
                    </KeyboardAvoidingView>
                    :
                    <View style={styles.nothingWrapper}>
                        <Text style={styles.nothing}>검색결과 없음</Text>
                    </View>
            }
            </>
    );
}

const styles = EStyleSheet.create({
    separator: {
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    item: {
        paddingLeft: 50,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'column',
    },
    titleText: {
        fontWeight: 'bold',
    },
    nothingWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flex:1
    },
    nothing: {
        fontFamily: '$font',
        fontSize: 15
    }
});

export default connectInfiniteHits(InfiniteHits);
