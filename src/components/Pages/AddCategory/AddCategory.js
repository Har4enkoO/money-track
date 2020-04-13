import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";

class AddCategory extends React.Component {
  render() {
    return (
      <div className="container">
        <Form
          style={{
            width: "60%",
            marginTop: "50px",
            border: "1px solid lightgrey",
            padding: "30px",
            borderRadius: "4px",
          }}
        >
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
          <Link to="/categories" className="btn btn-secondary">
            Add new category
          </Link>
        </Form>
      </div>
    );
  }
}

export default AddCategory;
