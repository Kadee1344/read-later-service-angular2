import {Component} from '@angular/core';

@Component({
  selector: 'my-articles-list',
  template: `
    <div>In these area</div>
`,
  styles: ['ul {padding: 20px;} li {display: block; background-color: #f3b28b; color: floralwhite; font-size: 20px; min-height: 60px; margin-bottom: 10px; padding: 30px; border-radius: 5px; box-shadow: 5px 5px 5px rgba(0,0,0,0.5);} ' +
  '         li:hover {box-shadow: 2px 2px 2px rgba(0,0,0,0.5);}']
})

export class ArticleListComponent {
}
