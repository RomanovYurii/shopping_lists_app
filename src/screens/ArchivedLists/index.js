import React, { useState, useEffect } from 'react';
import {
	Header,
	Icon,
	Left,
	Container,
	Body,
	Title,
	Right,
	Content,
	Text,
	Button,
} from 'native-base';
import { TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import {
	activateList,
	archiveList,
	deleteList,
	selectList,
} from '../../actions/shoppingListsActions';
import LIST_TYPES from '../../constants/LIST_TYPES';
import styles from './styles';
import { getBeautifiedDate } from '../../constants/utils';

const ArchivedListsComponent = ({ navigation }) => {
	const dispatch = useDispatch();
	const shoppingLists = useSelector((state) => state);
	const [archivedListData, setArchivedListsData] = useState([]);

	const fetchListsFromStore = () => {
		const _archivedLists = [];
		for (let i = 0; i < shoppingLists.archivedLists.length; i++) {
			_archivedLists.push({
				key: i + '',
				list: shoppingLists.archivedLists[i],
			});
		}
		setArchivedListsData(_archivedLists);
	};

	const renderItem = (data) => (
		<View style={styles.rowFront}>
			<Text style={{ fontWeight: 'bold' }}>
				{data.item.list.listName}
			</Text>

			<Text>Created: {getBeautifiedDate(data.item.list.created)}</Text>
		</View>
	);
	const renderHiddenItem = (data, rowMap) => (
		<View style={styles.rowBack}>
			<Button
				success
				onPress={() => {
					dispatch(activateList(data.index));
					fetchListsFromStore();
					rowMap[data.item.key].closeRow();
				}}
				style={[styles.button, styles.activateButton]}
			>
				<Text>Activate</Text>
			</Button>

			<Button
				danger
				onPress={() => {
					dispatch(deleteList(data.index, LIST_TYPES.ACTIVE));
					fetchListsFromStore();
					rowMap[data.item.key].closeRow();
				}}
				style={[styles.button, styles.deleteButton]}
			>
				<Text>Delete</Text>
			</Button>
		</View>
	);
	const renderContent = () => {
		if (archivedListData.length === 0)
			return <Text style={{ padding: 20 }}>Nothing here. Yet.</Text>;
		return (
			<SwipeListView
				data={archivedListData}
				renderItem={renderItem}
				renderHiddenItem={renderHiddenItem}
				leftOpenValue={0}
				rightOpenValue={-190}
			/>
		);
	};

	useEffect(() => {
		fetchListsFromStore();
	}, [shoppingLists]);

	return (
		<Container>
			<Header>
				<Left>
					<TouchableOpacity onPress={() => navigation.openDrawer()}>
						<Icon name={'ios-menu'} style={{ color: 'white' }} />
					</TouchableOpacity>
				</Left>

				<Body>
					<Title>Archived lists</Title>
				</Body>

				<Right />
			</Header>

			{renderContent()}
		</Container>
	);
};

export default ArchivedListsComponent;
