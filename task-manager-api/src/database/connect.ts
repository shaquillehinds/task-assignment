import mongoose from "mongoose";

export default async function connect(retries?: number) {
  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) throw new Error("No MONGO_URI env variable found.");
  if (retries && retries > 3) throw new Error("Unable to connect to Mongo");
  try {
    const connection = await mongoose.connect(MONGO_URI);
    console.log("Connected to Mongo");
    return connection;
  } catch (error) {
    console.error(error);
    console.log("------------------------ connection failure, retrying");
    await new Promise((res, rej) => {
      setTimeout(() => res(true), 1000);
    });
    await connect((retries || 0) + 1);
  }
}
