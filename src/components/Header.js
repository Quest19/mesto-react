import logo from "../images/header__logo.svg";

function Header() {
    return (
        <header className="header">
            <img
                src={logo}
                alt="Логотип Место(Россия)"
                className="header__logo"
            />
        </header>
    );
}

export default Header;
