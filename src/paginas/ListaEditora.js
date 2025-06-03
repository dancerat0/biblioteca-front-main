import TituloLista from "../componentes/TituloLista";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ListaEditora() {
    const [dados, setDados] = useState([]);

    const listar = async () => {
        let { data } = await axios.get(`http://localhost:4000/editora`);
        setDados(data);
    };

    useEffect(() => {
        listar();
    }, []);

    return (
        <>
            <TituloLista
                titulo="Editoras"
                descricao="Gerencie aqui as editoras dos livros da biblioteca"
                rota="/cadastroeditora"
            />

            <div className="row">
                <div className="col">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Código</th>
                                <th>Nome</th>
                                <th>CNPJ</th>
                                <th>Endereço</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dados.map((d) => (
                                <tr key={d.ideditora}>
                                    <td>
                                        <a className="btn btn-primary" href={`/cadastroeditora/${d.ideditora}`}>
                                            Alterar
                                        </a>
                                    </td>
                                    <td>{d.ideditora}</td>
                                    <td>{d.nomeeditora}</td>
                                    <td>{d.cnpj}</td>
                                    <td>{d.endereco}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
