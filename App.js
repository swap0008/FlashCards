import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import Decks from './components/Decks';
import NewDeck from './components/NewDeck';
import Deck from './components/Deck';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { setLocalNotification } from './utils/notification'

const Tabs = createMaterialTopTabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks'
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck'
    }
  }
}, {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      style: {
        backgroundColor: 'brown',
        height: 80,
        paddingTop: Constants.statusBarHeight, 
      },
      labelStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      }
    }
});

const MainNavigator = createStackNavigator({
    Home: {
        screen: Tabs,
        navigationOptions: {
            header: null
        }
    },
    Deck: {
        screen: Deck,
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: {
            title: 'Add Card'
        }
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            title: 'Quiz'
        }
    }
}, {
    navigationOptions: {
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: 'brown'
        }
    }
});

class App extends Component {
  componentDidMount () {
    setLocalNotification();
  }

  render () {
    return (
      <Provider store={createStore(reducers)}>
        <View style={{flex: 1}}> 
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

export default App;