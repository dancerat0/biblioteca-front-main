import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import TituloCadastro from "../componentes/TituloCadastro";

export default function FormUsuario() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [nascimento, setNascimento] = useState('');

    const voltar = () => {
        navigate('/listausuario');
    };

    const selecionar = async () => {
        const { data } = await axios.get(`http://localhost:4000/usuario/${id}`);
        setNome(data.nome);
        setCpf(data.cpf);
        setEmail(data.email);
        setTelefone(data.telefone);
        setNascimento(data.nascimento);
    };

    const salvar = async () => {
        const body = { nome, cpf, email, telefone, nascimento };

        if (id) {
            await axios.put(`http://localhost:4000/usuario/${id}`, body);
        } else {
            await axios.post(`http://localhost:4000/usuario`, body);
        }

        voltar();
    };

    const excluir = async () => {
        await axios.delete(`http://localhost:4000/usuario/${id}`);
        voltar();
    };

    useEffect(() => {
        if (id) selecionar();
    }, [id]);

    return (
        <div className="container mt-4">
            <TituloCadastro id={id} titulo="usuário" />

            <form>
                {id && (
                    <div className="mb-3">
                        <label className="form-label">Código</label>
                        <input type="text" className="form-control" value={id} disabled />
                    </div>
                )}

                <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">CPF</label>
                    <input
                        type="text"
                        className="form-control"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Telefone</label>
                    <input
                        type="text"
                        className="form-control"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Nascimento</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nascimento}
                        onChange={(e) => setNascimento(e.target.value)}
                    />
                </div>
                <button type="button" className="btn btn-primary"
                    onClick={() => salvar()}>
                    Salvar
                </button>
                <button type="button"
                    className="btn btn-secondary"
                    onClick={() => voltar()}>
                    Cancelar
                </button>
                {id && (
                    <button type="button"
                        className="btn btn-danger"
                        onClick={() => excluir()}>
                        Excluir
                    </button>
                )}
            </form>
        </div>
    );
}
