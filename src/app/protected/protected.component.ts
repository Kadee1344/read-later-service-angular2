import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { ArticlesComponent } from '../shared/articles/articles.component';
import { DataService } from '../shared/data.service';

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
     <button type="submit" [disabled]="!myForm.valid" class="btn btn-info">Add Data</button>
     <button (click)="onGetOwnData()" class="btn btn-warning">Get Data</button>
     <button (click)="onDeleteData()" class="btn btn-danger">Delete Data</button>
   </form>
   <ul class="row without">
    <li *ngFor="let item of items" class="col-md-3 article">
      <div class="row">
        <div class="col-md-10 title">{{item.title}}</div>
      </div>
      <div class="row">
        <div class="col-md-10 body">{{item.content}}</div>
      </div>
      <div class="row">
        <div class="col-md-10 url">{{item.url}}</div>
      </div>      
    </li>
   </ul>
`,
  directives: [ArticlesComponent, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
  providers: [DataService],
  styles: ['.without{list-style-type: none} .article{min-height: 100px;} .title{font-size: 18px; color: #2b81af} .body{font-size: 15px; color: #001f3f} .url{font-size: 10px; color: grey;} .article{margin-top: 20px;background-color: lightgrey; margin-right: 5px;}'],
})
export class ProtectedComponent{
  myForm: FormGroup;
  dataset: any;
  items: any[] = [];


  constructor(private _fb: FormBuilder, private _dataService: DataService) {}

  onSaveData() {
    this._dataService.addData(this.myForm.value)
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      );
  }

  onGetData() {
    this._dataService.getAllData()
      .subscribe(
        data => this.dataset = data,
        error => console.error(error)
      );
  }

  onGetOwnData() {
    this._dataService.getAllData()
      .subscribe(
        data => {
          const myArray = [];
          for (let key in data) {
            if (data[key].title != '') {
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
        data => this.dataset = [],
        error => console.error(error)
      );
  }

  ngOnInit():any {
    this.myForm = this._fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      url: ['', Validators.required]
    });
  }
}
