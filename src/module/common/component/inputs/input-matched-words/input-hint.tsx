import * as Styled from './input-matched-words.styled';

interface IProps {
  str: string;
  selected: boolean;
  setValue: any;
  isChip: boolean;
  padding?: any;
  isNewWindow?: boolean;
  icon?: string;
}

export const InputHint = ({
  str,
  setValue,
  selected,
  isChip,
  padding,
  isNewWindow,
  icon
}: IProps) => (
  <Styled.HintOption
    isNewWindow={isNewWindow}
    padding={padding}
    onClick={setValue}
    selected={selected}
    isChip={isChip}
  >
    {icon && (
      <img
        src={icon}
        alt='icon'
        height={24}
        width={24}
        style={{ objectFit: 'cover', borderRadius: '0.25rem' }}
      />
    )}
    {str}
  </Styled.HintOption>
);
