import { Component } from '@angular/core';
import { AppService } from '../services/app.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {


  countries: any;
  constructor(private app:AppService,
    public loadingController:LoadingController) {}
  
  async ngOnInit(){
    const loading = await this.loadingController.create({
      message: 'Por favor, aguarde...',
      duration: 15000
    });
    
    await loading.present();
    this.app.getData().subscribe((data) => {
      this.countries = data['Countries'];
      setTimeout(()=>{
        this.addSearch();
      }),100;
      loading.dismiss();
    })
  }

  addSearch() {
    const searchbar = document.querySelector('ion-searchbar');
    const items = Array.from(document.querySelector('ion-list').children);

    searchbar.addEventListener('ionInput', handleInput);

    function handleInput(event) {
      const query = event.target.value.toLowerCase();
      requestAnimationFrame(() => {
        items.forEach(item => {
          const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
          shouldShow ? item.removeAttribute('hidden') : item.setAttribute('hidden', 'hidden');
        });
      });
    }
  }

  highConfirmed() {
      this.countries.sort((a,b) => (a.TotalConfirmed < b.TotalConfirmed ? 1 : -1));
  }

  highDeaths() {
      this.countries.sort((a,b) => (a.TotalDeaths < b.TotalDeaths ? 1 : -1 ));
  }

  resetList() {
    this.countries.sort((a,b) => (a.Country < b.Country ? -1 : 1));
  }

}
