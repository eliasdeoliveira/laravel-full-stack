import React from 'react';
import api from '../../services/api';
import { Template } from './../../components/template/index';
import InputMask from "react-input-mask";
export default function Editar(props) {
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
        let id = props.match.params.id;
        let dados = {
            'nome': nome.current.value,
            'tipoCliente': tipoCliente.current.value,
            'uf': estado.current.value,
            'categoria_id': categoria.current.value,
            'dataFundacao': dataDeFundacao.current.value,
            'telefone': telefone.current.value,
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
                estado.current.value = resposta[0].uf;
                categoria.current.value = resposta[0].categoria_id;
                dataDeFundacao.current.value = resposta[0].dataFundacao;
                setNumero(resposta[0].telefone);
            }
        }
        listarClientes();
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
    }, []);

    const [numero, setNumero] = React.useState('');

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
                            {/* <InputTelefone
                                // props={(event) => event}
                                onKeyUp={(evt) => setNumero(evt.target.value)}
                            /> */}
                            <InputMask
                                mask="(99) 9 9999-9999"
                                value={numero}
                                onChange={(evt) => setNumero(evt.target.value)}
                                ref={telefone}
                                className="form-control w-100"
                                required >
                            </InputMask>
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
                                <option disabled value={'0'}>Selecione</option>
                                <option value={'Minas Gerais'}>Minas Gerais</option>
                                <option value={'São Paulo'}>São Paulo</option>
                                <option value={'Rio de Janeiro'}>Rio de Janeiro</option>
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