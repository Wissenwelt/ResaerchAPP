import { NextResponse } from 'next/server';

export async function POST(req) {
    const { searchInput } = await req.json();

    if (searchInput) {
        try {
            
            const response = await fetch('https://api.search.brave.com/res/v1/web/search?q=' + searchInput + '&count=7', {
                headers: {
                    'Accept': 'application/json',
                    'Accept-Encoding': 'gzip',
                    'X-Subscription-Token': process.env.BRAVE_API_KEY
                }
            });

            if (!response.ok) {
                
                const errorData = await response.text();
                console.error("Brave API Error Response:", errorData);
                return NextResponse.json({ error: `Brave API request failed with status: ${response.status}` }, { status: response.status });
            }

            const resultData = await response.json(); 
            console.log("Data from Brave API:", resultData);

            return NextResponse.json(resultData);
        } catch (error) {
            console.error("Error fetching from Brave API:", error);
            return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: 'Please pass a user search query.' }, { status: 400 });
    }
}