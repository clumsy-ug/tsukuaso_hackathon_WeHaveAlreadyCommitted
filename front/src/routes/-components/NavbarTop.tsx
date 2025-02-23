import { AppBar, Toolbar, IconButton } from '@mui/material';
import { Link } from '@tanstack/react-router';
import HomeIcon from '@mui/icons-material/Home';

export default function NavbarTop() {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#f8bbd0' }}> {/* 薄いピンク */}
      <Toolbar>
        <IconButton
          color="inherit"
          component={Link}
          to="/"
          aria-label="home"
          sx={{
            '&:hover': {
              backgroundColor: '#f48fb1', // 濃いピンク (ホバー時)
              color: 'white' // ホバー時のアイコンの色
            },
          }}
        >
          <HomeIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
