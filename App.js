import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';

import Home from './pages/Home/home.js';
import Delete from './pages/Delete/delete.js';
import Create from './pages/Create/create.js';
import Update from './pages/Update/update';
import Search from './pages/search/search';





const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name="Home"
              component={Home}
              options={{
                title: 'Bem-Vindo',
                headerStyle: {
                  backgroundColor: '#00AD98',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
          />
          <Stack.Screen name="Create"
              component={Create}
              options={{
                title:'Nova Empresa',
                headerStyle: {
                  backgroundColor: '#00AD98',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },

              }}
          />
          <Stack.Screen name="Delete"
                component={Delete}
                options={{
                  title:'Essa ação é irreversível...',
                  headerStyle: {
                    backgroundColor: 'tomato',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },

                }} 
            />
          <Stack.Screen name="Update"
              component={Update}
              options={{
                title:'Edição',
                headerStyle: {
                  backgroundColor: '#00AD98',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }} 
          />
          <Stack.Screen name="Search"
              component={Search}
              options={{
                title:'Busca',
                headerStyle: {
                  backgroundColor: '#00AD98',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }} 
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
