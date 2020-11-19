import React from 'react';
import {StyleSheet, FlatList} from 'react-native';

import ListItem from './ListItem'

const List = ({datas, selectedTask, removeTask, toggleDone, updateTask, toggleSelectedTask}) => {
    const renderItem = ({item}) => (
        <ListItem item={item} selectedTask={selectedTask}
                  removeTask={() => removeTask(item.id)}
                  updateTask={(title) => updateTask(item.id, title)}
                  toggleDone={() => toggleDone(item.id)}
                  toggleSelectedTask={() => toggleSelectedTask(item)}
        />
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
