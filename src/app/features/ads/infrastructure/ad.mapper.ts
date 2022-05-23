import { Injectable } from '@angular/core';
import { IAdModel } from '../entities/ad.model';

@Injectable()
export class AdMapper {
  fromJson(obj: any): IAdModel {
    return {
      defaultAd: obj['default-ad'],
      status: obj['status'],
      title: obj['title'],
      link: obj['link'],
      adBreakpoint: obj['ad-breakpoint'],
    };
  }
}
