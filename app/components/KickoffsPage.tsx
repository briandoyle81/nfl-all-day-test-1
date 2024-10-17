'use client';

import { useEffect, useState } from 'react';
import { SearchKickoffsResponse, SearchKickoffsInput } from '../types/KickoffTypes';
import { fetchKickoffs } from '../queries/SearchKickoffs';

const KickoffsPage = () => {
  const [kickoffs, setKickoffs] = useState<SearchKickoffsResponse | null>(null);

  useEffect(() => {
    const fetchKickoffsData = async () => {
      try {
        // Call the fetchKickoffs function
        const data = await fetchKickoffs({
          after: '',
          first: 0,
          filters: {
            byIDs: ['08558f32-3b10-4325-8b54-37d450a195a1'],
          },
          sortBy: 'CREATED_AT_DESC',
        });

        // Update the state with the fetched data
        setKickoffs(data.searchKickoffs);
      } catch (error) {
        console.error('Error fetching kickoffs:', error);
      }
    };

    fetchKickoffsData();
  }, []); // Empty dependency array means it runs only on mount

  return (
    <div>
      <h1>Kickoffs</h1>
      {kickoffs ? (
        <pre>{JSON.stringify(kickoffs, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default KickoffsPage;
