import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NewListScreen from '../screens/NewList';
import HomeScreen from '../screens/Home';

const Stack = createStackNavigator();
const HomeNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name={'Home'} component={HomeScreen} />
			<Stack.Screen name={'NewList'} component={NewListScreen} />
		</Stack.Navigator>
	);
};

export default HomeNavigator;
