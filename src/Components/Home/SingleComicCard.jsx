import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
 '@keyframes gradient': {
    '0%': {
      backgroundPosition: '0% 50%'
    },
    '50%': {
      backgroundPosition: '100% 50%'
    },
    '100%': {
      backgroundPosition: '0% 50%'
    }
  },

  root: {
    width: 345,
    height: 400,
    margin: "0rem 1rem",
    marginBottom: "3rem",
    [theme.breakpoints.down('sm')]: {
        width: 320,
    },
    "& .description": {
        overflow: "auto",
        height: "65px"
    },
    "& .title": {
        overflow: "auto",
        height: "70px"
    },
    "& .actions": {
        height: '30px'
    },
    "& .imageLoader": {
        height: "180px", 
        boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.2)',
        background: `linear-gradient(315deg, rgb(103, 199, 235) 0%, rgba(255,255,255,1) 50%,  rgba(194,194,194,31) 100%)`,
        backgroundSize: '400% 400%',
        backgroundPosition: '100% 100%',
        animation: '$gradient 1s ease infinite',
    }
  },
 loaderCard: {
    margin: "0rem .4rem",
    width: 345,
    height: 400,
    border: "1px solid red",
    marginBottom: "3rem",
    "& .imageLoader": {
        height: "180px", 
        boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.2)',
        background: `linear-gradient(315deg, rgb(103, 199, 235) 0%, rgba(255,255,255,1) 50%,  rgba(194,194,194,31) 100%)`,
        backgroundSize: '400% 400%',
        backgroundPosition: '100% 100%',
        animation: '$gradient 1s ease infinite',
    }
  },

}));

const SingleComicCard = ({ id, description, title, thumbnail}) => {
    const history = useHistory();
    const { extension, path } = thumbnail
    const classes = useStyles();
    return (
        <Card className={classes.root}>
        <CardActionArea>
            <CardMedia
            component="img"
            alt={title}
            height="180"
            image={path + '.' + extension}
            title={title}
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2" className='title' >
                {title || "Title not available"}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" className='description'>
                {description ? `${description?.substring(0, 100)}...` : "Description not available"}
            </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions className='actions'>
            <Button size="small" color="primary" onClick={() =>  history.push(`/${id}`)}>
            Learn More
            </Button>
        </CardActions>
        </Card>
    )
}



export const SingleComicCardLoader = () => {
    const classes = useStyles();
    return (
    <Card className={classes.root}>
        <CardActionArea>
            <div style={{}} className="imageLoader"/>
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2" className='title' >
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" className='description'>
            </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions className='actions'>
            <Button size="small" color="primary">
            </Button>
        </CardActions>
        </Card>
    )
}

export default SingleComicCard
