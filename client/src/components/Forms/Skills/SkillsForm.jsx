import React from "react";
import PropTypes from "prop-types";

import { experienceFields, educationFields } from "../../../constants/config";

import Input from "../../FormElements/Input";
import TextArea from "../../FormElements/TextArea";
import Button from "../../Button";
import Card from "../../Card";

const SkillsForm = ({
  fields,
  formType,
  onChange,
  onCheck,
  onSubmit,
  onGoBack
}) => {
  const { from, current, to, description } = fields;
  let formFields = experienceFields(fields);

  if (formType === "education") {
    formFields = educationFields(fields);
  }

  return (
    <form className="form">
      <Card>
        {formFields.map(field => (
          <div key={field.get("key")} className="form-group">
            <Input
              type={field.get("type")}
              placeholder={field.get("placeholder")}
              name={field.get("name")}
              value={field.get("value")}
              onChange={onChange}
            />
          </div>
        ))}
        <div className="form-group">
          <h4>From Date</h4>
          <Input type="date" name="from" value={from} onChange={onChange} />
        </div>
        <div className="form-group">
          <p>
            <Input
              type="checkbox"
              name="current"
              value={current}
              checked={current}
              onClick={onCheck}
            />
            Current Job
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <Input
            type="date"
            name="to"
            value={to}
            onChange={onChange}
            disabled={current ? true : false}
          />
        </div>

        <div className="form-group">
          <TextArea
            name="description"
            placeholder="Add Description"
            value={description}
            onChange={onChange}
          ></TextArea>
        </div>
      </Card>
      <div className="button-container">
        <Button
          type="submit"
          className="btn btn-primary my-1"
          onClick={onSubmit}
        >
          Submit
        </Button>
        <Button type="button" className="btn btn-light my-1" onClick={onGoBack}>
          Go Back
        </Button>
      </div>
    </form>
  );
};

SkillsForm.propTypes = {
  title: PropTypes.string,
  company: PropTypes.string,
  location: PropTypes.string,
  from: PropTypes.string,
  current: PropTypes.bool,
  to: PropTypes.string,
  description: PropTypes.string,
  onChange: PropTypes.func,
  onCheck: PropTypes.func,
  onSubmit: PropTypes.func,
  onGoBack: PropTypes.func
};

SkillsForm.defaultProps = {
  title: "",
  company: "",
  location: "",
  from: "",
  current: false,
  to: "",
  description: "",
  onChange: () => {},
  onCheck: () => {},
  onSubmit: () => {},
  onGoBack: () => {}
};

export default SkillsForm;
