import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

import { exampleAuthHttpService, exampleHttpService } from '@/api/services/example';
import { IAuthError, IPostAuthHttp, IPostHttp } from '@/types';
import { onError, onSuccess } from '@/module/common/services';


export const postHttp = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation<any, AxiosError<IAuthError>, IPostHttp>(
    (data: IPostHttp) => exampleHttpService.post(data),
    {
      onSuccess: onSuccess,
      onError: onError
    }
  );
};

export const postAuthHttp = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation<any, AxiosError<IAuthError>, IPostAuthHttp>(
    (data: IPostAuthHttp) => exampleAuthHttpService.post(data),
    {
      onSuccess: onSuccess,
      onError: onError
    }
  );
};

export const useExampleMutation = {
  postHttp,
  postAuthHttp
};
