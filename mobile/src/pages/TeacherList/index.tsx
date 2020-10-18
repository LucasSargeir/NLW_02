import React, {useState} from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage'
import {useFocusEffect} from '@react-navigation/native'

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';

import styles from './styles'
import api from '../../services/api';

interface Teacher{
    id:number,
    avatar: string,
    name:string;
    whatsapp:string;
    bio: string;
    subject: string;
    cost:number;
}


function TeacherList (){

    
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    
    const [teachers, setTeachers] = useState([])
    const [favorites, setFavorites] = useState<number[]>([]) 

    const [subject, setSubject] = useState("")
    const [weekDay, setWeekDay] = useState("")
    const [time, setTime] = useState("")

    async function handleSubmit(){

        loadFavorite();

        const response = await api.get("classes", {params:{ week_day: weekDay, time, subject}});

        setIsFilterVisible(false)
        setTeachers(response.data)
        
    }

    function loadFavorite(){
        AsyncStorage.getItem("favorites").then(response =>{
            if(response){
                
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher:Teacher) => {return teacher.id})

                setFavorites(favoritedTeachersIds);
            }
        })
    }

    useFocusEffect(()=>{
        loadFavorite();
    });
    

    return(
        <View style={styles.container}>
            
            <PageHeader title="Proffys disponíveis" headerRight={(
                <BorderlessButton onPress={()=>{setIsFilterVisible(!isFilterVisible)}}>
                    <Feather name="filter" size={25} color="#FFF" />
                </BorderlessButton>
            )}>
              
               {isFilterVisible && (
                <View style={styles.searchForm}>
                    <Text style={styles.label}>Matéria</Text>
                    <TextInput 
                        value={subject}
                        style={styles.input}
                        placeholder="Qual a matéria?"
                        placeholderTextColor="#c1bccc"
                        onChangeText={text => setSubject(text)}/>
                    
                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Dia da semana</Text>
                            <TextInput 
                                value={weekDay}
                                style={styles.input}
                                placeholder="Qual o dia?"
                                placeholderTextColor="#c1bccc"
                                onChangeText={text => setWeekDay(text)}/>
                        </View>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Horário</Text>
                            <TextInput 
                                value={time}
                                style={styles.input}
                                placeholder="Qual a hora?"
                                placeholderTextColor="#c1bccc"
                                onChangeText={text => setTime(text)}/>
                        </View>
                    </View>
                    <RectButton onPress={handleSubmit} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Filtrar</Text>
                    </RectButton>
                </View>
               )}
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {teachers.map( (teacher: Teacher, index) => {

                    return <TeacherItem favorited={favorites.includes(teacher.id) ? true : false} 
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

export default TeacherList;