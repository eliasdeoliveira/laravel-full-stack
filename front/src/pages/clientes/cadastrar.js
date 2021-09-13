import React from 'react';
import api from '../../services/api';
import { Template } from './../../components/template/index';
import InputMask from "react-input-mask";

export default function Cadastrar() {
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeCategorias, setListaDeCategorias] = React.useState('');
    const nome = React.useRef(null);
    const tipoCliente = React.useRef(null);
    const estado = React.useRef(null);
    const categoria = React.useRef(null);
    const dataDeFundacao = React.useRef(null);
    const telefone = React.useRef(null);
    const validandoFormulario = async (event) => {
        event.preventDefault();
        let dados = {
            'nome': nome.current.value,
            'tipoCliente': tipoCliente.current.value,
            'uf': estado.current.value,
            'categoria_id': categoria.current.value,
            'dataFundacao': dataDeFundacao.current.value,
            'telefone': telefone.current.value,
        }
        console.log(JSON.stringify(dados))
        await api({
            method: 'post',
            url: '/clientes/insert',
            data: dados
        }).then((response) => {
            setMensagem('')
            console.log(response.data)
            if (response.data.status == false) {
                setMensagem(
                    <div className="alert alert-danger text-center" style={{ fontSize: 'large' }}>
                        <i className="fas fa-exclamation-triangle"></i> Ops! {response.data.mensagem}
                    </div>
                )
            } else {
                setMensagem(
                    <div className="alert alert-success text-center" style={{ fontSize: 'x-large' }}>
                        <i className="far fa-smile"></i> Parabéns! Cadastro realizado com sucesso.
                    </div>
                );
                nome.current.value = '';
                tipoCliente.current.value = '';
                estado.current.value = '';
                categoria.current.value = '';
                dataDeFundacao.current.value = '';
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
    React.useEffect(() => {
        const listarCategorias = async () => {
            let resposta = await api({
                method: 'get',
                url: '/categorias'
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
                setListaDeCategorias(
                    <>
                        {
                            [].map.call(resposta, function (informacao) {
                                return (
                                    <option key={informacao.id} value={informacao.id}>{informacao.nome}</option>
                                )
                            })
                        }
                    </>
                )
            } else {
                setListaDeCategorias(
                    <option value={0}>Não existe categoria</option>
                )
            }

        }
        listarCategorias()
    }, [])

    const InputTelefone = (props) => (
        <InputMask
            mask="(99) 9 9999-9999"
            value={props.value}
            onChange={props.onChange}
            ref={telefone}
            className="form-control w-100"
            required >
        </InputMask>
    );

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
                                <option disabled value={'0'}>Selecione</option>
                                <option value={'Pessoa Fisica'}>Pessoa Fisica</option>
                                <option value={'Pessoa Juridica'}>Pessoa Juridica</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="Nome"
                                className="form-label">
                                Categoria
                            </label>
                            <select
                                className="form-select"
                                required
                                ref={categoria}
                                defaultValue="0">
                                <option disabled value={'0'}>Selecione</option>
                                {listaDeCategorias}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="Nome"
                                className="form-label">
                                Data de Fundação / Data de Nascimento
                            </label>
                            <input
                                type="date"
                                className="form-control w-100"
                                placeholder="Nome"
                                required
                                ref={dataDeFundacao} />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="Nome"
                                className="form-label">
                                Telefone
                            </label>
                            <InputTelefone props={(event) => event} />
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
                                <option disabled value={'0'}>Selecione</option>
                                <option value={'Minas Gerais'}>Minas Gerais</option>
                                <option value={'São Paulo'}>São Paulo</option>
                                <option value={'Rio de Janeir'}>Rio de Janeiro</option>
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