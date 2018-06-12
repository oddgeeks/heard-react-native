import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Image,
  TextInput
} from 'react-native'

import { inject, observer } from 'mobx-react'

import { close, logo } from 'AWSTwitter/src/assets/images'
import { colors, fonts } from 'AWSTwitter/src/theme'

@inject('uiStore')
@observer
export default class TweetModal extends React.Component {
  state = {
    tweetText: ''
  }
  toggleModal = () => {
    this.props.uiStore.toggleTweetModal()
  }
  onChangeText = (tweetText) => {
    this.setState({ tweetText })
  }
  render() {
    const { showTweetModal } = this.props.uiStore
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={showTweetModal}
        onRequestClose={() => console.log('modal closed')}>
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableWithoutFeedback onPress={() => this.props.uiStore.toggleTweetModal()}>
              <Image
                source={close}
                style={styles.closeIcon}
              />
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.createTweetContainer}>
            <View>
              <View style={styles.userIconContainer}>
                <Image
                  source={logo}
                  style={styles.userIcon}
                />
              </View>
            </View>
            <View>
              <TextInput
                onChangeText={val => this.onChangeText(val)}
                style={styles.input}
                multiline={true}
                placeholder="What's happening?"
              />
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    padding: 15,
    paddingTop: 25
  },
  userIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  userIcon: {
    height: 22,
    width: 22,
    tintColor: 'white'
  },
  closeIcon: {
    tintColor: colors.primary,
    width: 30,
    height: 30,
    padding: 10
  },
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  createTweetContainer: {
    padding: 20,
    paddingTop: 10,
    flexDirection: 'row'
  },
  input: {
    height: '100%',
    width: '100%',
    paddingTop: 10,
    fontSize: 16,
    fontFamily: fonts.regular
  }
})