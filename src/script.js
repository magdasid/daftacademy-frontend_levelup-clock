export default class Time {
  constructor(clockType, currentDate = new Date()) { 
    this.clockType = clockType;
    this.second = currentDate.getSeconds();
    this.minute = currentDate.getMinutes();
    this.hour = currentDate.getHours();
    this.secondsGenerator = this.seconds(this.second);
    this.minutesGenerator = this.minutes(this.minute);
    if(this.clockType === 12 && this.hour > 12) {
      this.hour = this.hour - 12;
    }
    this.hoursGenerator = this.hours(this.hour);
    
  }
  
  step() {
    this.second = this.secondsGenerator.next().value;
   
    if (this.second === 0) {
      this.minute = this.minutesGenerator.next().value;
    }
    if (this.minute === 0 && this.second === 0) {
      this.hour = this.hoursGenerator.next().value;
    }
    this.draw();
  }
  
  draw() {
    if(this.clockType === 12) {
      document.getElementById("clock-hours-12").innerHTML = this.hour.toString().padStart(2, '0')+":" ;
      document.getElementById("clock-minutes-12").innerHTML = this.minute.toString().padStart(2, '0')+":";
      document.getElementById("clock-seconds-12").innerHTML = this.second.toString().padStart(2, '0');
    } else {
      document.getElementById("clock-hours-24").innerHTML = this.hour.toString().padStart(2, '0')+":" ;
      document.getElementById("clock-minutes-24").innerHTML = this.minute.toString().padStart(2, '0')+":";
      document.getElementById("clock-seconds-24").innerHTML = this.second.toString().padStart(2, '0');
    }
      
  }
  
  start() {
    setInterval(() => this.step(), 1000);
  }
  
  *seconds(i){
    let second = i;

    while(true){
      second++;
      if (second === 60) {
        second = 0;
      }
      yield second;
    }
  }

  *minutes(i){
    let minute = i;

    while(true){
      minute++;
      if (minute === 60) {
        minute = 0;
      }
      yield minute;
    }
  }

  *hours(i){
    let hour = i;

    while(true){
      hour++;
      if(this.clockType == 24 && hour === 24) {
        hour = 0;        
      } else if (this.clockType === 12 && hour === 12){
        hour = 0;
      }
      yield hour;
    }
  }
}
