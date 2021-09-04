import React, {useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import {useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {ImageList, ImageListItem, Popover} from '@material-ui/core';
import './styles/ExploreBreed.css';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      
    },
    imageList: {
      paddingTop: "6vh",
      width: "100%",
      height: "100%",
    },
    item: {
      cursor: "pointer"
    }
  }));


const Breed = ()=>{
    const [breedImages, setBreedImages ] = useState([]);


    const getData = ()=>{
      fetch('https://api.thedogapi.com/v1/breeds', {
         // method: "GET",
         headers: {"x-api-key":"ae332752-d7d4-48f5-8276-964576062382"},
        //  mode: 'no-cors'
      }).then(res=>res.json().then(
        data=> {
          setBreedImages(data)
      


      })


      )




}


useEffect( getData  ,[])



    return (
        <div className='ExploreBreeds'>
           <nav>
            <NavBar />
           </nav>
        <BasicImageList images={breedImages}/>
</div>
)

}

export default Breed;


const BasicImageList = ({images}) => {
  const classes = useStyles();
  const history = useHistory();
  const [popOver, setPopOver] = useState (null);
  const handleClose = ()=>{
    setPopOver(null)
  }

  return (
    <div className={classes.root}>
      <ImageList rowHeight={160} className={classes.imageList} cols={3}>

        {images.map((item) => (
          <ImageListItem key={item.id} cols={1} className={classes.item} onClick={()=>{
            history.push(`/breed/${item.id}`);
          }} >
            <img src={item.image.url} alt={item.id} />
            <Popover
            id={item.name}
            open={Boolean(popOver)}
            anchorEl={popOver}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
          {item.name}
        </Popover >
          </ImageListItem>
        
        ))}
      </ImageList>
    </div>
  );
}
