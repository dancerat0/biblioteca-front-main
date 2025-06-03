import TituloLista from "../componentes/TituloLista";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ListaUsuario() {
    const [dados, setDados] = useState([]);

    const listar = async () => {
        const { data } = await axios.get("http://localhost:4000/usuario");
        setDados(data);
    };

    useEffect(() => {
        listar();
    }, []);

    return (
        <>
            <TituloLista
                titulo="Usuários"
                descricao="Gerencie os usuários cadastrados no sistema"
                rota="/cadastrousuario"
            />

            <div className="row">
                <div className="col">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Ações</th>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Email</th>
                                <th>Telefone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dados.map((usuario) => (
                                <tr key={usuario.idusuario}>
                                    <td>
                                        <a
                                            className="btn btn-primary"
                                            href={`/cadastrousuario/${usuario.idusuario}`}
                                        >
                                            Alterar
                                        </a>
                                    </td>
                                    <td>{usuario.nome}</td>
                                    <td>{usuario.cpf}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.telefone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
