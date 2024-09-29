import mongoose from 'mongoose';

let isConnected = false;// Variable to track the connection status

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if(isConnected){
    console.log('using existing connection');
    return;
  }
    
  if(!process.env.MONGODB_URI) return console.log('MONGODB_URI is not defined');


  try {
    console.log('new connection')
    await mongoose.connect(process.env.MONGODB_URI);

    isConnected = true;

  } catch (error) {
    console.log(error)
  }
}