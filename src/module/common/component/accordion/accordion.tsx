import { ReactNode, useEffect, useRef, useState } from 'react';

import arrowBottom from '@/assets/icons/default/arrow-bottom-icon.svg';

import * as Styled from './accordion.styled';
import { IIconInput, IMargin } from '@/module/common/types';
import { Icon } from '@/module/common/component';

export interface IAccordion extends IMargin {
  visibleBlock: ReactNode | string;
  children: ReactNode;

  icon?: IIconInput | ((focused: boolean) => ReactNode);
  isOpen?: boolean;
  isAutoManyClose?: boolean;
  name: string;
}

export const Accordion = ({
                            children,
                            icon,
                            name,
                            isOpen = false,
                            isAutoManyClose = false,
                            visibleBlock,
                            ...props
                          }: IAccordion) => {
  const ref = useRef<HTMLDetailsElement | null>(null);

  const _focused = ref?.current?.open ?? isOpen ?? false;

  const [focused, setFocused] = useState(_focused);


  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current) return;

      const target = e.target as HTMLElement;

      // Якщо клік саме по details або summary
      const isDetailsOrSummary =
        target.tagName === "DETAILS" || target.tagName === "SUMMARY";

      // Якщо клік був за межами поточного блоку — закриваємо
      // if (!ref.current.contains(target)) {
      //   setFocused(false);
      //   ref.current.open = false;
      //   return;
      // }

      // Якщо клік по summary всередині блоку — змінюємо стан
      if (isDetailsOrSummary) {
        const isCurrentlyOpen = !ref.current.open;
        console.log('-0-0-0-0-0-0-', isCurrentlyOpen,target.tagName);

        // if (isAutoManyClose) {
        //   const detailsElements = document.getElementsByTagName("details");
        //   for (let i = 0; i < detailsElements.length; i++) {
        //     if (detailsElements[i] !== ref.current && detailsElements[i].open) {
        //       detailsElements[i].open = false;
        //     }
        //   }
        // }

        setFocused(isCurrentlyOpen);
        // ref.current.open = isCurrentlyOpen;
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [focused, isAutoManyClose]);

  // const onClick = (e: MouseEvent<HTMLDetailsElement>) => {
  //   const target = e.target as HTMLElement;
  //   const parent = target.parentElement as HTMLDetailsElement;
  //   const open = parent.open;
  //
  //   setFocused(!open);
  //
  //   if (isAutoManyClose) {
  //     const detailsElements = document.getElementsByTagName('details');
  //     for (let i = 0; i < detailsElements.length; i++) {
  //       if (detailsElements[i] !== ref.current && detailsElements[i].open) {
  //         detailsElements[i].open = false;
  //       }
  //     }
  //   }
  // };

  return (
    <Styled.Details
      ref={ref}
      {...props}
      open={focused}
      // onClick={onClick}
    >
      <Styled.Summary
        className="summary"
        // onClick={onClick}
      >
        {visibleBlock}
        {
          icon && typeof icon === 'function'
            ? icon(focused)
            : (
              <Icon
                {...(icon as IIconInput)}
                icon={icon?.icon ?? arrowBottom}
                className={focused ? 'rotate' : ''}
              />
            )
        }
      </Styled.Summary>

      <section onClick={(e) => e.stopPropagation()} className="children">
        {children}
      </section>
    </Styled.Details>
  );
};
