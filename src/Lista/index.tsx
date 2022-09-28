import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getDatabase, ref, onValue} from "firebase/database";
import { useState } from 'react';

export default function Lista({route}) {

    const [aluno, setAluno] = useState('')

    const db = getDatabase();

    

    return (
        <View style={styles.container}>
            <Text style={{fontSize:30, color:'black', margin:5}}>Nome do aluno: {route.params.nome}</Text>
            <Text style={{fontSize:30, color:'black', margin:5}}>Nota 1: {route.params.nota1}</Text>
            <Text style={{fontSize:30, color:'black', margin:5}}>Nota 2: {route.params.nota2}</Text>
            <Text style={{fontSize:30, color:'black', margin:5}}>Nota 3: {route.params.nota3}</Text>
            <Text style={{fontSize:30, color:'black', margin:5}}>Nota 4: {route.params.nota4}</Text>
            <Text style={{fontSize:30, color:'black', margin:5}}>Media: {route.params.resultado/4}</Text>
        </View>
)}

const styles = StyleSheet.create({
    container: {
        flex:1,
        display:'flex'
    },
})
