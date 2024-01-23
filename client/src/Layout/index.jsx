import style from './style.module.css';
import Menu from '../components/Menu';
import Content from './Content';
import Footer from './Footer';
import Invation from '../components/Invation';

export default function Layout() {
    return (
        <div className={style.layout}>
            <Menu />
            <div className={style.InvationContainer}>
            <Invation />
            </div>
            <div className={style.footerContainer}>
            <Footer />
            </div>
            <Content />
        </div>
    )
}
