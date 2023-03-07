import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Map from '../Screens/Map';
import Home from '../Screens/Home';
import ContextProvider from '../ContextApi/ContextProvider';

const Tab:any = createBottomTabNavigator()

const TabNavigator=()=>{
    return (
       <ContextProvider>
        <NavigationContainer>
           <Tab.Navigator>
               <Tab.Screen testId="navigation-locations-tab" name="Home" component={Home}/>
               <Tab.Screen testId = "navigation-map-tab" name="Map" component={Map}/>
           </Tab.Navigator>
        </NavigationContainer>
        </ContextProvider>
       
    );
}

export default TabNavigator;