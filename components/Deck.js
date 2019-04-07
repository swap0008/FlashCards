import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Button from './Button';

class Deck extends Component {
	static navigationOptions = ({ navigation }) => {
		const { title } = navigation.state.params;

		return {
			title,
		};
	}

	addCard = () => {
		console.log('Add Card Hit');
	}

	startQuiz = () => {
		console.log('Start Quiz Hit');
	}

	render () {
		const { title, deck } = this.props;

		return (
			<View style={styles.container}>
				<Text style={{fontSize: 40}}>
					{title}
				</Text>
				<Text style={{color: 'grey', fontSize: 28}}>
					{deck.questions.length} cards
				</Text>
				<Button 
					text='Add Card' 
					styling={[styles.btn, {backgroundColor: 'white', marginTop: 50}]} 
					onPress={() => this.props.navigation.navigate('AddCard', {title})} />
				<Button 
					text='Start Quiz' 
					styling={[styles.btn, {backgroundColor: 'black', color: 'white'}]} 
					onPress={() => this.props.navigation.navigate('Quiz', {title})} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		padding: 40,
		paddingTop: 80,
		alignItems: 'center',
	},
	btn: {
		borderWidth: 1,
		borderColor: 'black',
		borderRadius: 5,
		padding: 20,
		paddingLeft: 50,
		paddingRight: 50,
		fontSize: 20,
		marginBottom: 10,
	}
});

function mapStateToProps (decks, { navigation }) {
	const { title } = navigation.state.params;

	return {
		title,
		deck: decks[title]
	}
}

export default connect(mapStateToProps)(Deck);