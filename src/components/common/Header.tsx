import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import './Header.scss';

interface HeaderProps {
    currentPath: string
}

class Header extends React.Component<HeaderProps> {
    render() {
        return (
            <div className="header flex items-center justify-between">
                <div className="title">Ryan Rasmussen</div>
                <Menu
                    mode="horizontal"
                    selectedKeys={[this.props.currentPath]}
                >
                    <Menu.Item key="/"><Link to="/">Home</Link></Menu.Item>
                    <Menu.Item key="/resume"><Link to="/resume">Resume</Link></Menu.Item>
                    <Menu.Item key="/sandbox"><Link to="/sandbox">Sandbox</Link></Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default Header;