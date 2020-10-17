import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Article } from 'model/article';
import { Category } from 'model/category';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  selectedArticle: Article;
  articles$: Observable<Article[]>;
  categories$: Observable<Category[]>;
  categoryFilter$: BehaviorSubject<string | null>;

  constructor(private db: AngularFirestore) {

    this.categoryFilter$ = new BehaviorSubject(null);

    this.categories$ = db.collection<Category>('categories').get().pipe(
      map(categories => categories.docs.map(category => {
        const data = category.data();
        return {
          docId: category.id,
          name: data.name,
          code: data.code
        };
      }))
    );

    this.articles$ = combineLatest(
      [this.categoryFilter$]
    ).pipe(
      switchMap(([categoryId]) =>
        db.collection<Article>('articles', ref => {
          let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
          console.log('categoryId', categoryId);
          if (categoryId) { query = query.where('categoryId', '==', categoryId) }
          return query;
        }).valueChanges({ idField: "docId" })
      ),
      switchMap(articles => {
        const categories = articles.map(article => this.getCategory(article.categoryId)
        .pipe(
          map(category => {
            article.category = category;
            return article;
          })
        ))
        return combineLatest(categories);
      }),
    )
  }

  ngOnInit(): void {
  }

  getCategory(categoryId: string) {
    return this.db.doc<Category>(`categories/${categoryId}`).get()
      .pipe(
        map(doc => {
          if (doc.exists) {
            return {
              docId: doc.id,
              name: doc.data().name
            } as Category
          } else {
            return null;
          }
        })
      )
  }

  onSelectArticle(article: Article) {
    this.selectedArticle = article;
  }
  // async getCategory(categoryId?: string) {
  //   if (!categoryId) {
  //     return null;
  //   }
  //   const doc = await this.db.doc<Category>(`categories/${categoryId}`).get().toPromise();
  //   if (doc.exists) {
  //     return {
  //       docId: doc.id,
  //       name: doc.data().name
  //     } as Category
  //   } else {
  //     return null;
  //   }
  // }

}
