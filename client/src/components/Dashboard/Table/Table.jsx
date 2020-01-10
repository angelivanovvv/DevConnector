import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { List } from "immutable";

import Button from "../../Button";

const Table = ({ onClick, rows, results }) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {rows.map(item => (
              <th key={item.get("id")} className={item.get("class")}>
                {item.get("title")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.map((item, itemIndex) => (
            <tr key={itemIndex}>
              {rows.map((row, rowIndex) => {
                let rowLenght = row.size;
                if (rowIndex === 0) {
                  return <td key={rowIndex}>{item.get(row.get("key"))}</td>;
                }
                if (row.get("key") === "years") {
                  return (
                    <td key={rowIndex} className="hide-sm">
                      <Moment format="YYYY/MM/DD">{item.get("from")}</Moment> -{" "}
                      {item.get("to") === null ? (
                        "Now"
                      ) : (
                        <Moment format="YYYY/MM/DD">{item.get("to")}</Moment>
                      )}
                    </td>
                  );
                }
                if (rowIndex === rowLenght - 1) {
                  return (
                    <td key={rowIndex}>
                      <Button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => onClick(item.get("_id"))}
                      >
                        Delete
                      </Button>
                    </td>
                  );
                }
                return (
                  <td key={rowIndex} className="hide-sm">
                    {item.get(row.get("key"))}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  results: PropTypes.instanceOf(List).isRequired,
  rows: PropTypes.instanceOf(List).isRequired,
  onClick: PropTypes.func
};
Table.defaultProps = {
  onClick: () => {}
};

export default Table;
