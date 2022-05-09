import { logEvent } from 'firebase/analytics';
import { Observable } from 'rxjs';
import { analytics } from 'src/app/init-app';
import { environment } from 'src/environments/environment';

export type EventNames =
  | 'tournaments_views'
  | 'players_views'
  | 'shop_views'
  | 'teams_views'
  | 'shop_views'
  | 'index_views'
  | 'user_time_shop';
export function trackEvent(
  eventName: EventNames,
  data?: {
    [key: string]: any;
  }
) {
  if (environment.analytics) {
    logEvent(analytics, eventName, data);
  }
}

export function getCurrentGeolocation(
): Observable<any> {
  return new Observable((observer) => {
    const response: any = {
      latitute: 0,
      longitude: 0,
      date: null,
      timestamp: null,
    };
    window.navigator.geolocation.getCurrentPosition(
      (aa) => {
        response.date = new Date(aa.timestamp);
        response.timestamp = aa.timestamp;
        response.latitute = aa.coords.latitude;
        response.longitude = aa.coords.longitude;
        observer.next(response);
        observer.complete();
      },
      (err) => {
        observer.next(null);
        observer.complete();
      },
      {
        enableHighAccuracy: true,
      }
    );
  });
}
