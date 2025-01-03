import { UseQueryResult, useQuery } from 'react-query';

import { exampleAuthHttpService, exampleHttpService } from '@/api/services/example';
import { Iuuid } from '@/module/common/types';
import { IGetAuthHttp, IGetHttp } from '@/types';

const getHttp = (id?: Iuuid): UseQueryResult<IGetHttp | undefined> =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useQuery(['example_http', id], () => exampleHttpService.get(id), {
    enabled: !!id
  });

const getAuthHttp = (id?: Iuuid): UseQueryResult<IGetAuthHttp | undefined> =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useQuery(['example_auth_http', id], () => exampleAuthHttpService.get(id), {
    enabled: !!id
  });

export const useExampleQuery = {
  getHttp,
  getAuthHttp
};
