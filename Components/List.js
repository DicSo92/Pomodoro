import React from 'react';
import {StyleSheet, FlatList} from 'react-native';

import ListItem from './ListItem'

const List = ({datas, removeTask}) => {
    const renderItem = ({item}) => (
        <ListItem item={item} removeTask={() => removeTask(item.id)}/>
    )

    return (
        <FlatList
            data={datas}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
        />
    )
}

const styles = StyleSheet.create({
    //
})
export default List
