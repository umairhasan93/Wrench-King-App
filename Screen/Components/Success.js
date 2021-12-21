import React from 'react';
import { StyleSheet, View, Modal, Image } from 'react-native';

const Loader = (props) => {
    const { success, ...attributes } = props;

    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={loading}
            onRequestClose={() => {
                console.log('close modal');
            }}>
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <Image
                        source={require('../Image/success.png')}
                        style={{
                            height: 150,
                            resizeMode: 'contain',
                            alignSelf: 'center'
                        }}
                    />
                    <Text style={styles.successTextStyle}>
                        Registration Successful
                    </Text>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={() => props.navigation.navigate('LoginScreen')}>
                        <Text style={styles.buttonTextStyle}>Login Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default Loader;

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040',
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },
    successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },

    buttonStyle: {
        backgroundColor: '#FEE715FF',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 45,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
    },
});