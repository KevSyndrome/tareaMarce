import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, Button, Card, Text } from 'react-native-paper';

export default function LucesCasa() {
  const [luces, setLuces] = useState([]);

  const obtenerLuces = async () => { //uso de api para obtener primero las luces
    try {
      const response = await fetch("http://192.168.1.110:4000/api/luces"); // Cambia TU_IP_LOCAL por tu IP real
      const result = await response.json();
      setLuces(result.body || []); // Ajusta según la estructura de tu API
    } catch (error) {
      console.error(error);
      setLuces([]);
    }
  };

  // Cambia el estado de una luz
  const cambiarEstadoLuz = async (luz) => { //uso de api para cambiar el estado de la luz
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      id: luz.id,
      ubicacion: luz.ubicacion,
      status: !luz.status, // Cambia el estado
      tipo: luz.tipo
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    try {
      const response = await fetch("http://192.168.1.110:4000/api/luces/agregar", requestOptions);
      const result = await response.json();
      if (result.status) {
        obtenerLuces(); // Refresca la lista de luces
      } else {
        alert("No se pudo cambiar el estado de la luz");
      }
    } catch (error) {
      alert("Error de red o servidor");
      console.error(error);
    }
  };

  useEffect(() => {
    obtenerLuces();
  }, []);

  return (
    <View>
      
      {luces.length === 0 && (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No hay luces disponibles.</Text>
      )}
      {luces.map((luz) => (
        <Card style={styles.card} key={luz.id}>
          <Card.Title
            title={luz.ubicacion || 'Sin nombre'} //luz.{lo que puso en la BD}
            left={props => (
              <Avatar.Icon
                {...props}
                icon="lightbulb-on"
                color={luz.status ? "#FFD600" : "#B0BEC5"} //luz.{estado -apagado-encendido}
                style={{ backgroundColor: 'transparent' }}
              />
            )}
          />
          <Card.Content>
            <Text variant="bodyMedium">
              Estado: {luz.status ? 'Encendido' : 'Apagado'}
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => cambiarEstadoLuz(luz)}>
              {luz.status ? 'Apagar' : 'Encender'}
            </Button>
          </Card.Actions>
        </Card>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  tituloPantalla: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
    textAlign: 'center'
  },
  card: {
    margin: 16,
  }
});