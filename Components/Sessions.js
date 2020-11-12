import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const arraySessions = [1,0,1,0,1,0,1,2]

const Sessions = ({sessionsDuration, pausesDuration, lastSession}) => {
    let sessionList = arraySessions.map(function(session, index) {
        let duration = null
        if (session === 1) duration = sessionsDuration
        else if (session === 0) duration = pausesDuration
        else duration = lastSession

        return (
            <View style={[session === 1 ? styles.workSession : styles.pauseSession, styles.bubble]} key={index}>
                <Text style={{color: "#f2f2f2"}}>{duration}</Text>
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
