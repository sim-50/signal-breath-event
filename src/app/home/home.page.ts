import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  title: string = 'start';
  width: string = '250px';
  height: string = '250px';
  title_fontsize: string = '3.7rem';
  secondCountDown: number = 3;
  secondCount: number = 0;
  clock;

  constructor() { }

  ngOnInit() {
    if (window.screen.height < 667) { // iPhone 5/SE , Galaxy S5
      this.width = '180px';
      this.height = '180px';
      this.title_fontsize = '4rem';
    }

    if (window.screen.width < 414) { // iPhone 5/SE/6/7/8/X
      this.width = '220px';
      this.height = '220px';
      this.title_fontsize = '2.7rem';
    }
  }

  async onClick() {
    console.log('clicked!');
    if (this.title === 'start') {
      // countDown process: 3-2-1
      this.countDown()
        // breathe period: inhale - exhale
        .then((value) => {
          this.breathPeriod(value);
        })
    }
  }

  countDown = () => {
    return new Promise((resolve, reject) => {
      this.clock = setInterval(() => {
        this.title = this.secondCountDown.toString();
        this.secondCountDown--;
        if (this.secondCountDown === 0) {
          clearInterval(this.clock);
          resolve(this.secondCountDown);
        }
      }, 1000);
    })
  }

  breathPeriod = async (value) => {
    // start breathe --> inhale first
    if (value === 0) {
      while (this.secondCount <= 60) {
        await this.inhalePeriod().then(async () => {
          await this.exhalePeriod();
        })
      }
    }
    // stop when secondCount === 60
    // during this period: inhale 4s --> exhale 4s loop
  }

  inhalePeriod = () => {
    return new Promise((resolve, reject) => {
      this.clock = setInterval(() => {
        this.title = 'Inhale';
        this.secondCount++;
        // this.title = this.secondCount.toString();
        if (this.secondCount % 4 === 0) {
          clearInterval(this.clock);
          resolve(this.secondCount);
        }
      }, 1000);
    })
  }

  exhalePeriod = () => {
    // console.log("second go to exhale: " + second);
    // console.log("second go to exhale: " + this.secondCount);
    return new Promise((resolve, reject) => {
      this.clock = setInterval(() => {
        this.title = 'Exhale';
        this.secondCount++;
        // this.title = this.secondCount.toString();
        if (this.secondCount % 8 === 0) {
          clearInterval(this.clock);
          resolve(this.secondCount);
        }
        if (this.secondCount === 61) {
          clearInterval(this.clock);
          this.title = 'Done';
        }
      }, 1000);
    })
  }

}
