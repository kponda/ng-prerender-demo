import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'model/article';
import { Category } from 'model/category';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {
  article$: Observable<Article>;

  constructor(private db: AngularFirestore, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const articleId = this.route.snapshot.params['articleId'];
    console.log('articleId: ' + articleId);
    this.article$ = this.db.doc<Article>(`articles/${articleId}`).valueChanges()
      .pipe(
        take(1),
        switchMap(article => {
          return combineLatest([of(article), this.db.doc<Category>(`categories/${article.categoryId}`).valueChanges()])
        }),
        map(([article, category]) => {
          article.category = category;
          return article;
        })
      )
  }

  getCategoryByCode(code: string) {
    return this.db.collection<Category>('categories', ref => ref.where('code', '==', code)).valueChanges({ idField: 'docId' })
      .pipe(
        map(categories => {
          if (categories && categories.length > 0) {
            return categories[0];
          }
          return null;
        })
      )
  }

}
