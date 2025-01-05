import toast from 'react-hot-toast';

import { Icons } from '@/assets';
import { COLORS } from '@/theme';

import * as Styled from './toast.styled';

export interface IToastTitleProps {
  title: string;
  text?: string;
}

export interface ISantaToastNotify extends IToastTitleProps {
  icon: string;
  color: string;
}

const style = {
  maxWidth: '700px',
  top: '100px',
  background: COLORS.black,
  color: COLORS.white,
  borderRadius: '8px'
};

class ToastContainer {
  private notify({ title, text, icon, color }: ISantaToastNotify) {
    toast(
      <Styled.ContentDiv data-element="toast">
        <Styled.ContentDivColumn>
          <h1>{title}</h1>
          <p>{text}</p>
        </Styled.ContentDivColumn>
      </Styled.ContentDiv>,
      {
        icon: (
          <Styled.Icon
            className="icon"
            style={{
              WebkitMaskImage: `url(${icon})`,
              WebkitMaskSize: '100% 100%',
              maskImage: `url(${icon})`,
              background: color
            }}
          />
        ),
        style,
        duration: 5000
      }
    );
  }

  public async success({ title, text }: IToastTitleProps) {
    const els = document.querySelectorAll('.go2072408551');

    if (els.length >= 3) {
      els[els.length - 1].remove();

      const element = document.querySelector(els[els.length - 1].className);

      if (element) {
        element.remove();
      }
    }

    this.notify({ title, text, icon: (await Icons).successIcon, color: COLORS.success });
  }

  public async error({ title, text }: IToastTitleProps) {
    this.notify({ title, text, icon: (await Icons).successIcon, color: COLORS.error });
  }
}

export const toastContainer = new ToastContainer();
