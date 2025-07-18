import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const { searchInput } = await req.json();

    if (searchInput) {
        try {
            
            const response = await axios.get('https://api.search.brave.com/res/v1/web/search?q=' + searchInput, {
                headers: {
                    'Accept': 'application/json',
                    'Accept-Encoding': 'gzip',
                    'X-Subscription-Token': process.env.BRAVE_API_KEY
                }
            });

            // NOTE: This log will appear in your VS Code terminal, not the browser.
            console.log("Data from Brave API:", response.data);

            return NextResponse.json(response.data);
        } catch (error) {
            console.error("Error fetching from Brave API:", error);
            return NextResponse.json({ error: 'Failed to fetch search results.' }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: 'Please pass a user search query.' }, { status: 400 });
    }
}