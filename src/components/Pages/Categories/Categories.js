import React from "react";

class Categories extends React.Component {
  state = {
    categories: [
      { categoryName: "Food", description: "my food", date: "10.04.20" },
    ],
  };

  render() {
    return (
      <div className="container">
        <div className="categories-header d-flex justify-content-between">
          <h2>Categories</h2>
          <button>Add category</button>
        </div>
        <div className="table">
          <div className="row">
            <div className="col-3 text-center">Category</div>
            <div className="col-3 text-center">Description</div>
            <div className="col-3 text-center">Date</div>
            <div className="col-3 text-center">Action</div>
          </div>
          {this.state.categories.map((category) => (
            <div className="row">
              <div className="col-3 text-center">{category.categoryName}</div>
              <div className="col-3 text-center">{category.description}</div>
              <div className="col-3 text-center">{category.date}</div>
              <div className="col-3 text-center">***</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Categories;
