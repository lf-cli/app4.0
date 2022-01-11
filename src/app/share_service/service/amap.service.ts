import { Injectable } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/naming-convention
declare let AMapLoader;

@Injectable()
export class AmapService {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  AMap: any;

  constructor() {}

  async initAMap(): Promise<any> {
    if (this.AMap) {
      return this.AMap;
    }
    this.AMap = await AMapLoader.load({
      key: '04e730ae2098bd13712f7a7d67ee6689', // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '1.4.9', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      Loca: {
        version: '1.3.2',
      },
      plugins: ['AMap.PlaceSearch', 'AMap.DistrictSearch'],
    });
    return this.AMap;
  }

  setView(center, zoom) {
    this.AMap.setView([center[1], center[0]], zoom);
  }
  addMarker(lonLat: any) {
    const opts: any = {
      icon: new this.AMap.Icon({
        iconUrl: 'assets/img/riverPatrol/loaction.png',
        iconSize: [30, 30],
        iconAnchor: [-18, -18],
      }),
    };
    return new this.AMap.Marker([lonLat[1], lonLat[0]], opts).addTo(this.AMap);
  }

  placeSearch(regionId, keywords) {
    // const city = regionId == '1' ? '乌鲁木齐' : '昌吉';
    return new Promise((resolve, reject) => {
      var placeSearch = new this.AMap.PlaceSearch({
        // city 指定搜索所在城市，支持传入格式有：城市名、citycode和adcode
        city: '宿城区',
      });

      placeSearch.search(keywords, function (status, result) {
        // 查询成功时，result即对应匹配的POI信息
        console.log(result);
        if (result.info == 'OK') {
          let pois = result.poiList.pois; //返回多个搜索结果
          resolve(pois);
        } else {
          reject('没有找到搜索的点位');
        }
      });
    });
  }
}
