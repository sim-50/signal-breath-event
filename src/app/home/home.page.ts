import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild("button", { read: ElementRef, static: true }) button: ElementRef

  title: string = 'Start';
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

  onClick() {
    console.log('clicked!');
    if (this.title === 'Start') {
      this.allProcess();
    } else if (this.title === 'Redo') {
      this.secondCountDown = 4;
      this.secondCount = 0;
      this.allProcess();
    }
  }

  allProcess = () => {
    // countDown process: 3-2-1
    this.clock = setInterval(() => {
      this.secondCountDown--;
      this.title = this.secondCountDown.toString();
      if (this.secondCountDown === 0) {
        clearInterval(this.clock);
        // start breathe period
        this.breathPeriod();
      }
      console.log(this.secondCountDown);
    }, 1000);
  }

  breathPeriod = () => {
    // start breathe --> inhale first
    this.inhaleAnimation();
    this.title = "Inhale";
    let inhaleFlag: boolean = false;
    this.clock = setInterval(() => {
      this.secondCount = this.secondCount + 4;
      // stop when secondCount === 64
      if (this.secondCount >= 64) {
        clearInterval(this.clock);
        this.title = "Redo";
      } else {
        if (inhaleFlag === true) {
          this.inhaleAnimation();
          this.title = "Inhale";
          inhaleFlag = false;
        } else {
          this.exhaleAnimation();
          this.title = "Exhale";
          inhaleFlag = true;
        }
      }
      console.log("second: " + this.secondCount);
    }, 4000);
  }

  inhaleAnimation() {
    const animation = this.animationCtrl.create()
      .addElement(this.button.nativeElement)
      .duration(4000)
      .fromTo('transform', 'scale(1)', 'scale(1.3)')
      .fromTo('opacity', '0.7', '1')
      // .fromTo('--border-width', '20px', '0px');

    animation.play();
  }

  exhaleAnimation() {
    const animation = this.animationCtrl.create()
      .addElement(this.button.nativeElement)
      .duration(4000)
      .fromTo('transform', 'scale(1.3)', 'scale(1)')
      .fromTo('opacity', '1', '0.7')
      // .fromTo('--border-width', '0px', '20px');

    animation.play();
  }
}
