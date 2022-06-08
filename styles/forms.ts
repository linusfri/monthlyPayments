import { StyleSheet } from 'react-native';

const mainAppPadding = 12;

const styles = StyleSheet.create({
    base: {
        marginTop: 12
    },

    input: {
        fontSize: 20,
        marginBottom: 28,
        borderWidth: 1,
        padding: 10,
        borderColor: '#ccc',
        borderRadius: 3,
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
        borderRadius: 4
    },

    salaryFormContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingLeft: mainAppPadding,
        paddingRight: mainAppPadding,
    },

    personFormContainer: {
        justifyContent: 'center',
        paddingLeft: mainAppPadding,
        paddingRight: mainAppPadding,
    },

    formFieldCenter: {
        textAlign: 'center'
    }
});

export {styles};
