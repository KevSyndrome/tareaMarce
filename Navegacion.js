import React,{useContext}from "react";
import { estadoPerfilGlobal } from "./src/context/contextData";//llamar nuestro archivo de context
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// Screens principales
import ScreenHome from "./src/screen/home/ScreenHome";
import ScreenAbout from "./src/screen/about/ScreenAbout";
import ScreenSetting from "./src/screen/setting/ScreenSetting";

// Screens hijos de Home
import HomeDetalles from "./src/screen/home/HomeDetalles";
import LucesCasa from "./src/screen/home/LucesCasa";
import PuertasCasa from "./src/screen/home/PuertasCasa";

//screen de perfil
import PerfilEdit from "./src/screen/setting/PerfilEdit";
// Screens de login
import ScreenLogin from "./src/screen/login/ScreenLogin";
import ScreenCrearCuenta from "./src/screen/login/ScreenCrearCuenta";

//import de las dependencias de react-navigation
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyStackHome() {
    const privilegio = 'user';
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="menu"
                component={ScreenHome}
                options={{ title: 'Menu',
                    headerShown: true, // Mostrar el encabezado de la pantalla
                }}
            />
            
            <Stack.Screen
                name="detalles"
                component={HomeDetalles}
                options={{ title: 'Detalles',
                    headerShown: true, // Mostrar el encabezado de la pantalla
                }}
            />
            <Stack.Screen
                name='luces'
                component={LucesCasa}
            />
            <Stack.Screen
                name = "puertas"
                component={PuertasCasa}
            />
        </Stack.Navigator>
    );
}
function MyStackSetting() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="setting"
        component={ScreenSetting}
      />
      <Stack.Screen
        name="perfil"
        component={PerfilEdit}
      />
    </Stack.Navigator>
  );
}
function MystackLogin(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="login"
                component={ScreenLogin}
                options={{ title: 'Login',
                    headerShown: true, // Mostrar el encabezado de la pantalla
                }}
            />
            <Stack.Screen
                name="crearCuenta"
                component={ScreenCrearCuenta}
                options={{ title: 'Crear Cuenta',
                    headerShown: true, // Mostrar el encabezado de la pantalla
                }}
            />
        </Stack.Navigator>
    );
}
// Crear una función que contenga las pestañas
function Mytabs(){
    return(
        <Tab.Navigator>
            <Tab.Screen
            name="home"
            component={MyStackHome} 
            options={{title: 'Inicio',
                headerShown: false, // Ocultar el encabezado de la pantalla
                tabBarLabelPosition: 'beside-icon', // Etiqueta al lado del icono
                tabBarBadge:8, // Número de notificaciones
                tabBarBadgeStyle: { backgroundColor: 'red' }, // Estilo de la insignia
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="home" color={color} size={size} />
                ),
            }}
            />
            <Tab.Screen
            name="about"
            component={ScreenAbout}
            options={{title: 'Acerca de',
                headerShown: true, // Ocultar el encabezado de la pantalla
                tabBarLabelPosition: 'beside-icon', // Etiqueta al lado del icono
                tabBarBadge:8, // Número de notificaciones
                tabBarBadgeStyle: { backgroundColor: 'red' }, // Estilo de la insignia
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="info-circle" color={color} size={size} />
                ),
            }}
            />
            <Tab.Screen
            name="setting"
            component={MyStackSetting}
            options={{title: 'Config',
                headerShown: false, // Ocultar el encabezado de la pantalla
                tabBarLabelPosition: 'beside-icon', // Etiqueta al lado del icono
                tabBarBadge:8, // Número de notificaciones
                tabBarBadgeStyle: { backgroundColor: 'red' }, // Estilo de la insignia
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="cogs" color={color} size={size} />
                ),
            }}
            />
        </Tab.Navigator>
    );
}

export default function Navegacion() {
    const {isLogin} = useContext(estadoPerfilGlobal);
    return(
        <>
        {isLogin ? <Mytabs/> : <MystackLogin/>}
        </>
    ) ;
    
}