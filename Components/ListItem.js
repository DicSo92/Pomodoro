import React, {createRef, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const ListItem = ({item}) => {
    const textInputItem = createRef();

    const [title, setTitle] = useState(item.title)

    const changeTask = () => {
        textInputItem.current.blur()
    }


    return (
        <View style={styles.container}>
            <TextInput value={title} style={[styles.item, item.isDone ? styles.disabled : '']}
                       ref={textInputItem}
                       placeholder={'Task name...'}
                       onChangeText={value => setTitle(value)}
                       onBlur={changeTask}
                       onSubmitEditing={changeTask}/>


            <Icon name="check" size={25} color={item.isDone ? '#358600' : '#D6D6D6'} style={{marginRight: 10}}/>
            <Icon name="play" size={25} color="#f4511e" style={{marginRight: 10}}/>
            <Icon name="trash" size={25} color="#A41324" />
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

    item: {
        flex: 1,
        fontSize: 18,
    },
    disabled: {
        color: 'gray',
        textDecorationLine: 'line-through'
    }
})
export default ListItem
