import React from 'react';
import api from '../../services/api';
import { Template } from '../../components/template/index';
export default function Editar(props) {
    const sessoaPergunta = React.useRef(null);
    const [mensagem, setMensagem] = React.useState(
        <>
            <div className="alert alert-danger text-center" role="alert" style={{ fontSize: 'large' }}>
                <i className="fas fa-exclamation-triangle"></i> Atenção! Você realmente deseja excluir este item?
            </div>
            <div className="mt-3 text-center">
                <button className="btn btnAzul" onClick={() => { excluirCliente() }}>
                    <i className="fas fa-check" style={{ color: 'white' }}></i> Sim
                </button>
                <a href="/" className="btn btn-light">
                    <i className="fas fa-check"></i> Cancelar
                </a>
            </div>
        </>
    );
    const excluirCliente = async () => {
        let id = props.match.params.id;
        await api({
            method: 'delete',
            url: '/clientes/delete/' + id
        }).then((response) => {
            setMensagem(
                <div className="text-center">
                    <div className="alert alert-success text-center" style={{ fontSize: 'x-large' }}>
                        <i className="far fa-smile"></i> Parabéns! Cliente excluido com sucesso.
                    </div>
                    <a href="/" className="btn btn-light mt-2">
                        <i className="fas fa-home pr-2"></i> Retornar para pagina inicial
                    </a>
                </div>
            );
            return response.data;
        }).catch(function (error) {
            setMensagem(
                <div className="text-center">
                    <div className="alert alert-danger text-center">
                        <i className="fas fa-exclamation-triangle"></i> Ops! Ocorreu um erro
                    </div>
                    <a href="/" className="btn btn-light mt-2">
                        Retornar para pagina inicial
                    </a>
                </div>
            );
        });

    }

    React.useEffect(() => {
        const listarClientes = async () => {
            let id = props.match.params.id;
            let resposta = await api({
                method: 'get',
                url: '/clientes/get/' + id
            }).then((response) => {
                return response.data;
            }).catch((error) => {
                setMensagem(
                    <div className="alert alert-danger">
                        {error}
                    </div>
                );
            });
        }
        listarClientes()
    }, [])
    return (
        <Template icone={<i className="fas fa-trash"></i>} titulo={'Excluir'}>
            <section>
                <div className="shadow-sm p-3 mt-3">
                    {mensagem}

                </div>
            </section>
        </Template>
    )
}