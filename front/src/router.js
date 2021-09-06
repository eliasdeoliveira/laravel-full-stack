import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Cliente from './pages/clientes/index';
import CadastrarClientes from './pages/clientes/cadastrar';
import EditarClientes from './pages/clientes/editar';
import ExcluirCliente from './pages/clientes/excluir';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Cliente} />
                <Route path="/cadastrar" exact component={CadastrarClientes} />
                <Route path="/editar/:id" exact component={EditarClientes} />
                <Route path="/excluir/:id" exact component={ExcluirCliente} />
            </Switch>
        </BrowserRouter>
    );
}