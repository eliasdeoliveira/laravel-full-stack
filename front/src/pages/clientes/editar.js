import React from 'react';
import api from '../../services/api';
import { Template } from './../../components/template/index';
export default function Editar(props) {
    const [mensagem, setMensagem] = React.useState('');
    const nome = React.useRef(null);
    const tipoCliente = React.useRef(null);
    const estado = React.useRef(null);
    const validandoFormulario = async (event) => {
        event.preventDefault();
        let id = props.match.params.id;
        let dados = {
            'nome': nome.current.value,
            'tipoCliente': tipoCliente.current.value,
            'uf': estado.current.value,
        }
        await api({
            method: 'put',
            url: '/clientes/update/' + id,
            data: dados
        }).then((response) => {
            setMensagem(
                <div className="alert alert-success text-center" style={{ fontSize: 'x-large' }}>
                    <i className="far fa-smile"></i> Parabéns! Cliente atualizado com sucesso.
                </div>
            )
            return response.data;
        }).catch(function (error) {
            setMensagem(
                <div className="alert alert-danger text-center">
                    <i className="fas fa-exclamation-triangle"></i> Ops! Ocorreu um erro
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
            if (resposta.length) {
                nome.current.value = resposta[0].nome;
                tipoCliente.current.value = resposta[0].tipoCliente;
                estado.current.value = resposta[0].estado;
            }
        }
        listarClientes()
    }, [])
    return (
        <Template icone={<i className="fas fa-edit"></i>} titulo={'Editar'}>
            <section>
                <div className="shadow-sm p-3 mt-3">
                    {mensagem}
                    <form className="w-100" method="post" action="#" onSubmit={validandoFormulario}>
                        <div className="mb-3">
                            <label
                                htmlFor="Nome"
                                className="form-label">
                                Nome
                            </label>
                            <input
                                type="text"
                                className="form-control w-100"
                                placeholder="Nome"
                                required
                                ref={nome} />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="Nome"
                                className="form-label">
                                Tipo de Pessoa
                            </label>
                            <select
                                className="form-select"
                                required
                                ref={tipoCliente}>
                                <option selected disabled defaultValue={'0'}>Selecione</option>
                                <option defaultValue={'Pessoa Fisica'}>Pessoa Fisica</option>
                                <option defaultValue={'Pessoa Juridica'}>Pessoa Juridica</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="Nome"
                                className="form-label">
                                Estado
                            </label>
                            <select
                                className="form-select"
                                required
                                ref={estado}>
                                <option selected disabled defaultValue={'0'}>Selecione</option>
                                <option defaultValue={'Minas Gerais'}>Minas Gerais</option>
                                <option defaultValue={'São Paulo'}>São Paulo</option>
                                <option defaultValue={'Rio de Janeiro'}>Rio de Janeiro</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btnAzul">
                            <i className="fas fa-save" style={{ color: 'white' }}></i> Atualizar
                        </button>
                    </form>
                </div>
            </section>
        </Template>
    )
}