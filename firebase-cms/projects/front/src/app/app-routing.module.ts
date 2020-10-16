import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleListPageComponent } from './pages/article-list-page/article-list-page.component';
import { ArticlePageComponent } from './pages/article-page/article-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { TopPageComponent } from './pages/top-page/top-page.component';

const routes: Routes = [
  { path: '', component: TopPageComponent },
  { path: ':categoryCode', component: ArticleListPageComponent },
  { path: ':categoryCode/:articleId', component: ArticlePageComponent },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
