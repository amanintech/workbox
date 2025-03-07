/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

import '../_version';


declare var registration : ServiceWorkerRegistration;

export interface CacheNameDetails {
  googleAnalytics: string; 
  precache: string; 
  prefix: string; 
  runtime: string; 
  suffix: string;
}

export interface PartialCacheNameDetails {
  [propName: string]: string;
}

export type CacheNameDetailsProp =
    'googleAnalytics' | 'precache' | 'prefix' | 'runtime' | 'suffix';


const _cacheNameDetails: CacheNameDetails = {
  googleAnalytics: 'googleAnalytics',
  precache: 'precache-v2',
  prefix: 'workbox',
  runtime: 'runtime',
  suffix: registration.scope,
};

const _createCacheName = (cacheName: string): string => {
  return [_cacheNameDetails.prefix, cacheName, _cacheNameDetails.suffix]
      .filter((value) => value && value.length > 0)
      .join('-');
};

const eachCacheNameDetail = (fn: Function): void => {
  for (const key of Object.keys(_cacheNameDetails)) {
    fn(<CacheNameDetailsProp> key);
  }
} 

export const cacheNames = {
  updateDetails: (details: PartialCacheNameDetails) => {
    eachCacheNameDetail((key: CacheNameDetailsProp) => {
      if (typeof details[key] === 'string') {
        _cacheNameDetails[key] = <string> details[key];
      }
    })
  },
  getGoogleAnalyticsName: (userCacheName?: string) => {
    return userCacheName || _createCacheName(_cacheNameDetails.googleAnalytics);
  },
  getPrecacheName: (userCacheName?: string) => {
    return userCacheName || _createCacheName(_cacheNameDetails.precache);
  },
  getPrefix: () => {
    return _cacheNameDetails.prefix;
  },
  getRuntimeName: (userCacheName?: string) => {
    return userCacheName || _createCacheName(_cacheNameDetails.runtime);
  },
  getSuffix: () => {
    return _cacheNameDetails.suffix;
  },
};
