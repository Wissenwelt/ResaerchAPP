import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const { searchInput } = await req.json();

    if (searchInput) {
        const result = await axios.get('https://api.search.brave.com/res/v1/web/search?q=' + searchInput+'&count=7', {
                headers: {
                    'Accept': 'application/json',
                    'Accept-Encoding': 'gzip',
                    'X-Subscription-Token': process.env.BRAVE_API_KEY
                }
            });
            console.log("Data from Brave API:", result.data);

            return NextResponse.json(result.data);
        }
        else {
            return NextResponse.json({ error: 'Please pass a user search query.' });
    }
}