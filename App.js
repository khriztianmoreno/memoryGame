import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Ionicons, FontAwesome, Entypo } from '@expo/vector-icons';

import Header from './components/Header';
import Score from './components/Score';
import Card from './components/Card';

import CARDS_DATA from './assets/data/cards'

import helpers from './helpers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff'
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  body: {
    flex: 18,
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 20
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);

    const sources = {
      'fontawesome': FontAwesome,
      'entypo': Entypo,
      'ionicons': Ionicons
    };

    const clone = JSON.parse(JSON.stringify(CARDS_DATA));

    this.cards = CARDS_DATA.concat(clone);
    this.cards.map((obj) => {
      let id = Math.random().toString(36).substring(7);
      obj.id = id;
      obj.src = sources[obj.src];
      obj.is_open = false;
    });

    this.cards = this.cards.shuffle();
    this.state = {
      currentSelection: [],
      selectedPairs: [],
      score: 0,
      cards: this.cards
    }

  }

  resetCards = () => {
    let cards = this.cards.map((obj) => {
      obj.is_open = false;
      return obj;
    });

    cards = cards.shuffle();

    this.setState({
      currentSelection: [],
      selectedPairs: [],
      cards: cards,
      score: 0
    });
  }

  renderRows = () => {
    const { cards } = this.state
    const contents = this.getRowContents(cards);
    return contents.map((itemCard, index) => {
      return (
        <View key={index} style={styles.row}>
          { this.renderCards(itemCard) }
        </View>
      );
    });

  }

  renderCards = cards => {
    return cards.map((card, index) => {
      return (
        <Card
          key={index}
          src={card.src}
          name={card.name}
          color={card.color}
          is_open={card.is_open}
          clickCard={() => { this.clickCard(card.id) }}
        />
      );
    });
  }


  clickCard = id => {
    let {
      selectedPairs,
      currentSelection,
      score,
      cards,
    } = this.state;

    const index = cards.findIndex((card) => {
      return card.id == id;
    });

    let localCards = cards

    if(localCards[index].is_open == false && selectedPairs.indexOf(localCards[index].name) === -1){

      localCards[index].is_open = true;

      currentSelection.push({
        index: index,
        name: localCards[index].name
      });

      if(currentSelection.length === 2){
        if(currentSelection[0].name === currentSelection[1].name){
          score += 1;
          selectedPairs.push(localCards[index].name);
        } else {
          localCards[currentSelection[0].index].is_open = false;

          setTimeout(() => {
            localCards[index].is_open = false;
            this.setState({
              cards: localCards
            });
          }, 500);
        }

        currentSelection = [];
      }

      this.setState({
        score: score,
        cards: localCards,
        currentSelection: currentSelection
      });
    }
  }

  getRowContents = cards => {
    let contents_r = [];
    let contents = [];
    let count = 0;
    cards.forEach((item) => {
      count += 1;
      contents.push(item);
      if(count == 4){
        contents_r.push(contents)
        count = 0;
        contents = [];
      }
    });

    return contents_r;
  }


  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.body}>
          {
            this.renderRows.call(this)
          }
        </View>
        <Score score={this.state.score} />
        <Button
          onPress={this.resetCards}
          title="Reset"
          color="#008CFA"
        />
      </View>
    );
  }

}


export default App
