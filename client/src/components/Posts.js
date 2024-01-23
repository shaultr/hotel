import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import style from '../style/component.module.css';

export default function Posts() {
    const route = useParams();

    const navigate = useNavigate();

    return (
        <div>
            <div className={style.links} onClick={() => { navigate(`/home/${route.id}`) }}>Home</div>
posts
        </div>
    )
}