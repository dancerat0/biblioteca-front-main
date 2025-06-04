import TituloLista from "../componentes/TituloLista";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ListaLivro() {
    const [dados, setDados] = useState([]);

    const listar = async () => {
        let { data } = await axios.get(`http://localhost:4000/livro`);
        setDados(data);
    };

    useEffect(() => {
        listar();
    }, []);

    return (
        <>
            <TituloLista
                titulo="Livros"
                descricao="Gerencie aqui os livros cadastrados"
                rota="/cadastrolivro"
            />

            <div className="row">
                <div className="col">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Título</th>
                                <th>Ano</th>
                                <th>Categoria</th>
                                <th>Editora</th>
                                <th>Edição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dados.map((livro, i) => (
                                <tr key={i}>
                                    <td>
                                        <a className="btn btn-primary" href={`/cadastrolivro/${livro.idlivro}`}>
                                            Alterar
                                        </a>
                                    </td>
                                    <td>{livro.titulo}</td>
                                    <td>{livro.publicacao}</td>
                                    <td>{livro.idcatagoria}</td>
                                    <td>{livro.ideditora}</td>
                                    <td>{livro.edicao}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
