import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticlesComponent } from './articles/articles.component';
import { LoginComponent } from './login/login.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    LoginComponent,
    ArticleEditComponent,
    CategoriesComponent,
    CategoryEditComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
