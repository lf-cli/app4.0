// eslint-disable-next-line @typescript-eslint/naming-convention
export class appRestful {
  //定义接口地址
  public static interfaces = {
    login: '/v4/authentications', //登录
  };

  //测试环境URL
  public static getDevUrl() {
    return 'http://192.168.3.12:9090';
  }
  //生产环境URL
  public static getProdUrl() {
    return 'http://47.92.114.119:9090';
  }
  //测试url
  public static getTestUrl() {
    return 'http://47.103.69.241:8081';
  }
}
