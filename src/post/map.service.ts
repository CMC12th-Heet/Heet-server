import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

const kakaoReqHeader = {
  'Content-Type': 'application/x-www-form-urlencoded', //'application/json',
  Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
};

@Injectable()
export class MapService {
  constructor(private readonly httpService: HttpService) {}

  async getStoreListFromKeyword(keyword: string) {
    const url = `/v2/local/search/keyword.json?query=${keyword}&size=15&page=1`;
    console.log(`${process.env.KAKAO_BASE_URL}${url}`);
    const result = await this.httpService
      .get(`${process.env.KAKAO_BASE_URL}${url}`, { headers: kakaoReqHeader })
      .toPromise();

    console.log(result.data.documents);
    return result.data.documents;
  }

  async getUserAddressFromPosition(x, y) {
    const url = `/v2/local/geo/coord2address.json?x=${x}&y=${y}&input_coord=WGS84`;
    const result = await this.httpService
      .get(`${process.env.KAKAO_BASE_URL}${url}`, { headers: kakaoReqHeader })
      .toPromise();
    const [data] = result.data.documents;
    return data.address.address_name;
  }
}
