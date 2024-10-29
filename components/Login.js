import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from "react-native";
import { auth } from "../firebase"; // Altere para importar a instância de autenticação
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [user, setUser] = useState(null);

    function logar() {
        signInWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user);
                navigation.navigate('Rotas', { email });
            })
            .catch((error) => {
                Alert.alert(error.message); // Melhor exibir o erro com Alert
            });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                navigation.navigate('Rotas'); // Redireciona se já estiver logado
            } else {
                setUser(null); // Limpa o usuário se não estiver logado
            }
        });

        return () => unsubscribe(); // Limpa o listener
    }, [navigation]);

    return (
        <View style={estilo.container}>
            <Text style={estilo.titulo}>Refeição APP</Text>
            <TextInput 
                style={estilo.input} 
                onChangeText={setEmail} 
                placeholder="Digite o email:" 
                value={email}
            />
            <TextInput 
                style={estilo.input} 
                onChangeText={setSenha} 
                secureTextEntry={true} 
                placeholder="Digite a senha:" 
                value={senha}
            />
            <TouchableOpacity style={estilo.botaoLogar} onPress={logar}>
                <Text style={estilo.textoBotaoLogar}>Logar</Text>
            </TouchableOpacity>
        </View>
    );
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    titulo: {
        color: 'yellow',
        fontSize: 50,
        textAlign: 'center',
        marginBottom: 10,        
    },
    input: {
        width: 250,
        height: 30,
        backgroundColor: '#FFFEFF',
        marginVertical: 10,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 25,
        marginTop: 20
    },
    botaoLogar: {
        width: 200,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow',
        marginTop: 80
    },
    textoBotaoLogar: {
        fontSize: 25,
        color: 'red'
    }
});
