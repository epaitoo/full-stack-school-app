import React from 'react';


export default ({ submit, cancel, elements, submitButtonText }) => {

  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }


  return(
    <div>
      <form>
        {elements()}
        <div class="grid-100 pad-bottom">
          <button class="button" type="submit">{submitButtonText}</button>
          <button class="button button-secondary" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

