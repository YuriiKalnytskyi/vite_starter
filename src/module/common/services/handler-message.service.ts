import { AxiosError } from 'axios';
import i18next from 'i18next';

import { IMessage } from '@/module/common/types';
import { IAuthError } from '@/types';
import { toast } from '@/module/common/component';


export const onError = (_err: AxiosError<IAuthError>) => {
  const err = _err.response?.data as IAuthError;
  const currentLang = i18next.language;

  const isMessageObject = (message: any): message is { [key: string]: string } =>
    typeof message === 'object' && message !== null && !Array.isArray(message);

  const localizedMessage = isMessageObject(err?.message)
    ? err?.message[currentLang] || err?.message['en']
    : _err.message;

  toast.error({ title: localizedMessage });
};

export const onSuccess = ({ message }: IMessage) => {
  const currentLang = i18next.language;

  let localizedMessage: string;

  if (typeof message === 'object') {
    localizedMessage = message[currentLang] || message['en'];
  } else {
    localizedMessage = message;
  }

  toast.success({ title: localizedMessage });
};
