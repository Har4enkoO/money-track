import React from 'react';
import { Link } from 'react-router-dom';

import ActionMenu from './ActionMenu';

class Categories extends React.Component {
  state = {
    categories: JSON.parse(localStorage.getItem('categories')),
  };
  handleRemove = (id) => {
    this.filteredArrey = this.state.categories.filter(
      (el) => el.categoryName !== id
    );
    this.setState(() => {
      return {
        categories: this.filteredArrey,
      };
    });
    localStorage.removeItem('categories');
    localStorage.setItem('categories', JSON.stringify(this.filteredArrey));
  };
  render() {
    return (
      <div className="container">
        {console.log(this.state.categories)}
        <div className="categories-header d-flex justify-content-between mt-4">
          <h2>Categories</h2>
          <Link to="/add_category" className="btn btn-primary">
            Add category
          </Link>
        </div>
        <div className="table">
          <div
            className="row mt-4"
            style={{
              borderBottom: '1px solid lightgrey',
              fontWeight: 'bolder',
            }}
          >
            <div className="col-3 text-center">Category</div>
            <div className="col-3 text-center">Description</div>
            <div className="col-3 text-center">Date</div>
            <div className="col-3 text-center">Action</div>
          </div>
          {this.state.categories
            ? this.state.categories.map((category) => (              
                <div className="row mt-2" key={category.categoryName}>
                  <div className="col-3 text-center">
                    {category.categoryName}
                  </div>
                  <div className="col-3 text-center">
                    {category.description}
                  </div>
                  <div className="col-3 text-center">{category.date}</div>
                  <div className="col-3 text-center">
                    <ActionMenu
                      handleRemove={this.handleRemove}
                      id={category.categoryName}
                    />
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    );
  }
}

export default Categories;
