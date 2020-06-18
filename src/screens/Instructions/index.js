import React from 'react';
import {
	Container,
	Header,
	Left,
	Body,
	Right,
	Content,
	H1,
	H2,
	Text,
	Icon,
	Title,
} from 'native-base';
import { TouchableOpacity } from 'react-native';

const NH2 = (props) => <H2 style={{ marginTop: 20 }} {...props} />;
const InstructionsScreen = ({ navigation }) => {
	return (
		<Container>
			<Header>
				<Left>
					<TouchableOpacity onPress={() => navigation.openDrawer()}>
						<Icon name={'ios-menu'} style={{ color: 'white' }} />
					</TouchableOpacity>
				</Left>

				<Body>
					<Title>Instructions</Title>
				</Body>

				<Right />
			</Header>

			<Content style={{ padding: 20 }}>
				<H1>How to use this app?</H1>
				<NH2>1. How to add new shopping list</NH2>
				<Text>
					- Go to the "Home" screen from sidebar{'\n'}- Tap on the
					top-right button or on big blue button{'\n'}- You will be
					forwarded to the "Add new list" screen{'\n'}- There you will
					be able to change the name and the list of items{'\n'}
					Important! You will not be able to save if at least one
					textfield will be empty{'\n'}
				</Text>
				<NH2>2. How to change selected list</NH2>
				<Text>
					- Go to the "Active Lists" screen from sidebar{'\n'}- There
					you will see the list of all shopping lists which you have
					created{'\n'}- Swipe any of them from left to right and
					there will appear a blue "Select" button{'\n'}- Selected
					lists are highlighted with green color{'\n'}
				</Text>
				<NH2>3. How to delete list</NH2>
				<Text>
					- Go to the "Active Lists" or "Archived Lists" screen from
					sidebar{'\n'}- Swipe any entry of the list from right to
					left and there will appear a red button with "Delete" text
					{'\n'}- If you delete the list you will not be able to
					restore it{'\n'}
				</Text>
				<NH2>4. How to archive list</NH2>
				<Text>
					- Go to the "Active Lists" screen from sidebar{'\n'}- Swipe
					any entry of the list from right to left and there will
					appear a yellow button with "Archive" text{'\n'}- When you
					tap on it, the list will be archived and stored in "Archived
					Lists" screen{'\n'}- You may always reactivate archived list
					{'\n'}- You cannot change archived list{'\n'}
				</Text>
				<NH2>5. How to activate archived list</NH2>
				<Text>
					- Go to the "Archived Lists" screen from sidebar{'\n'}-
					Swipe any entry of the list from right to left and there
					will appear a green button with "Activate" text{'\n'}- When
					you tap on it, the list will be activated and stored in
					"Activated Lists" screen{'\n'}- Now you can go back to
					"Activated Lists" screen and work with those lists{'\n'}
				</Text>
				<NH2>5. How to edit list</NH2>
				<Text>
					- Go to the "Active Lists" screen from sidebar{'\n'}-
					Remember, that you can't edit or select the archived list!
					{'\n'}- Choose the list you want to edit and tap on it{'\n'}
					- You will see already familiar to you screen with
					textfields{'\n\n\n'}
				</Text>
			</Content>
		</Container>
	);
};

export default InstructionsScreen;
