import { Component, OnInit,ViewChild,OnDestroy } from '@angular/core';
import {SocketService} from "../../services/socket.service"
import {Constants,VoiceMapper} from "../../global/Constants"
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router"
import {Subscription} from "rxjs"
import { GoogleChartComponent,ScriptLoaderService,GoogleChartPackagesHelper } from 'angular-google-charts';

@Component({
  selector: 'app-skill-and-manipulation',
  templateUrl: './skill-and-manipulation.component.html',
  styleUrls: ['./skill-and-manipulation.component.css']
})
export class SkillAndManipulationComponent implements OnInit,OnDestroy {
  // @ViewChild("chart") chart:GoogleChartComponent
  chart:any
  activeRoute:any
  subscriptions:Subscription[]=[]
  chartType = GoogleChartPackagesHelper.getPackageForChartName('PieChart');
  chartdata=Constants.MOCK_DATA
  dataSchema:any
  options = {
    legend: {  alignment: 'start', textColor: 'white',textStyle:{color:"white"} },
    titleTextStyle: {
        color: '#fff',
        fontSize:20,
        bold:true,
        fontName:"Montserrat"
    },
    title: 'My Daily Activities',
    width: 1000,
    height: 500,
    is3D: true,
    'backgroundColor': 'transparent',
    tooltip: { trigger: 'both',selectionMode: 'multiple' },
    chartArea:{left:"1px"}
  };
  constructor(
    private socketService:SocketService,
    private loaderService:ScriptLoaderService,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) { 
    
    
    // socketService.getSocket()
    // .subscribe((x)=>{
    //   this.visibleToolTip(x.data)
    // })
  }

  drawChart(message?) {
    let loaderService=this.loaderService.onReady.subscribe( () => {
      this.loaderService.loadChartPackages([this.chartType]).subscribe(() => {
        // Start creating your chart now
        // Example:

        var data = google.visualization.arrayToDataTable(this.chartdata,true);
        this.chart = new google.visualization.PieChart(document.getElementById('chart_test'))
        this.chart.draw(data, this.options);
        if(message)
          this.modifychart(message)
        // if(this.socketService.recievedData){
        //   this.modifychart(this.socketService.recievedData)
        // }
      });
      this.subscriptions.push(loaderService)

  
    });
    
    // var data = google.visualization.arrayToDataTable(this.chartdata);


    // this.chart = new google.visualization.LineChart(document.getElementById('chart_test'));
    // this.chart.draw(data, this.options);
}
  visibleToolTip(indx){
      this.chart.setSelection([{row:indx, column:null}]);
  }
  modifychart(x){
    console.log("x---->",VoiceMapper.ALEXA_COMMANDS[x["activity"]])
      let voice= VoiceMapper.ALEXA_COMMANDS[x["activity"]]
      if(voice["path"]!=this.activeRoute){
        this.ngOnDestroy()
        return this.router.navigate([voice["path"]])
      }
      console.log()
      switch(x["activity"]){
        case "OpenManipulation":{
          let name=x["action"].toLowerCase()
          let indx=this.chartdata.findIndex(x=>x[0].toString().toLowerCase()==name)
          if(indx>-1)
            this.visibleToolTip(indx)
          break;
        }
        

        case "OpenMinActivity":{
          let min_val=Math.min.apply(null, this.chartdata.map(x=>x[1]))
          let indx=this.chartdata.findIndex(x=>x[1]==min_val)
          if(indx>-1)
          this.visibleToolTip(indx)
          break;
        }
        

        case "OpenMaxActivity":{
          let max_val=Math.max.apply(null, this.chartdata.map(x=>x[1]))
          let indx=this.chartdata.findIndex(x=>x[1]==max_val)
          if(indx>-1)
            this.visibleToolTip(indx)
          break;
        }
       
      }
  }
  ngOnInit() {
    this.drawChart()
    
    this.activeRoute=this.activatedRoute.url["_value"][0]["path"]
    let messageRecieved=this.socketService.messageRecieved.subscribe(x=>{
      if(!x){
        return;
      }
      !!this.chart?this.modifychart(x):this.drawChart(x)
      
    })
    this.subscriptions.push(messageRecieved)
  }
  ngOnDestroy(){
    
    this.subscriptions && this.subscriptions.forEach(x=>x && x.unsubscribe())
    // this.subscriptions.forEach(x=>x.unsubscribe())
  }

}
