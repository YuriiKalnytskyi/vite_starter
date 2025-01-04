import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

import { exampleAuthHttpService, exampleHttpService } from '@/api/services/example';
import { toastContainer } from '@/module/common/component';
import { IMessage } from '@/module/common/types';
import { IAuthError, IPostAuthHttp, IPostHttp } from '@/types';
import i18next from 'i18next';


export const onError = (_err: AxiosError<IAuthError>) => {
  const err = _err.response?.data as IAuthError;
  const currentLang = i18next.language;

  const isMessageObject = (message: any): message is { [key: string]: string } =>
    typeof message === 'object' && message !== null && !Array.isArray(message);

  const localizedMessage = isMessageObject(err?.message)
    ? err?.message[currentLang] || err?.message['en']
    : _err.message;

  toastContainer.error({ title: localizedMessage });
};

export const onSuccess = ({ message }: IMessage) => {
  const currentLang = i18next.language;
  const localizedMessage = typeof message === 'object' ? (message[currentLang] ?? message['en']) : message;
  message && toastContainer.success({ title: localizedMessage });
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
