import { AngularFirestore } from '@angular/fire/firestore';

const ARTICLES = 'articles';

export class ArticleManager {
  constructor(private db: AngularFirestore) {}

  getArticles(categoryId?: string) {
    if (categoryId) {
      this.db.collection(ARTICLES, ref => ref.where('categoryId', '==', categoryId)).

    }
    this.db.collection('articles').get(

  }

}