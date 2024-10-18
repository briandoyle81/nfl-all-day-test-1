import { NextRequest, NextResponse } from 'next/server';
// import { GraphQLClient } from 'graphql-request';

// Create a GraphQL client for making requests to the external GraphQL API
// const client = new GraphQLClient('https://nflallday.com/consumer/graphql');

export async function POST(request: NextRequest) {
  console.log('Request', request);
  try {
    // Parse the incoming request body
    // const { query, variables } = await request.json();

    // console.log('Query:', query);
    // console.log('Variables:', variables);

    const body = JSON.stringify({
      query: "query SearchKickoffs($input: SearchKickoffsInput!) { searchKickoffs(input: $input) { edges { node { id name slateID difficulty slots { id stats { id stat valueNeeded valueType groupV2 } requirements { playerPositions } } submissionDeadline status gamesStartAt completedAt } cursor } totalCount pageInfo { endCursor hasNextPage } } }",
      variables: {
        "input": {
          "after": "",
          "first": 0,
          "filters": {
            "byIDs": ["08558f32-3b10-4325-8b54-37d450a195a1"]
          },
          "sortBy": "CREATED_AT_DESC"
        },
      }
    });
    console.log("***************************")
    console.log('Body:', body);
    console.log("***************************")

    const response = await fetch('https://nflallday.com/consumer/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        // Add the Authorization header if required
        // 'Authorization': 'Bearer YOUR_API_TOKEN',
      },
      body: body,
    });

    console.log('Request Headers:', response.headers);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    // Log the error for debugging purposes
    console.error('Error occurred in API route:', error);

    // Check if error has a message property before accessing it
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch data';

    // Return a 500 error response with the error message
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
