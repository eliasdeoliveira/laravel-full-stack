import axios from 'axios';
import React from 'react';
import { Template } from './../../components/template/index';
import { api } from './../../services/api'
export default function Index() {
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeClientes, setListaDeClientes] = React.useState();
    const [texto, setTexto] = React.useState('');
    const inputTexto = React.useRef(null);

    const listarClientes = async () => {
        inputTexto.current.value = '';
        let resposta = await api({
            method: 'get',
            url: '/clientes'
        }).then((response) => {
            setMensagem('')
            return response.data;
        }).catch((error) => {
            setMensagem(
                <div className="alert alert-danger">
                    {error}
                </div>
            );
        });
        if (resposta.length > 0) {
            setListaDeClientes(
                [].map.call(resposta, function (informacao) {
                    return (
                        <tr key={informacao.id}>
                            <th scope="row">{informacao.id}</th>
                            <td>{informacao.nome}</td>
                            <td>{informacao.tipoCliente}</td>
                            <td>{informacao.categoria}</td>
                            <td>{informacao.telefone}</td>
                            <td className="text-centrer">
                                <a href={'/editar/' + informacao.id} className="btn btn-warning">
                                    <i className="fas fa-edit"></i>
                                </a>
                            </td>
                            <td className="text-centrer">
                                <a href={'excluir/' + informacao.id} className="btn btn-danger">
                                    <i className="fas fa-trash text-white"></i>
                                </a>
                            </td>
                        </tr>
                    )
                })
            )
        } else {
            setListaDeClientes(
                <tr>
                    <td className="text-centrer" colSpan="6">
                        Não existe registros ainda...
                    </td>
                </tr>
            )
        }

    }
    React.useEffect(() => {
        listarClientes()
    }, []);

    const onSubmitForm = (event) => {
        event.preventDefault();
        if (texto.length > 0) {
            pesquisarPorClientes(texto)
        }
    }

    const pesquisarPorClientes = async (texto) => {
        let resposta = await api({
            method: 'post',
            url: '/clientes/search',
            data: {
                'texto': texto
            }
        }).then((response) => {
            setMensagem('')
            return response.data;
        }).catch((error) => {
            setMensagem(
                <div className="alert alert-danger">
                    {error}
                </div>
            );
        });
        if (resposta.length > 0) {
            setListaDeClientes(
                [].map.call(resposta, function (informacao) {
                    return (
                        <tr key={informacao.id}>
                            <th scope="row">{informacao.id}</th>
                            <td>{informacao.nome}</td>
                            <td>{informacao.tipoCliente}</td>
                            <td>{informacao.categoria}</td>
                            <td>{informacao.telefone}</td>
                            <td className="text-centrer">
                                <a href={'/editar/' + informacao.id} className="btn btn-warning">
                                    <i className="fas fa-edit"></i>
                                </a>
                            </td>
                            <td className="text-centrer">
                                <a href={'excluir/' + informacao.id} className="btn btn-danger">
                                    <i className="fas fa-trash text-white"></i>
                                </a>
                            </td>
                        </tr>
                    )
                })
            )
        } else {
            setListaDeClientes(
                <tr>
                    <td className="text-centrer" colSpan="6">
                        Não existe registros ainda...
                    </td>
                </tr>
            )
        }

    }

    return (
        <Template icone={<i className="fas fa-home pr-2"></i>} titulo={'Inicio'}>
            <section>
                {mensagem}
                <form className="d-flex align-items-center mt-3" onSubmit={onSubmitForm}>
                    <div className="p-1 flex-grow-1 bd-highlight">
                        <div className="">
                            <input
                                type="text"
                                ref={inputTexto}
                                onKeyUp={(event) => {
                                    setTexto(event.target.value);
                                    pesquisarPorClientes(event.target.value)
                                }}
                                className="form-control"
                                placeholder="Pesquise aqui..."
                                required
                            />
                        </div>
                    </div>
                    <div className="p-1 bd-highlight">
                        <button type="submit" className="btn btnAzul">
                            <i className="fas fa-search text-white"></i>
                        </button>
                    </div>
                    <div className="p-1 bd-highlight">
                        <button type="button" className="btn btn-light" onClick={() => listarClientes()}>
                            <i className="fas fa-eraser"></i>
                        </button>
                    </div>
                    <div className="p-1 bd-highlight">
                        <a href={'/cadastrar'} className="btn btnAzul">
                            <i className="fas fa-plus text-white"></i> Cadastrar
                        </a>
                    </div>
                </form>
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Tipo Pessoa</th>
                                <th scope="col">Categoria</th>
                                <th scope="col">Telefone</th>
                                <th scope="col" colSpan="2">#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaDeClientes}
                        </tbody>
                    </table>
                </div>
            </section>
        </Template>
    )
}