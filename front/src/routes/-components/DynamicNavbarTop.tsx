import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import { Link, useNavigate } from '@tanstack/react-router';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { use } from 'react';
import { User } from '@supabase/supabase-js';
import { logout } from '~/../../clientSupabase/supabase/auth/logout'

export default function DynamicNavbarTop({ user }: { user: Promise<User | null> }) {
  const navigate = useNavigate()
  const _user = use(user)

  const handleLogout = async () => {
    const ok = await logout()
    if (!ok) {
      alert('ログアウトに失敗しました')
      return
    }
    navigate({ to: '/' })
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
        {_user && (
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
