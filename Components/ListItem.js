import React from 'react';
import { StyleSheet, Text } from 'react-native';

const ListItem = ({item}) => {
    return (
        <Text>{item.title}</Text>
    )
}


const styles = StyleSheet.create({
    //
})
export default ListItem
