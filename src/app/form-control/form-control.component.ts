
import { Component, Inject, NgModule, NgModuleRef, OnDestroy, OnInit, inject } from '@angular/core';
import { DataService } from '../service/data.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { user } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-form-control',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './form-control.component.html',
  styleUrl: './form-control.component.scss'
})
export class FormControlComponent implements OnInit {
  posts: any
  myForm: FormGroup
  updateFrom: FormGroup
  imageUrl: string[] = []
  isUpdateMode: boolean = false;
  postId: string | null = null;
  constructor(private service: DataService, private router: RouterModule) {
    this.myForm = new FormGroup({
      name: new FormControl(''),
      age: new FormControl(''),
      phoneNumber: new FormControl('')
    })
    this.updateFrom = new FormGroup({
      name: new FormControl(''),
      age: new FormControl(''),
      phoneNumber: new FormControl('')
    })
    console.log(this.myForm);
  }
  ngOnInit(): void {
    this.service.getData().subscribe((res: any) => {
      this.posts = res
      console.log(this.posts);
    })
    this.service.getApp().subscribe((res:any)=>{
      console.log(res);
    })
  }
  async onSave() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
      const formData = this.myForm.value
      formData.imageUrl = this.imageUrl
      await this.service.addUser(formData);
      console.log('user added successfully');
      this.myForm.reset();
      (document.getElementById('fileInput') as HTMLInputElement).value = '';
    }
  }
  defaultSave() {
    const formData = this.myForm.value
    formData.name = 'muthukrishnan',
      formData.age = 26,
      formData.phoneNumber = '8946021225'
    formData.imageUrl = ["assets/profile-pic.png"]
    this.service.addUser(formData)
  }
  async uploadImage(event: any) {
    try {
      const image = await this.service.imageUpload(event);
      console.log(image);
      this.imageUrl = this.imageUrl.concat(image)
      console.log(this.imageUrl);
    }
    catch (error) {
      console.error('image upload as some problem', error);
    }
  }
  deletePost(postId: any) {
    this.service.DeleteUser(postId)
  }
  onsetDoc(postId: any) {
    this.service.setUser(postId);
  }
  setUpdatePost(postId: any) {
    this.postId = postId
    const post = this.posts.find((p: any) => p.id == postId)
    if (post) {
      this.updateFrom.patchValue({
        name: post.name,
        age: post.age,
        phoneNumber: post.phoneNumber
      })
      this.imageUrl = post.imageUrl || []
    }
  }
   updatePost(){
    if(this.updateFrom.valid && this.postId){
      const formData = this.updateFrom.value
      formData.imageUrl=this.imageUrl
      this.service.UpdataUser(this.postId,formData)
      console.log('post updated succesfully');
    }
  }
}
