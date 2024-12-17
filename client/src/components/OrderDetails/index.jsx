import style from './style.module.css';

export default function OrderDetails({ sday,
   monthNames, smonth, syear, emonth, eyear,eday, numDays, numBeds,
   pension,payment_amount }) {

  return (
    <div className={style.invation}>
    <div className={style.date}>
      <h3>{"מ-" + sday + " ב" + monthNames[smonth - 1] + " " + syear}</h3>
      <h3>{"עד " + eday + " ב" + monthNames[emonth - 1] + " " + eyear} |</h3>
      {numDays === 1 ? <h3>{numDays + " יום"}</h3> : <h3>{numDays + " ימים"}</h3>}
    </div>

    <div className={style.info}>
      <div className={style.x}>

        <div className={style.beds}>
          <h4>{numBeds + " מיטות"}</h4>
        </div>

        <div className={style.pension}>
          <h4>{pension && " חצי פנסיון"}</h4>
        </div>
      </div>

    </div>

    <div className={style.payment}>
      <h2>לתשלום</h2>
      <h2>{payment_amount}</h2>
    </div>
  </div>
  )
}