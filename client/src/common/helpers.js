export const LocalStorage = Object.freeze({
  set: (name, value) => localStorage.setItem(name, value),
  get: name => localStorage.getItem(name),
  remove: name => localStorage.removeItem(name)
});

export const getProfileState = (self, isLoading, profile) => {
  self.setState({
    ...self.state,
    company: isLoading || !profile.get("company") ? "" : profile.get("company"),
    website: isLoading || !profile.get("website") ? "" : profile.get("website"),
    location:
      isLoading || !profile.get("location") ? "" : profile.get("location"),
    status: isLoading || !profile.get("status") ? "" : profile.get("status"),
    skills:
      isLoading || !profile.get("skills")
        ? ""
        : profile.get("skills").join(","),
    githubusername:
      isLoading || !profile.get("githubusername")
        ? ""
        : profile.get("githubusername"),
    bio: isLoading || !profile.get("bio") ? "" : profile.get("bio"),
    twitter:
      isLoading || !profile.getIn(["social", "twitter"])
        ? ""
        : profile.getIn(["social", "twitter"]),
    facebook:
      isLoading || !profile.getIn(["social", "facebook"])
        ? ""
        : profile.getIn(["social", "facebook"]),
    linkedin:
      isLoading || !profile.getIn(["social", "linkedin"])
        ? ""
        : profile.getIn(["social", "linkedin"]),
    youtube:
      isLoading || !profile.getIn(["social", "youtube"])
        ? ""
        : profile.getIn(["social", "youtube"]),
    instagram:
      isLoading || !profile.getIn(["social", "instagram"])
        ? ""
        : profile.getIn(["social", "instagram"])
  });
};
