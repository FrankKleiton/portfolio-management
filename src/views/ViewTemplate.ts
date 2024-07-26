import { readFileSync } from "node:fs";
export class ViewTemplate {
  constructor(private content: string) {}

  static create(path: string) {
    const content = readFileSync(path, {
      encoding: "utf-8",
    });

    return new ViewTemplate(content);
  }

  replace(key: string, value: string) {
    this.content = this.content.replace(`{{${key}}}`, value);
  }

  getContent() {
    return this.content;
  }
}
