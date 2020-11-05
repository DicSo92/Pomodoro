import React from 'react';
import { StyleSheet, Text } from 'react-native';

const ListItem = ({item}) => {
    return (
        <Text style={styles.listItem}>{item.title}</Text>
    )
}


const styles = StyleSheet.create({
    listItem: {
        padding: 10,
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: 'gray'
    },
})
export default ListItem
