import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import React from 'react'

export default function ScreenCrearCuenta() {
    const [text, setText] = React.useState("");
    const [text1, setText1] = React.useState("");
    const [text2, setText2] = React.useState("");
    const [email, setEmail] = React.useState("");
    const navigation = useNavigation();

    const crearAcceso = async ()=>{
        if (email === '' || text === '' || text1 === '' || text2 === '') {
            alert('Por favor, complete todos los campos');
            return;
        }
        if (text1 !== text2) {
            alert('Las contraseñas no coinciden');
            return;
        }
        // Aquí puedes agregar la lógica para crear la cuenta
        // Por ejemplo, enviar una solicitud a tu API
        console.log("Cuenta creada con:", { email, username: text, password: text1 });
        navigation.navigate('home'); // Navegar a la pantalla de inicio después de crear la cuenta
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
                        value={text}
                        onChangeText={setText}
                        mode="outlined"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        label="Contraseña"
                        value={text1}
                        onChangeText={setText1}
                        mode="outlined"
                        secureTextEntry
                    />
                    <TextInput
                        style={styles.input}
                        label="Confirmar Contraseña"
                        value={text2}
                        onChangeText={setText2}
                        mode="outlined"
                        secureTextEntry
                    />
                    <Button style={styles.boton} icon="login" mode="contained" onPress={() => navigation.navigate('home')}>
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