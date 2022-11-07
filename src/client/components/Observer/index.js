import React, { forwardRef } from "react";
import { ObserverMainConinaer } from './style';


const Observer = forwardRef(({}, observerRef) => {
  
  return (
    <>
      <ObserverMainConinaer ref={observerRef} />
    </>
  );

});


export default Observer;