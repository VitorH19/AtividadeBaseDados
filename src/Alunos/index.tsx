import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { ref,push,set } from '@firebase/database';
import { db } from '../Firebase/firebaseconnection';

export default function Alunos() {
    return(
        <View>

        </View>
    ) 
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        display:'flex'
    },
})