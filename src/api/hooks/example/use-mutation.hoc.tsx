import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

import { exampleAuthHttpService, exampleHttpService } from '@/api/services/example';
import { toastContainer } from '@/module/common/component';
import { IMessage } from '@/module/common/types';
import { IAuthError, IPostAuthHttp, IPostHttp } from '@/types';

const onError = async (_err: AxiosError<IAuthError>) => {
  const err = _err.response?.data as IAuthError;
  await toastContainer.error({ title: err.message ?? _err.message });
};

const onSuccess = async ({ message }: IMessage) => {
  await toastContainer.success({ title: message });
};

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
