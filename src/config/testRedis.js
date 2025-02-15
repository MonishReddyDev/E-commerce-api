import client from "./client.js"


const getRedis = async () => {
    const a = await client.get('name');
    console.log("result", a);
};

getRedis()