import MeetupDetail from "../../components/meetups/MeetupDetails";
import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

function MeetupDetails(props) {
    return <Fragment>
    <Head>
        <title>{props.meetupData.title}</title>
        <meta name='description' content='Cant believe'></meta>
    </Head>
    
    <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}>

    </MeetupDetail>
    </Fragment>

}

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://ishan:JqRvNnG64p0eSPDd@cluster0.h3fgktn.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupCollections = db.collection('meetups');
    const meetups = await meetupCollections.find({},{_id:1}).toArray();
    client.close();


    return {
        fallback:false,

        paths: meetups.map((meetup)=>({
            params:{meetupId:meetup._id.toString()},})),
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect('mongodb+srv://ishan:JqRvNnG64p0eSPDd@cluster0.h3fgktn.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupCollections = db.collection('meetups');
    const meetupIdObject = new ObjectId(meetupId);



    const selectedMeetup = await meetupCollections.findOne({
        _id: meetupIdObject,
    });
    client.close();
    return {
        props: {
            meetupData: {
                id:selectedMeetup._id.toString(),
                title:selectedMeetup.title,
                address:selectedMeetup.address,
                description:selectedMeetup.description,
                image:selectedMeetup.image,
            }
        }
    }
}
export default MeetupDetails;