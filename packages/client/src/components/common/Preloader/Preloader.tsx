import React from 'react';
import preloader from '../../../assets/images/preloader.gif';
import classes from './Preloader.module.css';
import {createPortal} from "react-dom";

const Preloader: React.FC = () => (
    createPortal(
        <div className={classes.preloader}>
            <img className={classes.preloaderImg} src={preloader} alt=""/>
        </div>
        , document.body)
);

export default Preloader;
