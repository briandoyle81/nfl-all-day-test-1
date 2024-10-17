import { NextRequest, NextResponse } from 'next/server';
import { GraphQLClient } from 'graphql-request';

// Create a GraphQL client for making requests to the external GraphQL API
const client = new GraphQLClient('https://nflallday.com/consumer/graphql', {
    headers: {
      'Content-Type': 'application/json',
    },
  });

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming request body
    const { query, variables } = await request.json();

    // Log the query and variables for debugging purposes
    console.log('GraphQL Query:', query);
    console.log('GraphQL Variables:', variables);

    // Make the GraphQL request to the external API
    const data = await client.request(query, variables);

    // Return the fetched data as JSON
    return NextResponse.json(data);
  } catch (error: any) {
    // Log the error for debugging purposes
    console.error('Error occurred in API route:', error);

    // Return a 500 error response with the error message
    return NextResponse.json({ error: error.message || 'Failed to fetch data' }, { status: 500 });
  }
}
