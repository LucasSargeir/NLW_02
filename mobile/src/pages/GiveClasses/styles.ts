import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor: "#8257e5",
        justifyContent: "center",
        padding: 40
    },
    content:{
        flex: 1,
        justifyContent: "center",
    },
    title:{
        fontFamily: "Archivo_700Bold",
        color: "#FFF",
        fontSize: 32,
        lineHeight: 37,
        maxWidth: 200,
    },
    description:{
        marginTop:24,
        color: "#d4c2ff",
        fontSize: 16,
        lineHeight: 26,
        fontFamily: "Poppins_400Regular",
        maxWidth: 265,
    },
    okButton:{
        marginVertical: 40,
        height: 58,
        backgroundColor: "#04d361",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
    },
    okButtonText:{
        color: "#FFF",
        fontSize: 16,
        fontFamily: "Archivo_700Bold"
    },
});

export default styles;