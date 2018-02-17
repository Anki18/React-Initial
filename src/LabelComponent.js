import React from "react";

const LabelComponent= props => {
      return (
        <label>
        {props.labelName} :<input type="text" name={props.propName} value={props.location} onChange={props.onChange} />
      </label>
      );
  }

  export default LabelComponent;