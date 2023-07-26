import { useCallback, useState } from 'react';
import { shallowEqual } from 'react-redux';
import { useRouter } from 'next/router';

import { useSelector, getIsomorphicDataPopulation } from '../store';
import { loadSearchPage } from '../store/actions';
import DummyPost from '../components/DummyPost';
import Post from '../components/Post';
import PaginationLinks from '../components/PaginationLinks';

const SearchPage = () => {
  const router = useRouter();

  const isLoadingPage = useSelector(state => state.isLoadingPage);
  const postIds = useSelector(state => state.postIds, shallowEqual);

  const [q, setQ] = useState(router.query.q || '');

  const handleChange = useCallback(event => setQ(event.target.value), []);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    await router.push({ pathname: '/search', query: { q } });
  }, [q, router]);

  return (
    <main>
      <h1>Search</h1>

      <form onSubmit={handleSubmit} action="/search" method="GET">
        <input type="text" name="q" value={q} onChange={handleChange}/>
        <button type="submit">Search</button>
      </form>

      <PaginationLinks pathname="/search" params={{ q }} hideOnFirst/>

      {isLoadingPage ? <>
        <DummyPost/>
        <DummyPost/>
        <DummyPost/>
      </> : (
        postIds.map(postId => (
          <Post id={postId} key={postId}/>
        ))
      )}

      <PaginationLinks pathname="/search" params={{ q }}/>

      <style jsx>{`
        form {
          display: inline-flex;
          flex-direction: row;
          width: 100%;
          border: none;
          box-shadow: none;
          padding: 0 0 1rem 0;
          margin: 0;
        }
        input {
          width: 100%; // this is to let 'flex' properly shrink it on narrow screens
          flex: 1 1 auto;
          padding: 0.5rem 1rem;
          margin: 0 1rem 0 0;
        }
        button {
          flex: 0 0 auto;
          padding: 0.5rem 1rem;
          margin: 0;
        }
      `}</style>
    </main>
  );
};

SearchPage.getInitialProps = getIsomorphicDataPopulation(loadSearchPage);

export default SearchPage;
