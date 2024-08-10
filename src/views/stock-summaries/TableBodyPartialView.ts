import { PartialView } from "../PartialView";

export class TableBodyPartialView extends PartialView {
  constructor(private lines: string[][]) {
    super();
  }

  generatePartialView(): string {
    let result = "";
    for (const line of this.lines) {
      const tr = this.template("tr");

      let columns = "";
      for (const column of line) {
        const td = this.template("td");

        td.replace("value", column);

        columns += td.getContent();
      }

      tr.replace("value", columns);

      result += tr.getContent();
    }

    return result;
  }
}
