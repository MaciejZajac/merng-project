import React, { useState } from 'react';
import { Button, Icon, Confirm } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { FETCH_POSTS_QUERY } from '../utils/graphql';
import MyPopup from '../utils/MyPopup';
interface IDeleteButton {
  postId: number;
  callback?: () => void;
  commentId?: string;
}
const DeleteButton = ({ postId, callback, commentId }: IDeleteButton) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        const data: any = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        const newData = { ...data };
        newData.getPosts = newData.getPosts.filter((p: any) => p.id !== postId);

        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: newData });
      }
      callback?.();
    },
    variables: {
      postId,
      commentId,
    },
  });
  return (
    <>
      <MyPopup content={`Delete ${commentId ? 'comment' : 'post'}`}>
        <Button
          as='div'
          color='red'
          floated='right'
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name='trash' style={{ margin: 0 }} />
        </Button>
      </MyPopup>

      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrMutation as any}
      />
    </>
  );
};

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteButton;
