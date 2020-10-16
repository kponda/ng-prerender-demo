import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { Article } from 'model/article';
import { Category } from 'model/category';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss']
})
export class ArticleEditComponent implements OnInit, OnChanges {
  categories$: Observable<Category[]>;
  title = new FormControl('')
  content = new FormControl('');
  categoryId = new FormControl('');
  saving = false;

  @Input() inputValues?: Article;


  constructor(private db: AngularFirestore) {
    this.categories$ = db.collection<Category>('categories').valueChanges({idField: 'docId'});
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    console.log(this.inputValues);
    if (this.inputValues) {
      this.title.setValue(this.inputValues.title);
      this.content.setValue(this.inputValues.content);
      this.categoryId.setValue(this.inputValues.category?.docId);
    } else {
      this.clearFormValue();
    }
  }


  async saveArticle() {
    this.saving = true;
    const values = {
      title: this.title.value,
      content: this.content.value,
      categoryId: this.categoryId.value,
    }
    try {
      if (this.inputValues?.docId) {
        await this.db.doc(`articles/${this.inputValues.docId}`).update(values);
      } else {
        await this.db.collection('articles').add(values);
      }
      this.clearFormValue();
    } catch(e) {
      alert(e);
    } finally {
      this.saving = false;
    }
  }

  clearFormValue() {
    this.title.reset();
    this.content.reset();
    this.categoryId.reset();
    this.inputValues = null;
  }
}
