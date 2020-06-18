import React, { useEffect } from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import { createStore } from 'redux';
import rootReducer from './src/reducers/rootReducer';
import { Provider } from 'react-redux';
import { Root } from 'native-base';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
	'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
]);
const store = createStore(rootReducer);

const App = () => {
	return (
		<Root>
			<Provider store={store}>
				<RootNavigator />
			</Provider>
		</Root>
	);
};

export default App;
