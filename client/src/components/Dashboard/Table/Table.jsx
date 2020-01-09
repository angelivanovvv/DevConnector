import React from "react";
import PropTypes from "prop-types";

import { tableHeader } from "../../../constants/config";

import Button from "../../Button";

const Table = ({ onClick, experience }) => {
  console.log(experience.toJS());
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            {tableHeader.map(item => (
              <th key={item.get("key")} className={item.get("className")}>
                {item.get("title")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tech Guy Web Solutions</td>
            <td className="hide-sm">Senior Developer</td>
            <td className="hide-sm">02-03-2009 - 01-02-2014</td>
            <td>
              <Button
                type="button"
                className="btn btn-danger"
                onClick={onClick}
              >
                Delete
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  onClick: PropTypes.func
};
Table.defaultProps = {
  onClick: () => {}
};

export default Table;
