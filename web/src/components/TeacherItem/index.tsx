import React from 'react';
import api from '../../services/api';

import Whatsapp from "../../assets/images/icons/whatsapp.svg"

import "./styles.css";
import { create } from 'domain';

interface TeacherItemProps{
    teacher:{
        nome:string;
        avatar:string;
        bio:string;
        cost:number;
        id:number;
        subject:"string";
        user_id:number;
        whatsapp: string;
    }
}

const TeacherItem: React.FC<TeacherItemProps> = ({teacher}) =>{
    
    function createNewConnection(){
        api.post('/connections',{user_id: teacher.id})
    }

    return(

        <article className="teacher-item">
            <header>

                <img src={teacher.avatar} alt="Foto"/>
                
                <div>
                    <strong>{teacher.nome}</strong>
                    <span>{teacher.subject}</span>
                </div>

            </header>
            <p>{teacher.bio}
            </p>

            <footer>
                <p>
                    Preço/hora
                    <strong>R$ {teacher.cost}</strong>
                </p>
                <a target="_blank" onClick={createNewConnection} href={`http://wa.me/${teacher.whatsapp}`}>
                    <img src={Whatsapp} alt="Whatsapp"/>
                    Entrar em contato
                </a>
            </footer>

        </article>

    )
}

export default TeacherItem;