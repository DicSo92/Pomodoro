import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Text, Dimensions, TouchableOpacity, Alert} from 'react-native';
import Svg,{ Circle } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

import List from './List'
import AddTask from './AddTask'
import Sessions from "./Sessions";
import Timer from "./Timer";
import SelectATask from "./SelectATask";
import FinishedTask from "./FinishedTask";

const headerHeight = 175
const screen = Dimensions.get('window');

// const sessionsDuration = 25
// const pausesDuration = 5
// const lastSession = 15
const sessionsDuration = 0.2
const pausesDuration = 0.1
const lastSession = 0.3
const arraySessions = [1,0,1,0,1,0,1,2]

const Home = () => {
    const STORAGE_KEY = 'pomodoro_tasks'

    const [tasks, setTasks] = useState([])
    const [isVisible, setIsVisible] = useState(false);
    const [time, setTime] = useState(sessionsDuration * 60)
    const [currentCount, setCurrentCount] = useState(sessionsDuration * 60)
    const [selectedTask, setSelectedTask] = useState(null)
    const [running, setRunning] = useState(false)
    const [showCountDown, setShowCountDown] = useState(true)

    useEffect(() => {_readStorageData()}, [])
    useEffect(() => {_saveStorageData()}, [tasks])

    const _readStorageData = async () => {
        try {
            const tasks = await AsyncStorage.getItem(STORAGE_KEY)
            if (tasks !== null) setTasks(JSON.parse(tasks))
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
            session: {
                sessionStep: 0,
                time: sessionsDuration * 60
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
    const _endSession = () => {
        setTimeout(() => {
            setShowCountDown(false) // ----------
            let select = selectedTask

            if (selectedTask.session.sessionStep === arraySessions.length - 1) {
                select.isDone = true
                select.session.sessionStep = null
                select.session.time = 0
                setRunning(false)
            } else {
                select.session.sessionStep += 1
                let sessionType = arraySessions[selectedTask.session.sessionStep]
                if (sessionType === 1) select.session.time = sessionsDuration * 60
                else if (sessionType === 0) select.session.time = pausesDuration * 60
                else select.session.time = lastSession * 60

                setTime(select.session.time)
            }

            setSelectedTask(select)
            updateTaskSession()

            setShowCountDown(true)// ----------
        }, 100)
    }
    const _toggleSelectedTask = (item) => {
        if (selectedTask) updateTaskSession()
        if (item) {
            setSelectedTask(item)
            setCurrentCount(item.session.time)
            setTime(item.session.time)
            setRunning(false)
        } else
            setSelectedTask(null)
    }
    const _onTimerChange = (count) => {
        setCurrentCount(count - 1) // -1 for exact timer
    }
    const updateTaskSession = () => {
        let select = selectedTask
        select.session.time = currentCount
        setSelectedTask(select)

        let array = [...tasks]
        let index = array.findIndex(item => item.id === selectedTask.id)
        if (index !== -1) {
            array[index] = selectedTask
            setTasks(array)
        }
    }
    const _toggleInput = () => {
        setIsVisible(!isVisible)
    }
    const _startCountDown = () => {
        setRunning(true)
    }
    const _stopCountDown = () => {
        Alert.alert(
            "Confirm Pause ?",
            null,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => {
                        console.log("OK Pressed")
                        setRunning(false)
                        updateTaskSession()
                    }
                }
            ],
            { cancelable: false }
        );
    }
    const _stopTask = () => {
        setSelectedTask( null)
    }
    const _resetTask = () => {
        Alert.alert(
            "Confirm Reset ?",
            null,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => {
                        setTimeout(() => {
                            setShowCountDown(false) // ----------
                            let select = selectedTask

                            select.isDone = false
                            select.session.sessionStep = 0
                            select.session.time = sessionsDuration * 60

                            setRunning(false)
                            setTime(select.session.time)
                            setSelectedTask(select)

                            let array = [...tasks]
                            let index = array.findIndex(item => item.id === selectedTask.id)
                            if (index !== -1) {
                                array[index] = selectedTask
                                setTasks(array)
                            }

                            setShowCountDown(true)// ----------
                        }, 100)
                    }
                }
            ],
            { cancelable: false }
        );
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


                <Sessions arraySessions={arraySessions}
                          sessionsDuration={sessionsDuration}
                          pausesDuration={pausesDuration}
                          lastSession={lastSession}
                          selectedTask={selectedTask}
                />

                {(selectedTask && !selectedTask.isDone) &&
                    <Timer key={selectedTask.id + selectedTask.session.sessionStep}
                           headerHeight={headerHeight}
                           running={running}
                           time={time}
                           endSession={_endSession}
                           onTimerChange={_onTimerChange}
                           showCountDown={showCountDown}
                    />
                }
                {(selectedTask && selectedTask.isDone) &&
                    <FinishedTask headerHeight={headerHeight}/>
                }
                {!selectedTask &&
                    <SelectATask headerHeight={headerHeight}/>
                }

                <View style={styles.containerPlayBtn}>
                    <TouchableOpacity
                        onPress={_resetTask}
                        style={[styles.roundButton, styles.buttonReset, styles.sideButtons]}>
                        <Icon name={'undo'} size={15} color="#eee"/>
                    </TouchableOpacity>

                    {(selectedTask && !selectedTask.isDone) &&
                        <TouchableOpacity
                            onPress={!running ? _startCountDown : _stopCountDown}
                            style={[styles.roundButton, styles.buttonPlayPause]}>
                            <Icon name={!running ? 'play' : 'pause'} size={35} color="#eee"
                                  style={!running && {right: -3}}/>
                        </TouchableOpacity>
                    }
                    {(selectedTask && selectedTask.isDone) &&
                        <TouchableOpacity
                            onPress={_stopTask}
                            style={[styles.roundButton, styles.buttonPlayPause]}>
                            <Icon name="stop" size={35} color="#eee"/>
                        </TouchableOpacity>
                    }
                    {!selectedTask &&
                        <TouchableOpacity
                            onPress={_toggleInput}
                            style={[styles.roundButton, styles.buttonPlayPause]}>
                            <Icon name={isVisible ? 'times' : 'plus'} size={35} color="#eee" />
                        </TouchableOpacity>
                    }

                    <TouchableOpacity
                        onPress={!running ? _startCountDown : _stopCountDown}
                        style={[styles.roundButton, styles.buttonStop, styles.sideButtons]}>
                        <Icon name={'stop'} size={15} color="#eee"/>
                    </TouchableOpacity>
                </View>

            </View>

            {isVisible ? <AddTask addTask={_addTask} /> : null}

            <View style={{flex: 1}}>
                <List datas={tasks} selectedTask={selectedTask}
                      removeTask={_removeTask}
                      updateTask={_updateTask}
                      toggleDone={_toggleDone}
                      toggleSelectedTask={_toggleSelectedTask}
                />
            </View>
        </View>)
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1
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
    containerPlayBtn: {
        position: 'absolute',
        bottom: '-18%',
        alignSelf: 'center',
        flexDirection: 'row'
    },
    roundButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        alignSelf: 'center',
    },
    buttonPlayPause: {
        width: 80,
        height: 80,
        padding: 10,
        backgroundColor: '#33658A',
        borderWidth: 5,
        borderColor: '#f2f2f2',
        marginLeft: 7,
        marginRight: 7,
    },
    buttonReset: {
        width: 30,
        height: 30,
        padding: 5,
        backgroundColor: '#731963',
    },
    buttonStop: {
        width: 30,
        height: 30,
        padding: 5,
        backgroundColor: '#A41324',
    },
    sideButtons: {
        marginTop: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    }
})
export default Home
