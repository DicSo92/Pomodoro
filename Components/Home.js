import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import Svg,{ Circle } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountDown from 'react-native-countdown-component';

import List from './List'
import AddTask from './AddTask'
import Sessions from "./Sessions";

const fakeTasks = [
    {
        id: 1,
        title: 'exemple1',
        isDone: false,
        sessionsDone: {
            session: null,
            time: null
        }
    },
    {
        id: 2,
        title: 'exemple2',
        isDone: true,
        sessionsDone: {
            session: null,
            time: null
        }
    },
    {
        id: 3,
        title: 'exemple3',
        isDone: false,
        sessionsDone: {
            session: null,
            time: null
        }
    }
]

const headerHeight = 175
const screen = Dimensions.get('window');

const sessionsDuration = 25
const pausesDuration = 5
const lastSession = 15

const Home = () => {
    const STORAGE_KEY = 'pomodoro_tasks'

    // const [tasks, setTasks] = useState(fakeTasks)
    const [tasks, setTasks] = useState([])
    const [isVisible, setIsVisible] = useState(false);
    const [time, setTime] = useState(sessionsDuration * 60)
    const [selectedTask, setSelectedTask] = useState(null)

    useEffect(() => {_readStorageData()}, [])
    useEffect(() => {_saveStorageData()}, [tasks])

    const _readStorageData = async () => {
        try {
            const tasks = await AsyncStorage.getItem(STORAGE_KEY)
            if (tasks !== null) {
                setTasks(JSON.parse(tasks))
            }
        } catch (e) {
            console.error('Failed to fetch the data from storage')
        }
    }
    const _saveStorageData = async () => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
        } catch (e) {
            console.error('Failed to save the data to the storage')
        }
    }

    const _addTask = (title) => {
        setTasks([...tasks, { id: new Date().getTime(), title, isDone: false}])
    }
    const _updateTask = (id, title) => {
        let array = [...tasks]
        let index = array.findIndex(item => item.id === id)
        if (index !== -1) {
            array[index].title = title
            setTasks(array)
        }
    }
    const _removeTask = (id) => {
        let array = [...tasks]
        let index = array.findIndex(item => item.id === id)
        if (index !== -1) {
            array.splice(index, 1);
            setTasks(array);
        }
    }
    const _toggleDone = (id) => {
        let array = [...tasks]
        let index = array.findIndex(item => item.id === id)
        if (index !== -1) {
            array[index].isDone = !array[index].isDone
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

                {selectedTask ?
                    <View style={styles.absoluteInfos}>
                        <Text style={styles.task}>Task :</Text>
                        <Text style={styles.taskName}>{selectedTask.title}</Text>
                    </View>
                    : null
                }


                <Sessions sessionsDuration={sessionsDuration}
                          pausesDuration={pausesDuration}
                          lastSession={lastSession}
                />

                <View style={styles.timerText}>
                    <CountDown
                        size={40}
                        until={65}
                        running={false}
                        onFinish={() => alert('Finished')}
                        digitStyle={{backgroundColor: 'transparent', borderWidth: 0, width: null, height: null}}
                        digitTxtStyle={{color: '#f2f2f2', fontWeight: 'bold'}}
                        separatorStyle={{color: '#f2f2f2', top: -2}}
                        timeToShow={['M', 'S']}
                        timeLabels={{m: null, s: null}}
                        showSeparator
                    />
                    <Text style={styles.minutes}>minutes</Text>
                </View>
                <TouchableOpacity
                    onPress={toggleInput}
                    style={styles.roundButton}>
                    <Icon name={isVisible ? 'times' : 'plus'} size={35} color="#eee" />
                </TouchableOpacity>
            </View>

            {isVisible ? <AddTask addTask={_addTask} style={styles.flex1}/> : null}

            <List style={styles.flex3}
                  datas={tasks}
                  removeTask={_removeTask}
                  updateTask={_updateTask}
                  toggleDone={_toggleDone}
            />
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
    timerText: {
        position: 'absolute',
        alignSelf: 'center',
        top: headerHeight * 0.23
    },
    minutes: {
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#f2f2f2',
        top: -8
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
