import { StyleSheet, Text, View,  Button, Alert} from 'react-native'
import React from 'react'
import { estadoPerfilGlobal } from '../../context/contextData'
import { useContext } from 'react'

export default function ScreenSetting() {
  const { loginOut } = useContext(estadoPerfilGlobal);
  const cerrarSesion = ()=>{
    loginOut();
    Alert.alert("Sesion cerrada", "Has cerrado sesión correctamente");
  }
  return (
    <View>
      <Text>ScreenSetting</Text>
      <Button title='LogOut' onPress={()=>loginOut()}>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
})