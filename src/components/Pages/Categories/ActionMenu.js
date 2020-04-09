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
      <DropdownToggle
        style={{ background: "none", color: "black", border: "none" }}
      >
        ***
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>Delete category</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}
