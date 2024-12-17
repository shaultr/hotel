import style from './style.module.css';

export default function CreditForm({ onSubmitBooking, availability, register, errors }) {
  return (
    <div className={style.formbooking}>

    <form onSubmit={onSubmitBooking}>
    <input className={style.input}
      placeholder=' מספר כרטיס...'
      type="number"
      required
    />
    <div>


      <select className={style.input} {...register('dayDate')} defaultValue="01">
        <option>01</option>
        <option>02</option>
        <option>03</option>
        <option>04</option>
        <option>05</option>
        <option>06</option>
        <option>07</option>
        <option>08</option>
        <option>09</option>
        <option>10</option>
        <option>11</option>
        <option>12</option>
      </select>
      <select className={style.input} {...register('yearDate')} defaultValue="2023">
        <option>2023</option>
        <option>2024</option>
        <option>2025</option>
        <option>2026</option>
      </select>
      <p>{errors.dayDate?.message}</p>

    </div>

    <input type='submit' value={'אישור הזמנה'} />
    {!availability && <div style={{ color: 'red' }}>החדר המבוקש לא זמין. יש לבחור תאריך אחר </div>}
  </form>
    </div>

  )
}