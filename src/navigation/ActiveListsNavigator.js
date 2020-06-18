import { createStackNavigator } from '@react-navigation/stack';
import ActiveListsComponent from '../screens/ActiveLists';
import React from 'react';
import EditListScreen from '../screens/EditList';

const Stack = createStackNavigator();

const ActiveListsNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name={'Active'} component={ActiveListsComponent} />
			<Stack.Screen name={'Edit'} component={EditListScreen} />
		</Stack.Navigator>
	);
};

export default ActiveListsNavigator;
