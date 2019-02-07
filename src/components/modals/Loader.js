import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Modal,
    ActivityIndicator
} from 'react-native';


class Loader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: this.props.loading,
            confirmComplete: this.props.confirmComplete

        }
    }
    render() {

        console.log(this.state, this.props)
        return (
            <Modal
                transparent={false}
                animationType={'none'}
                visible={this.state.loading}
                onRequestClose={() => { console.log("modal closed") }}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <ActivityIndicator
                            animating={this.state.loading} size="large" color="#091141" />

                  {this.state.confirmComplete &&
                    <Button
                    onPress={() => navigate('MenuOptions')}
                    style={styles.button}>Menu</Button>
                  }

                    </View>
                </View>
            </Modal>
        )
    }
}
export default Loader;

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 7,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    button:
    {
        color: 'white',
        fontSize: 40,
        height: 50,
        width: 105,
     marginTop: 100}
     });
