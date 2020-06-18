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
import { addShoppingList, editList } from '../../actions/shoppingListsActions';
import styles from './styles';

const EditListScreen = ({ navigation, route }) => {
	const dispatch = useDispatch();
	const { idx, list } = route.params;
	console.log(idx);

	const [listName, setListName] = useState(list.listName);
	const [itemsList, setItemsList] = useState([...list.items]);

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

		dispatch(
			editList(idx, {
				listName,
				items: itemsList,
				selected: list.selected,
				created: Date.now(),
			})
		);

		navigation.goBack();
	};
	const onAddNewItem = () => {
		setItemsList([
			...itemsList,
			{
				value: '',
				bought: false,
			},
		]);
	};
	const onDeleteListItem = (idx) => {
		const newItemsList = [...itemsList];
		newItemsList.splice(idx, 1);

		setItemsList(newItemsList);
	};
	const onItemTextChange = (value, idx) => {
		const newItemsList = [...itemsList];

		newItemsList[idx] = {
			value,
			bought: false,
		};

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
					value={item.value}
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
					<Title>Edit list</Title>
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
			</Content>
		</Container>
	);
};

export default EditListScreen;
