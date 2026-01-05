// Example Netlify Serverless Function
// This shows how to use API keys securely with Netlify

// To use this:
// 1. Add your API key in Netlify dashboard as environment variable
// 2. Uncomment and modify the code below
// 3. Deploy to Netlify

exports.handler = async (event, context) => {
    // CORS headers for browser requests
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    };

    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: '',
        };
    }

    try {
        // Get API key from environment variable (set in Netlify dashboard)
        const API_KEY = process.env.YOUR_API_KEY;
        
        if (!API_KEY) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'API key not configured' }),
            };
        }

        // Example: Fetch data from external API
        // const response = await fetch(`https://api.example.com/data?key=${API_KEY}`);
        // const data = await response.json();

        // For now, return example data
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                message: 'API function is working!',
                // data: data
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

