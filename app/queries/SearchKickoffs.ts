import { gql } from 'graphql-request';
import { SearchKickoffsInput } from '../types/KickoffTypes';

const SEARCH_KICKOFFS = gql`
  query SearchKickoffs($input: SearchKickoffsInput!) {
    searchKickoffs(input: $input) {
      edges {
        node {
          id
          name
          slateID
          difficulty
          slots {
            id
            stats {
              id
              stat
              valueNeeded
              valueType
              groupV2
            }
            requirements {
              playerPositions
            }
          }
          submissionDeadline
          status
          gamesStartAt
          completedAt
        }
        cursor
      }
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;


export const fetchKickoffs = async (variables: SearchKickoffsInput) => {
  const response = await fetch('/api/searchKickoffs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: SEARCH_KICKOFFS,  // Now a plain string instead of gql-processed
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();
  return data;
};



