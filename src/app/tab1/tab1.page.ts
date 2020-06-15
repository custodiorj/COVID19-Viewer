import { Component, ViewChild } from '@angular/core';
import { AppService } from '../services/app.service';
import { LoadingController } from '@ionic/angular';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild('barChart') barChart;

  bars: any;
  global: any;
  constructor(private app:AppService,
    public loadingController:LoadingController) {}
  
  async ngOnInit(){
    const loading = await this.loadingController.create({
      message: 'Por favor, aguarde...',
      duration: 15000
    });
    
    await loading.present();
    this.app.getData().subscribe((data) => {
      this.global = data['Global'];
      this.createBarChart();
      loading.dismiss();
    })
  }

  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['NC', 
                 'CT'],
        datasets: [{
          label: 'Total',
          data: [this.global.NewConfirmed,
                  this.global.TotalConfirmed],
          backgroundColor: 'rgb(38, 194, 129)', 
          borderColor: 'rgb(38, 194, 129)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
