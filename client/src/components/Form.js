import React from 'react';


export default Form = ({ submit, cancel, elements, submitButtonText }) => {



  return(
    <div>
      <form>
        {elements()}
        <div class="grid-100 pad-bottom">
          <button class="button" type="submit">{submitButtonText}</button>
          <button class="button button-secondary" onclick="">Cancel</button>
        </div>
      </form>
    </div>
  );
}

