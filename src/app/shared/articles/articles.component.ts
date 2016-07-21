import { Component } from '@angular/core';
import { ArticleListComponent } from './articles-list.component';

@Component({
  selector: 'my-articles',
  template: `
    <div class="col-md-6 col-lg-6 my-article-list">
    <my-articles-list></my-articles-list>
    </div>
    <div class="col-md-6 col-lg-6">
    </div>
`,
  directives: [ArticleListComponent],
  styles: ['.my-article-list{background-color: #fdeee6}']
})

export class ArticlesComponent {

}
