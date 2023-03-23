import styled from 'styled-components';

import ElapsedTimeButton from './ElapsedTimeButton';
import ShowImageButton from './ShowImageButton';
import UnsolvedPiecesButton from './UnsolvedPiecesButton';

const Wrapper = styled.header`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 0;
  margin-bottom: 5px;
  column-gap: 10px;
`;

const TopBar = () => {
  return (
    <Wrapper>
      <UnsolvedPiecesButton />
      <ElapsedTimeButton />
      <ShowImageButton />
    </Wrapper>
  );
};

export default TopBar;
