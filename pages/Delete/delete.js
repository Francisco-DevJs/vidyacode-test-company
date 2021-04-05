import React, { useState } from 'react';
import { View, Text } from 'react-native';
import {Button} from 'react-native-elements';
import { ForceTouchGestureHandler } from 'react-native-gesture-handler';
function Delete( {route, navigation} ) {
    const {id} = route.params;
    const url = 'https://vidyacode-test-j742x.ondigitalocean.app/api/companies'
    const [confirmDelete, setConfirmDelete] = useState(false)
    const deleteMethod = {
        method: 'DELETE',
        headers: {
         'Content-type': 'application/json; charset=UTF-8'
        },
       
    }
       
       const deleteCompanie = (id) => {
         fetch(`${url}/${id}`, deleteMethod) 
         .then(response => response.json())
         .then(data => console.log(data)) 
         .catch(err => console.log(err))
         navigation.navigate('Home')
      }
    return (
      <View style={{position:'relative', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize:24}}>Deseja realmente deletar?</Text>
        <View style={{flexDirection:'row', marginTop:10}}>

        <Button
        type={'outline'}
        titleStyle={{color:'green'}}
        buttonStyle={{borderColor='green'}}
        title='Voltar'
        onPress={ () => navigation.navigate('Home') }
        ></Button>

        <Button
        buttonStyle={{backgroundColor:"tomato", marginLeft:10}}
        title='Excluir'
        onPress={ () => deleteCompanie(id)}
        ></Button>
      
        </View>
      </View>
    );
  }

export default Delete;