import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';
import PostCard from '../components/PostCard';

const Home = (): JSX.Element => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const posts = data && data.getPosts;
  return (
    <Grid columns={3}>
      <Grid.Row className='page-title'>
        <h3>Recent posts</h3>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading posts</h1>
        ) : (
          posts &&
          posts.map((post: any) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      commentCount
      likes {
        username
      }
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
export default Home;
