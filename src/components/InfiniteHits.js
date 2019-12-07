import React from 'react';
import {StyleSheet, Text, View, FlatList, TouchableWithoutFeedback, KeyboardAvoidingView} from 'react-native';
import {connectInfiniteHits} from 'react-instantsearch-native';
import Highlight from './Highlight';

const styles = StyleSheet.create({
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
});

const InfiniteHits = ({flag, hits, hasMore, refine, moveTo}) => {
    let test;

    if (flag === 'stores') {
        test = hits.filter(hit => hit.hasOwnProperty('addr'))
    } else {
        test = hits
    }
    return (
        <KeyboardAvoidingView style={{
            flex: 1,
        }} behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <FlatList
                data={test}
                keyExtractor={item => item.objectID}
                onEndReached={() => hasMore && refine()}
                renderItem={({item}) => {
                    if (!item.hide) {
                        return (
                            <TouchableWithoutFeedback onPress={() => moveTo(item.name)}>
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
    );
}

export default connectInfiniteHits(InfiniteHits);
