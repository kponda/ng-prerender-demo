import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Category } from 'model/category';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-top-page',
  templateUrl: './top-page.component.html',
  styleUrls: ['./top-page.component.scss']
})
export class TopPageComponent implements OnInit {
  categories$: Observable<Category[]>;

  constructor(private db: AngularFirestore) {
    this.categories$ = db.collection<Category>('categories').valueChanges({ idField: 'docId'}).pipe(take(1));
  }

  ngOnInit(): void {
  }

}
