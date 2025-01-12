import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

function Navbar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isAuthenticated = true; // Placeholder, podmień na logikę autoryzacji
    const menuItems = [
        { text: 'O nas', path: '/' },
        { text: 'Usługi', path: '/services' },
        { text: 'Galeria', path: '/gallery' },
        { text: 'Rezerwacja', path: '/booking' },
        { text: 'Kontakt', path: '/contact' },
    ];

    const userMenuItems = [
        { text: 'Moje konto', path: '/account' },
        { text: 'Historia wizyt', path: '/history' },
    ];

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
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
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                        sx={{ display: { xs: 'block', sm: 'none' } }} // Widoczne tylko na małych ekranach
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        AllAboutNail
                    </Typography>
                    <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
                        {menuItems.map((item) => (
                            <Button
                                color="inherit"
                                component={Link}
                                to={item.path}
                                key={item.text}
                                sx={{ display: { xs: 'none', sm: 'inline-flex' } }} // Widoczne na ekranach sm i większych
                            >
                                {item.text}
                            </Button>
                        ))}
                        {isAuthenticated &&
                            userMenuItems.map((item) => (
                                <Button
                                    color="inherit"
                                    component={Link}
                                    to={item.path}
                                    key={item.text}
                                    sx={{ display: { xs: 'none', sm: 'inline-flex' } }} // Widoczne na ekranach sm i większych
                                >
                                    {item.text}
                                </Button>
                            ))}
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
