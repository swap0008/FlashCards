import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Entypo } from '@expo/vector-icons';
import Button from './Button';
import { setLocalNotification, clearLocalNotification } from '../utils/notification'

class Quiz extends Component {
	state = {
		count: 0,
		score: 0,
		flip: 'Answer'
	}

	componentDidMount () {
		clearLocalNotification()
			.then(setLocalNotification);
	}

	nextQuestion = (check) => {
		if (check) {
			this.setState((state) => ({
				count: state.count + 1,
				score: state.score +1
			}));
		} else {
			this.setState((state) => ({
				count: state.count + 1,
			}));
		}
	}

	flipCard = () => {
		const { flip } = this.state;

		if (flip === 'Answer') {
			this.setState({flip: 'Question'});
		} else {
			this.setState({flip: 'Answer'});
		}

	} 

	render () {
		const { title, deck } = this.props;
		const { count, score, flip } = this.state;

		if (deck.questions.length === 0) {
			return (
				<View style={styles.wrapper}>
					<Entypo name='warning' color='red' size={100}/>
					<Text style={{fontSize: 30}}>No quiz available yet!</Text>
				</View>
			);
		}

		if (deck.questions.length === count) {
			return (
				<View style={styles.wrapper}>
					<Text style={{fontSize: 30}}>Your Score: {`${score}/${count}`}</Text>
					<Button 
						text='Restart Quiz'
						styling={[styles.btn, {backgroundColor: 'red', color: 'white', marginTop: 20}]} 
						onPress={() => this.setState({count: 0, score: 0, flip: 'Answer'})} />
					<Button 
						text='Go Back'
						styling={[styles.btn, {backgroundColor: 'black', color: 'white', marginTop: 20}]} 
						onPress={() => this.props.navigation.goBack()} />
				</View>
			);
		}

		return (
			<View style={{flex: 1, backgroundColor: 'white'}}>
				<Text style={{marginLeft: 40, marginTop: 20, fontSize: 20}}>
						{`${count + 1}/${deck.questions.length}`}
				</Text>
				<View style={styles.container}>
					<Text style={{fontSize: 30}}>
						{flip === 'Answer' ? deck.questions[count].question : deck.questions[count].answer}
					</Text>
					<Button text={flip} onPress={this.flipCard} styling={styles.flipBtn}/>
					<Button 
						text='Correct'
						styling={[styles.btn, {backgroundColor: 'green'}]}
						onPress={() => this.nextQuestion(true)} />
					<Button 
						text='Incorrect'
						styling={[styles.btn, {backgroundColor: 'red'}]} 
						onPress={() => this.nextQuestion(false)} />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1, 
		backgroundColor: 'white', 
		paddingTop: 80, 
		alignItems: 'center'
	},
	container: {
		flex: 1,
		backgroundColor: 'white',
		padding: 30,
		alignItems: 'center'
	},
	btn: {
		borderRadius: 5,
		padding: 20,
		width: 300,
		textAlign: 'center',
		fontSize: 20,
		marginBottom: 20,
		color: 'white'
	},
	flipBtn: {
		marginBottom: 60,
		fontSize: 20,
		color: 'red'
	}
});

function mapStateToProps (decks, { navigation }) {
	const { title } = navigation.state.params;

	return {
		title,
		deck: decks[title]
	};
}

export default connect(mapStateToProps)(Quiz);