import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
const PI = 3.1415926535897932384626;
const ee = 0.00669342162296594323;
const a = 6378245.0;
// eslint-disable-next-line @typescript-eslint/naming-convention
@Injectable()
export class CordovaService {
  constructor(public androidPermissions: AndroidPermissions) {}

  //申请权限location
  async geolocation() {
    const operation = [
      this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION, //询问
      this.androidPermissions.PERMISSION.ACCESS_LOCATION_EXTRA_COMMANDS, // true
      this.androidPermissions.PERMISSION.CONTROL_LOCATION_UPDATES, //false
      this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION, //询问
    ];
    await this.androidPermissions.requestPermissions(operation);
  }

  /**
   * 高德定位方法
   */
  geoLoaction(callback) {}
  gcj02tobd09(lng: number, lat: number) {
    const X_PI = (Math.PI * 3000.0) / 180.0;
    // eslint-disable-next-line one-var
    const x = lng,
      y = lat;
    const z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
    const theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const bd_lng = z * Math.cos(theta) + 0.0065;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const bd_lat = z * Math.sin(theta) + 0.006;
    return [bd_lng, bd_lat];
  }
  wgs84togcj02(lng, lat) {
    var la = +lat;
    var ln = +lng;
    if (this.out_of_china(ln, la)) {
      return [ln, la];
    } else {
      var dlat = this.transformLat(ln - 105.0, la - 35.0);
      var dlng = this.transformLon(ln - 105.0, la - 35.0);
      var radlat = (la / 180.0) * PI;
      var magic = Math.sin(radlat);
      magic = 1 - ee * magic * magic;
      var sqrtmagic = Math.sqrt(magic);
      dlat = (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * PI);
      dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * PI);
      var mglat = la + dlat;
      var mglng = ln + dlng;
      return [mglng, mglat];
    }
  }
  //gcj02 ->  wgs84
  transformGCJ2WGS(gcjLat, gcjLon) {
    let d = this.delta(gcjLat, gcjLon);
    return {
      lat: gcjLat - d.lat,
      lon: gcjLon - d.lon,
    };
  }
  delta(lat, lon) {
    let a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
    let ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
    let dLat = this.transformLat(lon - 105.0, lat - 35.0);
    let dLon = this.transformLon(lon - 105.0, lat - 35.0);
    let radLat = (lat / 180.0) * PI;
    let magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    let sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * PI);
    dLon = (dLon * 180.0) / ((a / sqrtMagic) * Math.cos(radLat) * PI);
    return {
      lat: dLat,
      lon: dLon,
    };
  }
  out_of_china(lng, lat) {
    var la = +lat;
    var ln = +lng;
    // 纬度3.86~53.55,经度73.66~135.05
    return !(ln > 73.66 && ln < 135.05 && la > 3.86 && la < 53.55);
  }
  transformLat(x, y) {
    let ret =
      -100.0 +
      2.0 * x +
      3.0 * y +
      0.2 * y * y +
      0.1 * x * y +
      0.2 * Math.sqrt(Math.abs(x));
    ret +=
      ((20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0) /
      3.0;
    ret +=
      ((20.0 * Math.sin(y * PI) + 40.0 * Math.sin((y / 3.0) * PI)) * 2.0) / 3.0;
    ret +=
      ((160.0 * Math.sin((y / 12.0) * PI) + 320 * Math.sin((y * PI) / 30.0)) *
        2.0) /
      3.0;
    return ret;
  }
  transformLon(x, y) {
    let ret =
      300.0 +
      x +
      2.0 * y +
      0.1 * x * x +
      0.1 * x * y +
      0.1 * Math.sqrt(Math.abs(x));
    ret +=
      ((20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0) /
      3.0;
    ret +=
      ((20.0 * Math.sin(x * PI) + 40.0 * Math.sin((x / 3.0) * PI)) * 2.0) / 3.0;
    ret +=
      ((150.0 * Math.sin((x / 12.0) * PI) + 300.0 * Math.sin((x / 30.0) * PI)) *
        2.0) /
      3.0;
    return ret;
  }
}
