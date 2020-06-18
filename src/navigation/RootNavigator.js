import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeNavigator from './HomeNavigator';
import ArchivedListsComponent from '../screens/ArchivedLists';
import ActiveListsNavigator from './ActiveListsNavigator';
import InstructionsScreen from '../screens/Instructions';

const Drawer = createDrawerNavigator();
const RootNavigator = () => {
	return (
		<NavigationContainer>
			<Drawer.Navigator>
				<Drawer.Screen name={'Home'} component={HomeNavigator} />
				<Drawer.Screen
					name={'Active Lists'}
					component={ActiveListsNavigator}
				/>
				<Drawer.Screen
					name={'Archived Lists'}
					component={ArchivedListsComponent}
				/>
				<Drawer.Screen
					name={'Instructions'}
					component={InstructionsScreen}
				/>
			</Drawer.Navigator>
		</NavigationContainer>
	);
};

export default RootNavigator;
