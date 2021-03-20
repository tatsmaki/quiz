import styled from 'styled-components';

interface StyledQuizStatusProps {
  status: string
}

export const StyledQuizesSelect = styled.div`
  display: flex;
  flex-direction: column;

  .ant-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 12vw;
    margin: .5vh 0;
  }
`;

export const StyledQuizStatus = styled.div`
  border-radius: 50%;
  width: 1vw;
  height: 1vw;
  background: ${(props: StyledQuizStatusProps) => {
    switch (props.status) {
      case 'edited': return 'yellow';
      case 'saved': return 'green';
      case 'failed': return 'red';
      default: return 'none';
    }
  }};
  color: #61616161;
  display: flex;
  align-items: center;
  
  span {
    margin-left: 4.5vw;
  }
`;
