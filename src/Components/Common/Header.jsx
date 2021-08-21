import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from "@material-ui/core/Toolbar"
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    header: {
        position: "fixed",
        top: "0",
        paddingTop: '.6rem',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        marginRight: ".4rem",
        "& img": {
            maxWidth: "120px",
            [theme.breakpoints.down('xs')]: {
                flexBasis: "100%",
                marginBottom: "1rem",
            }
        },
        "& .ironman": {
            maxHeight: "80px",
            [theme.breakpoints.down('xs')]: {
                display: "none"
            }
        },
        "& .sliderDiv": {
            marginTop: ".4rem",
            display: "flex",
            alignItems: "center",
            "& h5": {
                    fontSize: "1rem",
                    margin: "0rem",
                    marginRight: ".6rem",
                    color: "black",
            }
        },
        "& .searchBtn": {
            cursor: "pointer",
            fill: theme.palette.primary.main,
            width: "20px",
            height: "20px"
        }
        
    },
    toolbar: {
        padding: ".3rem 0rem",
        width: "80%",
        [theme.breakpoints.down('xs')]: {
            width: "95%",
        }
    },
    slider: {
        padding: "0rem",
        paddingTop: ".2rem",
    },
    searchField: {
        width: "300px"
    }
}));
const Header = ({ searchTerm, setSearchTerm, years, setYears, sendRequest, setResponse, loading }) => {
    const classes = useStyles()
    const handleChange = (event, newValue) => {
        setYears(newValue);
        localStorage.setItem('years', newValue)
       
    };

                            
    return (
        <AppBar position="static" className={classes.header}>
            <Toolbar className={classes.toolbar}>
                <Grid
                    justifyContent="space-between" 
                    alignItems="center"
                    container>
                    <Grid 
                    item>         
                        <img src="logo.png" alt="MARVEL" />
                    </Grid>
                    <Grid                     
                    item>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            if (loading) return;
                            sendRequest(setResponse, searchTerm, years[0], years[1])
                        }}>    
                            <TextField label="Search Comics" focused variant="outlined" className={classes.searchField} value={searchTerm} onChange={(e) => {
                                    setSearchTerm(e.target.value)
                                    localStorage.setItem('searchTerm', e.target.value)
                            }}
                            InputProps={{
                                endAdornment: <Icon onClick={() => {
                                    if (loading) return;
                                    sendRequest(setResponse, searchTerm, years[0], years[1])
                                }} color="primary" className="searchBtn">
                                                    <SearchIcon />
                                              </Icon>,
                            }}
                            />
                            <div className="sliderDiv">
                                <h5>Year:</h5>
                                <Slider defaultValue={30} className={classes.slider} step={1} valueLabelDisplay="auto" min={1950} max={2021} value={years} onChange={handleChange}/>
                            </div>
                        </form>   
                    </Grid>
                    <Grid                     
                    item>     
                        <img src="ironmanheader.png" alt="MARVEL" className="ironman" onClick={() =>  setSearchTerm('')} />
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Header
