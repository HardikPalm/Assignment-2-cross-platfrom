import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    MainWrapper: {


        paddingTop: 20,

        backgroundColor: 'white',
        alignItems: 'center',
        height: 200,
        borderWidth: 1,
        borderColor: '#D0021B',
        borderRadius: 10,
        shadowColor: '#e3e3e3',
        shadowOffset: {
            width: 4,
            height: 0,
        },
        shadowOpacity: 0.3,
        shadowRadius: 0,
        elevation: 5,
    },
    CancelTitle: {

        fontSize: 18,
        color: '#B20000'
    },
    contentStyle: {
        color: '#3B566E',
        fontSize: 16,
        marginTop: 21,
        marginHorizontal: 21,
        textAlign: 'center',
    },
    ButtonWrapper: {
        position: 'absolute',
        bottom: 0,

        borderRadius: 10,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    ButtonStyle: {
        flex: 1,

        alignItems: 'center',
        justifyContent: 'center'
    },
    ButtonText: {
        color: '#3B566E',
        fontSize: 16,
        paddingVertical: 14,
    },
    CloseButtonStyle: {
        height: 24,
        alignSelf: 'flex-end',
        position: 'absolute',
        right: 10,
        top: 10,
        width: 24,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#767676'
    }
})