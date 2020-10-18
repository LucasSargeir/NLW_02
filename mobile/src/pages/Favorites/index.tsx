import React, { useState } from 'react';
import { View, ScrollView, AsyncStorage } from 'react-native';
import {useFocusEffect} from '@react-navigation/native'

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';

import styles from './styles'

interface Teacher{
    id:number,
    avatar: string,
    name:string;
    whatsapp:string;
    bio: string;
    subject: string;
    cost:number;
}

function Favorites (){

    const [favorites, setFavorites] = useState<Teacher[]>([]) 


    function loadFavorite(){
        AsyncStorage.getItem("favorites").then(response =>{
            if(response){
                
                const favoritedTeachers = JSON.parse(response);
                setFavorites(favoritedTeachers);

            }
        })
    }

    useFocusEffect(()=>{
        loadFavorite();
    });
    


    return(
        <View style={styles.container}>
            <PageHeader title="Meus proffys favoritos"/>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {favorites.map( (teacher: Teacher, index) => {

                    return <TeacherItem 
                                        favorited={true} 
                                        key={index} 
                                        id={teacher.id} 
                                        avatar={teacher.avatar} 
                                        name={teacher.name} 
                                        bio={teacher.bio} 
                                        whatsapp={teacher.whatsapp} 
                                        cost={teacher.cost} 
                                        subject={teacher.subject} 
                            />

                })}
                
            </ScrollView>

        </View>
    )
}

export default Favorites;