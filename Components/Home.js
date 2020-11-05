import React, { useState } from 'react';
import {View, StyleSheet, TextInput, Text } from 'react-native';

import List from './List'
import AddTask from './AddTask'

const fakeTasks = [
    {
        id: 1,
        title: 'exemple1',
        isDone: false
    },
    {
        id: 2,
        title: 'exemple2',
        isDone: false
    },
    {
        id: 3,
        title: 'exemple3',
        isDone: false
    }
]


const Home = () => {
    const [tasks, setTasks] = useState(fakeTasks)

    const _addTask = (title) => {
        setTasks([...tasks, { id: new Date().getTime(), title, isDone: false}])
    }

    return (
        <View style={styles.container}>
            <Text style={styles.timer}>19.58</Text>
            <AddTask addTask={_addTask} style={styles.flex1}/>
            <List datas={tasks} style={styles.flex3}/>
        </View>)
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column'
    },
    timer: {
        textAlign: 'center',
        fontSize: 40,
    }
})
export default Home
