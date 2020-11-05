import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Button} from 'react-native';

const AddTask = ({addTask}) => {
    const [title, setTitle] = useState('')

    const onPress = () => {
        addTask(title)
    }

    return (
        <View>
            <TextInput value={title} placeholder={'some text here...'} onChangeText={value => setTitle(value)}/>
            <Button title='Le Fast' onPress={onPress}/>
        </View>
    )
}

export default AddTask
