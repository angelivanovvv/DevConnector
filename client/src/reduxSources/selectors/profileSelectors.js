import { createSelector } from "reselect";

export const profile = (state) => state.get("profile");

export const getProfile = createSelector(profile, (profile) =>
  profile.get("profile")
);

export const getProfiles = createSelector(profile, (profile) =>
  profile.get("profiles")
);

export const getExperience = createSelector(profile, (profile) =>
  profile.getIn(["profile", "experience"])
);

export const getEducation = createSelector(profile, (profile) =>
  profile.getIn(["profile", "education"])
);

export const getRepos = createSelector(profile, (profile) =>
  profile.get("repos")
);

export const getIsLoading = createSelector(profile, (profile) =>
  profile.get("loading")
);

export const getIsDeleteProfileLoading = createSelector(profile, (profile) =>
  profile.getIn(["delete", "loading"])
);
