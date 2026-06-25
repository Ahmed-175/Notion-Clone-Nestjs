import { SetMetadata } from "@nestjs/common";

export const CAN_EDIT_NOTE_KEY = "canEditNote";

export const CanEditNode = () => {
  SetMetadata(CAN_EDIT_NOTE_KEY, true);
};
