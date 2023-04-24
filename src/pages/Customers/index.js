import './customers.css';
import { useState } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiUser } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../services/api';

export default function Customers() {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [idade, setIdade] = useState();

    async function handleAdd(e) {
        e.preventDefault();

        if(nome !== '' && email !== '' && idade !== '' && idade >= 18) {
                try {
                    const response = await api.post('http://localhost:3000/users', {
                        name: nome,
                        email: email,
                        idade: parseInt(idade),
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    console.log(response.data);
                    toast.success("Usuário cadastrado com sucesso!");
                } catch (error) {
                    console.log("Ocorreu um erro ao cadastrar o usuário  " + error);
                    toast.error("Erro ao cadastrar esse usuário");
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
                <Title name="Usuários">
                    <FiUser size={25} />
                </Title>

                <div className='container'>
                    <form className='form-profile customers' onSubmit={handleAdd}>
                        <label>Nome</label>
                        <input type="text" placeholder='Nome do usuário' value={nome} onChange={(e) => setNome(e.target.value)} />

                        <label>Email</label>
                        <input type="text" placeholder='Email do usuário' value={email} onChange={(e) => setEmail(e.target.value)} />

                        <label>Idade</label>
                        <input type="text" placeholder='Idade do usuário' value={idade} onChange={(e) => setIdade(e.target.value)} />

                        <button type='submit' style={{fontSize: 20, color: '#fff', backgroundColor: '#181c2e', borderRadius: '8px', height: '40px', margin: '5px', padding: '5px'}}>Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
