import React from 'react';
import {StyleSheet, FlatList} from 'react-native';

import ListItem from './ListItem'

const List = ({datas}) => {
    const renderItem = ({item}) => (
        <ListItem item={item} />
    )

    return (
        <FlatList
            data={datas}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
    )
}

const pixelLength = 20

const styles = StyleSheet.create({
    //
})
export default List
