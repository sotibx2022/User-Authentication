import mongoose from "mongoose";

let isConnected = false; // Initialize the variable outside the function

export const connectToDb = async () => {
  if (isConnected) {
    console.log("Database is already connected.");
    return;
  }
  try {
    const connect = await mongoose.connect("mongodb+srv://sbinayaraj:YmO2x8YQJYKlEX8R@cluster0.n3d5lee.mongodb.net/userauthentication?retryWrites=true&w=majority&appName=Cluster0"); // Removed the options
    isConnected = connect.connection.readyState === 1; // Corrected the access
    console.log("Database is just connected.");
  } catch (error) {
    console.log(error,"Error connecting to the Database."); // Log the error details
  }
};
