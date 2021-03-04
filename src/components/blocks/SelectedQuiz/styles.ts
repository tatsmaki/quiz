import styled from 'styled-components';

const StyledSelectedQuiz = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 60vh;

  *::-webkit-scrollbar {
    width: 4px;    
  }

  *::-webkit-scrollbar-thumb {
    background: rgb(24, 144, 255, 0.6);
  }
`;

export default StyledSelectedQuiz;
