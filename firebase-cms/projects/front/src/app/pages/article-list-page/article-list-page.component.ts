import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'model/article';
import { Category } from 'model/category';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-article-list-page',
  templateUrl: './article-list-page.component.html',
  styleUrls: ['./article-list-page.component.scss']
})
export class ArticleListPageComponent implements OnInit {
  articles$: Observable<Article[]>;
  category$: Observable<Category>;

  constructor(private db: AngularFirestore, private route: ActivatedRoute, private router: Router) {
    route.params.subscribe(params => {
      const categoryCode = params['categoryCode'];

      if (categoryCode) {
        this.category$ = this.getCategoryByCode(categoryCode);
        this.category$.pipe(take(1)).subscribe(category => {
          if (category) {
            this.articles$ = this.db.collection<Article>('articles', ref => ref.where('categoryId', '==', category.docId)).valueChanges({ idField: 'docId' })
          } else {
            this.router.navigate(['/not-found'], { skipLocationChange: true });
          }
        })
      }
    })
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

