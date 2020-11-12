import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

const SelectATask = ({headerHeight}) => {

    return (
        <View style={[styles.timerText, {top: headerHeight * 0.23}]}>
            <Text style={styles.selectATask}>Select a Task</Text>
            <Icon name={'chevron-down'} size={20} color="#eee" style={{textAlign: 'center', top: -8}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    timerText: {
        position: 'absolute',
        alignSelf: 'center',
    },
    selectATask: {
        fontSize: 40,
        color: '#f2f2f2',
        fontWeight: 'bold'
    }
})
export default SelectATask
