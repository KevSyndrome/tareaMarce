import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { estadoPerfilGlobal } from '../../context/contextData';
import React from 'react'
import { Keyboard } from 'react-native';

export default function ScreenLogin() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigation = useNavigation();
    const { login } = useContext(estadoPerfilGlobal);

    const acceso = async () => {
        if (email === '' || password === '') {
            alert('Por favor, ingrese su email y contraseña');
            return;
        }

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "user": email,
            "password": password
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch("http://192.168.1.110:4000/api/usuario/login", requestOptions);
            const result = await response.json(); // <-- Procesa como JSON
            console.log("Respuesta del backend:", result);
            if (result.body?.status) { // <-- Valida el campo 'status'
                login();
            } else {
                alert(result.body?.mensaje || "Correo o contraseña incorrectos");
            }
        } catch (error) {
            alert("Error de red o servidor");
            console.error(error);
        }
    }
    return (
        <View>
            <Text style={{ textAlign: 'center', fontSize: 30, marginTop: 50, marginBottom: 100 }} >Login</Text>
            <View style={styles.contenedor}>
                <TextInput
                    style={styles.input}
                    label="Email"
                    value={email}
                    onChangeText={email => setEmail(email)
                        //Keyboard='email-address' investigar   
                    }
                />
                <TextInput
                    style={styles.input}
                    label="Contraseña"
                    value={password}
                    onChangeText={password => setPassword(password)
                    }
                />
                <Button
                    style={styles.boton}
                    icon="login"
                    mode="contained"
                    onPress={() => acceso()} // <-- así llamas la función que cambia el estado de login
                >
                    Iniciar Sesión
                </Button>

                <Button style={styles.botonCrear} icon="login" mode="contained" onPress={() => navigation.navigate('crearCuenta')}>
                    crear cuenta
                </Button>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        marginTop: 70,
    },
    input: {
        width: '80%',
        height: 50,
        marginBottom: 60,
        backgroundColor: '#fff',
    },
    boton: {
        width: '80%',
        height: 50,
        marginBottom: 20,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    },
    botonCrear: {
        width: '80%',
        height: 50,
        marginBottom: 20,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    },
})