import React, { useEffect, useState } from 'react';
import { View, Image, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';;
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';
import api from '../../services/api';

function Landing(){

    const navigation = useNavigation();

    const [totalCOnnections, setTotalConnections] = useState(0);

    useEffect(() => {
        
        api.get('connections').then(response =>{
            setTotalConnections(response.data.total)
        })

    },[]);

    function navigateToGiveClasses(){

        navigation.navigate('GiveClasses');

    }

    function navigateToStudyTabs(){
        navigation.navigate("Study");
    }

    return( 
        <View style={styles.container}>
            <Image source={landingImg} style={styles.banner}/>
            <Text style={styles.title}>
                Seja bem-vindo, {'\n'}
                <Text style={styles.titleBold} >O que deseja fazer?</Text>
            </Text>

            <View style={styles.buttonsContainer}>

                <RectButton style={[styles.button,styles.buttonPrimary]} onPress={navigateToStudyTabs}>
                    
                    <Image source={studyIcon}/>
                    <Text style={styles.buttonText}>Estudar</Text>

                </RectButton>

                <RectButton style={[styles.button,styles.buttonSecondary]} onPress={navigateToGiveClasses}>

                    <Image source={giveClassesIcon}/> 
                    <Text style={styles.buttonText}>Ensinar</Text>

                </RectButton>

            </View>
            <Text style={styles.footer}>Total de {totalCOnnections} conexõs ja realizadas {' '}<Image source={heartIcon}/></Text>
        </View>
    )
}

export default Landing;