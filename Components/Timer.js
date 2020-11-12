import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CountDown from 'react-native-countdown-component';

const Timer = ({headerHeight, running, time, endSession, onTimerChange}) => {
    return (
        <View style={[styles.timerText, {top: headerHeight * 0.23}]}>
            <CountDown
                until={time}
                running={running}
                onFinish={endSession}
                onChange={onTimerChange}
                digitStyle={{backgroundColor: 'transparent', borderWidth: 0, width: null, height: null}}
                digitTxtStyle={{color: '#f2f2f2', fontWeight: 'bold'}}
                separatorStyle={{color: '#f2f2f2', top: -2}}
                timeToShow={['M', 'S']}
                timeLabels={{m: null, s: null}}
                showSeparator size={40}
            />
            <Text style={styles.minutes}>minutes</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    timerText: {
        position: 'absolute',
        alignSelf: 'center',
    },
    minutes: {
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#f2f2f2',
        top: -8
    },
})
export default Timer
