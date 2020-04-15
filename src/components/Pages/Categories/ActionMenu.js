import React from 'react';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

export default function ActionMenu({ handleRemove, id }) {
  return (
    <UncontrolledDropdown>
      <DropdownToggle style={{ background: 'none', color: 'grey' }}>
        Edit
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={() => handleRemove(id)}>
          Delete category
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}
