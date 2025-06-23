import { StyleSheet, Text, View, Alert} from 'react-native'
import { Button } from 'react-native-paper'
import React from 'react'
import { estadoPerfilGlobal } from '../../context/contextData'
import { useContext } from 'react'
import { useNavigation } from '@react-navigation/native';

export default function ScreenSetting() {
  const { loginOut } = useContext(estadoPerfilGlobal);
  const navigation = useNavigation();
  const cerrarSesion = ()=>{
    loginOut();
    Alert.alert("Sesion cerrada", "Has cerrado sesión correctamente");
  }
  return (
    <View>
      <Text >ScreenSetting</Text>
      <Text style={{ textAlign: 'center', fontSize: 25, marginTop: 10, marginBottom: 20 }}>Configuración de la aplicación</Text>
       <Button style={styles.button} mode='contained'onPress={()=> navigation.push('perfil')}>
        Editar perfil
      </Button>
      <Button style={styles.button} mode='contained'  onPress={()=> cerrarSesion()}>
        cerrar sesión
      </Button>

    </View>
  )
}

const styles = StyleSheet.create({
  button:{
    margin: 10,
    padding: 10,
    color: 'white',
    backgroundColor: 'green',
  }
  
})