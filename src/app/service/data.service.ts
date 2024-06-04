import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, collectionGroup, deleteDoc, doc, docSnapshots, getDoc,  getDocs, orderBy, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage, getDownloadURL, getStorage, ref, uploadBytesResumable, uploadString, uploadBytes, listAll } from '@angular/fire/storage';
import { user } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  name: string = ''
  age: number = 0
  phoneNumber: string = ''
  imageUrl: string[] = []
 
  command: string = ''
  progressValue=new BehaviorSubject<number>(0)
  progress = this.progressValue.asObservable()
  constructor(private fire: Firestore, private storage: Storage) { }

  getData() {
    const itemCollection = collection(this.fire, 'post')
    const itemQuery = query(itemCollection, orderBy('name', 'asc'), orderBy('age', 'asc'))
    return collectionData(itemQuery, { idField: 'id' })
  }

  async addUser(user: { name: string, age: number, phoneNumber: string, imageUrl: string[] }) {
    const userData = collection(this.fire, 'post')
    //addDoc -> adding new data in firebase
    await addDoc(userData, user)
  }

  //set user overwrite the existing document..
  async setUser(postId: string) {
    const userData = doc(this.fire, 'post', postId)
    const user = {
      name: 'balakrishna',
      age: 43,
      phoneNumber: "8946021225",
      imageUrl: ["https://firebasestorage.googleapis.com/v0/b/post-e4123.appspot.com/o/post%2Fprofile.png?alt=media&token=71af6874-cac4-4d2c-ae21-a025b0dba799"]
    }
    await setDoc(userData, user)
  }

  async DeleteUser(postId: string) {
    const userData = doc(this.fire, 'post', postId);
    await deleteDoc(userData)
  }

  async UpdataUser(postId: any, user: { name: string, age: number, phoneNumber: string, imageUrl: string[] }) {
    const userData = doc(this.fire, 'post', postId);
    await updateDoc(userData, user)
  }
  updateDoc(postId: string) {
    const userData = doc(this.fire, 'post', postId)
    updateDoc(userData, {
      notes: this.command
    })
  }

  async imageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log(file);
      // const storage = getStorage()
      const path = `post/${file.name}`
      const storageReference = ref(this.storage, path)
      const uploadTask = uploadBytesResumable(storageReference, file)
      console.log(uploadTask);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          this.progressValue.next(progress)
        }
      )
      await uploadTask.then(() => { alert('file uploaded succesfully') })
      const DownloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
      console.log(DownloadUrl);
      return [DownloadUrl]
    }
    return [];
  }

  //using where to get data in firestore collection
  getApp() {
    const itemCollection = collection(this.fire, 'post');
    console.log(itemCollection);
    const posts = query(itemCollection, where("name", "in", ["Bala Esakki", "MuthuKrishnan", "Ram Babu", "abcd"]), where("age", "==", '24'))
    return collectionData(posts);
  }

  //list from fireStorage
  getImageStorage() {
    const listRef = ref(this.storage, 'post');
    listAll(listRef).then((res: any) => {
      console.log(res);
      res.items.forEach((element: any, index: any) => {
        console.log('index ->', index + 'items', element);
      })
    })
  }

  //getDoc -> retreive from  documents from a collection...
  async ReadData(postId:string) {
    const userData =await doc(this.fire,'post',postId);
    const getdocs = await getDoc(userData)
    if(getdocs.exists()){
      console.log(getdocs.id,getdocs.data());
    }
  }
}
