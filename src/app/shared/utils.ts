import {Subscription} from 'rxjs';

export  const isDefined = data => data !== null && data !== undefined;

export const objToStr = data => (isDefined(data)) ? data.toString() : '';

export const unsubscribeAll = (arr: Subscription[])  => {
  while (arr.length) {
    if ( isDefined(arr[0]) && !arr[0].closed ) {
      arr[0].unsubscribe();
    }
    arr.splice(0, 1);
  }
};
