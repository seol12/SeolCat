import React from 'react';
import { useScreenSize } from '../hooks';
import wrapper from '../store/configStore';


const SeolCat = ({ Component }) => {

  useScreenSize();


  return (
    <>
      <Component />
    </>
  );

};


export default wrapper.withRedux(SeolCat);