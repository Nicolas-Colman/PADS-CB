import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const ocorrencias = {
  'Em Andamento': [
    {
      id: '03',
      data: '10/06/2025',
      local: 'R. Flores Nº45',
      categoria: 'Iluminação',
      descricao: 'Reparos na iluminação pública...',
    },
  ],
  'Em Análise': [
    {
      id: '04',
      data: '11/06/2025',
      local: 'Av. Central Nº120',
      categoria: 'Ruído Urbano',
      descricao: 'Barulho constante durante a noite...',
    },
  ],
  'Concluído': [
    {
      id: '01',
      data: '01/06/2025',
      local: 'Av. Brasil Nº88',
      categoria: 'Árvore caída',
      descricao: 'Galho caído removido da rua...',
    },
  ],
  'Cancelado': [
    {
      id: '02',
      data: '05/06/2025',
      local: 'R. da Paz Nº10',
      categoria: 'Outros',
      descricao: 'Solicitação duplicada.',
    },
  ],
};

const OcorStatus = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Status das Ocorrências:</Text>

      {Object.entries(ocorrencias).map(([status, lista]) => (
        <View key={status} style={styles.bloco}>
          <Text style={styles.subtitulo}>{status}</Text>
          {lista.map((item) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.texto}><Text style={styles.label}>ID:</Text> {item.id}</Text>
              <Text style={styles.texto}><Text style={styles.label}>Data:</Text> {item.data}</Text>
              <Text style={styles.texto}><Text style={styles.label}>Local:</Text> {item.local}</Text>
              <Text style={styles.texto}><Text style={styles.label}>Categoria:</Text> {item.categoria}</Text>
              <Text style={styles.texto}><Text style={styles.label}>Descrição:</Text> {item.descricao}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default OcorStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFFFF8',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#000',
  },
  bloco: {
    marginBottom: 25,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#B2E3FF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  texto: {
    fontSize: 14,
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
});