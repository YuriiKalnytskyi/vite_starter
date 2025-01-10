import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface IToast {
    title: string;
    text?: string;
}

type TToast = 'success' | 'error' | 'info' | 'warn' | 'dark';

const showToast = (type: TToast, {title, text}: IToast) => {
    const ToastComponent = (
        <div>
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
    );

    const autoCloseTime = 5000;

    toast[type](ToastComponent, {
        autoClose: autoCloseTime,
        closeButton: true,
    });
};


export const toastContainer = {
    success: (props: { title: string; text?: string }) => showToast('success', props),
    error: (props: { title: string; text?: string }) => showToast('error', props),
    info: (props: { title: string; text?: string }) => showToast('info', props),
    warn: (props: { title: string; text?: string }) => showToast('warn', props),
    dark: (props: { title: string; text?: string }) => showToast('dark', props),
};

export const ToastContainerComponent = () => <ToastContainer position="bottom-right" />;
