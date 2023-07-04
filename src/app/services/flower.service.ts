import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { finalize, from, map, Observable, switchMap } from 'rxjs';
import Flower from '../intefaces/flower.interface';


@Injectable({
  providedIn: 'root'
})
export class FlowerService {

  constructor( private firestore: Firestore, private storage : Storage ) { }

  addPlant( flower : Flower) {
    const flowerRef = collection( this.firestore , 'Plants');
    return addDoc(flowerRef, flower);
  }

  uploadFlowerImages ( image : File, path : string ) : Observable <string> {
    const storageRef = ref(this.storage, path);
    const uploadTask = from(uploadBytes(storageRef, image));
    return uploadTask.pipe(switchMap((result) => getDownloadURL(result.ref)));
  }

  getFlower ( ) : Observable<Flower[]> {
    const flowerRef = collection( this.firestore, 'Plants');
    return collectionData( flowerRef ) as Observable<Flower[]>;
  }

}
