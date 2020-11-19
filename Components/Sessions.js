import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Sessions = ({arraySessions, sessionsDuration, pausesDuration, lastSession, selectedTask}) => {
    let sessionList = arraySessions.map(function(session, index) {
        let duration = null
        if (session === 1) duration = sessionsDuration
        else if (session === 0) duration = pausesDuration
        else duration = lastSession

        return (
            <View style={[
                    session === 1 ? styles.workSession : styles.pauseSession,
                    styles.bubble,
                    selectedTask && selectedTask.session.sessionStep === index ? {borderColor: '#FFBE0B'} : null,
                    selectedTask && (selectedTask.session.sessionStep > index || selectedTask.session.sessionStep === null || (selectedTask.isDone && selectedTask.session.sessionStep !== index)) ? {borderColor: '#121212'} : null
                ]}
                  key={index}
            >
                <Text style={[
                    {color: "#f2f2f2"},
                    selectedTask && selectedTask.session.sessionStep === index ? {color: '#FFBE0B'} : null,
                    selectedTask && (selectedTask.session.sessionStep > index || selectedTask.isDone || selectedTask.session.sessionStep === null) ? {color: '#121212'} : null
                ]}>
                    {duration}
                </Text>
            </View>
        )
    })

    return (
        <View style={styles.sessionsContainer}>
            {sessionList}
        </View>
    )
}

const styles = StyleSheet.create({
    sessionsContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: 6,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bubble: {
        width: 30,
        height: 30,
        borderRadius: 100,
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: '#f2f2f2',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 3,
        marginRight: 3
    },
    workSession: {
        borderStyle: 'solid',
    },
    pauseSession: {
        borderStyle: 'dotted',
    }
})
export default Sessions
