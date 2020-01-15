import React from "react";
import { List } from "immutable";
import PropTypes from "prop-types";

import Card from "../../Card";

const Repos = ({ repos }) => (
  <Card className="profile-github p-2">
    <h2 className="text-primary my-1">
      <i className="fab fa-github"></i> Github Repos
    </h2>
    {repos.isEmpty()
      ? "No repositories"
      : repos.map((repo, index) => (
          <div key={index} className="repo bg-white box-shadow p-1 my-1">
            <div>
              <h4>
                <a href={repo.get("html_url")} target="_blank">
                  {repo.get("name")}
                </a>
              </h4>
              <p>{repo.get("description")}</p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary box-shadow">
                  Stars: {repo.get("stargazers_count")}
                </li>
                <li className="badge badge-dark box-shadow">
                  Watchers: {repo.get("watchers_count")}
                </li>
                <li className="badge box-shadow">
                  Forks: {repo.get("forks_count")}
                </li>
              </ul>
            </div>
          </div>
        ))}
  </Card>
);

Repos.propTypes = {
  repos: PropTypes.instanceOf(List).isRequired
};

export default Repos;
