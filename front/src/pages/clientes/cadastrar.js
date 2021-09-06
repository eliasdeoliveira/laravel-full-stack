import React from 'react';
import api from '../../services/api';
import { Template } from './../../components/template/index';
export default function Cadastrar() {
    const [mensagem, setMensagem] = React.useState('');
    const nome = React.useRef(null);
    const tipoCliente = React.useRef(null);
    const estado = React.useRef(null);
    const validandoFormulario = async (event) => {
        event.preventDefault();
        let dados = {
            'nome': nome.current.value,
            'tipoCliente': tipoCliente.current.value,
            'uf': estado.current.value,
        }
        await api({
            method: 'post',
            url: '/clientes/insert',
            data: dados
        }).then((response) => {
            setMensagem('')
            if (response.data.status == false) {
                setMensagem(
                    <div className="alert alert-danger text-center" style={{fontSize: 'large'}}>
                        <i className="fas fa-exclamation-triangle"></i> Ops! {response.data.mensagem}
                    </div>
                )
            } else {
                setMensagem(
                    <div className="alert alert-success text-center" style={{fontSize: 'x-large'}}>
                        <i className="far fa-smile"></i> Parabéns! Cadastro realizado com sucesso.
                    </div>
                );
                nome.current.value = '';
                tipoCliente.current.value = '';
                estado.current.value = '';
            }
            return response.data;
        }).catch(function (error) {
            setMensagem(
                <div className="alert alert-danger text-center">
                    <i className="fas fa-exclamation-triangle"></i> Ops! Ocorreu um erro
                </div>
            );
        });

    }
    return (
        <Template icone={<i className="fas fa-plus-circle"></i>} titulo={'Cadastrar'}>
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
                                ref={tipoCliente}
                                defaultValue="0">
                                <option selected disabled value={'0'}>Selecione</option>
                                <option value={'Pessoa Fisica'}>Pessoa Fisica</option>
                                <option value={'Pessoa Juridica'}>Pessoa Juridica</option>
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
                                ref={estado}
                                defaultValue="0">
                                <option selected disabled defaultValue={'0'}>Selecione</option>
                                <option value={'MG'}>Minas Gerais</option>
                                <option value={'SP'}>São Paulo</option>
                                <option value={'RJ'}>Rio de Janeiro</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btnAzul">
                            <i className="fas fa-save" style={{ color: 'white' }}></i> Cadastrar
                        </button>
                    </form>
                </div>
            </section>
        </Template>
    )
}