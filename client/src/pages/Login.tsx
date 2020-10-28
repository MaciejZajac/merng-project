import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { useForm } from '../utils/hooks';

function Login(props: any) {
  const [errors, setErrors] = useState<any>({});

  const initialState = {
    username: '',
    password: '',
  };

  const { onChange, values, onSubmit } = useForm(loginUserCb, initialState);

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      console.log('result', result);
      props.history.push('/');
    },
    onError(err) {
      console.log('err', err);
      console.log(
        'err.graphQLErrors[0]?.extensions?.exception?.errors',
        err.graphQLErrors[0]?.extensions?.exception?.errors
      );
      setErrors(err.graphQLErrors[0]?.extensions?.exception?.errors);
    },
    variables: values,
  });
  function loginUserCb() {
    loginUser();
  }

  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Login</h1>
        <Form.Input
          label='Username'
          placeholder='Username'
          name='username'
          type='text'
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label='Password'
          placeholder='Password'
          name='password'
          type='password'
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Button type='submit' primary>
          Login
        </Button>
      </Form>
      {Object.values(errors).length > 0 && (
        <div className='ui error message'>
          <ul className='list'>
            {Object.values(errors).map((val: any) => (
              <li key={val}>{val}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
export default Login;
