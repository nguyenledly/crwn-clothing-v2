import { createAction } from "../../utils/reducer/reducer.util";
import { COMMON_ACTION_TYPES } from "./common.types";

export const redirectPage = (url) => createAction(COMMON_ACTION_TYPES.REDIRECT_PAGE, url)