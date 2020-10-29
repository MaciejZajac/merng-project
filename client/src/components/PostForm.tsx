import { useMutation } from '@apollo/client';
import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useForm } from '../utils/hooks';
import { CREATE_POST_MUTATION, FETCH_POSTS_QUERY } from '../utils/graphql';
const PostForm = () => {
  const { onChange, onSubmit, values } = useForm(createPostCallback, {
    body: '',
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data: any = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      console.log('result', result);
      // data.getPosts = [result.data.getPost, ...data.getPosts];
      const newData = { ...data };
      newData.getPosts = [result.data.createPost, ...newData.getPosts];

      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: newData });
      values.body = '';
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <Form onSubmit={onSubmit}>
      <h2>Create a post:</h2>
      <Form.Field>
        <Form.Input
          placeholder='Gi world'
          name='body'
          onChange={onChange}
          value={values.body}
        />
        <Button type='submit' color='teal'>
          Submit
        </Button>
      </Form.Field>
    </Form>
  );
};

export default PostForm;
