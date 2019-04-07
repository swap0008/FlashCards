import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Button from './Button';
import { addDeckQuestion } from '../actions';
import { addCardToDeck, getDeck } from '../utils/helpers';
import { connect } from 'react-redux';

class AddCard extends Component {
	state = {
		question: '',
		answer: ''
	}

	saveCard = () => {
		const { dispatch } = this.props;
		const { title } = this.props.navigation.state.params;
		const { question, answer } = this.state;

		if (question.trim() && answer.trim()) {
			addCardToDeck(title, question, answer)
			.then(() => dispatch(addDeckQuestion(title, question, answer)))
			.catch((error) => console.warn('Error: ', error));

			this.setState({question: '', answer: ''});

			this.props.navigation.goBack();
		} else {
			alert("Don't leave field empty!");
		}
	}

	render () {
		const { title } = this.props.navigation.state.params;

		return (
			<View style={styles.container}>
				<Text style={{fontSize: 30, marginBottom: 20}}>{title} Card</Text>
				<TextInput
			        style={styles.inputText}
			        onChangeText={(question) => this.setState({question})}
			        value={this.state.question}
			        placeholder='Question' />
				<TextInput
			        style={styles.inputText}
			        onChangeText={(answer) => this.setState({answer})}
			        value={this.state.answer}
			        placeholder='Answer' />
				<Button 
					text='Submit' 
					styling={styles.btn}
					onPress={this.saveCard} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center',
		padding: 30,
		backgroundColor: 'white',
	},
	inputText: {
		height: 50,
		width: 290,
		borderColor: 'black',
		borderWidth: 1,
		borderRadius: 5,
		marginBottom: 20,
		padding: 10
	},
	btn: {
		backgroundColor: 'black',
		padding: 20,
		paddingLeft: 50,
		paddingRight: 50,
		color: 'white',
		fontSize: 20,
		borderRadius: 5
	}
});

export default connect()(AddCard);