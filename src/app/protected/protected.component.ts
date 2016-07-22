import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { ArticlesComponent } from '../shared/articles/articles.component';
import { DataService } from '../shared/data.service';
import { Filter } from '../shared/filter.pipe';


@Component({
  template: `
    <form [formGroup]="myForm" (ngSubmit)="onSaveData()" class="form-horizontal">
      <div class="form-group">
        <label for="title" class="col-sm-2 control-label">Title</label>
        <div class="col-sm-10">
          <input [formControl]="myForm.find('title')" type="text" id="title" #title="ngForm" class="form-control">
        </div>
      </div>
      <div class="form-group">
        <label for="content" class="col-sm-2 control-label">Content</label>
         <div class="col-sm-10">
           <input [formControl]="myForm.find('content')" type="text" id="content" class="form-control">
         </div>
      </div>
      <div class="form-group">
        <label for="url" class="col-sm-2 control-label">Url</label>
        <div class="col-sm-10">
          <input [formControl]="myForm.find('url')" type="text" id="url" class="form-control">
        </div>
      </div>
     <button type="submit" [disabled]="!myForm.valid" class="btn btn-info">Add Article</button>
     <a (click)="onDeleteData()" class="btn btn-danger">Delete All Articles</a>
   </form>
   <h1>Filter</h1>
   <input type="text" [(ngModel)]="filt" class="form-control">
   <div class="row">
   <div class="col-md-4 col-lg-4 col-sm-12">  
     <ul class="without">
      <li *ngFor="let item of items | filter:filt" class="col-md-12 article">
      <a (click)="onDelete(item.id)" class="linkbut">x</a>
        <div class="row">
          <div class="col-md-11 title">{{item.title}}</div>
        </div>
        <div class="row">
          <div class="col-md-11 body">{{item.content | slice:0:100}} ...<a htef="#" style="cursor: pointer" (click)="articleMore(item.title, item.content, item.url)">More</a></div>
        </div>
        <hr/>
        <div class="row">
          <a href="{{item.url}}" class="col-md-12 url">{{item.url}}</a>
        </div>      
      </li>
     </ul>
   </div>
   <div class="col-md-8 col-sm-12 articles-detail" *ngIf="artSelect">
    <a (click)="onClose()" class="linkbut">x</a>
    <div class="title">{{articleTitle}}</div>
    <div class="body">{{articleContent}}</div>
    <hr/>
     <a class="url">{{articleUrl}}</a>
   </div>
   

`,
  directives: [ArticlesComponent, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
  providers: [DataService],
  pipes: [Filter],
  styles: [`.articles-detail{background-color: rgba(149, 214, 233, 0.48);; color: #3A3A3A; min-height: 20px; margin-top: 20px; border-radius: 5px;padding: 10px;}.linkbut{position:absolute; right: 10px; text-decoration: none; font-weight: bold; color: white; cursor: pointer}.linkbut:hover{color:black}.without{list-style-type: none} .article{ padding: 10px;min-height: 30px; border-radius: 5px;} .title{font-size: 14px; color: #2b81af; margin-bottom: 10px;} .body{font-size: 12px; color: #001f3f; margin-bottom: 5px;} .url{font-size: 10px; color: grey; cursor: pointer} .article{margin-top: 20px;background-color: lightgrey; margin-right: 5px;}`],
})
export class ProtectedComponent{
  myForm: FormGroup;
  items: any[] = [];
  artSelect = false;
  articleTitle: string = '';
  articleContent: string = '';
  articleUrl: string = '';

  constructor(private _fb: FormBuilder, private _dataService: DataService) {}

  onClose() {
    this.artSelect = false;
  }

  articleMore(title, content, url) {
    this.articleTitle = title;
    this.articleContent = content;
    this.articleUrl = url;
    this.artSelect = true;
  }

  onSaveData() {
    this._dataService.addData(this.myForm.value)
      .subscribe(
        () => this.onGetOwnData(),
        error => console.log(error)
      );
  }

  onGetOwnData() {
    this._dataService.getAllData()
      .subscribe(
        data => {
          const myArray = [];
          for (let key in data) {
            if (data[key].title != '') {
              data[key].id = key;
              myArray.push(data[key]);
            }
          }
          this.items = myArray;
        }
      );
  }

  onDeleteData() {
    this._dataService.deleteAllData()
      .subscribe(
        () => this.onGetOwnData(),
        error => console.error(error)
      );
  }

  onDelete(id) {
    this._dataService.deleteData(id)
      .subscribe(
        () => this.onGetOwnData(),
        error => console.error(error)
      );
  }

  ngOnInit():any {
    this.myForm = this._fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      url: ['', Validators.required]
    });
    this.onGetOwnData();
  }
}
