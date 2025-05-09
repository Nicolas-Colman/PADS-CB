import { useNavigation } from "@react-navigation/native";
import * as React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons';

import Home from "./home";
import Ocorrencias from "./ocorrencia";
import Chamados from "./chamados";
import Empresas from "./empresas";
import Alerta from "./alertas";

const Tab = createBottomTabNavigator();

export default function Menu() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarStyle: { 
                    backgroundColor: '#21a7cc', 
                    height: 60,
                    width: '98%',
                    margin: 'auto',
                    marginBottom: 10,
                    borderRadius: 7
                }, 
                tabBarActiveTintColor: 'white', 
                tabBarInactiveTintColor: '#bff1ff',  
                tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
            }}
        >
            <Tab.Screen 
                name="Ocorrencias" 
                component={Ocorrencias}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon 
                            name="alert-sharp" 
                            size={30} 
                            color={focused ? 'black' : '#bff1ff'} 
                        />
                    )
                }}
            />

            <Tab.Screen 
                name="Chamados" 
                component={Chamados} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon 
                            name="albums-outline" 
                            size={30} 
                            color={focused ? 'black' : '#bff1ff'} 
                        />
                    )
                }}
            />

            <Tab.Screen 
                name="Home" 
                component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon 
                            name="home" 
                            size={45} 
                            color={focused ? 'black' : '#bff1ff'} 
                        />
                    )
                }}
            />

            <Tab.Screen 
                name="Empresas" 
                component={Empresas}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon 
                            name="business-outline" 
                            size={30} 
                            color={focused ? 'black' : '#bff1ff'} 
                        />
                    )
                }}
            />

            <Tab.Screen 
                name="Alerta" 
                component={Alerta}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon 
                            name="alert-circle-outline" 
                            size={30} 
                            color={focused ? 'black' : '#bff1ff'} 
                        />
                    )
                }}
            />
        </Tab.Navigator>
    );
}
