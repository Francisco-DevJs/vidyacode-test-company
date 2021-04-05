import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight, ScrollView, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';
const backLogo = require('../../assets/logo_header.png');

function Search({ route, navigation }) {
  const { id } = route.params;
  const [allCompanies, setAllCompanies] = useState({company:{}});
  
  useEffect(() => {
    const url = 'https://vidyacode-test-j742x.ondigitalocean.app/api/companies'
    async  function getSearched(){
        try{
            fetch(`${url}/${id}`)
            .then((res) => res.json())
            .then((res =>  setAllCompanies(res)))
            .catch(err => setAllCompanies({company:{}}))
        }catch(err){
            throw err;
        }
      }
    getSearched();
  },[])

        return (
            <View style={styles.pageView}>
                <Image source={backLogo} style={styles.backLogo}></Image>
                {(Object.keys(allCompanies.company).length !== 0 ) ? (
                    <ScrollView scrollEnabled={true} style={{width:'90%'}}>
                        <View style={{flexDirection:'row', marginTop:10, alignItems:'center', justifyContent:'center'}}>
                            <Button
                            titleStyle={{color:'white'}}
                            buttonStyle={{backgroundColor:'green'}}
                            title='Home'
                            onPress={ () => navigation.navigate('Home') }
                            ></Button>
                        </View>
            
                        <View style={styles.text} >
                            <Text style={{fontWeight:'bold'}}>Nome da empresa:</Text>
                            <Text ellipsizeMode='middle' numberOfLines={1}>{allCompanies.company.name}</Text>

                            <Text style={{fontWeight:'bold', paddingTop:10}}>CNPJ: </Text>
                            <Text>{allCompanies.company.document.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1 $2 $3/$4-$5")}</Text>

                            <Text style={{fontWeight:'bold', paddingTop:10}}>Fone: </Text>
                            <Text>{allCompanies.company.phone}</Text>

                            <View style={styles.button}>
                                <Button
                                onPress={() => {navigation.navigate('Update', {companies:allCompanies.company})}}
                                title='Editar'
                                titleStyle={{color:'green'}}
                                buttonStyle={styles.editButton}
                                />
                                <Button
                                onPress={() => {navigation.navigate('Delete', {id:allCompanies.company.id})}}
                                title='Deletar'  
                                titleStyle={{color:'white'}}
                                buttonStyle={styles.deleteButton}
                                />
                            </View>
                        </View>
            
                </ScrollView>
                ) : (
                        <Text style={styles.error}>Sua pesquisa não encontrou nenhum resultado, tente novamente.</Text>
                    )} 
                
        
        
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
    backLogo:{
        position:'absolute',
        opacity:0.2,
        width:"100%" },
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
    text: {
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
      textAlign:'center',
      fontSize:20,

    },
    title: {
     fontWeight:'bold',
     fontSize:20,
     marginBottom:5,
     borderBottomColor:'green',
     borderBottomWidth:2
    }
  });
export default Search;