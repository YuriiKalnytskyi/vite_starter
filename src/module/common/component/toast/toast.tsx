import { toast as Toast, ToastContainer, ToastOptions, TypeOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Styled from './toast.styled.ts';

interface IToast {
  title: string;
  text?: string;
}

type TToast = 'success' | 'error' | 'info' | 'warn';

const createToastComponent = ({ title, text }: IToast) => (
  <Styled.Container>
    <h3>{title}</h3>
    <p>{text}</p>
  </Styled.Container>
);


const showToast = (type: TToast, { title, text, ...props }: IToast & ToastOptions) => {

  const ToastComponent = createToastComponent({ title, text });

  Toast[type](ToastComponent, {
    autoClose: 5000,
    closeButton: true,
    ...props
  });
};


export const toast = {
  success: (props: IToast) => showToast('success', props),
  error: (props: IToast) => showToast('error', props),
  info: (props: IToast) => showToast('info', props),
  warn: (props: IToast) => showToast('warn', props),
  loading: ({ text, title }: IToast) => {
    const id = Toast.loading(createToastComponent({ title, text }), {
      closeButton: true,
      autoClose: false
    });

    const updateToast = (updateProps: IToast, type: TypeOptions) => {
      Toast.update(id, {
        render: createToastComponent(updateProps),
        type: type,
        isLoading: false,
        autoClose: 5000,
        closeButton: true
      });
    };

    return {
      success: (updateProps: IToast) => updateToast(updateProps, 'success'),
      error: (updateProps: IToast) => updateToast(updateProps, 'error'),
      info: (updateProps: IToast) => updateToast(updateProps, 'info'),
      warn: (updateProps: IToast) => updateToast(updateProps, 'warning')
    };
  }
};
export const ToastSetting = ({ stacked }: { stacked?: boolean }) => (
  <Styled.StyledToastContainer>
    <ToastContainer stacked={stacked} position="bottom-right" />
  </Styled.StyledToastContainer>
);

