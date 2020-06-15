import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController} from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    username: string =""
    password: string =""

    constructor(public afAuth: AngularFireAuth,
                public router: Router,
                public navCtrl: NavController,
                public alert: AlertController) { }

    ngOnInit() {
    }

    async login() {
      const { username, password} = this
      try {
          const res = await this.afAuth.signInWithEmailAndPassword(username, password)
          this.router.navigate(['/tabs'])
      } catch(err) {
        console.dir(err)
        if(err.code === "auth/user-not-found") {
          this.showAlert('Erro!', "Usuario nao encontrado")
          console.log("User not found")
        }
        if(err.code === "auth/invalid-email") {
          this.showAlert('Erro!', "Email errado / nao registrado")
        }

        if(err.code === "auth/wrong-password") {
          this.showAlert('Erro!', "Senha errada / nao existente")
        }
      }
    }

    async showAlert(header: string, message: string) {
      const alert = this.alert.create({
        header,
        message,
        buttons: ['Ok']
      })
  
      await (await alert).present()
    }

    goRegister(){
      this.navCtrl.navigateForward('/register')
    }

    userDetails() {
    return this.afAuth.user
    }

}
