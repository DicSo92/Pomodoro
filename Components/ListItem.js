import React, {createRef, useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const ListItem = ({item, selectedTask, removeTask, toggleDone, updateTask, toggleSelectedTask}) => {
    const textInputItem = createRef();

    const [title, setTitle] = useState(item.title)

    const changeTask = () => {
        textInputItem.current.blur()
        updateTask(title)
    }


    return (
        <View style={[styles.container, (selectedTask && selectedTask.id === item.id) && styles.selected]}>
            <TextInput value={title} style={[styles.item, item.isDone && styles.disabled]}
                       ref={textInputItem}
                       placeholder={'Task name...'}
                       onChangeText={value => setTitle(value)}
                       onBlur={changeTask}
                       onSubmitEditing={changeTask}
                       editable={!item.isDone}
            />

            <TouchableOpacity onPress={toggleDone}>
                <Icon name="check" size={25} color={item.isDone ? '#358600' : '#D6D6D6'} style={{marginRight: 10}}/>
            </TouchableOpacity>

            {/*<TouchableOpacity onPress={!item.isDone ? toggleSelectedTask : null}>*/}
            <TouchableOpacity onPress={toggleSelectedTask}>
                <Icon name="play" size={25} color={item.isDone ? '#D6D6D6' : '#f4511e'} style={{marginRight: 10}}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={removeTask}>
                <Icon name="trash" size={25} color="#A41324"/>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        padding: 10,
    },
    selected: {
        backgroundColor: 'rgba(244,81,30,0.10)'
    },

    item: {
        flex: 1,
        fontSize: 18,
        color: 'black'
    },
    disabled: {
        color: 'gray',
        textDecorationLine: 'line-through'
    }
})
export default ListItem
