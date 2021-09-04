import React from 'react';
import {AppBar, Toolbar, IconButton} from '@material-ui/core';
import {useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import PetsIcon from '@material-ui/icons/Pets';


const useStyles =  makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: "teal",
      justifyContent: "space-between",
      color: "white",
      fontFamily: "'Kodchasan', sans-serif"
    },
    menuButton: {
        marginRight: theme.spacing(2),
      },
    title: {
        fontWeight: "bold",
        fontSize: "1.5rem",
        cursor: "pointer"
    }
  }));

const NavBar = ()=> {

    const styles = useStyles ();
    const History = useHistory ()
    return (
        <AppBar className={styles.root}>
            <Toolbar>  
                <div className={styles.title}>
                   <IconButton edge="start" className={styles.menuButton} color="inherit" aria-label="menu">
                     <MenuIcon />
                   </IconButton>
                  <span onClick={()=>{
                     History.push('/')
                  }} >  
                    DogGram <PetsIcon />
                  </span>  
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;