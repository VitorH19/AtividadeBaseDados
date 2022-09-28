import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Cadastro from './src/Cadastro';
import Home from './src/Home';
import Lista from './src/Lista';

const Stack = createNativeStackNavigator()


export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Cadastro'>
        <Stack.Screen name='Cadastro' component={Cadastro}/>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Lista' component={Lista}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
