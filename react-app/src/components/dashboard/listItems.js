import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>
    <Link to='/'>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
          <ListItemText primary="Trang Chủ" />
      </ListItemButton>
    </Link>

    <Link to='/bien-che'>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
          <ListItemText primary="Biên Chế" />
      </ListItemButton>
    </Link>

    <Link to='/trang-bi'>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
          <ListItemText primary="Trang Bị" />
      </ListItemButton>
    </Link>

    <Link to='/dieu-kien-huan-luyen'>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
          <ListItemText primary="Điều Kiện Huấn Luyện" />
      </ListItemButton>
    </Link>

    <Link to='/noi-dung-bai-tap'>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
          <ListItemText primary="Thứ tự, Nội dung bài tập" />
      </ListItemButton>
    </Link>

    <Link to='/profile'>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
          <ListItemText primary="Profile" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
