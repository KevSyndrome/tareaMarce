import { StyleSheet, Text, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { estadoPerfilGlobal } from '../../context/contextData';
import { useContext } from 'react';
import { useState } from 'react';
import React from 'react'

export default function PerfilEdit() {
    const { datosPerfil } = useContext(estadoPerfilGlobal);

    const [nombre, setNombre] = useState(datosPerfil?.nombre || '');
    const [password, setPassword] = useState('');
    const [confpass, setConfpass] = useState('');
    const email = datosPerfil?.email || '';  // Solo lectura
    const [id] = useState(datosPerfil?.id || '');


    
    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: '#f0f0f0' }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                <Text style={styles.titulo}>Modificar perfil</Text>
                <View style={styles.contenedor}>
                    <TextInput
                        style={styles.input}
                        label="Nombre de usuario"
                        value={nombre}
                        onChangeText={setNombre}
                        mode="outlined"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        label="Contraseña"
                        value={password}
                        onChangeText={setPassword}
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
                    <Button style={styles.boton} icon="" mode="contained" onPress={() => s()}>
                        Crear cuenta
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
        marginTop: 30,
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
})