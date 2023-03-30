import { MongoClient } from "mongodb";
async function handler(req, res) {

    

    if (req.method === 'POST') {
        const data = req.body;
        
        const client=await MongoClient.connect('mongodb+srv://ishan:JqRvNnG64p0eSPDd@cluster0.h3fgktn.mongodb.net/meetups?retryWrites=true&w=majority');
        const db=client.db();

        const meetupCollections=db.collection('meetups');
        const result=await meetupCollections.insertOne(data);
        console.log(result);
        client.close();
        res.status(201).json({message:'Meetup Inserted'});

    }


}
export default handler;