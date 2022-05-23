import { Observable } from 'rxjs';
import { IAdModel } from '../entities/ad.model';

export abstract class AdAdapter {
  abstract getAds(): Observable<IAdModel[]>;
}
