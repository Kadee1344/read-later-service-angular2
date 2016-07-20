import { Component } from '@angular/core';
import { ArticleListComponent } from './articles-list.component';

@Component({
  selector: 'my-articles',
  template: `
    <div class="row">
      <div class="col-md-5 col-lg-5 my-article-list">
        <my-articles-list></my-articles-list>
      </div>
      <div class="col-md-7 col-lg-7">
        Article Detail
      </div>
    </div>
`,
  directives: [ArticleListComponent],
  styles: ['.my-article-list{background-color: #fdeee6}']
})

export class ArticlesComponent {

}
