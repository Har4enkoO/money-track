import React from "react";
import { Link } from "react-router-dom";

import ActionMenu from "./ActionMenu";

class Categories extends React.Component {
  state = {
    categories: [
      { categoryName: "Food", description: "my food", date: "10.04.20" },
      { categoryName: "Clothes", description: "", date: "10.04.20" },
      { categoryName: "Restaurants", description: "", date: "10.04.20" },
      { categoryName: "Utility bills", description: "", date: "10.04.20" },
      { categoryName: "Pets", description: "", date: "10.04.20" },
    ],
  };

  render() {
    return (
      <div className="container">
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
              borderBottom: "1px solid lightgrey",
              fontWeight: "bolder",
            }}
          >
            <div className="col-3 text-center">Category</div>
            <div className="col-3 text-center">Description</div>
            <div className="col-3 text-center">Date</div>
            <div className="col-3 text-center">Action</div>
          </div>
          {this.state.categories.map((category) => (
            <div className="row mt-2" key={category.categoryName}>
              <div className="col-3 text-center">{category.categoryName}</div>
              <div className="col-3 text-center">{category.description}</div>
              <div className="col-3 text-center">{category.date}</div>
              <div className="col-3 text-center">
                <ActionMenu />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Categories;
