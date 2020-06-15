import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController} from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = "";
  password: string = "";
  confirmPassword: string ="";
  constructor(public afAuth: AngularFireAuth,
              public alert: AlertController,
              public navCtrl: NavController) { }

  ngOnInit() {
  }

  async register() {
    const { username, password, confirmPassword } = this
      if(password !== confirmPassword) {
        this.showAlert('Erro!', "As senhas nao sao iguais")
        return console.error("Passwords don't match")
      }

      try {
      const res = await this.afAuth.createUserWithEmailAndPassword(username, password)
      console.log(res)
      this.showAlert('Sucesso!', 'Conta criada com sucesso')
      this.navCtrl.navigateBack('')
    } catch (error) {
      console.dir(error)
      this.showAlert('Error', error.message)
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

  goLogin(){
    this.navCtrl.navigateBack('');
  }
}
