import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor: "#8257e5",
        justifyContent: "center",
        padding: 40
    },
    banner:{
        width: "100%",
        resizeMode: "contain"
    },
    title:{
        color: '#FFF',
        fontSize: 20,
        lineHeight: 30,
        marginTop: 80,
        fontFamily: "Poppins_400Regular"
    },
    titleBold:{
        fontFamily: "Poppins_600SemiBold"
    },
    buttonsContainer:{
        flexDirection: "row",
        marginTop: 40,
        justifyContent:"space-between",
    },
    button:{
        height: 150,
        width: "48%",
        backgroundColor: "#333",
        borderRadius: 8,
        padding: 24,
        justifyContent: "space-between",
    },
    buttonPrimary:{
        backgroundColor: "#9871f4"
    },
    buttonSecondary:{
        backgroundColor: "#04d361"
    },
    buttonText:{
        fontFamily: "Archivo_700Bold",
        color:"#FFF",
        fontSize: 20
    },
    footer:{
        fontFamily: "Poppins_400Regular",
        color: "#d4c2ff",
        fontSize: 12,
        lineHeight: 20,
        marginTop: 40,
        alignSelf:"center"
    },
});

export default styles;