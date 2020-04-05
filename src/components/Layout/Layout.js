import React from "react";

import Sidebar from "./Sidebar/Sidebar";
import { Header } from "./Header/Header";

class Layout extends React.Component {
  render() {
    return (
      <div className="Layout">
        <div className="container-fluid">
          <div className="row no-gutter">
            <div className="col-2">
              <Sidebar />
            </div>
            <div className="content col-10 no-gutter ">
              <Header />
              <main> {this.props.children}</main>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
