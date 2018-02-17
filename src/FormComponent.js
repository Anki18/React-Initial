import React from "react";
import LabelComponent from "./LabelComponent";

const FormComponent= props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <LabelComponent labelName={"Origin"} propName={"origin"} onChange={this.handleChange} location={this.state.origin} /> <br />
            <LabelComponent labelName={"Destination"} propName={"destination"} onChange={this.handleChange} location={this.state.destination} />
            <input type="submit" value="Submit" />
          </form>
    );
}

export default FormComponent;