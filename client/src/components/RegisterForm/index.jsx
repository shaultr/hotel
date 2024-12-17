import style from './style.module.css';

export default function RegisterForm({ name, setName, emailAddress, setEmailAddress, handleSubmit, onSubmitCustomer, register, errors }) {
  return (
    <div className={style.form}>
      <div className={style.title}>הרשמה</div>
      <form onSubmit={handleSubmit(onSubmitCustomer)}>
        <label htmlFor="fullName">שם מלא</label>
        <input
          className={style.input}
          id="fullName"
          placeholder="הכנס שם..."
          {...register("fullName")}
          type="text"
        />

        <p style={{ color: 'red' }}>{errors.fullName?.message}</p>

        <label htmlFor="phone">מספר טלפון</label>
        <input
          className={style.input}
          id="phone"
          placeholder='מספר טלפון...' {...register('phone')}
          type="text"
        />
        <p style={{ color: 'red' }}>{errors.phone?.message}</p>

        <label htmlFor="email">דואר אלקטרוני</label>
        <input
          {...register("email")}
          onChange={(e) => {
            const newEmail = e.target.value;

            setEmailAddress(newEmail);
            localStorage.setItem("email", newEmail);
            register("email");
          }}
          className={style.input}
          id="email"
          placeholder="דואר אלקטרוני..."
          value={emailAddress}
          type="text"
        />
        <p style={{ color: 'red' }}>{errors.email?.message}</p>

        <label htmlFor="password">סיסמא</label>
        <input
          className={style.input}
          id="password"
          placeholder='סיסמא...'{...register('password')}
          type="password"
        />
        <p style={{ color: 'red' }}>{errors.password?.message}</p>

        <input type='submit' value='הרשם' />
      </form>
    </div>
  );
}
