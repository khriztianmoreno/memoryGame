import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // use FontAwesome from the expo vector icons

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center'
  },
  card_text: {
    fontSize: 50,
    fontWeight: 'bold'
  }
});

const Card = (props) => {
  let CardSource = FontAwesome; // set FontAwesome as the default icon source
  let icon_name = 'question-circle';
  let icon_color = '#393939';

  if(props.is_open){
    CardSource = props.src;
    icon_name = props.name;
    icon_color = props.color;
  }

  return (
    <View style={styles.card}>
      <TouchableHighlight onPress={props.clickCard} activeOpacity={0.75} underlayColor={"#f1f1f1"}>
        <CardSource
          name={icon_name}
          size={50}
          color={icon_color}
        />
      </TouchableHighlight>
    </View>
  )
}

export default Card
