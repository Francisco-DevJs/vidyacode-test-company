import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text';
import { removeSpecialCaracters } from '../../masks/remove';


function Update({ route, navigation }) {
  const { companies } = route.params;
  const [error, setError] = useState('');
  const [name, setName] = useState(companies.name);
  const [document, setDocument] = useState(companies.document);
  const [phone, setPhone] = useState(companies.phone);
  const [address, setAddress] = useState(companies.address);
  
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
 
// ------------------------------------------------ Função Update ** Faz unmask antes de enviar pro DB
  const updateCompanie = () => {
      if( document.length != 14 && document.length != 18 || phone.length != 11 && phone.length != 15 || name.length == 0){
        setError('*** Preenchimento incorreto')
        return false
      }
    const unmaskedDocumentNumber = removeSpecialCaracters(document);
    const unmaskedPhoneNumber = removeSpecialCaracters(phone);
    const url = 'https://vidyacode-test-j742x.ondigitalocean.app/api/companies'
    const id = companies.id
    const newCompanie = { 
          name:name,
          document:unmaskedDocumentNumber,
          phone:unmaskedPhoneNumber,
          address:address
    }
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCompanie)
  };
    fetch(`${url}/${id}`, requestOptions)
        .then(response => response.json())
        .then(data => console.log(data)) 
        .catch(error => console.log('erro ao fazer update', error))
        navigation.navigate('Home')
  }
    return (
      <View>
        <ScrollView style={styles.card}>
          <View>
              <Text style={styles.title}>Empresa Atual - Modo Edição</Text>
              {/* <Text>Nome: {name.length}</Text>
              <Text>Doc: {document.length}</Text>
              <Text>Tel: {phone.length}</Text> */}
              <Text>Nome:</Text>
              <TextInput
                style={styles.input}
                placeholder={companies.name}
                onChangeText={validateName}
                value={name}
                maxLength={100}
              />
              <Text style={styles.text}>CNPJ:</Text>
              <TextInputMask
                type={'cnpj'}
                style={styles.input}
                placeholder={companies.document}
                value={document}
                onChangeText={validateDocument}
                maxLength={18}
                />
              <Text style={styles.text}>Telefone:</Text>
              <TextInputMask
                type={'cel-phone'}
                style={styles.input}
                placeholder={companies.phone}
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) '
                }}
                value={phone}
                defaultValue={phone}
                onChangeText={validatePhone}
                maxLength={15}
                />
              <Text style={styles.text}>Endereço:</Text>
              <TextInput
                style={styles.input}
                placeholder={companies.address}
                onChangeText={validateAddress}
                value={address}  
                maxLength={200}
                />

                {
                  error? 
                    (<Text style={styles.error}>{error}</Text>):(null)
                }

              <Button
              titleStyle={{color:'white'}}
              onPress={updateCompanie}
              buttonStyle={styles.button}
              title='Atualizar'
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
    backgroundColor:'green'
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