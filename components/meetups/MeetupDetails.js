import { Fragment } from "react";
import classes from './MeetupDetails.module.css';
function MeetupDetail(props) {

    return <section className={classes.detail}>
        <img src={props.image} alt={props.title}></img>
        <h1>{props.title}</h1>
        <address>{props.address}</address>
        <p>{props.desciption} </p>
    </section>

}
export default MeetupDetail;