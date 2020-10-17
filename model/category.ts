import { FbDoc } from "./fb-doc";

export class Category extends FbDoc {
  docId?: string;
  code: string;
  name: string;
}