import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import style from '../style/component.module.css';
export default function Home() {
    const route = useParams();
    const navigate = useNavigate();
    return (
        <div className={style.home}>
            <div className={style.links} onClick={()=>{navigate(`/todos/${route.id}`)}}>

                Todos
            </div>
            <div className={style.links} onClick={()=>{navigate(`/albums/${route.id}`)}}>
                Albums
            </div>

            <div className={style.links} onClick={()=>{navigate(`/posts/${route.id}`)}}>
                Posts
            </div>

        </div>
    )
}
