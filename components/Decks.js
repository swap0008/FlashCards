import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { getDecks } from '../utils/helpers';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import { AppLoading } from 'expo';

class Decks extends Component {
	componentDidMount () {
		const { dispatch } = this.props; 

		getDecks()
			.then((decks) => dispatch(receiveDecks(decks)))
	}

	render () {
		const { decks } = this.props;

		return (
			<View style={{flex: 1, backgroundColor: 'white'}}>
				<ScrollView contentContainerStyle={styles.container}>
					{Object.keys(decks).reverse().map((deck) => (
						<TouchableOpacity 
							onPress={() => this.props.navigation.navigate(
								'Deck',
								{title: deck}
							)} 
							key={deck}>
							<View style={styles.deck}>
								<Text style={styles.deckTitle}>
									{deck}
								</Text>
								<Text style={{color: 'grey', fontSize: 18}}>
									{decks[deck].questions.length} cards
								</Text>
							</View>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: 'white',
		alignItems: 'center',
	},
	deck: {
		width: 300,
		height: 150,
		borderWidth: 1,
		borderColor: 'red',
		marginTop: 20,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		paddingLeft: 20,
		paddingRight: 20
	},
	deckTitle: {
		fontSize: 30
	}
})


function mapStateToProps (decks) {
	return {
		decks
	};
}

export default connect(mapStateToProps)(Decks);