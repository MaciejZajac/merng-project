import { useState } from 'react';

interface IUseForm {
  onChange: (e: any) => void;
  onSubmit: (e: any) => void;
  values: any;
}

export const useForm = (callback: () => void, initialState = {}): IUseForm => {
  const [values, setValues] = useState(initialState);

  const onChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
