import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

const StyledAppBar = styled(AppBar)`
  padding: 25px;
`;

const Header = () => {
  return (
    <StyledAppBar position="static">
      <Typography variant="h4">Pictzle</Typography>
      <Typography variant="subtitle1">Image Scrambling Puzzle Game</Typography>
    </StyledAppBar>
  );
};

export default Header;
