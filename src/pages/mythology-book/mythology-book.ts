import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,ToastController} from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { DetailsPage } from '../details/details';


/**
 * Generated class for the MythologyBookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-mythology-book',
  templateUrl: 'mythology-book.html',
})
export class MythologyBookPage {
  mythologyBooks : any =[]
  data : any = []
  customerId : any

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public fb : FirebaseProvider,public loading : LoadingController,public toastCtrl:ToastController) { 
      this.fb.getMythologyBooks().subscribe(res => {
        this.PresentLoader();
        this.mythologyBooks = res
     })
   }
  
   PresentLoader()
   {
     let loading = this.loading.create({
       content: 'Please Wait...',
       duration: 1000
     })
     loading.present()
   }
   wishList(data){
     console.log("KEY",data)
     var counter = 0 ;
     this.fb.getAllWishListData().subscribe(res =>{
       
       for(let i=0 ; i < res.length ; i++){
         if(res[i].name === data.name){
          counter = 1
         }
  
       }
      })
       if(counter > 0){
         let toast = this.toastCtrl.create({
           message : 'Book alredy added to wishlist!',
           duration : 3000,
           position: 'bottom'
         });
         toast.present();
       }
       else{
         let toast = this.toastCtrl.create({
           message: 'Added to wishList',
           duration: 3000,
           position : 'bottom'
         });
         toast.present();
         this.customerId = localStorage.getItem('UserKey')
         this.data = {
           image : data.image,
           name : data.name,
           price : data.price,
           customerId : this.customerId
         }
         console.log("DATA",this.data)
         this.fb.addWishListData(this.data)
        
     
         // this.fb.addWishListData(data)
       }
     
         
   }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MythologyBookPage');
  }

  openModel(i) {
    console.log("I", i)
    this.customerId = localStorage.getItem('UserKey')
    this.data = {
      image: i.image,
      name: i.name,
      price: i.price,
      customerId: this.customerId
    }
    this.navCtrl.push(DetailsPage, { data: this.data })
  }
}
