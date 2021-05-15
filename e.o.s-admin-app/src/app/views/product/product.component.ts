import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  dataBucket: any = {};
  categoryBucket: any = {};
  productForm: FormGroup;
  updateProductFormGroup: FormGroup;
  modalRef: BsModalRef;
  reference: AngularFireStorageReference;
  uploadTask: AngularFireUploadTask;
  uploadProgress: Observable<number>;

  constructor(private api: ApiService, private formBuilder: FormBuilder, private modalService: BsModalService,
    private uploadToFirebase: AngularFireStorage) {
    this.addProductForm();
    this.updateProductForm();
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
  }

  /**
   * "productName": "Some Product Name",
    "categoryID": 1,
    "price": 35.00,
    "productImage": "www.someurl.com",
    "description": "Some nice product",
    "stock": 25
   */
  addProductForm() {
    console.log('Creating Product Form');
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      categoryID: ['', Validators.required],
      price: ['', Validators.required],
      productImage: ['', Validators.required],
      file: ['', Validators.required],
      description: ['', Validators.required],
      stock: ['', Validators.required],
    });
  }

  getAllProducts() {
    console.log('Getting all products.....');
    this.api.getAllProducts().subscribe(response => {
      console.log(response);
      this.dataBucket = response.message;
      console.log(this.dataBucket);
    });
  }

  getAllCategories() {
    this.api.getAllCategories().subscribe(response => {
      // console.log(response);
      this.categoryBucket = response.message;
      console.log(this.categoryBucket);
    });
  }

  openAddProductModal(template: TemplateRef<any>) {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      categoryID: ['', Validators.required],
      price: ['', Validators.required],
      productImage: ['', Validators.required],
      file: ['', Validators.required],
      description: ['', Validators.required],
      stock: ['', Validators.required],
    });
    this.modalRef = this.modalService.show(template);
  }

  openProductDetailsModal(d, template: TemplateRef<any>) {
    this.updateProductFormGroup = this.formBuilder.group({
      id: [d.id],
      productName: [d.productName],
      categoryID: [d.categoryID],
      price: [d.price],
      file: [d.productImage],
      productImage: ['', Validators.required],
      description: [d.description],
      stock: [d.stock]
    });
    this.modalRef = this.modalService.show(template);
  }

  uploadImage(event) {
    console.log('Uploading file...');
    const file = event.target.files[0];
    console.log('File name: %s', file.name, '\nFile type: %s', file.type);

    switch (file.type) {
      case 'image/jpeg':
        console.log('ok');
        this.uploadHandler(file);
        console.log('Uploading file');
        break;

        case 'image/png':
        console.log('ok');
        this.uploadHandler(file);
        console.log('Uploading file');
        break;

      default:
        alert('Cannot file at this moment');
        break;
    }
  }

  // uploadHandler
  uploadHandler(file) {
    const id = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
    this.reference = this.uploadToFirebase.ref('uploads/' + id); // storage ref
    this.uploadTask = this.reference.put(file);
    this.uploadProgress = this.uploadTask.percentageChanges();
    this.uploadTask.snapshotChanges().pipe(
      finalize(() => {
        this.reference.getDownloadURL().subscribe(url => {
          console.log(url);
          this.productForm.patchValue({
            productImage: url
          });
        });
      })).subscribe();
  }

  addProduct() {
    console.log(this.productForm.value.categoryID);
    console.log(this.productForm.value);
    this.api.addProduct(this.productForm.value).subscribe(response => {
      this.dataBucket = response;
      if (response.status === 201) {
        alert('Product Added');
        console.log(response);
        this.productForm.reset();
        this.ngOnInit();
        this.modalRef.hide();
      } else {
        alert('Cannot Add Product Now');
        // this.ngOnInit();
        this.modalRef.hide();
        console.log(response);
      }
    });
  }

  updateProductForm() {
    console.log('Creating Product Form');
    this.updateProductFormGroup = this.formBuilder.group({
      id: ['', Validators.required],
      productName: ['', Validators.required],
      categoryID: ['', Validators.required],
      price: ['', Validators.required],
      productImage: ['', Validators.required],
      file: ['', Validators.required],
      description: ['', Validators.required],
      stock: ['', Validators.required],
    });
  }

  updateUploadImage(event) {
    console.log('Uploading file...');
    const file = event.target.files[0];
    console.log('File name: %s', file.name, '\nFile type: %s', file.type);

    switch (file.type) {
      case 'image/jpeg':
        console.log('ok');
        this.updateUploadHandler(file);
        console.log('Uploading file');
        break;

        case 'image/png':
        console.log('ok');
        this.updateUploadHandler(file);
        console.log('Uploading file');
        break;

      default:
        alert('Cannot file at this moment');
        break;
    }
  }

  // uploadHandler
  updateUploadHandler(file) {
    const id = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
    this.reference = this.uploadToFirebase.ref('uploads/' + id); // storage ref
    this.uploadTask = this.reference.put(file);
    this.uploadProgress = this.uploadTask.percentageChanges();
    this.uploadTask.snapshotChanges().pipe(
      finalize(() => {
        this.reference.getDownloadURL().subscribe(url => {
          console.log(url);
          this.updateProductFormGroup.patchValue({
            productImage: url
          });
        });
      })).subscribe();
  }

  editProduct() {
    console.log(this.updateProductFormGroup.value);
    this.api.editProduct(this.updateProductFormGroup.value).subscribe(response => {
      this.dataBucket = response;
      if (response.status === 200) {
        alert('Product Updated');
        console.log(response);
        this.updateProductFormGroup.reset();
        this.ngOnInit();
        this.modalRef.hide();
      } else {
        alert('Cannot Update Product Now');
        this.modalRef.hide();
        console.log(response);
      }
    })
  }

  // function to open product image
  openImage() {
    console.log(this.updateProductFormGroup.value.file);
    window.open(this.updateProductFormGroup.value.file, '_blank');
  }

  //open delete modal 
  openDeleteProductModal(d, template: TemplateRef<any>){
    this.updateProductFormGroup = this.formBuilder.group({
      id: [d.id],
      productName: [d.productName],
      categoryID: [d.categoryID],
      price: [d.price],
      file: [d.productImage],
      productImage: ['', Validators.required],
      description: [d.description],
      stock: [d.stock]
    });
    this.modalRef = this.modalService.show(template);
    console.log(this.updateProductFormGroup.value);
  }

  // function to delete product from admin app
  deleteProduct() {
    console.log(this.updateProductFormGroup.value.id);
    this.api.deleteProduct(this.updateProductFormGroup.value.id).subscribe(response => {
      this.dataBucket = response;
      if (response.status === 200) {
        alert('Product Successfully Deleted');
        console.log(response);
        this.updateProductFormGroup.reset();
        this.ngOnInit();
        this.modalRef.hide();
      } else {
        alert('Cannot Delete Product Now');
        this.modalRef.hide();
        console.log(response)
      }
    })
  }



}
