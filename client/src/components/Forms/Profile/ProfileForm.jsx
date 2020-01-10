import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { mediaFields, profileFields, options } from "../../../constants/config";

import Input from "../../FormElements/Input";
import Select from "../../FormElements/Select";
import TextArea from "../../FormElements/TextArea";
import Button from "../../Button";
import Card from "../../Card";

const ProfileForm = ({
  company,
  website,
  location,
  status,
  skills,
  githubusername,
  bio,
  twitter,
  facebook,
  linkedin,
  youtube,
  instagram,
  isMediaOpen,
  socialMediaToggle,
  onChange,
  onSubmit,
  onGoBack
}) => {
  const links = { twitter, facebook, linkedin, youtube, instagram };
  const fields = { company, website, location, skills, githubusername };
  return (
    <form className="form">
      <Card>
        <div className="form-group">
          <Select
            name="status"
            value={status}
            options={options}
            onChange={onChange}
          />
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        {profileFields(fields).map(field => (
          <div key={field.get("key")} className="form-group">
            <Input
              type={field.get("type")}
              placeholder={field.get("placeholder")}
              name={field.get("name")}
              value={field.get("value")}
              onChange={onChange}
            />
            <small className="form-text">{field.get("label")}</small>
          </div>
        ))}
        <div className="form-group">
          <TextArea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={onChange}
          />
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <Button
            type="button"
            onClick={socialMediaToggle}
            className="btn btn-light"
          >
            Add Social Network Links
          </Button>
        </div>

        {isMediaOpen && (
          <Fragment>
            {mediaFields(links).map(media => (
              <div key={media.get("key")} className="form-group social-input">
                <i className={`fab ${media.get("icon")} fa-2x`}></i>
                <Input
                  value={media.get("value")}
                  type={media.get("type")}
                  placeholder={media.get("placeholder")}
                  name={media.get("name")}
                  onChange={onChange}
                />
              </div>
            ))}
          </Fragment>
        )}
      </Card>
      <div className="button-container">
        <Button
          type="submit"
          className="btn btn-primary btn-right my-1"
          onClick={onSubmit}
        >
          Submit
        </Button>
        <Button className="btn btn-light my-1" onClick={onGoBack}>
          Go Back
        </Button>
      </div>
    </form>
  );
};

ProfileForm.propTypes = {
  company: PropTypes.string,
  website: PropTypes.string,
  location: PropTypes.string,
  status: PropTypes.string,
  skills: PropTypes.string,
  githubusername: PropTypes.string,
  bio: PropTypes.string,
  twitter: PropTypes.string,
  facebook: PropTypes.string,
  linkedin: PropTypes.string,
  youtube: PropTypes.string,
  instagram: PropTypes.string,
  isMediaOpen: PropTypes.bool,
  socialMediaToggle: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onGoBack: PropTypes.func
};
ProfileForm.defaultProps = {};

export default ProfileForm;
