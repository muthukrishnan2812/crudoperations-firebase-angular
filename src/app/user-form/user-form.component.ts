import { ChangeDetectorRef, Component, DestroyRef, OnDestroy, OnInit, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { DataService } from '../service/data.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit,OnDestroy {
  myForm : FormGroup
  imageUrl:string[]=[]
  progress:any
  posts:any
  takeDestroy = inject(DestroyRef)
  changeDetector = inject(ChangeDetectorRef)
  constructor(private service: DataService) {
    this.myForm = new FormGroup({
      name: new FormControl(''),
      age: new FormControl(''),
      phoneNumber: new FormControl('')
    })

  }

  ngOnInit(): void {
    //assign getData () -> posts
    this.service.getData().pipe(takeUntilDestroyed(this.takeDestroy)).subscribe((res:any)=>{
      this.posts = res;
      console.log(res);
    })

    this.service.progress.subscribe((res:any)=>{
      this.progress = res
      console.log('behaviorSubject value ->',this.progress);
      
      this.changeDetector.detectChanges();
    })
  }
  ngOnDestroy(): void {
    this.takeDestroy.onDestroy
  }
 async onSave(){
    if (this.myForm.valid) {
      const formData = this.myForm.value
      formData.imageUrl = this.imageUrl
      await this.service.addUser(formData)
      formData.reset()
      (document.getElementById('fileInput') as HTMLInputElement).value = '';
      this.progress=''
    }
  }
  async uploadImage(event:any){
    const image = await this.service.imageUpload(event);
    this.imageUrl = this.imageUrl.concat(image)
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
}
