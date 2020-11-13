import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

const FinishedTask = ({headerHeight}) => {

    return (
        <View style={[styles.timerText, {top: headerHeight * 0.23}]}>
            <Text style={styles.finishedTask}>Finished</Text>
            <Icon name={'chevron-down'} size={20} color="#eee" style={{textAlign: 'center', top: -8}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    timerText: {
        position: 'absolute',
        alignSelf: 'center',
    },
    finishedTask: {
        fontSize: 40,
        color: '#f2f2f2',
        fontWeight: 'bold'
    }
})
export default FinishedTask
