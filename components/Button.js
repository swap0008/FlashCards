import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default function Button (props) {
	const { text, styling, onPress } = props;

	return (
		<TouchableOpacity onPress={onPress}>
			<Text style={styling}>
				{text}
			</Text>
		</TouchableOpacity>
	);
}