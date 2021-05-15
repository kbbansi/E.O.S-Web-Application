import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ApiService} from '../../../services/api.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  dataBucket: any = {};
  categoryBucket: any = {};
  categoryForm: any = {};
  modalRef: BsModalRef;
  categoryName: any;
  description: any;

  constructor(private api: ApiService, private formBuilder: FormBuilder,
              private modalService: BsModalService) {
    this.addCategoryForm();
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  addCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  getAllCategories() {
    this.api.getAllCategories().subscribe(response => {
      // console.log(response);
      this.categoryBucket = response.message;
      console.log(this.categoryBucket);
    });
  }

  openAddCategoryModal(template: TemplateRef<any>) {
    this.categoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.modalRef = this.modalService.show(template);
  }

  addCategory() {
    console.log(this.categoryForm.value);
    this.api.addCategory(this.categoryForm.value).subscribe(response => {
      console.log(response);
      if (response.status === 201) {
        alert('Category Added');
        console.log(response.status);
        this.categoryForm.reset();
        this.ngOnInit();
        this.modalRef.hide();
      } else {
        alert('Cannot Add Category Now');
        this.modalRef.hide();
        console.log(response);
      }
    });
  }

  getCategoryInfo(data: any) {
    console.log(data);
    this.categoryName = data.categoryName;
    this.description = data.description;

    console.log(this.categoryName);
    console.log(this.description);
  }

}
