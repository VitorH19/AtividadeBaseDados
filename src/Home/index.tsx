import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState, useEffect} from 'react';
import { ref,push,set, onValue,update} from '@firebase/database';
import { db } from '../Firebase/firebaseconnection';
import Lista from '../Lista';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Home({route}) {

    const [aluno, setAluno] = useState('')
    const [nome, setNome] = useState('')
    const [nota1, setNota1] = useState('')
    const [nota2, setNota2] = useState('')
    const [nota3, setNota3] = useState('')
    const [nota4, setNota4] = useState('')
    const resultado = parseInt(nota1) + parseInt(nota2) + parseInt(nota3) + parseInt(nota4) 

    const navigation = useNavigation()

    const dados = [
        nome,
        route.params.email,
        resultado
    ]

    const salvarAluno = async() => {
        const refAluno = ref(db, 'Alunos')
        const newrefAluno = push(refAluno)
        await set(newrefAluno, {
            Nome: nome,
            Nota1: nota1,
            Nota2: nota2,
            Nota3: nota3,
            Nota4: nota4,
            Resultado: resultado / 4
        }).catch(error => console.log(error));
        
        alert('Cadastrado')

        console.log(dados)

        return resultado; 
    }
    const getAluno = async () => {
        const refAlunos = ref(db, 'Alunos/')
        onValue(refAlunos, (snapshot) => {
          if (snapshot.exists()) {
            setAluno(snapshot.val());
          }
        })
      }
    const botaoLista = () => {
        if(nome == '' || nota1 == '' || nota2 == '' || nota3 == '' || nota4 == '') {
            return
        }else {
            navigation.navigate('Lista', {nome,nota1,nota2,nota3,nota4,resultado})
        }
    }
    useEffect(() => {
        getAluno()
    },[])
    
    return (
    <View style={styles.container}>
        <View style={styles.ViewTexto}>
            <Text style={{fontSize:30}}>Cadastro de Alunos</Text>
        </View>
        <View style={{padding:10}}>
            <Text style={{fontSize:25}}>Login: {route.params.email}</Text>
        </View>
        <View style={styles.viewMostrar}>
            <Text style={{fontSize:25}}>Nome</Text>
            <TextInput style={{width:'80%', height:30, borderWidth:1, marginTop:15,marginBottom:10, padding:10,borderRadius:20}} value={nome} onChangeText={nome => setNome(nome)}></TextInput>
            <Text style={{fontSize:25}}>Nota1 </Text>
            <TextInput style={{width:'80%', height:30, borderWidth:1, marginTop:5,marginBottom:10,padding:10, borderRadius:20}} value={nota1} onChangeText={nota1 => setNota1(nota1)}></TextInput>
            <Text style={{fontSize:25}}>Nota2 </Text>
            <TextInput style={{width:'80%', height:30, borderWidth:1, marginTop:5,marginBottom:10, padding:10,borderRadius:20}} value={nota2} onChangeText={nota2 => setNota2(nota2)}></TextInput>
            <Text style={{fontSize:25}}>Nota3 </Text>
            <TextInput style={{width:'80%', height:30, borderWidth:1, marginTop:5,marginBottom:10, padding:10,borderRadius:20}} value={nota3} onChangeText={nota3 => setNota3(nota3)}></TextInput>
            <Text style={{fontSize:25}}>nota4 </Text>
            <TextInput style={{width:'80%', height:30, borderWidth:1, marginTop:5,marginBottom:10,padding:10, borderRadius:20}} value={nota4} onChangeText={nota4 => setNota4(nota4)}></TextInput>
            <Text style={{marginTop:20, fontSize:25}}>a media desse aluno é: {resultado/4}</Text>
            <TouchableOpacity onPress={() => salvarAluno()} style={{marginTop:20, borderWidth:1, width:'70%', borderRadius:20,backgroundColor:'black', alignItems:'center', justifyContent:'center', padding:5}}><Text style={{color:'white'}}>Cadastrar</Text></TouchableOpacity>
            <TouchableOpacity style={{padding:10, width:"100%"}} onPress={() => botaoLista()}><Text style={{fontSize:20, marginTop:5}}>Lista do aluno</Text></TouchableOpacity>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        display:'flex'
    },
    ViewTexto: {
        width:'100%',
        textAlign:'center',
        alignItems:'center',
        marginBottom:10
    },
    viewMostrar: {
        width:'100%',
        padding:10,
        textAlign:'center',
        alignItems:'center'
    }
})