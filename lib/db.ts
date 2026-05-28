import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;
const DEPLOY_ID = process.env.VERCEL_DEPLOYMENT_ID ?? "local";

if (!MONGODB_URI) throw new Error("MONGODB_URI not set");


type Cached = { 
    conn: typeof mongoose | null; 
    promise: Promise<typeof mongoose> | null;
    deployId: string; 
};

let cached: Cached = (global as any).mongoose ?? { 
    conn: null, 
    promise: null,
    deployId: "", 
};


export async function dbConnect() {
    
   if (cached.deployId !== DEPLOY_ID) {
    if (cached.conn) await cached.conn.disconnect().catch(() => {});
    cached.conn = null;
    cached.promise = null;
    cached.deployId = DEPLOY_ID;
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((m) => m);
  }

  cached.conn = await cached.promise;
  (global as any).mongoose = cached;
  return cached.conn;
}