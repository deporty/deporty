import { Component, OnInit } from '@angular/core';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from 'src/app/init-app';
import { Breakpoints, IAdModel } from '../../../entities/ad.model';
import { GetAdsUsecase } from '../../../usecases/get-ads/get-ads.usecase';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  ads!: IAdModel[];
  breakpoint!: string;
  index: number;
  table: any;
  currentUrl!: string;

  constructor(private getAdsUsecase: GetAdsUsecase) {
    this.index = 0;
    this.breakpoint = this.getBreakpoint(window.innerWidth);
    this.table = {};
  }

  getBreakpoint(width: number) {
    const map: any = {
      xs: (size: number) => {
        return size < 576;
      },
      sm: (size: number) => {
        return size >= 576 && size < 768;
      },

      md: (size: number) => {
        return size >= 768 && size < 992;
      },

      lg: (size: number) => {
        return size >= 992 && size < 1200;
      },

      xl: (size: number) => {
        return size >= 1200;
      },
    };
    for (const breakpoint in map) {
      if (Object.prototype.hasOwnProperty.call(map, breakpoint)) {
        const func = map[breakpoint];
        const response = func(width);
        if (response) {
          return breakpoint;
        }
      }
    }
    return 'md';
  }
  ngOnInit(): void {
    this.getAdsUsecase.call().subscribe((ads) => {
      this.ads = ads;
      this.getImage();
    });

    window.addEventListener('resize', () => {
      const widht = window.innerWidth;
      this.breakpoint = this.getBreakpoint(widht);
      this.getImage();
    });

    setInterval(() => {
      if (this.ads) {
        if (this.index == this.ads.length - 1) {
          this.index = -1;
        }
        this.index++;
        this.getImage();
      }
    }, 60000);
  }

  getImage() {
    const previusValue = this.table[`${this.index}-${this.breakpoint}`];
    if (previusValue) {
      this.currentUrl = previusValue;
    }
    const path: string =
      this.ads[this.index].adBreakpoint[this.breakpoint as Breakpoints];
    const imageRef = ref(storage, path);

    getDownloadURL(imageRef).then((data) => {
      this.currentUrl = data;
    });
  }
}
