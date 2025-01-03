import { HttpFactoryService, HttpService } from '@/module/common/services';
import { ExpectedFromQuery, IMessage, Iuuid } from '@/module/common/types';
import { IGetHttp, IPostHttp } from '@/types';

class ExampleHttpService {
  constructor(private httpService: HttpService) {}

  async get(id?: Iuuid | null): Promise<ExpectedFromQuery<IGetHttp>> {
    const url = id ? `/http?user_id=${id}` : '/http';
    return this.httpService.get<IGetHttp>(url, {});
  }

  async post(data: IPostHttp): Promise<ExpectedFromQuery<IMessage>> {
    return this.httpService.post<IMessage, IPostHttp>('/http', data);
  }
}

const factory = new HttpFactoryService();
export const exampleHttpService = new ExampleHttpService(factory.createHttpService());
