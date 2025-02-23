import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import { Link } from '@tanstack/react-router';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout'; // ログアウトアイコンをインポート
import { useContext } from 'react';
import { LoginContext } from './LoginContextProvider';

export default function NavbarTop() {
  const isLoggedIn = useContext(LoginContext); // LoginContext から isLoggedIn と、必要であれば setLoggedIn などの関数を取り出す

  // ログアウト処理の関数 (仮)
  const handleLogout = () => {
    // 実際のログアウト処理 (例: localStorage からトークンを削除, context の状態を更新)
    // setLoggedIn(false);  // LoginContext に setLoggedIn 関数がある場合
    alert('Logoutが押された')
  };

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

        {/* 右端に要素を配置するための Box */}
        <Box sx={{ flexGrow: 1 }} />

        {/* isLoggedIn が true の場合のみログアウトアイコンを表示 */}
        {isLoggedIn && (
          <IconButton
            color="inherit"
            aria-label="logout"
            onClick={handleLogout} // クリック時に handleLogout 関数を実行
            sx={{
              '&:hover': {
                backgroundColor: '#f48fb1',
                color: 'white',
              },
            }}
          >
            <LogoutIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}
