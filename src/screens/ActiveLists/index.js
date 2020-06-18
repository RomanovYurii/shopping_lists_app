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
	archiveList,
	deleteList,
	selectList,
} from '../../actions/shoppingListsActions';
import LIST_TYPES from '../../constants/LIST_TYPES';
import styles from './styles';
import { getBeautifiedDate } from '../../constants/utils';

const ActiveListsComponent = ({ navigation }) => {
	const dispatch = useDispatch();
	const shoppingLists = useSelector((state) => state);
	const [activeListsData, setActiveListsData] = useState([]);

	const fetchListsFromStore = () => {
		const _activeLists = [];
		for (let i = 0; i < shoppingLists.activeLists.length; i++) {
			_activeLists.push({
				key: '' + i,
				list: shoppingLists.activeLists[i],
			});
		}
		setActiveListsData(_activeLists);
	};

	const onItemPressed = (data) => {
		navigation.navigate('Edit', {
			idx: data.item.key,
			list: data.item.list,
		});
	};

	const renderItem = (data) => (
		<TouchableHighlight
			underlayColor={'#eee'}
			onPress={() => onItemPressed(data)}
			style={[
				styles.rowFront,
				data.item.list.selected && styles.rowSelected,
			]}
		>
			<>
				<Text style={{ fontWeight: 'bold' }}>
					{data.item.list.listName}
				</Text>

				<Text>
					Created: {getBeautifiedDate(data.item.list.created)}
				</Text>
			</>
		</TouchableHighlight>
	);
	const renderHiddenItem = (data, rowMap) => (
		<View style={styles.rowBack}>
			<Button
				onPress={() => {
					dispatch(selectList(data.index));
					fetchListsFromStore();
					rowMap[data.item.key].closeRow();
				}}
				style={[styles.button, styles.selectButton]}
			>
				<Text>Select</Text>
			</Button>

			<Button
				warning
				onPress={() => {
					dispatch(archiveList(data.index));
					fetchListsFromStore();
					rowMap[data.item.key].closeRow();
				}}
				style={[styles.button, styles.archiveButton]}
			>
				<Text>Archive</Text>
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
		if (activeListsData.length === 0)
			return <Text style={{ padding: 20 }}>Nothing here. Yet.</Text>;
		return (
			<SwipeListView
				data={activeListsData}
				renderItem={renderItem}
				renderHiddenItem={renderHiddenItem}
				leftOpenValue={85}
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
					<Title>Active lists</Title>
				</Body>
				<Right />
			</Header>

			{renderContent()}
		</Container>
	);
};

export default ActiveListsComponent;
