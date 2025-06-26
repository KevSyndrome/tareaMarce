import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { estadoPerfilGlobal } from '../../context/contextData'

export default function PuertasCasa() {
  const { obtenerPuerta, cambiarEstadoPuerta } = useContext(estadoPerfilGlobal);
  const [puertas, setPuertas] = useState([]);

  const cargarPuertas = async () => {
    try {
      const result = await obtenerPuerta();
      setPuertas(result.body || []);
    } catch (error) {
      setPuertas([]);
    }
  };

  const handleCambiarEstado = async (puerta) => {
    try {
      const ok = await cambiarEstadoPuerta(puerta);
      if (ok) {
        cargarPuertas();
      } else {
        alert("No se pudo cambiar el estado de la puerta");
      }
    } catch (error) {
      alert("Error de red o servidor");
    }
  };

  useEffect(() => {
    cargarPuertas();
  }, []);

  return (
    <View>
      {puertas.length === 0 && (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No hay puertas disponibles.</Text>
      )}
      {puertas.map((puerta) => (
        <Card style={styles.card} key={puerta.id}>
          <Card.Title
            title={puerta.ubicacion || 'Sin nombre'}
            left={props => (
              <Avatar.Icon
                {...props}
                icon="door"
                color={puerta.status == 1 ? "#43A047" : "#B0BEC5"}
                style={{ backgroundColor: 'transparent' }}
              />
            )}
          />
          <Card.Content>
            <Text variant="bodyMedium">
              Estado: {puerta.status == 1 ? 'Abierta' : 'Cerrada'}
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => handleCambiarEstado(puerta)}>
              {puerta.status == 1 ? 'Cerrar' : 'Abrir'}
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