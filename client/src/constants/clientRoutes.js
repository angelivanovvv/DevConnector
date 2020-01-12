import { push } from "connected-react-router/immutable";

export const PATHS = Object.freeze({
  LANDING: "/",

  REGISTER: "/register",
  LOGIN: "/login",

  DASHBOARD: "/dashboard",

  PROFILES: "/profiles",
  PROFILE: "/profile",

  CREATE_PROFILE: "/create-profile",
  EDIT_PROFILE: "/edit-profile",

  ADD_EXPERIENCE: "/add-experience",
  ADD_EDUCATION: "/add-education"
});

export const ROUTES = Object.freeze({
  LANDING: () => `${PATHS.LANDING}`,

  REGISTER: () => `${PATHS.REGISTER}`,
  LOGIN: () => `${PATHS.LOGIN}`,

  DASHBOARD: () => `${PATHS.DASHBOARD}`,

  PROFILES: () => `${PATHS.PROFILES}`,
  PROFILE: id => `${PATHS.PROFILE}/${id}`,

  CREATE_PROFILE: () => `${PATHS.CREATE_PROFILE}`,
  EDIT_PROFILE: () => `${PATHS.EDIT_PROFILE}`,

  ADD_EXPERIENCE: () => `${PATHS.ADD_EXPERIENCE}`,
  ADD_EDUCATION: () => `${PATHS.ADD_EDUCATION}`
});

export const ROUTES_ACTIONS = Object.freeze({
  toRegister: () => push(ROUTES.REGISTER()),
  toLogin: () => push(ROUTES.LOGIN()),

  toDashboard: () => push(ROUTES.DASHBOARD()),

  toProfile: id => push(ROUTES.PROFILE(id)),

  toCreateProfile: () => push(ROUTES.CREATE_PROFILE()),
  toEditProfile: () => push(ROUTES.EDIT_PROFILE()),

  toAddExperience: () => push(ROUTES.ADD_EXPERIENCE()),
  toAddEducation: () => push(ROUTES.ADD_EDUCATION()),

  toLogout: () => push(ROUTES.LOGIN())
});
