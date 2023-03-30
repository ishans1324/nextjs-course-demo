import MeetupList from './../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import { Fragment } from 'react';
import Head from 'next/head';

function HomePage(props) {

    return <Fragment>
        <Head>
            <title>React meetups</title>
            <meta name='description' content='Cant believe'></meta>
        </Head>


        <MeetupList meetups={props.meetups}></MeetupList>
    </Fragment>


}
// export async function getServerSideProps(context){

//     const req=context.req;
//     const res=context.res;

//     return {
//         props:{
//             meetups:DUMMY_MEETUPS
//         }
//     }
// }
export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb+srv://ishan:JqRvNnG64p0eSPDd@cluster0.h3fgktn.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupCollections = db.collection('meetups');
    const meetups = await meetupCollections.find().toArray();
    client.close();
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                image: meetup.image,
                address: meetup.address,
                id: meetup._id.toString(),

            })),
        },
        revalidate: 10,
    }
}
export default HomePage;

