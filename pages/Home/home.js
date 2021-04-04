import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
const backLogo = require('../../assets/logo_header.png');

function Home({ navigation }) {
  const [allCompanies, setAllCompanies] = useState({companies:[]});
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchedId, setSearchedId] = useState();
  
  useEffect(() => {
      const url = 'https://vidyacode-test-j742x.ondigitalocean.app/api/companies'
      async function getCompanies() {
        try{
          return fetch(url)
          .then((res) => res.json() )
          .then((res) => {return setAllCompanies(res)})
          .then(setLoading(false))
        }catch(error){
          throw error;
        }
      }
      setTimeout(() => {
        getCompanies();
      }, 2000);
          
      if(allCompanies.companies.length == 0){
        return setErrorMsg('Nenhuma empresa cadastrada')
      }else{
        setErrorMsg('')
      }
     
  },[allCompanies])
  
        //ErroMsg funciona como um Handle para verificar se allCompanies estiver vazia, criando um condicional rendering
  return (
      <View style={styles.pageView}>
          {!errorMsg && 
            <View style={{flexDirection:'row', marginTop:10}}>
                <TextInput
                titleStyle={{color:'white'}}
                style={styles.searchInput}
                placeholder='pesquisar...'
                value={searchedId}
                onChangeText={(text) => setSearchedId(text)}

                ></TextInput>

                <Button
                buttonStyle={{backgroundColor:"green", marginTop:20, width:70}}
                title='Search'
                onPress={ () => navigation.navigate('Search', {id: searchedId})}
                // onPressOut={setSearchedId(' ')}
                ></Button>
            </View>
          }
        <Image source={backLogo} style={styles.backLogo}></Image>

        <ScrollView scrollEnabled={true} style={{width:'90%'}}>
          <Spinner
            visible={loading}
            textContent={'Carregando...'}
            textStyle={{color:'white'}}
            animation='fade'
          />

          {
            allCompanies.companies.map((item, index) => {
              return <View key={index} style={styles.text} >

                        <Text style={styles.bolder}>Nome da empresa:</Text>
                        <Text ellipsizeMode='middle' numberOfLines={1}>{item.name}</Text>

                        <Text style={styles.bolder}>CNPJ: </Text>
                        <Text>{item.document}</Text>

                        <Text style={styles.bolder}>Fone: </Text>
                        <Text>{item.phone}</Text>

                        <View style={styles.button}>
                            <Button
                            onPress={() => {navigation.navigate('Update', {companies:item})}}
                            title='Editar'
                            titleStyle={{color:'green'}}
                            buttonStyle={styles.editButton}
                            />
                            <Button
                            onPress={() => {navigation.navigate('Delete', {id:item.id})}}
                            title='Deletar'  
                            titleStyle={{color:'white'}}
                            buttonStyle={styles.deleteButton}
                            />
                        <Text style={{marginTop:14, fontWeight:'bold'}}>ID:</Text>
                        <Text>{item.id}</Text>
                        </View>
                    </View>
            })
          }
        </ScrollView>

        <Text style={styles.error}>{errorMsg}</Text>

        <Button title='Cadastre sua Empresa'
        type={'outline'}
        titleStyle={{color:'green', fontWeight:'bold', fontSize:18}}
        buttonStyle={styles.createButton}
        onPress={ () => navigation.navigate('Create') } />
      </View>
  );
  }
  const styles = StyleSheet.create({
    
    pageView:{ 
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center' },

    button: {
      alignItems: 'center',
      marginLeft: 170,
      bottom:120,
      borderRadius: 90,
    },

    createButton:{
      margin:15,
      borderColor:'green',
      borderWidth:1,
      borderRadius:10,
      shadowColor:'green'
    },

    editButton:{
      backgroundColor:'white',
      borderWidth:1, borderColor:'green',
      width:65,
      padding:3,
      color:'white'
    },
    deleteButton:{
      backgroundColor:'tomato',
      fontWeight:'bold',
      width:65,
      marginTop:10,
      padding:3
    },
    backLogo:{
      position:'absolute',
      opacity:0.2,
      width:"100%" 
    },

    text:{
      height:160,
      color: '#ffffff',
      paddingLeft:10,
      paddingTop:10,
      margin:20,  
      borderRadius:9,
      backgroundColor:'#ffffff',
      marginBottom:5,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 8,
      },
      shadowOpacity: 0.40,
      shadowRadius: 9.10,
      elevation: 6,    
    },

    error:{
      alignItems: 'center',

      fontSize:20,

    },

    title: {
     fontWeight:'bold',
     fontSize:20,
     marginBottom:5,
     borderBottomColor:'green',
     borderBottomWidth:2
    },
    
    bolder:{
    fontWeight:'bold',
    paddingTop:7
    },
    searchInput:{
      borderBottomWidth:0.8,
      margin:12,
      padding:0,
      marginTop:30
    }
  });
export default Home;