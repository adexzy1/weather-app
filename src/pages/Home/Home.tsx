import Main from '../../components/main/Main';
import SideBar from '../../components/sidebar/SideBar';
import style from './home.module.css';

const Home = () => {
  return (
    <div className={style.container}>
      <Main />
      <SideBar />
    </div>
  );
};

export default Home;
