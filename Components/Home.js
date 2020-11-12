import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import Svg,{ Circle } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

import List from './List'
import AddTask from './AddTask'
import Sessions from "./Sessions";
import Timer from "./Timer";
import SelectATask from "./SelectATask";

const headerHeight = 175
const screen = Dimensions.get('window');

const sessionsDuration = 25
const pausesDuration = 5
const lastSession = 15

const Home = () => {
    const STORAGE_KEY = 'pomodoro_tasks'

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
        setTasks([...tasks, {
            id: new Date().getTime(),
            title,
            isDone: false,
            sessionsDone: {
                session: null,
                time: null
            }
        }])
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
    const _toggleSelectedTask = (item = null) => {
        if (item)
            setSelectedTask(item)
        else
            setSelectedTask(null)
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

                {selectedTask ?
                    <Timer headerHeight={headerHeight}/>
                :
                    <SelectATask headerHeight={headerHeight}/>
                }

                <TouchableOpacity
                    onPress={toggleInput}
                    style={styles.roundButton}>
                    <Icon name={isVisible ? 'times' : 'plus'} size={35} color="#eee" />
                </TouchableOpacity>
            </View>

            {isVisible ? <AddTask addTask={_addTask} /> : null}

            <List style={styles.flex3}
                  datas={tasks}
                  removeTask={_removeTask}
                  updateTask={_updateTask}
                  toggleDone={_toggleDone}
                  toggleSelectedTask={_toggleSelectedTask}
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
