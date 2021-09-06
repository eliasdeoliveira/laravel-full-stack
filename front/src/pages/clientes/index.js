import axios from 'axios';
import React from 'react';
import { Template } from './../../components/template/index';
import { api } from './../../services/api'
export default function Index() {
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeClientes, setListaDeClientes] = React.useState();
    React.useEffect(() => {
        const listarClientes = async () => {
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
            setListaDeClientes(
                [].map.call(resposta, function (informacao) {
                    return (
                        <tr key={informacao.id}>
                            <th scope="row">{informacao.id}</th>
                            <td>{informacao.nome}</td>
                            <td>{informacao.tipoCliente}</td>
                            <td>{informacao.uf}</td>
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
        }
        listarClientes()
    }, [])
    return (
        <Template icone={<i className="fas fa-home pr-2"></i>} titulo={'Inicio'}>
            <section>
                {mensagem}
                <a href={'/cadastrar'} className="btn btnAzul mt-3">
                    <i className="fas fa-plus text-white"></i> Cadastrar
                </a>
                <div class="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Tipo Pessoa</th>
                                <th scope="col">Estado</th>
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