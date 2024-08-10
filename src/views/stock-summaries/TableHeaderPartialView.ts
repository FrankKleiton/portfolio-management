import { PartialView } from "../PartialView";

export class TableHeaderPartialView extends PartialView {
  constructor(private columnsTitles: string[] = []) {
    super();
  }

  generatePartialView(): string {
    let result = "";

    for (const value of this.columnsTitles) {
      const template = this.template("th");

      template.replace("value", value);

      result += template.getContent();
    }

    return result;
  }
}
