import React, {useState, createRef} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, Text} from 'react-native';


const AddTask = ({addTask}) => {
    const textInput = createRef();

    const [title, setTitle] = useState('')

    const submitTask = () => {
        addTask(title)
        textInput.current.clear()
    }

    return (
        <View style={styles.container}>
            <TextInput value={title} style={styles.input}
                       ref={textInput}
                       placeholder={'New task name...'}
                       onChangeText={value => setTitle(value)}
                       onSubmitEditing={submitTask}/>
            <TouchableOpacity onPress={submitTask} style={styles.button}>
                <Text style={styles.buttonText}>ADD</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // alignItems: 'center',
        margin: 10
    },
    input: {
        padding: 10,
        fontSize: 18,
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,
        flex: 3,
        marginRight: 10,
    },
    button: {
        borderRadius: 5,
        backgroundColor: '#f4511e',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    buttonText: {
        color: 'white'
    }
})

export default AddTask
