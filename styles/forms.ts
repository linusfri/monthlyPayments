import { StyleSheet } from 'react-native';

const mainAppPadding = 12;

const styles = StyleSheet.create({
    base: {
        marginTop: 12
    },

    input: {
        fontSize: 20,
        flexGrow: 1,
        width: '80%',
        paddingLeft: 10,
        paddingRight: 10
    },

    inputContainer: {
        borderWidth: 1,
        minHeight: 50,
        borderColor: '#ccc',
        borderRadius: 3,
        marginBottom: 28,
        flexDirection: 'row',
        alignItems: 'center',
    },

    inputAndContainer: {
        borderWidth: 1,
        minHeight: 50,
        borderColor: '#ccc',
        borderRadius: 3,
        marginBottom: 28,
        fontSize: 20,
        paddingLeft: 10,
        paddingRight: 10
    },

    formButton: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingRight: 10,
        paddingLeft: 10,
        backgroundColor: '#339966',
        borderRadius: 2,
        marginBottom: 12,
    },

    formButtonExtraPadding: {
        paddingTop: 25,
        paddingBottom: 25,
        paddingRight: 10,
        paddingLeft: 10,
        backgroundColor: '#339966',
        borderRadius: 2,
        marginBottom: 28,
    },

    formPerson: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: 12,
        paddingRight: 12,
        marginTop: 6,
        marginBottom: 6,
        backgroundColor: '#2196F3',
        borderRadius: 2
    },

    formContainer: {
        justifyContent: 'center',
        paddingLeft: mainAppPadding,
        paddingRight: mainAppPadding,
    },

    formFieldCenter: {
        textAlign: 'center'
    },

    textInputButton: {
        backgroundColor: '#2196F3',
        borderRadius: 2,
        flexGrow: 1
    }
});

export {styles};
