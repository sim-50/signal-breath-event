import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild("button", { read: ElementRef, static: true }) button: ElementRef

  title: string = 'start';
  width: string = '250px';
  height: string = '250px';
  title_fontsize: string = '3.7rem';
  secondCountDown: number = 4;
  secondCount: number = 0;
  clock;

  constructor(private animationCtrl: AnimationController) { }

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
        this.secondCountDown--;
        this.title = this.secondCountDown.toString();
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
      while (this.secondCount < 64) {
        await this.inhalePeriod().then(async () => {
          await this.exhalePeriod();
        })
      }
    }
    // stop when secondCount === 60
    // during this period: inhale 4s --> exhale 4s loop
  }

  inhalePeriod = () => {
    console.log("inhale second:" + this.secondCount);
    this.inhaleAnimation();
    return new Promise((resolve, reject) => {
      this.title = 'Inhale';
      this.clock = setInterval(() => {
        this.secondCount = this.secondCount + 4;
        // this.title = this.secondCount.toString();
        if (this.secondCount % 4 === 0) {
          clearInterval(this.clock);
          resolve(this.secondCount);
        }
      }, 4000);
    })
  }

  exhalePeriod = () => {
    console.log("second go to exhale: " + this.secondCount);
    this.exhaleAnimation();
    return new Promise((resolve, reject) => {
      this.title = 'Exhale';
      this.clock = setInterval(() => {
        this.secondCount = this.secondCount + 4;
        // this.title = this.secondCount.toString();
        if (this.secondCount % 8 === 0) {
          clearInterval(this.clock);
          resolve(this.secondCount);
        }
        if (this.secondCount === 64) {
          clearInterval(this.clock);
          this.title = 'Done';
        }
      }, 4000);
    })
  }

  inhaleAnimation() {
    const animation = this.animationCtrl.create()
      .addElement(this.button.nativeElement)
      .duration(4000)
      .fromTo('transform', 'scale(1)', 'scale(1.3)')
      .fromTo('opacity', '0.7', '1')
      .fromTo('--border-width', '20px', '0px');

    animation.play();
  }

  exhaleAnimation() {
    const animation = this.animationCtrl.create()
      .addElement(this.button.nativeElement)
      .duration(4000)
      .fromTo('transform', 'scale(1.3)', 'scale(1)')
      .fromTo('opacity', '1', '0.7')
      .fromTo('--border-width', '0px', '20px');

    animation.play();
  }
}
