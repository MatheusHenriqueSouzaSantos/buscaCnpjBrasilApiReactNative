import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Empresa={
    razaoSocial:string,
    cnpj:string,
    uf:string,
    municipio:string,
    nomeFantasia:string
}


export default function MostrarDados(){
    const{cnpj}=useLocalSearchParams()
    const [razaoSocial,setRazaoSocial]=useState("")
    const [cnpjVindo,setCnpjVindo]=useState("")
    const [uf,setUf]=useState("")
    const [municipio,setMunicipio]=useState("")
    const [nomeFantasia,setNomeFantasia]=useState("")
    const [empresas,setEmpresas]=useState()
    useEffect(()=>{
        async function ExecucaoInicial() {
            const empresas=await AsyncStorage.getItem("empresas")
            if(!empresas){
                AsyncStorage.setItem("empresas","[]")
            }

            try{
                const response=await axios.get(
                    "https://brasilapi.com.br/api/cnpj/v1/"+cnpj
                )
                const dados=response.data
                const empresa:Empresa={
                    razaoSocial: dados.razao_social,
                    cnpj:dados.cnpj,
                    uf:dados.uf,
                    municipio:dados.municipio,
                    nomeFantasia:dados.nome_fantasia
                }
                let empresasSalvasEmString=await AsyncStorage.getItem("empresas")
                let empresasSalvas=empresasSalvasEmString ? JSON.parse(empresasSalvasEmString) : []
                await AsyncStorage.setItem("empresas",JSON.stringify([...empresasSalvas, empresa]))
                setRazaoSocial(dados.razao_social)
                setCnpjVindo(dados.cnpj)
                setMunicipio(dados.municipio)
                setUf(dados.uf)
                setNomeFantasia(dados.nome_fantasia)
                empresasSalvasEmString=await AsyncStorage.getItem("empresas")
                empresasSalvas=empresasSalvasEmString ? JSON.parse(empresasSalvasEmString) : []
                setEmpresas(empresasSalvas)

            }
            catch(erro){
                alert("erro ao buscar informaçõe")
            }
        }
        ExecucaoInicial()
    },[])

    function voltar(){
        router.back()
    }

    const router=useRouter()
    return(
        <View>
            <TouchableOpacity style={styles.botaoSeta} onPress={voltar}>
                <FontAwesome name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.container}>
                <Text>
                    Razão Social: {razaoSocial}
                </Text>
                <Text>
                    CNPJ: {cnpjVindo}
                </Text>
                <Text>
                    UF: {uf}
                </Text>
                <Text>
                    Municipio: {municipio}
                </Text>
                <Text>
                    Nome Fantasia: {nomeFantasia}
                </Text>
            </View>
            <FlatList
            data={empresas}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
                <View>
                <Text>
                    Busca {index + 1} - {item.cnpj} - {item.razaoSocial}
                </Text>
                </View>
            )}
            />
        </View>
        
    )
}
const styles=StyleSheet.create({
    botaoSeta:{
        marginLeft: 15,
        marginTop: 15
    },
    container:{
        backgroundColor:"#95f5af",
        width: 300,
        marginLeft: 30,
        marginTop: 30,
        gap: 5
    }
})