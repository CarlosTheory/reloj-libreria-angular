import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'reloj-ejemplo';

  c_hours=0;
  c_minutes=0;
  c_seconds=0;

  clock;
  stopwatch;
  countdown;

  setClock:boolean = false;
  setStopwatch:boolean = false;
  setCountdown:boolean = false;

  ngOnInit(){
    this.setClock = true;
    this.initClock();
  }

  _initClock:boolean = false;

  initClock(){
    this._initClock = true;
  }

  stopClock(){
    this._initClock = false;
  }

  clockEvs(e){
    this.clock = e.timeClock;
    console.log(this.clock);
  }

  stopEvs(e){
    this.stopwatch = e.timeStopwatch;
    console.log(this.stopwatch);
  }

  countEvs(e){
    console.log(e);
    this.countdown = e.timeCountdown;
    if(e.countdownStarted){
      this.c_hours=0;
      this.c_minutes=0;
      this.c_seconds=0;
    }

  }

  showClock(){
    this.setClock = true;
    this.setStopwatch = false;
    this.setCountdown = false;
  }

  showStopwatch(){
    this.setClock = false;
    this.setStopwatch = true;
    this.setCountdown = false;
  }

  showCountdown(){
    this.setClock = false;
    this.setStopwatch = false;
    this.setCountdown = true;
  }

}
