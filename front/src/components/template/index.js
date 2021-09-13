import React from 'react';
export const Template = (props) => {
    const sideBar = React.useRef(null);
    const btnExibirMenu = React.useRef(null)
    const [menuMobileAtivo, setMenuMobileAtivo] = React.useState(false)

    const exibirMenuMobile = () => {
        sideBar.current.classList.toggle('none')
    }
    React.useEffect(() => {
        const isMobile = () => {
            const navegador = navigator.userAgentData.mobile;
            console.log('navegador: ' + navegador)
            if (navegador == true) {
                sideBar.current.classList.add('none')
                btnExibirMenu.current.classList.remove('none')
            }
        }
        isMobile();
    }, [])
    return (
        <div className="d-flex">
            <div className="animate__animated animate__fadeInLeft" ref={sideBar}>
                <div className="d-flex flex-column justify-content-between p-3 text-white" style={{ width: 280, height: '100vh', backgroundColor: '#2980B9' }}>
                    <div>
                        <a href="/" className="text-white text-decoration-none">
                            <h3 className="text-white mt-3 text-center">
                                Dashboard
                            </h3>
                        </a>
                        <hr />
                        <ul className="nav nav-pills flex-column mb-auto">
                            <li className="nav-item">
                                <a href="/" className="nav-link" aria-current="page">
                                    <i className="fas fa-home pr-2"></i> Inicio
                                </a>
                            </li>
                        </ul>
                        <ul className="nav nav-pills flex-column mb-auto">
                            <li>
                                <a href="/cadastrar" className="nav-link text-white">
                                    <i className="fas fa-plus-circle pr-2"></i> Cadastrar
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="dropdown">
                        <hr />
                        <button type="button" className="btn btn-light w-100">
                            <strong>
                                Sair
                            </strong>
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex-grow-1">
                <div className="p-3 w-100">
                    <header className="d-flex align-items-center header shadow-sm p-1">
                        <div className="p-2 none" ref={btnExibirMenu}>
                            <button onClick={() => exibirMenuMobile()} className="btn btn-light">
                                <i className="fas fa-bars" style={{ fontSize: '17px' }}></i>
                            </button>
                        </div>
                        <div className="p-2 ">
                            {props.icone}
                        </div>
                        <div className="p-2 flex-grow-1">
                            <h1>
                                {props.titulo}
                            </h1>
                        </div>
                        <div className="p-2 ">
                            <a href="/cadastrar" className="btn btn-light">
                                <i className="fas fa-times" style={{ fontSize: '17px' }}></i>
                            </a>
                        </div>
                    </header>
                    {props.children}
                </div>
            </div>
        </div>
    );

}