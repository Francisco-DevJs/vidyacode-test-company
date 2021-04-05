import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text';
import { removeSpecialCaracters } from '../../masks/remove';


function Update({ navigation }) {


  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [document, setDocument] = useState('');
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();

  // ------------------------------------------------ Validações
  const validateName = (text) => {
    if(text.length == 0){
      setError('** Nome requerido')
    }else{
      setError('')
    }
      setName(text)
  }
  const validateDocument = (text) => {
    if(text.length !== 18){
      setError('**CNPJ precisa ter 14 digitos')
    }else{
      setError('')
    }
      setDocument(text)
    }
    const validatePhone = (text) => {
      if(text.length !== 15){
        setError('**Telefone precisa ter 11 digitos')
      }else{
        setError('')
      }
      setPhone(text)
     
     
  }
  const validateAddress = (text) => {
      setAddress(text)
  }



  const updateCompanie = () => {
    if( document.length !== 18 || phone.length !== 15 || name.length == 0){
      setError('*** Preenchimento incorreto')
      return false
    }
    const unmaskedDocumentNumber = removeSpecialCaracters(document);
    const unmaskedPhoneNumber = removeSpecialCaracters(phone);
    const url = 'https://vidyacode-test-j742x.ondigitalocean.app/api/companies'
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        { name:name,
          document:unmaskedDocumentNumber,
          phone:unmaskedPhoneNumber,
          address:address
         })
  };
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => console.log(data)) 
        .catch(error => console.log('erro ao fazer create', error))
        navigation.navigate('Home')
  }
    return (

      <View>
        <ScrollView style={styles.card}>
          <View>
              
              <Text style={styles.title}>Cadastrar Empresa</Text>

              <Text>Nome:</Text>
              <TextInput
                style={styles.input}
                placeholder='Nome da Empresa'
                onChangeText={validateName}
                value={name}
                maxLength={100}
                />

              <Text style={styles.text}>CNPJ:</Text>
              <TextInputMask
                type={'cnpj'}
                style={styles.input}
                placeholder='00.000.000/0000-00'
                value={document}
                onChangeText={validateDocument}
                maxLength={18}
                
                />

              <Text style={styles.text}>Telefone:</Text>
              <TextInputMask
                type={'cel-phone'}
                style={styles.input}
                placeholder='(00)-00000-0000'
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) '
                }}
                value={phone}
                onChangeText={validatePhone}
                defaultValue='0'
                maxLength={15}
                />

              <Text style={styles.text}>Endereço:</Text>
              <TextInput
                style={styles.input}
                placeholder='Ex.: Av. Ipiranga, n. 1000 - São Paulo - SP'
                onChangeText={validateAddress}
                value={address}
                maxLength={200}
                />

                {error? 
                  (<Text style={styles.error}>{error}</Text>):(null)
                }

              <Button
              titleStyle={{color:'white'}}
              onPress={updateCompanie}
              buttonStyle={styles.button}
              title='Criar Empresa'
              ></Button>
              
          </View>
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
  button:{
    marginTop:30,
    margin:18,
    width:'90%',
    backgroundColor:'green',

  },
  input:{
    borderBottomWidth:1,
    
    marginTop:1,
    padding:2,
    paddingLeft:2, 
    marginLeft:2
  },
  text:{
    marginTop:22
  },
  error:{color:'red', marginLeft:20},
  title:{fontSize:25, marginBottom:10},
  card:{
    borderWidth:0,
    borderColor:'gray',
    width:'90%',
    position:'absolute',
    padding:10,
    color: '#ffffff',
    margin:20,  
    borderRadius:9,
    backgroundColor:'#ffffff',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 8,
    },
    shadowOpacity: 0.40,
    shadowRadius: 9.10,
    elevation: 4,
    top:20
  }

})

export default Update;