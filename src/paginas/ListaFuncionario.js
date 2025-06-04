import TituloLista from "../componentes/TituloLista";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ListaFuncionario() {
    const [dados, setDados] = useState([]);

    const listar = async () => {
        let { data } = await axios.get(`http://localhost:4000/funcionario`);
        setDados(data);
    };

    useEffect(() => {
        listar();
    }, []);

    return (
        <>
            <TituloLista
                titulo="Funcionários"
                descricao="Gerencie aqui os funcionários cadastrados"
                rota="/cadastrofuncionario"
            />

            <div className="row">
                <div className="col">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>E-mail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dados.map((func, i) => (
                                <tr key={i}>
                                    <td>
                                        <a className="btn btn-primary" href={`/cadastrofuncionario/${func.idfuncionario}`}>
                                            Alterar
                                        </a>
                                    </td>
                                    <td>{func.nomefuncionario}</td>
                                    <td>{func.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
