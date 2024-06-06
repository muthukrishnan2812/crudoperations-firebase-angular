
import { ChangeDetectorRef, Component, Inject, NgModule, NgModuleRef, OnDestroy, OnInit, inject } from '@angular/core';
import { DataService } from '../service/data.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { user } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';
import { Observable, from, take } from 'rxjs';


@Component({
  selector: 'app-form-control',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './form-control.component.html',
  styleUrl: './form-control.component.scss'
})
export class FormControlComponent implements OnInit, OnDestroy {
  posts: any
  myForm: FormGroup
  updateFrom: FormGroup
  imageUrl: string[] = []
  isUpdateMode: boolean = false;
  postId: string | null = null;
  command: string = ''
  progress: any
  changeDectector = inject(ChangeDetectorRef)
  takeDestroy = inject(DestroyRef)
  constructor(private service: DataService) {
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
    this.service.getData().pipe(takeUntilDestroyed(this.takeDestroy)).subscribe((res: any) => {
      this.posts = res;
      this.posts.filter((a: any) => { //getting data to filter age is less then 26....
        if (a.age <= 26) {
          const age = a.age
          console.log(age);
        }
      })
      console.log(this.posts);
    })

    //getApp -> getting data using where condition.....
    this.service.getApp().pipe(takeUntilDestroyed(this.takeDestroy)).subscribe((res: any) => {
      console.log(res);
    })

    //getDoc -> getting single doc from postId
    this.service.ReadData("HAnEjn8rdmmVBYxqvkI2");

    //progressbar -> live update for image storing in cloud storage....
    this.service.progress.subscribe((res: any) => {
      console.log('value of behaviourSubject ->',res);
      this.progress = res
      this.changeDectector.detectChanges(); 
    })
   
  }
  ngOnDestroy(): void {
    this.takeDestroy.onDestroy
  }
  //getChangeDection -> ngClass for live update change on progressbar
  getChangeDection() {
    if (this.progress < 25) {
      return 'progress-bar-low';
    }
    else if (this.progress < 75) {
      return 'progress-bar-medium'
    }
    else {
      return 'progress-bar-high'
    }
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
      this.progress = '';
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
  updatePost() {
    if (this.updateFrom.valid && this.postId) {
      const formData = this.updateFrom.value
      formData.imageUrl = this.imageUrl
      this.service.UpdataUser(this.postId, formData)
      console.log('post updated succesfully');
    }
  }
  updatenewData(postId: any) {
    this.service.command = this.command
    this.service.updateDoc(postId)
  }
  canexit(){
    if(this.myForm){
      console.log(this.myForm);
      
      return confirm('Are You sure to close the form-component ')
    }
    else{
      return true;
    }
  }
}
