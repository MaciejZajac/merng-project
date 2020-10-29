import React from 'react';
import { Popup } from 'semantic-ui-react';

interface IMyPopup {
  content: string;
  children: React.ReactNode;
}
const MyPopup = ({ children, content }: IMyPopup) => {
  return <Popup content={content} inverted trigger={children} />;
};

export default MyPopup;
