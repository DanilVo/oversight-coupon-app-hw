import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Routing from '../Router/Routes';
import './Layout.css';
import UserModel from '../../../Models/UserModel';

function Layout(): JSX.Element {
  const [userInSystem, setUserInSystem] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserModel>();

  const localStorageUser = localStorage.getItem('token');

  useEffect(() => {
    if (!localStorageUser) return;
    // setUserInfo(JSON.parse(atob(localStorageUser)));
    console.log(userInSystem);
    setUserInSystem(true)
    
  }, [userInSystem]);

  return (
    <div className="Layout">
      <header>
        <Header setUserInSystem={setUserInSystem} userInSystem={userInSystem}/>
      </header>
      <main>
        <Routing />
      </main>
    </div>
  );
}

export default Layout;
