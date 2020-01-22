import { createSelector } from "reselect";

export const modals = state => state.get("modal");

export const getIsModalOpen = createSelector(modals, modals =>
  modals.get("isOpen")
);
