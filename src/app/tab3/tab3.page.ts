import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController, AlertController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  userEmail: string;

  constructor(public afAuth: AngularFireAuth, 
              public navCtrl: NavController,
              public alert: AlertController,
              private authService: AuthenticateService) {}


  ngOnInit() {

    this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.userEmail = res.email;
      } else {
        this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log('err', err);
    })
            
  }
   
  logout() {
    return new Promise((resolve, reject) => {
      if (this.afAuth.currentUser) {
        this.showAlert('Sucesso!', 'Deslogado com sucesso, ate mais!')
        this.afAuth.signOut()
        .then(() => {
          console.log('Logout');
          this.navCtrl.navigateBack('');
          resolve();
        }).catch((error) => {
          reject();
        })
      }
    })
  }

  async showAlert(header: string, message: string) {
    const alert = this.alert.create({
      header,
      message,
      buttons: ['Ok']
    })
    
    await (await alert).present()
  }
}
