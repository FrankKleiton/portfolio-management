import path from "node:path";

import { ViewTemplate } from "./ViewTemplate";
import { PartialView } from "./PartialView";

export class ViewUtils {
  protected partials: Map<string, PartialView> = new Map<string, PartialView>();

  template(name: string) {
    return ViewTemplate.create(
      path.join(__dirname, "..", "..", `public/${name}.html`)
    );
  }

  addPartialsTo(template: ViewTemplate) {
    for (const [key, value] of this.partials) {
      template.replace(key, value.generatePartialView());
    }
  }
}
