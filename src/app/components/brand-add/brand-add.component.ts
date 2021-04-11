import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAddForm:FormGroup;
  constructor(private brand:BrandService, private toastrService:ToastrService ,private formBuilder:FormBuilder) { }


  ngOnInit(): void {
    this.createBrandAddForm();
  }

  createBrandAddForm(){
    this.brandAddForm = this.formBuilder.group({ brandName:["", Validators.required] })
 }

  addBrand(){
    if(this.brandAddForm.valid){
      let brandModel = Object.assign({},this.brandAddForm.value)
      this.brand.addBrand(brandModel).subscribe(data =>{
        this.toastrService.success(data.message, "Başarılı")
     })
    }
    else{
      this.toastrService.error("Hatalı bilgiler","Dikkat")
    }
  }

  update() {
    if (this.brandAddForm.valid) {
      let brandModel = Object.assign({}, this.brandAddForm.value);
      this.brand.update(brandModel).subscribe(
        (response) => {this.toastrService.success(response.message, 'Başarılı');},
        (responseError) => {
          if (responseError.error.ValidationErrors.length > 0) {
            for (let i = 0; i < responseError.error.ValidationErrors.length; i++ ) {
              this.toastrService.error( responseError.error.ValidationErrors[i].ErrorMessage,'Doğrulama hatası' );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }
}
