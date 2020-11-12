import React, { useState } from 'react';
import {View, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import Svg,{ Circle } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';

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
        isDone: true
    },
    {
        id: 3,
        title: 'exemple3',
        isDone: false
    }
]

const headerHeight = 175
const screen = Dimensions.get('window');


const Home = () => {
    const [tasks, setTasks] = useState(fakeTasks)
    const [isVisible, setIsVisible] = useState(false);

    const _addTask = (title) => {
        setTasks([...tasks, { id: new Date().getTime(), title, isDone: false}])
    }
    const _removeTask = (id) => {
        let array = [...tasks]; // make a separate copy of the array
        let index = array.findIndex(item => item.id === id)
        if (index !== -1) {
            array.splice(index, 1);
            setTasks(array);
        }
    }
    const toggleInput = () => {
        setIsVisible(!isVisible)
    }

    return (
        <View style={styles.container}>
            <View style={styles.timerContainer}>
                <Svg height={headerHeight} width={screen.width}>
                    <Circle
                        cx={screen.width / 2}
                        cy={`-${898 - headerHeight + 2}`}
                        r="898.5" fill="#f4511e"
                        stroke="#ccc"
                        strokeWidth="2"
                    />
                </Svg>
                <View style={styles.absoluteInfos}>
                    <Text style={styles.task}>Task :</Text>
                    <Text style={styles.taskName}>Exemple1</Text>
                </View>
                <Text style={styles.timer}>19.44</Text>
                <TouchableOpacity
                    onPress={toggleInput}
                    style={styles.roundButton}>
                    <Icon name="plus" size={35} color="#eee" />
                </TouchableOpacity>
            </View>

            {isVisible ? <AddTask addTask={_addTask} style={styles.flex1}/> : null}

            <List style={styles.flex3} datas={tasks} removeTask={_removeTask}/>
        </View>)
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column'
    },
    timerContainer: {
        position: 'relative',
        marginBottom: 23
    },
    absoluteInfos: {
        position: 'absolute',
        top: 5,
        right: 5,
        flex: 1,
        alignItems: 'flex-end'
    },
    task: {
        textDecorationLine: 'underline',
        color: '#f2f2f2',
        fontWeight: 'bold'
    },
    taskName: {
        color: '#f2f2f2',

    },
    timer: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold',
        color: '#f2f2f2',

        position: 'absolute',
        alignSelf: 'center',
        top: headerHeight * 0.3
    },
    roundButton: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#33658A',
        alignSelf: 'center',
        borderWidth: 5,
        borderColor: '#f2f2f2',

        position: 'absolute',
        bottom: '-18%'
    },
})
export default Home
