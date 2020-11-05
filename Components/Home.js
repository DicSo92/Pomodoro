import React, { useState } from 'react';
import {View, StyleSheet, TextInput } from 'react-native';

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
            <AddTask addTask={_addTask}/>
            <List datas={tasks} />
        </View>)
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
})
export default Home
