import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, collectionGroup, deleteDoc, doc, docSnapshots, getDoc, getDocs, orderBy, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { log } from 'console';
import { Observable } from 'rxjs';
import { Storage, getDownloadURL, getStorage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { url } from 'inspector';
import { JsonPipe } from '@angular/common';
import { json } from 'stream/consumers';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  name: string = ''
  age: number = 0
  phoneNumber: string = ''
  imageUrl: string[] = []

  constructor(private fire: Firestore, private storage: Storage) { }

  getData() {
    const itemCollection = collection(this.fire, 'post')
    const itemQuery = query(itemCollection, orderBy('age', 'asc'))
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
    try {
      await setDoc(userData, user)
    }
    catch (error) {
      console.error('set user as error', error);
    }
  }

  async DeleteUser(postId: string) {
    const userData = doc(this.fire, 'post', postId);
    await deleteDoc(userData)
  }

  async UpdataUser(postId: any, user: { name: string, age: number, phoneNumber: string, imageUrl: string[] }) {
    const userData = doc(this.fire, 'post', postId);
    await updateDoc(userData, user)
  }
  async imageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log(file);
      // const storage = getStorage()
      const path = `post/${file.name}`
      const storageReference = ref(this.storage, path)
      const uploadTask = uploadBytesResumable(storageReference, file)
      await uploadTask
      const DownloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
      console.log(DownloadUrl);
      return [DownloadUrl]
    }
    return [];
  }
  getUser(postId: any) {
    //doc -> path reference for firebase database
    const userData = doc(this.fire, 'post', postId);
    return new Observable(observer => {
      //getDoc -> returns the doc data
      getDoc(userData).then(docSnapshots => {
        if (docSnapshots.exists()) {
          observer.next(docSnapshots.data())
        }
      })
    })
  }
  getApp() {
    const itemCollection = collection(this.fire, 'post');
    console.log(itemCollection);
    const posts = query(itemCollection, where("name", "in", ["Bala Esakki", "MuthuKrishnan", "Ram Babu", "abcd"]), where("age", "==", '26'))
    return collectionData(posts);
  }
}
