import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, timer, throwError } from 'rxjs';
import {
  retryWhen,
  map,
  tap,
  delayWhen,
  mergeMap,
  finalize
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocketCommService {
  private _url: string;
  private socket;

  constructor() {}

  connect(url: string): Observable<any> {
    this._url = url;
    this.socket = io(this._url, {
      autoConnect: false
    });
    return this.onConnectionStatus().pipe(
      map(val => {
        if (!val) {
          // error will be picked up by retryWhen
          throw val;
        }
        return val;
      }),
      retryWhen(genericRetryStrategy())
    );
  }

  onConnectionStatus(): Observable<Boolean> {
    return new Observable<any>(observer => {
      this.socket.open();
      this.socket.on('connect', _ => observer.next(true));
      this.socket.on('connect_error', _ => {
        this.socket.close();
        observer.next(false);
      });
    });
  }

  sendData(channel: string, message) {
    this.socket.emit(channel, message);
  }

  public onData(channel: string): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(channel, (data: string) => observer.next(data));
    });
  }
}

export const genericRetryStrategy = ({
  maxRetryAttempts = 10,
  scalingDuration = 1000,
  excludedStatusCodes = []
}: {
  maxRetryAttempts?: number;
  scalingDuration?: number;
  excludedStatusCodes?: number[];
} = {}) => (attempts: Observable<any>) => {
  return attempts.pipe(
    mergeMap((error, i) => {
      const retryAttempt = i + 1;
      // if maximum number of retries have been met
      // or response is a status code we don't wish to retry, throw error
      if (
        retryAttempt > maxRetryAttempts ||
        excludedStatusCodes.find(e => e === error.status)
      ) {
        return throwError(error);
      }
      console.log(
        `Attempt ${retryAttempt}: retrying in ${retryAttempt *
          scalingDuration}ms`
      );
      // retry after 1s, 2s, etc...
      return timer(retryAttempt * scalingDuration);
    }),
    finalize(() => console.log('We are done!'))
  );
};
