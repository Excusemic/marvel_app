import React from 'react'
import SingleComicCard, { SingleComicCardLoader } from "../Components/Home/SingleComicCard"
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  homeContainer: {
    width: '80%',
    margin: "auto",
    paddingTop: "8rem",
    minHeight: "1000px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    boxShadow: `inset 0px 0px 40px 40px ${theme.palette.secondary.main}`,
    [theme.breakpoints.down('sm')]: {
          width: '95%',
    },
  },
  homeContent: {
    width: "100%",
    backgroundAttachment: "fixed",
    backgroundImage: `url('${process.env.PUBLIC_URL}/bg.jpg')`
  }
}));
const Home = ({ data, loading }) => {
    const classes = useStyles()
    return (
      <div className={classes.homeContent}>
        <Grid className={classes.homeContainer} container justifyContent="center">
            {data?.length === 0 && !loading && <h3 style={{textAlign: "center", margin: "4rem", color: "#fff", fontSize: "2rem"}}>There are no comics matching your search parameters, try different keyword or year span</h3>}
            {loading ? new Array(10).fill(0).map((num, index) => {
              return (
                <Grid item key={`${num + index}ghost`}>
                  <SingleComicCardLoader />
                </Grid>
              );
            }) : data?.map(card => {
                return (
                <Grid item key={card?.id}>
                    <SingleComicCard {...card}/>
                </Grid>
              );
            })
        }
        </Grid>
      </div>

    )
}

export default Home
