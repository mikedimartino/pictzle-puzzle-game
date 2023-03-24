import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledAppBar = styled(AppBar)`
  padding: 25px 50px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledButton = styled(Button)`
  color: white;
`;

const Header = () => {
  return (
    <StyledAppBar position="static">
      <div>
        <Typography variant="h4">Pictzle</Typography>
        <Typography variant="subtitle1">
          Image Scrambling Puzzle Game
        </Typography>
      </div>
      <div>
        <StyledLink to="/">
          <StyledButton>New Puzzle</StyledButton>
        </StyledLink>
      </div>
    </StyledAppBar>
  );
};

export default Header;
