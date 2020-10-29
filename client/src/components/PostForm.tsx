import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useForm } from '../utils/hooks';
import { CREATE_POST_MUTATION, FETCH_POSTS_QUERY } from '../utils/graphql';
const PostForm = () => {
  const [error, setError] = useState<any>('');
  const { onChange, onSubmit, values } = useForm(createPostCallback, {
    body: '',
  });

  const [createPost] = useMutation(CREATE_POST_MUTATION, {
    update(proxy, result) {
      const data: any = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      const newData = { ...data };
      newData.getPosts = [result.data.createPost, ...newData.getPosts];

      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: newData });
      values.body = '';
      setError('');
    },
    onError(err) {
      setError(err.graphQLErrors[0]?.message);
    },
    variables: values,
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder='Gi world'
            name='body'
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type='submit' color='teal'>
            Submit
          </Button>
        </Form.Field>
      </Form>

      {error && (
        <div className='ui error message' style={{ marginBottom: 20 }}>
          <ul className='list'>
            <li>{error}</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default PostForm;
