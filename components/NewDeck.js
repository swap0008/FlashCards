import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { saveDeckTitle } from '../utils/helpers';
import { connect } from 'react-redux';
import { addDeckTitle } from '../actions';
import Button from './Button';

class NewDeck extends Component {
	state = {
		text: ''
	}

	submit = () => {
		const { text } = this.state;
		const { dispatch } = this.props;

		const deck = {
			[text]: {
				title: text,
				questions: []
			}
		}

		if (text.trim()) {
			saveDeckTitle(deck)
				.then(() => dispatch(addDeckTitle(deck)));
			
			this.setState(() => ({
				text: ''
			}))

			this.props.navigation.goBack();
		} else {
			alert('Please enter title!');
		}		
	}

	render () {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>What is the title of your new deck?</Text>
				<View style={{flexDirection: 'row'}}>
					<TextInput
				        style={styles.inputText}
				        onChangeText={(text) => this.setState({text})}
				        value={this.state.text}
	      			/>
	      		</View>
      			<Button text='Submit' styling={styles.submitBtn} onPress={this.submit} />
			</View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 30,
		alignItems: 'center',
		backgroundColor: 'white'
	},
	title: {
		fontSize: 25,
		marginBottom: 10,
	},
	inputText: {
		flex: 1,
		height: 45,
		marginBottom: 10,
	},
	submitBtn: {
		borderWidth: 1,
		borderColor: 'black',
		borderRadius: 5,
		color: 'white',
		backgroundColor: 'black',
		padding: 10,
		paddingLeft: 20,
		paddingRight: 20
	}
});


export default connect()(NewDeck);