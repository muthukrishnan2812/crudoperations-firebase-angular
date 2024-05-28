import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, orderBy, query, setDoc, updateDoc } from '@angular/fire/firestore';
import { log } from 'console';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  name:string=''
  age:number=0
  phoneNumber:string=''

  constructor(private fire:Firestore) { }

  getData(){
    const itemCollection = collection(this.fire,'post')
    const itemQuery = query(itemCollection,orderBy('age','asc'))
    return collectionData(itemQuery,{idField:'id'})
  }

  addUser(user:{name:string,age:number,phoneNumber:string}){
    const userData = collection(this.fire,'post')
    //addDoc -> adding new data in firebase
    return addDoc(userData,user)
  }

  async setUser(postId:string){
    const userData = doc(this.fire,'post',postId)
    const user ={
      name:'balakrishna',
      age:43,
      phoneNumber:"8946021225"
    }
    try{
      await setDoc(userData,user)
    }
    catch(error){
      console.error('set user as error',error);
    }
  }

  async DeleteUser(postId:string){
    const userData = doc(this.fire,'post',postId);
    await deleteDoc(userData)
  }
  
  async UpdataUser(postId:any){
    const userData =doc(this.fire,'post',postId);
    await updateDoc(userData,{
      name:this.name,
      age:this.age,
      phoneNumber:this.phoneNumber
    })
  }
}
