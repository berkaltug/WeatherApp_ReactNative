/* @flow */

import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

export default class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  handleChangeText = newLocation => {
    this.setState({text: newLocation});
  };

  handleSubmitEditing = () => {
    const {onSubmit} = this.props; //destructing atama yapıyoruz
    const {text} = this.state;
    if (!text) return ;
    console.log(text);
    onSubmit(text);
    this.setState({text:""});
  }

  render() {
    const {placeholder} = this.props;
    const {text} = this.state;
    return (
      <View>
        <TextInput
          value={text}
          autoCorrect={false}
          placeholder={placeholder}
          placeholderTextColor="white"
          style={styles.textInput}
          clearButtonMode="always"
          onChangeText={this.handleChangeText}
          onSubmitEditing={this.handleSubmitEditing}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#666',
    color: 'white',
    height: 40,
    width: 300,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
  },
});
