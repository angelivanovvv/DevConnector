import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Button from "../../Button";

import { deleteConfig } from "../../../constants/config";

const Delete = ({ type, deleteAction, closeAction }) => {
  const config = deleteConfig
    .filter((option) => option.get("type") === type)
    .reduce((object) => object);

  return (
    <div className="modal-delete-body">
      {config && (
        <Fragment key={config.get("type")}>
          <h2 className="text-uppercase text-center">{config.get("title")}</h2>
          <p className="text-center">{config.get("description")}</p>
        </Fragment>
      )}
      <div className="button-group">
        <Button onClick={deleteAction} className="btn btn-danger my-2-top">
          Delete
        </Button>
        <Button onClick={closeAction} className="btn btn-light my-2-top">
          Cancel
        </Button>
      </div>
    </div>
  );
};

Delete.propTypes = {
  type: PropTypes.string.isRequired,
  deleteAction: PropTypes.func,
  closeAction: PropTypes.func,
};
Delete.defaultProps = {
  deleteAction: () => {},
  closeAction: () => {},
};

export default Delete;
