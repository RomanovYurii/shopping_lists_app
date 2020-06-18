import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import {
	Body,
	Button,
	Container,
	Content,
	Form,
	Header,
	Icon,
	Input,
	Item,
	Left,
	Right,
	List,
	Text,
	Title,
	ListItem,
	Toast,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { addShoppingList } from '../../actions/shoppingListsActions';
import styles from './styles';

const NewListScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const shoppingLists = useSelector((state) => state);

	const [listName, setListName] = useState('');
	const [itemsList, setItemsList] = useState([]);

	const onSaveList = () => {
		let anyEmptyItems = false;
		for (let item of itemsList) {
			if (item === '') {
				anyEmptyItems = true;
				break;
			}
		}

		if (itemsList.length === 0 || listName === '' || anyEmptyItems) {
			Toast.show({
				text: 'Maybe you forgot to add something?',
				duration: 10000,
				buttonText: 'Okay',
			});
			return;
		}

		const newItemsList = [];

		for (let i = 0; i < itemsList.length; i++) {
			newItemsList[i] = {
				value: itemsList[i],
				bought: false,
			};
		}

		dispatch(
			addShoppingList({
				listName,
				items: newItemsList,
				selected: shoppingLists.activeLists.length === 0,
				created: Date.now(),
			})
		);

		navigation.navigate('Home');
	};
	const onAddNewItem = () => {
		setItemsList([...itemsList, '']);
	};
	const onDeleteListItem = (idx) => {
		const newItemsList = [...itemsList];
		newItemsList.splice(idx, 1);

		setItemsList(newItemsList);
	};
	const onItemTextChange = (value, idx) => {
		const newItemsList = [...itemsList];

		newItemsList[idx] = value;

		setItemsList(newItemsList);
	};

	const renderEmptyItemsListPlaceholder = () => {
		if (itemsList.length === 0)
			return (
				<ListItem style={styles.emptyItemsListPlaceholder.listItem}>
					<Text style={styles.emptyItemsListPlaceholder.text}>
						This list is so empty{'\t'}
					</Text>

					<Icon
						name={'ios-sad'}
						style={styles.emptyItemsListPlaceholder.icon}
					/>
				</ListItem>
			);
	};
	const renderItemsList = () => {
		return itemsList.map((item, idx) => (
			<Item key={idx}>
				<Input
					autoFocus
					value={item}
					placeholder={'New Item'}
					onChangeText={(value) => onItemTextChange(value, idx)}
				/>

				<TouchableOpacity onPress={() => onDeleteListItem(idx)}>
					<Icon name={'md-remove-circle'} style={{ color: 'red' }} />
				</TouchableOpacity>
			</Item>
		));
	};

	const buttonAddNewItemProps = {
		success: true,
		block: true,
		style: { margin: 20 },
		onPress: onAddNewItem,
	};

	return (
		<Container>
			<Header>
				<Left>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<Icon
							name={'md-arrow-back'}
							style={{ color: 'white' }}
						/>
					</TouchableOpacity>
				</Left>

				<Body>
					<Title>Add new list</Title>
				</Body>

				<Right>
					<TouchableOpacity onPress={onSaveList}>
						<Icon
							type={'FontAwesome'}
							name={'save'}
							style={{
								color: 'white',
							}}
						/>
					</TouchableOpacity>
				</Right>
			</Header>

			<Content style={styles.content}>
				<Form>
					<Item>
						<Input
							autoFocus
							value={listName}
							placeholder={'Name of the list'}
							onChangeText={(newName) => setListName(newName)}
						/>
					</Item>
				</Form>

				<List>
					{renderEmptyItemsListPlaceholder()}

					<Form>{renderItemsList()}</Form>
				</List>

				<Button {...buttonAddNewItemProps}>
					<Text>Add new item</Text>
				</Button>
				<Text style={styles.instructions}>
					When the list will be much longer you always can swipe down!
				</Text>
			</Content>
		</Container>
	);
};

export default NewListScreen;
