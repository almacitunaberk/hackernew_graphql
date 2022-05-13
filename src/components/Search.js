import React from 'react';
import { useState } from 'react';
import Link from './Link';
import { useLazyQuery, gql } from '@apollo/client';

const FILTER_QUERY = gql`
  query FilterSearchQuery($filter: String!) {
    feed(filter: $filter) {
      id
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

const Search = () => {
  const [searchFilter, setSearchFilter] = useState('');
  const [executeSearch, { data }] = useLazyQuery(FILTER_QUERY);
  return (
    <>
      <div>
        Search
        <input type="text" onChange={(e) => setSearchFilter(e.target.value)} />
        <button
          onClick={() => {
            executeSearch({ variables: { filter: searchFilter } });
          }}
        >
          OK
        </button>
      </div>
      {data && data.feed.links.map((link, index) => <Link key={link.id} link={link} index={index} />)}
    </>
  );
};

export default Search;
