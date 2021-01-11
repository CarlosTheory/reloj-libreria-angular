import { Component, OnInit, OnDestroy, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

// Libreria Angular, muestra la hora actual, un cronómetro y un cuenta átras
// Carlos Aponte, cdaponte95@gmail.com

@Component({
  selector: 'lib-reloj-lib',
  template: `
    <div class="clock" *ngIf="initClock">
      <span>{{clock_hours}}:{{clock_minutes}}:{{clock_seconds}}  {{am_pm}}</span>
    </div>

    <div class="stopwatch" *ngIf="initStopwatch">
      <span>{{stopwatch_minutes}}:{{stopwatch_seconds}}:{{stopwatch_milliseconds}}</span>
      <div *ngIf="initStopwatchPanel">
        <button (click)="startStopwatch()">{{ this.stopwatch_start_text }}</button>
        <button *ngIf="this.stopwatch_counter" (click)="stopStopwatch()"> Detener </button>
      </div>
    </div>

    <div class="countdown" *ngIf="initCountdown">
      <span> {{r_countdown_hours}}:{{r_countdown_minutes}}:{{r_countdown_seconds}} </span>
      <div *ngIf="initCountdownPanel">
        <button *ngIf="this.countdown" (click)="startCountdown()"> {{countdown_start_text}} </button>
        <button *ngIf="this.countdown_counter" (click)="stopCountdown()">Detener</button>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class RelojLibComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  @Input() initClock:boolean;
  @Input() initStopwatch:boolean;
  @Input() initStopwatchPanel:boolean;
  @Input() initCountdown: boolean;
  @Input() initCountdownPanel: boolean;
  @Output() clockEvs = new EventEmitter<any>();
  @Output() stopEvs = new EventEmitter<any>();
  @Output() countEvs = new EventEmitter<any>();


  @Input() countdown_hours: any = "00";
  @Input() countdown_minutes: any = "00";
  @Input() countdown_seconds: any = "00";


  ngOnChanges(changes: SimpleChanges){
    for (const propName in changes){
      if(changes.hasOwnProperty(propName)){
        let change = changes[propName];
        switch (propName){
          case 'initClock':{
            console.log("initClock");
            if(change.currentValue){
              this.startClock();
            }else{
              this.stopClock();
            }
          }
          case 'countdown_hours':{
            if(propName === 'countdown_hours'){
              this.r_countdown_hours = change.currentValue;
              this.r_countdown_hours = this.validateInputCountdown(this.r_countdown_hours);
              // console.log('horas', this.r_countdown_hours, propName);
              //console.log("countdown_hours value", change.currentValue);
            }
          }
          case 'countdown_minutes':{
            if(propName === 'countdown_minutes'){
              this.r_countdown_minutes = change.currentValue;
              this.r_countdown_minutes = this.validateInputCountdown(this.r_countdown_minutes);
              // console.log('minutos', this.r_countdown_minutes, propName);
              //console.log("countdown_minutes value", change.currentValue);
            }
          }
          case 'countdown_seconds':{
            if(propName === 'countdown_seconds'){
              this.r_countdown_seconds = change.currentValue
              this.r_countdown_seconds = this.validateInputCountdown(this.r_countdown_seconds);
              // console.log('segundos', this.r_countdown_seconds, propName);
              //console.log("countdown_seconds value", change.currentValue);
            }
          }
        }
      } 
    }

  }


  public time:any;
  public timer:any;
  public showClock: any;

  checkZeroInTime(i){
    if(Number(i) < 10) {
      i = "0" + i;
      return i;
    } else {
      //i = '' + i;
      return i;
    }
  }

  formatHour(h){
    h = (h % 12);
    h = (h ? h : 12);

    return h;
  }

  // Clock
  
  public clock_hours:any = '00';
  public clock_minutes:any = '00';
  public clock_seconds:any = '00';
  public clock_day: any = "d";
  public clock_month: any = "m";
  public am_pm:any = ""

  startClock(){
    this.timer = setInterval(() => {
      this.time = new Date();
      this.clock_hours = this.time.getHours();
      this.am_pm = this.clock_hours >= 12? 'pm' : 'am';
      this.clock_minutes = this.time.getMinutes();
      this.clock_seconds = this.time.getSeconds();
      this.clock_hours = this.checkZeroInTime(this.formatHour(this.clock_hours));
      this.clock_minutes = this.checkZeroInTime(this.clock_minutes);
      this.clock_seconds = this.checkZeroInTime(this.clock_seconds);

      this.clockEvs.emit({timeClock : `${this.clock_hours}:${this.clock_minutes}:${this.clock_seconds}  ${this.am_pm}`});
    }, 1);
  }

  stopClock(){
    clearInterval(this.timer);
    this.clockEvs.emit({timeClock : `${this.clock_hours}:${this.clock_minutes}:${this.clock_seconds}  ${this.am_pm}`});
  }

  // End Clock

  // Stopwatch
  public stopwatch_minutes:any = "00";
  public stopwatch_seconds:any = "00";
  public stopwatch_milliseconds:any = "00";

  stopwatch_counter:number = 0;
  stopwatch_timer:any;
  stopwatch_running: boolean = false;
  stopwatch_start_text: string = "Iniciar";

  startStopwatch(){
    this.stopwatch_running = !this.stopwatch_running;
    if(this.stopwatch_running){
      this.stopwatch_start_text = "Pausar";

      const start = Date.now() - this.stopwatch_counter || 0;

      this.stopwatch_timer = setInterval(() => {
        this.stopwatch_counter = Date.now() - start;

        this.stopwatch_milliseconds = Math.floor(Math.floor(this.stopwatch_counter % 1000) / 10).toFixed(0);
        this.stopwatch_minutes = Math.floor((this.stopwatch_counter / 60000));
        this.stopwatch_seconds = Math.floor((this.stopwatch_counter % 60000) / 1000).toFixed(0);

        this.stopwatch_minutes = this.checkZeroInTime(this.stopwatch_minutes);
        this.stopwatch_seconds = this.checkZeroInTime(this.stopwatch_seconds);
        this.stopwatch_milliseconds = this.checkZeroInTime(this.stopwatch_milliseconds);

        this.stopEvs.emit({timeStopwatch : `${this.stopwatch_minutes}:${this.stopwatch_seconds}:${this.stopwatch_milliseconds}`});
      });
    } else {
      this.stopwatch_start_text = "Resumir";
      clearInterval(this.stopwatch_timer);
      this.stopEvs.emit({timeStopwatch : `${this.stopwatch_minutes}:${this.stopwatch_seconds}:${this.stopwatch_milliseconds}`});

    }
  }

  stopStopwatch(){
    this.stopwatch_running = false;
    this.stopwatch_start_text = "Inicio";
    this.stopwatch_counter = null;
    this.stopwatch_minutes = "00";
    this.stopwatch_seconds = "00";
    this.stopwatch_milliseconds = "00";
    clearInterval(this.stopwatch_timer);
    this.stopEvs.emit({timeStopwatch : `${this.stopwatch_minutes}:${this.stopwatch_seconds}:${this.stopwatch_milliseconds}`});
  }

  // End Stopwatch

  // Countdown
  validateInputCountdown(v){
    var pattern = /^[0-9]/;

    if(Number(this.r_countdown_hours > 0 ) || (this.r_countdown_minutes > 0 ) || (this.r_countdown_seconds > 0 )){
      this.countdown = true;
      //console.log("countdown", this.countdown);
    } else {
      this.countdown = false;
      //console.log("countdown", this.countdown);
    }

    if(pattern.test(v)){
      v = this.checkZeroInTime(v);
      return v;
    } else {
      v = "00";
      this.countEvs.emit({ErrCountdown : '"No corresponde el pattern, solo se aceptan numeros."'});
      console.error("No corresponde el pattern, solo se aceptan numeros.");
      return v;
    }
  }

  countdown_counter:number;
  countdown_timer:any;
  countdown_running: boolean = false;
  countdown_start_text: string = "Iniciar";
  countdown_time: number;
  countdown: boolean = false;

  r_countdown_hours:any = "00"
  r_countdown_minutes:any = "00"
  r_countdown_seconds:any = "00"

  startCountdown(){
    //console.log('startCountdown method');
    this.countEvs.emit({countdownStarted: true});
    this.countdown_running = !this.countdown_running;
    if(this.countdown_running){
      this.countdown_start_text = "Pausar";

      this.r_countdown_hours = parseInt(this.r_countdown_hours, 0);
      this.r_countdown_minutes = parseInt(this.r_countdown_minutes, 0);
      this.r_countdown_seconds = parseInt(this.r_countdown_seconds, 0);

      var counter = 0;
      this.countdown_time = ((this.r_countdown_hours * 3600) + (this.r_countdown_minutes * + 60) + this.r_countdown_seconds );
      //console.log(this.countdown_time);

      this.countdown_timer = setInterval(() => {
        this.countdown = true;
        counter ++;
        //console.log("contador", counter);
        this.countdown_counter = (this.countdown_time - counter);

        this.r_countdown_hours = Math.floor(this.countdown_counter / 3600);
        this.r_countdown_minutes = Math.floor((this.countdown_counter / 60) % 60);
        this.r_countdown_seconds = Math.floor(this.countdown_counter % 60);

        this.r_countdown_hours = this.checkZeroInTime(this.r_countdown_hours);
        this.r_countdown_minutes = this.checkZeroInTime(this.r_countdown_minutes);
        this.r_countdown_seconds = this.checkZeroInTime(this.r_countdown_seconds);

        this.countEvs.emit({timeCountdown : `${this.r_countdown_hours}:${this.r_countdown_minutes}:${this.r_countdown_seconds}`});

        if(this.countdown_counter <= 0){
          this.countdown = false;
          //console.log("contador llegó a 0");
          this.stopCountdown();
        }
      }, 1000);
    } else {
      this.countdown_start_text = "Resumir";
      clearInterval(this.countdown_timer);
      this.countEvs.emit({timeCountdown : `${this.r_countdown_hours}:${this.r_countdown_minutes}:${this.r_countdown_seconds}`});
    }
  }

  stopCountdown(){
    //console.log("stopCountdown() method");
    this.countdown = false;
    this.countdown_running = false;
    this.countdown_start_text = "Iniciar";
    this.countdown_counter = null;
    this.r_countdown_hours = "00";
    this.r_countdown_minutes = "00";
    this.r_countdown_seconds = "00";
    clearInterval(this.countdown_timer);
    this.countEvs.emit({timeCountdown : `${this.r_countdown_hours}:${this.r_countdown_minutes}:${this.r_countdown_seconds}`});
  }
  

  onDestroy(){
    clearInterval(this.timer);
    clearInterval(this.stopwatch_timer);
  }

}
