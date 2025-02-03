import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { 
    AppBar, 
    Toolbar, 
    IconButton, 
    Typography, 
    Button, 
    Drawer, 
    Menu, 
    MenuItem,
    List,
    ListItem,
    ListItemText
} from '@mui/material';
import '../Style/Navbar.css';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const { isAuthenticated, logout, user } = useAuth();

    const menuItems = [
        { text: 'O nas', path: '/' },
        { text: 'Uslugi', path: '/Services' },
        { text: 'Galeria', path: '/gallery' },
        { text: 'Rezerwacja', path: '/booking' },
        { text: 'Kontakt', path: '/contact' },
    ];
    
    const authMenuItems = [
        { text: 'Zaloguj się', path: '/login' },
        { text: 'Zarejestruj się', path: '/register' },
    ];
    
    const userMenuItems = [
        { text: 'Moje konto', path: '/account' },
        ...(user?.roles?.includes('Admin') ? [{ text: 'Panel Administracyjny', path: '/admin' }] : []),
        //{ text: 'Historia wizyt', path: '/history' },
    ];

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await logout();
        handleClose();
        navigate('/');
    };

    const drawer = (
        <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {menuItems.map((item) => (
                    <ListItem button key={item.text} component={Link} to={item.path}>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
                {isAuthenticated &&
                    userMenuItems.map((item) => (
                        <ListItem button key={item.text} component={Link} to={item.path}>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
            </List>
        </div>
    );

    return (
        <>
            <AppBar position="static" className='Navbar'>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                        sx={{ display: { xs: 'block', sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        AllAboutNail
                    </Typography>
                    <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
                    {menuItems.map((item) => (
    <Button
        key={item.text}
        component={Link}
        to={item.path}
        sx={{ color: 'white', display: 'block' }}
    >
        {item.text}
    </Button>
))}

{!isAuthenticated && authMenuItems.map((item) => (
    <Button
        key={item.text}
        component={Link}
        to={item.path}
        sx={{ color: 'white', display: 'block' }}
    >
        {item.text}
    </Button>
))}

{isAuthenticated && (
    <>
        <IconButton
        
            onClick={handleMenu}
            color="inherit"
        >
            <AccountCircle />Moje konto
        </IconButton>
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            {userMenuItems.map((item) => (
                <MenuItem
                    key={item.text}
                    onClick={() => {
                        handleClose();
                        navigate(item.path);
                    }}
                >
                    {item.text}
                </MenuItem>
            ))}
            <MenuItem onClick={handleLogout}>Wyloguj się</MenuItem>
        </Menu>
    </>
)}
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                {drawer}
            </Drawer>
        </>
    );
}

export default Navbar;
