import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'model/article';
import { Category } from 'model/category';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {
  article$: Observable<Article>;

  constructor(private db: AngularFirestore, route: ActivatedRoute) {
    route.params.subscribe(params => {
      const articleId = params['articleId'];
      this.article$ = db.doc<Article>(`articles/${articleId}`).valueChanges()
      .pipe(
        switchMap(article => {
          return combineLatest([of(article), this.db.doc<Category>(`categories/${article.categoryId}`).valueChanges()])
        }),
        map(([article, category]) => {
          article.category = category;
          return article;
        })
      )
    });

  }

  ngOnInit(): void {
  }

  getCategoryByCode(code: string) {
    return this.db.collection<Category>('categories', ref =>  ref.where('code', '==', code)).valueChanges({ idField: 'docId' })
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
