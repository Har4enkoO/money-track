import React from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

export default function ActionMenu() {
  return (
    <UncontrolledDropdown>
      <DropdownToggle style={{ background: "none", color: "grey" }}>
        Edit
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>Delete category</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}
