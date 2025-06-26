import { View, Text } from "react-native";
import React, { useState } from "react";
import { estadoPerfilGlobal } from "./contextData";

export default function StatePerfilGlobal({ children }) {
    const [datosPerfil, setDatosPerfil] = useState();
    const [isLogin, setIsLogin] = useState(false);
    const api = process.env.EXPO_PUBLIC_API_URL;

    const login = () => setIsLogin(true);
    const loginOut = () => setIsLogin(false);

    // Ahora retorna el resultado como objeto JS
    const obtenerPuerta = async () => {
        try {
            const response = await fetch(`${api}/api/puertas`, { method: "GET" });
            const result = await response.json();
            return result; // <-- retorna el objeto
        } catch (error) {
            console.error(error);
            return { body: [] }; // <-- retorna arreglo vacío en error
        }
    };

    // Recibe la puerta como parámetro y retorna true/false
    const cambiarEstadoPuerta = async (puerta) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            id: puerta.id,
            ubicacion: puerta.ubicacion,
            status: puerta.status == 1 ? 0 : 1, // Cambia el estado (usa 1/0)
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch(`${api}/api/puertas/agregar`, requestOptions);
            const result = await response.json();
            return result.status; // true o false según tu API
        } catch (error) {
            console.error(error);
            return false;
        }
    }
    return (
        <estadoPerfilGlobal.Provider value={{ datosPerfil, isLogin, login, loginOut, obtenerPuerta, cambiarEstadoPuerta }}>
            {children}
        </estadoPerfilGlobal.Provider>
    )
}