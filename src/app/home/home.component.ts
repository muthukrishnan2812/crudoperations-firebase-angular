import { Component, Inject, NgModule, NgModuleRef, OnDestroy, OnInit, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { DataService } from '../service/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
  takeDestroy = inject(DestroyRef)
  constructor(private service: DataService) { }

  ngOnInit(): void {
    this.service.getData().pipe(takeUntilDestroyed(this.takeDestroy)).subscribe((res: any) => {
      this.posts = res
      console.log(this.posts);
    })
  }
  ngOnDestroy(): void {
    this.takeDestroy.onDestroy
  }
  async onSave() {
    if (this.name.trim() && this.age !== null && this.phoneNumber.trim()) {
      const user = {
        name: this.name,
        age: this.age,
        phoneNumber: this.phoneNumber
      }
      await this.service.addUser(user)
      console.log('user added successfully');
      this.name = '',
        this.age = null,
        this.phoneNumber = ''
    }
  }
  async defaultSave() {
    const user = {
      name: 'MuthuKrishnan',
      age: 25,
      phoneNumber: '8946021225'
    }
    await this.service.addUser(user);
    alert('user added successfully');
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
    this.service.UpdataUser(postId);
    this.updateName = ''
    this.updateAge = 0
    this.updatePhoneNumber = ''
  }
}
