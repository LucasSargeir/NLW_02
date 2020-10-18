import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import {RectButton} from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'

import heart from '../../assets/images/icons/heart-outline.png'
import unfavorite from '../../assets/images/icons/unfavorite.png'
import whatsapp from '../../assets/images/icons/whatsapp.png'

import styles from './styles';
import api from '../../services/api';

interface TeacherItemProps{
    id:number,
    avatar: string,
    name:string;
    whatsapp:string;
    bio: string;
    subject: string;
    cost:number;
    favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = (props) => {

    const [isFavorited, setIsFavorited] = useState(props.favorited);
    
    function handleLinkToWhatsapp(){
        
        api.post("connections",{user_id: props.id})
        Linking.openURL(`whatsapp://send?phone=${props.whatsapp}`);

    }

    async function handleToggleFavorite(){
        const favorites = await AsyncStorage.getItem('favorites');
     
        let favoritesArray = [];

        if(favorites){
            favoritesArray = JSON.parse(favorites)
        }
        
        if(isFavorited){

            const favoriteIndex = favoritesArray.findIndex( (teacherItem: TeacherItemProps) => {return teacherItem.id === props.id});
            favoritesArray.splice(favoriteIndex, 1);
            setIsFavorited(false);

        }
        else{


            const teacher = {
                id:props.id,
                avatar: props.avatar,
                name:props.name,
                whatsapp:props.whatsapp,
                bio: props.bio,
                subject: props.subject,
                cost:props.cost,
            }

            favoritesArray.push(teacher);

            setIsFavorited(true);

            
        }
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>

                <Image style = {styles.avatar} source={{uri: props.avatar}}/>

                <View style={styles.profileInfo}>

                    <Text style={styles.name}>{props.name}</Text>
                    <Text style={styles.subject}>{props.subject}</Text>

                </View>

            </View>
            <Text style={styles.bio}>{props.bio}</Text>

            <View style={styles.footer}>

                <Text style={styles.price}>
                    Preço/hora {'   '}
                    <Text style={styles.priceValue}>R$ {props.cost}</Text>
                </Text>

                <View style={styles.buttonsContainer}>

                    <RectButton 
                        onPress={handleToggleFavorite}
                        style={[
                            styles.favoriteButton, 
                            isFavorited? styles.favorited: {}]}>
                            
                            {isFavorited?
                            <Image source={unfavorite}/>
                            :
                            <Image source={heart}/>
                            }

                    </RectButton>

                    <RectButton onPress={handleLinkToWhatsapp} style={styles.contactButton}>
                        <Image source={whatsapp}/>
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>

                </View>

            </View>

        </View>
    );

}

export default TeacherItem;