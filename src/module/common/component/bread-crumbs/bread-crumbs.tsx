import { useNavigate } from 'react-router-dom';

import * as Styled from './bread-crumbs.styled.ts';

interface IBreadCrumbs {
  crumbs: {
    name: string | undefined;
    navigation: string | null;
  }[];
}

export const BreadCrumbs = ({ crumbs }: IBreadCrumbs) => {
  const navigate = useNavigate();

  return (
    <Styled.Wrapper>
      {crumbs.map((crumb, index) => (
        <span
          key={index}
          onClick={() => {
            crumb.navigation && navigate(crumb.navigation);
          }}
        >
          {crumb.name}
          <span className='separator'> {index < crumbs.length - 1 && ' /  '}</span>
        </span>
      ))}
    </Styled.Wrapper>
  );
};
