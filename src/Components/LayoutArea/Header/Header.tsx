import {
  AppBar,
  Box,
  Container,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/oneItemShop-logo-removebg-preview.png';
import UserModel from '../../../Models/UserModel';
import { authStore } from '../../../Redux/AuthState';
import LogIn from '../../AuthArea/LogIn';
import './Header.css';

interface Props {
  setUserInSystem: Function;
  userInSystem: boolean;
}

function Header(props: Props): JSX.Element {
  const navigate = useNavigate();
  // const storage = atob(JSON.parse(localStorage.getItem('token')));
  const [user, setUser] = useState<UserModel>();

  const userInfo: UserModel = authStore.getState().user;
  // console.log(userInfo);
  useEffect(() => {
    setUser(userInfo);
    console.log(user);
  }, [props.userInSystem]);

  return (
    <AppBar position="static">
      <Container
        maxWidth="xl"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Box
          component="img"
          src={logo}
          alt="logo"
          sx={{ height: 120, width: 200 }}
          onClick={() => navigate('/home')}
        />
        <Toolbar disableGutters>
          <Paper
            elevation={8}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              width: 250,
              height: 70,
              mr: 2,
              borderRadius: 3,
              background: '#1976d2',
              boxShadow:
                'inset -5px 5px 10px #1561ac, inset 5px -5px 10px #1e8bf8',
            }}
          >
            <Typography variant="body2" color="black">
              Welcome:{' '}
              {user ? user?.firstName + ' ' + user?.lastName : 'Customer'}
            </Typography>
            <LogIn
              setUserInSystem={props.setUserInSystem}
              userInSystem={props.userInSystem}
            />
          </Paper>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
