import { Alert, StatusBar, View } from 'react-native';
import React, { Component } from 'react';
import styles from "../../assets/styles";
import { Button, Icon } from 'react-native-elements';
import Onboarding from 'react-native-onboarding-swiper';

export default class OnboardingWithCTA extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount(){
    console.log('jm Onboarding loaded');
  }

  getPageIndex = (pageIndex) => {
    console.log('jm onboarding page:', pageIndex);
    this.setState({
      pageIndex,
    });
  }

  render() {
      return (
        <View style={styles.bigScreenMessage}>
        <Onboarding
          pageIndexCallback={this.getPageIndex}
          onSkip={() => Alert.alert('Skipped')}
          showDone={true}
          onDone={() => Alert.alert('Done')}
          pages={[
            {
              title: 'Hey!',
              subtitle: 'Welcome to $App!',
              backgroundColor: '#003c8f',
              image: (
                <Icon
                  name="hand-peace-o"
                  type="font-awesome"
                  size={100}
                  color="white"
                />
              ),
            },
            {
              title: 'Get Notified',
              subtitle: 'We will send you notification as soon as something happened',
              backgroundColor: '#1565c0',
              image: (
                <Icon name="bell-o" type="font-awesome" size={100} color="white" />
              ),
            },
            {
              title: "That's Enough",
              subtitle: (
                <Button
                  title={'Get Started'}
                  containerViewStyle={{ marginTop: 20 }}
                  backgroundColor={'white'}
                  borderRadius={5}
                  textStyle={{ color: '#003c8f' }}
                  onPress={() => {
                    // this.props.userFirstTimeLogin('false')
                    this.props.navigation.navigate('WalletNavigator')
                    StatusBar.setBarStyle('default');
                  }}
                />
              ),
              backgroundColor: '#003c8f',
              image: (
                <Icon name="rocket" type="font-awesome" size={100} color="white" />
              ),
            }
          ]}
        />
        </View>
      );
    }
}
