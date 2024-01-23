import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import style from '../style/component.module.css';

export default function Albums() {
  const route = useParams();

    const navigate = useNavigate();

  return (
    <div>Albums
        <div className={style.links} onClick={() => { navigate(`/home/${route.id}`) }}>Home</div>
    </div>
  )
}
