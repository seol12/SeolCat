import React from "react";
import { PageResultNotFoundMainContainer } from './style';


const PageResultNotFound = ({ guide }) => {

  return (
    <>
      <PageResultNotFoundMainContainer>
        <div className="guide">
          <p>{guide}</p>
        </div>
      </PageResultNotFoundMainContainer>
    </>
  );

};


export default PageResultNotFound;