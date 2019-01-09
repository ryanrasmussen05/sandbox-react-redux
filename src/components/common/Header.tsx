import React from 'react';
import { Menu, Button, Dropdown, Icon } from 'antd';
import { Link } from 'react-router-dom';
import './Header.scss';
import {MenuMode} from "antd/lib/menu";

interface HeaderProps {
    currentPath: string;
}

interface NavMenuProps {
    mode: MenuMode;
    activeLink: string;
    className: string;
}

const NavMenu: React.FunctionComponent<NavMenuProps> = (props) => {
    return (
        <Menu
            mode={props ? props.mode : 'vertical'}
            selectedKeys={props ? [props.activeLink] : []}
            className={props ? props.className : ''}
        >
            <Menu.Item key="/"><Link to="/">Home</Link></Menu.Item>
            <Menu.Item key="/resume"><Link to="/resume">Resume</Link></Menu.Item>
            <Menu.Item key="/sandbox"><Link to="/sandbox">Sandbox</Link></Menu.Item>
        </Menu>
    )
};

class Header extends React.Component<HeaderProps> {
    render() {
        return (
            <div className="header flex items-center justify-between">
                <div className="title">Ryan Rasmussen</div>

                <Dropdown overlay={NavMenu} trigger={['click']} className="nav-dropdown">
                    <Button htmlType="button" type="primary" icon="bars"></Button>
                </Dropdown>

                <NavMenu mode="horizontal" activeLink={this.props.currentPath} className="nav-menu"/>
            </div>
        );
    }
}

export default Header;