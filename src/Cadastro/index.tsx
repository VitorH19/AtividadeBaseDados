import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebaseconnection';
import { useNavigation, useRoute } from '@react-navigation/native';
import Home from '../Home';

export default function Cadastro() {

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [mostrarEmail, setmostrarEmail] = useState('')
  const [mostrarSenha, setmostrarSenha] = useState('')

  const navigation = useNavigation()

  const dados = [
    email,
    senha
  ]

  async function CriarConta() {
    await createUserWithEmailAndPassword(auth, email, senha)
    .then(value => {
      alert('Seu id no nosso sistema é: ' + value.user.uid);
    })
    .catch(error => {
    if(error.code === 'auth/email-already-in-use') {
      alert('Email ja existe no nosso sistema')
      console.log(error)
    }
    if(error.code === 'auth/invalid-email') {
      alert('Email invalido')
      setmostrarEmail('')
      setmostrarSenha('')
      console.log(error)
      return 
    }
    if(createUserWithEmailAndPassword) {
      setmostrarEmail(email)
      setmostrarSenha(senha)
     navigation.navigate('Home', {email,senha})

    }else {
      return 
    }
    if(senha.length < 6) {
      alert('Senha com menos de 6 digitos')
      return 
    }
  })
}

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.login}>CADASTRO</Text>
      </View>
      <View style={styles.corpo}>
        <Text style={{marginVertical:50, fontSize:30, fontWeight:'bold'}}>CONTA</Text>
        <Text style={{fontSize:25, fontWeight:"bold"}}>E-MAIL:</Text>
        <TextInput style={styles.input}
        onChangeText={value => setEmail(value)} value={email}
        ></TextInput>
        <Text style={{fontSize:25, fontWeight:'bold'}}>SENHA</Text>
        <TextInput style={styles.input} secureTextEntry={true}
        onChangeText={value => setSenha(value)} value={senha}
        ></TextInput>
        <View style={styles.ViewBotao}>
          <TouchableOpacity style={styles.botoes} onPress={CriarConta}><Text style={{color:'white'}}>Cadastrar</Text></TouchableOpacity>
        </View>
        <View style={{width:'100%',padding:4, alignContent:'center', alignItems:'center'}}>
          <TextInput style={{width:'100%', padding:4, color:'black', fontSize:30, textAlign:'center'}}value={mostrarEmail} onChangeText={setmostrarEmail}></TextInput>
          <TextInput style={{width:'100%', padding:4, color:'black', fontSize:30, textAlign:"center"}}value={mostrarSenha} onChangeText={setmostrarSenha}></TextInput>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  header: {
    width:'100%',
    height:100,
    alignContent:'flex-start',
    textAlign:'center',
    backgroundColor:'black',
    justifyContent:'center',
    borderRadius:100,
  },
  login: {
    color:'white',
    fontSize:30,
    fontStyle:'italic',
  },
  corpo: {
    width:'100%',
    flex:1,
    textAlign:'center',
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  ViewBotao: {
    width:'100%',
    textAlign:'center',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    display:'flex'
  },
  botoes: {
    width:'80%',
    height:50,
    backgroundColor:"black",
    marginHorizontal:20,
    marginVertical:20,
    textAlign:'center',
    justifyContent:'center',
    borderRadius:20,
    color:'white'
  },
  input: {
    marginVertical:10,
    textAlign:'center',
    fontSize:20,
    borderRadius:20,
    width:'80%',
    height:45,
    backgroundColor:'white',
    borderWidth:1
  }
});
