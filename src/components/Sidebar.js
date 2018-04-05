import React from "react";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Checkbox
} from "react-bootstrap";

const Sidebar = () => {
  return (
    <form>
      <FormGroup controlId="formBasicText">
        <ControlLabel>Text field</ControlLabel>
        <FormControl type="text" placeholder="Enter text" />
      </FormGroup>

      <FormGroup controlId="formControlsSelect">
        <ControlLabel>Select</ControlLabel>
        <FormControl componentClass="select" placeholder="select">
          <option value="select">select</option>
          <option value="other">...</option>
        </FormControl>
      </FormGroup>

      <FormGroup controlId="formControlsSelect2">
        <ControlLabel>Select</ControlLabel>
        <FormControl componentClass="select" placeholder="select">
          <option value="select">select</option>
          <option value="other">...</option>
        </FormControl>
      </FormGroup>

      <FormGroup controlId="formControlsSelect3">
        <ControlLabel>Select</ControlLabel>
        <FormControl componentClass="select" placeholder="select">
          <option value="select">select</option>
          <option value="other">...</option>
        </FormControl>
      </FormGroup>

      <FormGroup>
        <Checkbox>Checkbox 1</Checkbox>
        <Checkbox>Checkbox 2</Checkbox>
        <Checkbox>Checkbox 3</Checkbox>
      </FormGroup>
    </form>
  );
};

export default Sidebar;
