import React, {useEffect, useState} from 'react';
import NavBar from '../components/NavBar';
import {useHistory} from 'react-router-dom';
import {Card, CardHeader, CardMedia, CardContent, Collapse, Avatar, Typography, CardActions, List, ListItem, ListItemText, IconButton, ImageListItem, ImageList } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import {useParams} from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    paddingTop: "8vh",
    fontFamily: "'Kodchasan', sans-serif"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: "teal",
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
    const { id } = useParams ();
    const [breed, setBreed] = useState ([]);
    const [image, setImage] = useState ('');
    const [title, setTitle] = useState ('');
    const [open, setOpen] = useState (false);
    const classes = useStyles ();
    
    const getData = ()=>{
        fetch('https://api.thedogapi.com/v1/breeds', {
           // method: "GET",
           headers: {"x-api-key":"ae332752-d7d4-48f5-8276-964576062382"},
          //  mode: 'no-cors'
        }).then(res=>res.json().then(
          data=> {
            setBreed(data[id-1])
            const {image, name} = data[id-1]
            setImage(image.url)
            setTitle(name)
        })
  
  
        )
  
  
  
  
  }
  
  
  useEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getData, [])

  const handleExpandClick = ()=>{
    setOpen(open=>!open)
  }
  
    return (
        <>
    <NavBar />
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            D
          </Avatar>
        }

        title={title}
        subheader={breed.origin}
      />
      <CardMedia
        className={classes.media}
        image={image}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        The {title} are the breed of dogs that are considered to be {breed.temperament}.
        </Typography>
      </CardContent>
    <CardActions disableSpacing>  
      <IconButton
          onClick={handleExpandClick}
          aria-expanded={open}
          aria-label="show more"
        >
         Learn-More:<ExpandMoreIcon />
        </IconButton>
    </CardActions>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>About Them:</Typography>
            <Lister breed={breed}/>
        </CardContent>
      </Collapse>
    </Card>

    <ImageLister id={id}  />
        </>
    )
}

export default Breed;

const Lister = ({breed})=>{
  return (
    <List>
        <ListItem>
            <ListItemText primary={`Name: ${breed.name}`} />
        </ListItem>
        <ListItem>
            <ListItemText primary={`Origin: ${breed.origin}`} />
        </ListItem>
        <ListItem>
            <ListItemText primary={`Life Expectency: ${breed.life_span}`} />
        </ListItem>
        <ListItem>
            <ListItemText primary={`Height: ${breed.height.metric} cm`} />
        </ListItem>
        <ListItem>
            <ListItemText primary={`Weight: ${breed.weight.metric} kg`} />
        </ListItem>
        <ListItem>
            <ListItemText primary={`Temperament: ${breed.temperament}`} />
        </ListItem>
        <ListItem>
            <ListItemText primary={`Bred For: ${breed.bred_for}`} />
        </ListItem>
    </List>
  )
  }


const ImageLister = ({id})=>{
      const [images, setImages] = useState([]);
      const classes = useStyles();
      const History = useHistory ();
      const getData = ()=>{
        fetch(`https:/api.thedogapi.com/v1/images/search?breed_id=${id}&limit=25`, {
           // method: "GET",
           headers: {"x-api-key":"ae332752-d7d4-48f5-8276-964576062382"},
          //  mode: 'no-cors'
        }).then(res=>res.json().then(
          data=> {
            setImages(data)

        })
  
  
        )
      }


  
      useEffect(
        // eslint-disable-next-line react-hooks/exhaustive-deps
        getData, [])
if(images!==[]) {
 return (<>
         <ImageList rowHeight={160} className={classes.imageList} cols={3}>
           {images.map(item=>(
             <ImageListItem key={item.id} cols={1} className={classes.item}>
               <img src={item.url} alt={item.id} onClick={()=>{
                 History.push({
                   pathname:`/pic/${item.id}`,
                   state: {url: item.url}
                  })
               }} />
             </ImageListItem>
           ))}
         </ImageList>
 </>)
}
else return null;

    }

  
