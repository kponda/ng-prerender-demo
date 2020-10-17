import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'model/article';
import { Category } from 'model/category';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, take  } from 'rxjs/operators';

@Component({
  selector: 'app-article-list-page',
  templateUrl: './article-list-page.component.html',
  styleUrls: ['./article-list-page.component.scss']
})
export class ArticleListPageComponent implements OnInit {
  articles$: Observable<Article[]>;
  category$: Observable<Category>;

  constructor(private db: AngularFirestore, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    const categoryCode = this.route.snapshot.params['categoryCode'];

    this.category$ = this.getCategoryByCode(categoryCode).pipe(
      take(1),
      map(category => {
        if (category) {
          this.articles$ = this.db.collection<Article>('articles', ref => ref.where('categoryId', '==', category.docId)).valueChanges({ idField: 'docId' });
        } else {
          this.router.navigate(['/not-found']);

        }
        return category;
      })
    );
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

