import { InfoOutlined, PlayArrow } from '@material-ui/icons'
import React, {useState, useEffect} from 'react'
import "./featured.scss";
import {axiosInstance} from '../../config';

const Featured = ({ type , setGenre }) => {
    const [content, setContent] = useState({});

    useEffect( () => {
        const getRandomContent = async () => {
            try{
                const res = await axiosInstance.get(`/movies/random?type=${type}`, {
                    headers: { 
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken, 
                    },
                 });
                setContent(res.data[0])
            }catch(err){
                console.log(err);
            }
        }
        getRandomContent();
    }, [type]);

    return (
        <>
        <div className="featured">
            {type && (
                <div className="category">
                    <span>{type === "movie" ? "Movies" : "Series"}</span>
                    <select name="genre" id="genre" onChange={ e => setGenre(e.target.value)}>
                        <option>Genre</option>
                        <option value="Action">Action</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Crime">Crime</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Horror">Horror</option>
                        <option value="Romance">Romance</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Animation">Animation</option>
                        <option value="Drama">Drama</option>
                    </select>

                </div>
            )}
        <img 
        // width="100%"
        src={content.img} alt="movie"/>
        <div className="info">
            <img src={content.imgTitle} alt="title" />
            <span className="desc">{content.desc}</span>
            <div className="buttons">
                <button className="play">
                    <PlayArrow/>
                    <span>Play</span>
                </button>
                <button className="more">
                    <InfoOutlined />
                    <span>Info</span>
                </button>
            </div>
        </div>
        </div>
        </>
    )
}

export default Featured
