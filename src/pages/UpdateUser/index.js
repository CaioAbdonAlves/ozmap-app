import './new.css';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiUser } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { useParams } from 'react-router-dom';

export default function UpdateUser() {
    const { id } = useParams();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [idade, setIdade] = useState();

    useEffect(() => {
        api.get(`/${id}`)
        .then(response => {
            const user = response.data;
            setNome(user.name);
            setEmail(user.email);
            setIdade(user.idade);
        })
        .catch(error => {
            console.log(`Ocorreu um erro ao buscar o usuário: ${error}`);
        });
    }, [id]);

    async function handleUpdateUser(e) {
        e.preventDefault();

        if(nome !== '' && email !== '' && idade !== '' && idade >= 18) {
                try {
                    const response = await api.put(`/${id}`, {
                        name: nome,
                        email: email,
                        idade: parseInt(idade),
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    console.log(response.data);
                    toast.info("Usuário atualizado com sucesso!");
                } catch (error) {
                    console.log("Ocorreu um erro ao atualizar o usuário  " + error);
                    toast.error("Erro ao atualizar esse usuário");
                }
        } else {
            toast.error("Preencha todos os campos");
            toast.warn("A idade não pode ser menor que 18");
        }
    }

    return(
        <div>
            <Header />

            <div className='content'>
                <Title name="Atualizar Usuário">
                    <FiUser size={25} />
                </Title>

                <div className='container'>
                    <form className='form-profile customers' onSubmit={handleUpdateUser}>
                        <label>Nome</label>
                        <input type="text" placeholder='Nome do usuário' value={nome} onChange={(e) => setNome(e.target.value)} />

                        <label>Email</label>
                        <input type="text" placeholder='Email do usuário' value={email} onChange={(e) => setEmail(e.target.value)} />

                        <label>Idade</label>
                        <input type="text" placeholder='Idade do usuário' value={idade} onChange={(e) => setIdade(e.target.value)} />

                        <button type='submit' style={{fontSize: 20, color: '#fff', backgroundColor: '#181c2e', borderRadius: '8px', height: '40px', margin: '5px', padding: '5px'}}>Atualizar Usuário</button>
                    </form>
                </div>
            </div>
        </div>
    );
}