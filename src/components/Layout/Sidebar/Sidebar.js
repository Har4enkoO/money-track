import React from "react";
import { Link } from "react-router-dom";

class Sidebar extends React.Component {
  render() {
    return (
      <aside>
        <div>Logo</div>
        <div className="navigation mt-4 ml-4">
          <Link to="/">Home</Link>
          <Link to="/charts">Charts</Link>
          <Link to="/categories">Categories</Link>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
