import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class AddCategory extends React.Component {
  render() {
    return (
      <div className="container">
        <Form style={{ width: "60%", marginTop: "50px" }}>
          <FormGroup>
            <Label for="total">Total</Label>
            <Input type="text" name="total" id="total" placeholder="total" />
          </FormGroup>

          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="text"
              name="description"
              id="description"
              placeholder="description"
            />
          </FormGroup>

          <FormGroup>
            <Label for="selectIcon">Select icon</Label>
            <Input type="select" name="selectIcon" id="selectIcon">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </FormGroup>
          <Button>Add new category</Button>
        </Form>
      </div>
    );
  }
}

export default AddCategory;
