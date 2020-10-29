import React, { useState } from 'react';
import { Button, Icon, Confirm } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { FETCH_POSTS_QUERY } from '../utils/graphql';
interface IDeleteButton {
  postId: number;
  callback?: () => void;
}
const DeleteButton = ({ postId, callback }: IDeleteButton) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
      setConfirmOpen(false);
      const data: any = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      const newData = { ...data };
      newData.getPosts = newData.getPosts.filter((p: any) => p.id !== postId);

      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: newData });

      callback?.();
    },
    variables: {
      postId,
    },
  });
  return (
    <>
      <Button
        as='div'
        color='red'
        floated='right'
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name='trash' style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost as any}
      />
    </>
  );
};

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default DeleteButton;
