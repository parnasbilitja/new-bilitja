// import { NextResponse, NextRequest } from 'next/server';
// import NodeCache from 'node-cache';
// import crypto from 'crypto';
//
// // Declare the global type
// // declare global {
// //     var cache: NodeCache | undefined;
// // }
//
// // Create the cache instance
// if (!global.cache) {
//     global.cache = new NodeCache({ stdTTL: 1800 }); // Cache for 30 minutes (1800 seconds)
// }
//
// const cache = global.cache;
//
// const getHotel = async(hotelslug) => {
//     const response = await fetch(`https://api.hotelobilit.com/api/v2/hotels/${hotelslug}`, {
//         method: 'GET',
//         headers: {
//             "x-app-key": '1673|m1lGLn82YxUIpOQTfg2RrOdEuPeg6BP0XQ0dwshE2de4b92d' //the token is a variable which holds the token
//         }
//     });
//
//     return response.json();
// }
//
// export async function POST(request) {
//     const data = await request.json();
//
//     console.log('request', data.default_hotel[0].related_flights);
//
//     let hotelInfo;
//     if (data) {
//         hotelInfo = await getHotel(data.hote_slug);
//     }
//
//     // Generate a unique key based on the request data
//     const key = crypto.createHash('md5').update(JSON.stringify({...data, hotel_info: hotelInfo.data })).digest('hex');
//
//     // Cache the data with the generated key
//
//     cache.set(key, {...data, hotel_info: hotelInfo.data });
//
//     return NextResponse.json({ message: 'Data cached successfully', key });
// }
//
// export async function GET(request) {
//     const url = new URL(request.url);
//     const key = url.searchParams.get('key');
//
//     if (!key) {
//         return NextResponse.json({ error: 'No key provided' }, { status: 400 });
//     }
//
//     console.log('Searching for key:', key);
//     console.log('Cache stats:', cache.getStats());
//
//     const cachedData = cache.get(key);
//     if (cachedData) {
//         console.log('Cache hit for key:', key);
//         return NextResponse.json(cachedData);
//     } else {
//         console.log('Cache miss for key:', key);
//         // Here, you would typically fetch fresh data and cache it
//         // For this example, we'll just return an error
//         return NextResponse.json({ error: 'No data found for this key' }, { status: 404 });
//     }
// }


import NodeCache from 'node-cache';
import crypto from 'crypto';

// Create the cache instance
if (!global.cache) {
    global.cache = new NodeCache({ stdTTL: 3600 }); // Cache for 30 minutes
}

const cache = global.cache;

const getHotel = async(hotelslug) => {
    const response = await fetch(`https://api.hotelobilit.com/api/v2/hotels/${hotelslug}`, {
        method: 'GET',
        headers: {
            "x-app-key": '1673|m1lGLn82YxUIpOQTfg2RrOdEuPeg6BP0XQ0dwshE2de4b92d'
        }
    });

    return response.json();
}

export default async function handler(req, res) {
    // Handle POST request
    if (req.method === 'POST') {
        try {
            const data = req.body;

            console.log('request', data.default_hotel[0].related_flights);

            let hotelInfo;
            if (data) {
                hotelInfo = await getHotel(data.hote_slug);
            }

            // Generate a unique key based on the request data
            const key = crypto.createHash('md5').update(JSON.stringify({...data, hotel_info: hotelInfo.data })).digest('hex');

            // Cache the data with the generated key
            cache.set(key, {...data, hotel_info: hotelInfo.data });

            return res.status(200).json({ message: 'Data cached successfully', key });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Handle GET request
    else if (req.method === 'GET') {
        const { key } = req.query;

        if (!key) {
            return res.status(400).json({ error: 'No key provided' });
        }

        console.log('Searching for key:', key);
        console.log('Cache stats:', cache.getStats());

        const cachedData = cache.get(key);
        if (cachedData) {
            console.log('Cache hit for key:', key);
            return res.status(200).json(cachedData);
        } else {
            console.log('Cache miss for key:', key);
            return res.status(404).json({ error: 'No data found for this key' });
        }
    }

    // Handle other HTTP methods
    else {
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}
