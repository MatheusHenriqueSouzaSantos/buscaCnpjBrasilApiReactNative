import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const [cnpj,setCnpj]=useState("")
  const router = useRouter();
  function buscarInformacoes(){
    router.push({pathname:"/MostrarDados",params: {cnpj}})
  }
  return (
    <View>
      <Text style={styles.titulo}>
        Digite um cnpj para obter as informações
      </Text>
      <View style={styles.container}>
      <TextInput style={styles.input} onChangeText={setCnpj} placeholder="cnpj"/>
      <TouchableOpacity onPress={buscarInformacoes} style={styles.botao}>
        <Text>
          Buscar
        </Text>
      </TouchableOpacity>
      </View>
    </View> 
  );
}

const styles = StyleSheet.create({
  container:{
    display: "flex",
    flexDirection: "row"
  },
  titulo:{
    fontSize: 20,
    marginLeft: 20,
    marginTop: 13
  },
  input:{
    backgroundColor: "grey",
    width: 200,
    height: 35,
    marginTop: 10,
    marginLeft: 50,
    borderRadius: 5
  },
  botao:{
    backgroundColor: "#a9c9b2",
    marginLeft: 40,
    width: 70,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 5,
    height: 36
  },
  textoNoInput:{
    marginLeft: 4
  }
});
