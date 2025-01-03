import { EnhancedWithAuthHttpService, HttpFactoryService } from '@/module/common/services';
import { ExpectedFromQuery, IMessage, Iuuid } from '@/module/common/types';
import { IGetAuthHttp, IPostAuthHttp } from '@/types';

class ExampleAuthHttpService {
  constructor(private httpService: EnhancedWithAuthHttpService) {}

  async get(id?: Iuuid | null): Promise<ExpectedFromQuery<IGetAuthHttp>> {
    const url = id ? `/auth_http?user_id=${id}` : '/auth_http';
    return this.httpService.get<IGetAuthHttp>(url, {});
  }

  async post(data: IPostAuthHttp): Promise<ExpectedFromQuery<IMessage>> {
    return this.httpService.post<IMessage, IPostAuthHttp>('/auth_http', data);
  }
}

const factory = new HttpFactoryService();
export const exampleAuthHttpService = new ExampleAuthHttpService(factory.createAuthHttpService());
