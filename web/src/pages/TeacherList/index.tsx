import React, { useState, FormEvent } from 'react';
import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import "./styles.css";

function TeacherList(){

    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState("");
    const [weekDay, setWeekDay] = useState("");
    const [time, setTime] = useState("");

    async function searchTeachers(e: FormEvent){

        e.preventDefault();

       const response = await api.get("classes", {params:{ week_day: weekDay, time, subject}});

        console.log(response.data)

        setTeachers(response.data)

    }

    return (
        <div id="page-teacher-list" className="container">

            <PageHeader title="Esses são os proffys disponíveis">
               
                <form id="search-teachers" onSubmit={searchTeachers}>
                
                    <Select label="Matéria" 
                            name="subject"
                            value={subject}
                            onChange={(e)=>{ setSubject(e.target.value)}}
                            options={[
                                { value:"Artes", label: "Artes"},
                                { value:"Biologia", label: "Biologia"},
                                { value:"Matemática", label: "Matemática"},
                                { value:"Portugês", label: "Portugês"},
                                { value:"Física", label: "Física"},
                                { value:"Química", label: "Química"},
                                { value:"História", label: "História"},
                            ]}
                    />
                    <Select label="Dia da semana" 
                            name="week-day"
                            value={weekDay}
                            onChange={(e)=>{ setWeekDay(e.target.value)}}
                            options={[
                                { value: "0", label: "Domingo"},
                                { value: "1", label: "Segunda-feira"},
                                { value: "2", label: "Terça-feira"},
                                { value: "3", label: "Quarta-feira"},
                                { value: "4", label: "Quinta-feira"},
                                { value: "5", label: "Sexta-feira"},
                                { value: "6", label: "Sábado"},
                            ]}
                    />
                    <Input type="time" name="time" onChange={(e)=>{ setTime(e.target.value)}} label="Hora" value={time}/>
                    
                    <button type="submit" >
                        Buscar
                    </button>

                </form>

            </PageHeader>
            <main>
                
                {teachers.map((teacher, index)=>{

                    return <TeacherItem key={index} teacher={teacher}/>

                })}

            </main>
        </div>
    )
}

export default TeacherList;