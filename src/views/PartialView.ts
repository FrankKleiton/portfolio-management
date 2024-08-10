import { ViewUtils } from "./ViewUtils";

export abstract class PartialView extends ViewUtils {
  abstract generatePartialView(): string;
}
