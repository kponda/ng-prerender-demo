import { Category } from './category';
import { FbDoc } from './fb-doc';
export class Article extends FbDoc {
  title: string;
  content: string;
  categoryId: string;
  category?: Category;
}