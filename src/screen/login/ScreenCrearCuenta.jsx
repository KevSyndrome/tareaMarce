import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import React from 'react'

export default function ScreenCrearCuenta() {
    const [user, setUser] = React.useState("");
    const [pass, setPass] = React.useState("");
    const [confpass, setConfpass] = React.useState("");
    const [email, setEmail] = React.useState("");
    const navigation = useNavigation();

    const crearAcceso = async () => {
        if (email === '' || user === '' || pass === '' || confpass === '') {
            alert('Por favor, complete todos los campos');
            return;
        }
        if (pass !== confpass) {
            alert('Las contraseñas no coinciden');
            return;
        } else {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "id": 0,
                "nombre": user,
                "pw": pass,
                "email": email,
                "status": "1"
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            try {
                const response = await fetch("http://localhost:4000/api/usuario/agregar", requestOptions);
                const result = await response.text();
                console.log(result)
                if (result) {
                    alert("Usuario creado correctamente");
                    navigation.navigate('login');
                } else {
                    alert("Error al crear el usuario");
                }
            } catch (error) {
                console.error(error);
            };
        }

    }
    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: '#f0f0f0' }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                <Text style={styles.titulo}>Crear cuenta</Text>
                <View style={styles.contenedor}>
                    <TextInput
                        style={styles.input}
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        mode="outlined"
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        label="Nombre de usuario"
                        value={user}
                        onChangeText={setUser}
                        mode="outlined"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        label="Contraseña"
                        value={pass}
                        onChangeText={setPass}
                        mode="outlined"
                        secureTextEntry
                    />
                    <TextInput
                        style={styles.input}
                        label="Confirmar Contraseña"
                        value={confpass}
                        onChangeText={setConfpass}
                        mode="outlined"
                        secureTextEntry
                    />
                    <Button style={styles.boton} icon="login" mode="contained" onPress={() => crearAcceso()}>
                        Crear cuenta
                    </Button>
                    <Button style={styles.botonCrear} mode="text" onPress={() => navigation.navigate('login')}>
                        Volver al login
                    </Button>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
        backgroundColor: '#f0f0f0',
    },
    titulo: {
        textAlign: 'center',
        fontSize: 30,
        marginTop: 40,
        marginBottom: 30,
        fontWeight: 'bold',
        color: '#333',
    },
    contenedor: {
        width: '90%',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
    },
    input: {
        width: '100%',
        marginBottom: 18,
        backgroundColor: '#fff',
    },
    boton: {
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#6200ee',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    botonCrear: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})