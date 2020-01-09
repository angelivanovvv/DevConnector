import { createSelector } from "reselect";

export const alerts = state => state.get("alerts");

export const getErrors = createSelector(alerts, alert => alert.get("errors"));
