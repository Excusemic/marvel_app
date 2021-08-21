import React from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    container: {
        "& .backDiv": {
            width: "90%",
            margin: "auto",
            cursor: "pointer",
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            "& .back": {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }
        },
        "& svg": {
            width: "40px",
            height: "40px",

        },
        "& .content": {
            width: "80%",
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            "& .imgContainer": {
                maxHeight: "700px",
                marginRight: "1rem",
                "& img": {
                    width: "100%",
                    height: "100%",
                    objectFit: "contain"
                }
            },
            "& p": {
                maxWidth: "400px",
                "& span":  {
                    fontWeight: "bold",
                    fontSize: "1.1rem"
                }
            }
        },

    }
}));
const SingleComic = ({thumbnail, series, prices, pageCount, creators, description, title}) => {
    const history = useHistory()
    const classes = useStyles()
    const { extension, path } = thumbnail
    return (
        <div className={classes.container}>
            <div onClick={() => history.push('/')} className="backDiv">
                <div className="back">
                    <ArrowBackIcon color="primary" />
                    <h4>Back</h4>
                </div>
                    <p>pageCount: <span>{pageCount}</span></p>
            </div>
         
                <div className="content">
                    <div className="imgContainer">
                        <img src={path+ '.' + extension} alt="title" />
                    </div>
                    <div>
                        <h1>{title}</h1>
                        <p>{description}</p>
                        <br />
                        <hr />
                         <br />
                        <h3>Series: {series?.name || 'unknown'}</h3>
                        <h3>Prices:</h3>
                        <ul>
                            {prices?.length ? prices?.map(price =><div key={price?.type + price?.price}><li>{`${price?.type}: ${price?.price}`}</li> <hr></hr></div>) : "unknown"}
                        </ul>
                        <h3>Creators:</h3>
                        <ul>
                            {creators?.length ? creators?.items?.map(creator =><div key={creator?.name + creator?.role}><li>{`${creator?.name}, ${creator?.role}`}</li> <br></br></div>) : "uknown"}
                        </ul>
                    </div>
                </div>
        </div>
    )
}

export default SingleComic
