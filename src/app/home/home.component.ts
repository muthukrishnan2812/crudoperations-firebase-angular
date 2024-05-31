import { Component, Inject, NgModule, NgModuleRef, OnDestroy, OnInit, inject } from '@angular/core';
import { DataService } from '../service/data.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  name: any
  age: any
  phoneNumber: any
  posts: any
  id: any
  updateName: string = ''
  updateAge: number = 0
  updatePhoneNumber: string = ''
  imageUrl: string[] = []
  image: any
  userPostId:string=''
  takeDestroy = inject(DestroyRef)
  constructor(private service: DataService) { }

  ngOnInit(): void {
    this.service.getData().pipe(takeUntilDestroyed(this.takeDestroy)).subscribe((res: any) => {
      this.posts = res
      console.log(this.posts);
    })
    this.service.getUser("6YRsb7kLa6Fn4Q1B0ewA").subscribe((res:any)=>{
      console.log(res);
    })
  }
  ngOnDestroy(): void {
    this.takeDestroy.onDestroy
  }
  async onSave() {
    if (this.name.trim() !== '') {
      const user = {
        name: this.name,
        age: this.age,
        phoneNumber: this.phoneNumber,
        imageUrl: this.imageUrl
      }
      await this.service.addUser(user)
      console.log('user added successfully');
      this.name = '';
      this.age = '';
      this.phoneNumber = '';
      this.imageUrl = [];
      (document.getElementById('fileInput') as HTMLInputElement).value = ''
    }
  }
  async defaultSave() {
    const user = {
      name: 'MuthuKrishnan',
      age: 25,
      phoneNumber: '8946021225',
      imageUrl: ['assets/profile-pic.png']
    }
    await this.service.addUser(user);
    alert('user added successfully');
    console.log('clicked Defaultsave btn');
  }

  onsetDoc(postId: any) {
    this.service.setUser(postId);
  }
  deletePost(postId: any) {
    this.service.DeleteUser(postId)
  }
  updatePost(postId: any) {
    this.service.name = this.updateName
    this.service.age = this.updateAge
    this.service.phoneNumber = this.updatePhoneNumber
    this.service.imageUrl=this.imageUrl
    // this.service.UpdataUser(postId);
    this.updateName = ''
    this.updateAge = 0
    this.updatePhoneNumber = ''
    this.imageUrl=[]
  }
  async uploadImage(event: any) {
    this.imageUrl = await this.service.imageUpload(event);
    console.log('img', this.imageUrl)
  }
}
