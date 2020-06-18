import React, { useState, useEffect } from 'react';
import {
	Body,
	Button,
	Container,
	Content,
	H2,
	Header,
	Icon,
	Right,
	Left,
	List,
	ListItem,
	Text,
	Title,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { RECOVER_SHOPPING_LISTS, REMOVE_ALL_LISTS } from '../../actions/types';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import {
	recoverFromStorage,
	removeAllLists,
} from '../../actions/shoppingListsActions';
import { buyItem, returnItem } from '../../actions/itemListActions';

const HomeScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const { activeLists } = useSelector((state) => state);

	const renderRightHeaderButton = () => {
		if (activeLists.length === 0) return;
		return (
			<Right>
				<TouchableOpacity
					onPress={() => navigation.navigate('NewList')}
				>
					<Icon
						type={'FontAwesome'}
						name={'plus-square'}
						style={{ color: 'white' }}
					/>
				</TouchableOpacity>
			</Right>
		);
	};

	const renderContent = () => {
		if (activeLists.length === 0)
			return (
				<>
					<Text>
						Hmm... Looks pretty empty here. Let's go and create your
						first shopping list!
					</Text>

					<Button
						style={{ marginTop: 20 }}
						iconRight
						onPress={() => navigation.navigate('NewList')}
					>
						<Text>Create new shopping list</Text>
						<Icon name={'ios-add'} />
					</Button>
				</>
			);

		for (let list of activeLists) {
			if (list.selected) {
				return (
					<>
						<Text style={styles.subtitle}>Selected list:</Text>

						<H2 style={styles.title}>{list.listName}</H2>

						<List>
							{list.items.map((item, idx) => (
								<ListItem
									key={idx}
									button
									onPress={() => {
										dispatch(
											item.bought
												? returnItem({
														listName: list.listName,
														idx,
												  })
												: buyItem({
														listName: list.listName,
														idx,
												  })
										);
									}}
								>
									<Text
										style={[
											item.bought && {
												textDecorationLine:
													'line-through',
												textDecorationStyle: 'solid',
											},
										]}
									>
										{item.value}
									</Text>
								</ListItem>
							))}
						</List>
					</>
				);
			}
		}
	};

	useEffect(() => {
		AsyncStorage.getItem('shoppingLists').then((stringData) => {
			const data = JSON.parse(stringData);
			if (!!data) dispatch(recoverFromStorage(data));
		});
	}, []);

	return (
		<Container>
			<Header>
				<Left>
					<TouchableOpacity onPress={() => navigation.openDrawer()}>
						<Icon name={'ios-menu'} style={{ color: 'white' }} />
					</TouchableOpacity>
				</Left>

				<Body>
					<Title>Shopping list app</Title>
				</Body>

				{renderRightHeaderButton()}
			</Header>

			<Content style={styles.content}>{renderContent()}</Content>
		</Container>
	);
};

export default HomeScreen;
