import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

class AddCategory extends React.Component {
  state = {
    category: {
      categoryName: '',
      description: '',
      icon: '',
      date: '',
    },
  };
  addNewCategory = (e) => {
    const now = new Date();
    let description = document.getElementById('description').value;
    let total = document.getElementById('total').value;
    this.setState({
      category: {
        categoryName: total,
        description: description,
        icon: e.target.value,
        date: now.toLocaleDateString(),
      },
    });
  };

  pushCategories = () => {
    let categories = JSON.parse(localStorage.getItem('categories')) || [];
    let newCategories = [...categories, this.state.category];
    localStorage.setItem('categories', JSON.stringify(newCategories));
  };

  render() {
    return (
      <div className="container">
        <Form
          style={{
            width: '60%',
            marginTop: '50px',
            border: '1px solid lightgrey',
            padding: '30px',
            borderRadius: '4px',
          }}
        >
          <FormGroup>
            <Label for="total">Total</Label>
            <Input type="text" name="total" id="total" placeholder="Category" />
          </FormGroup>

          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="text"
              name="description"
              id="description"
              placeholder="Description"
            />
          </FormGroup>

          <FormGroup>
            <Label for="selectIcon">Select icon</Label>
            <Input
              type="select"
              name="selectIcon"
              id="selectIcon"
              onChange={this.addNewCategory}
            >
              <option value="none" hidden="">
                Chose icon
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Input>
          </FormGroup>
          <Link
            to="/categories"
            className="btn btn-secondary"
            onClick={this.pushCategories}
          >
            Add new category
          </Link>
        </Form>
      </div>
    );
  }
}

export default AddCategory;
