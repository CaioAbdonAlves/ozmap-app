import './dashboard.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Title from '../../components/Title';
import Modal from '../../components/Modal';
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi';
import api from '../../services/api';

export default function Dashboard(){

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(2);
  const [isEmpty, setIsEmpty] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [detail, setDetail] = useState();

  useEffect(() => {

    loadUsers();

    return () => {

    }
  }, [])

  async function loadUsers() {
    try {
      const response = await api.get();
      setUsers(response.data);
      console.log(response.data)
    } catch (error) {
      console.log(`Ocorreu um erro ao buscar os dados na api: ${error}`);
    }

    setLoading(false);
  }

  async function handleMore() {
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const response = await api.get(`http://localhost:3000/users?page=${nextPage}&pageSize=10`);
      setUsers(prevUsers => [...prevUsers, ...response.data]);
      setPage(nextPage);
      console.log(`usuários da página ${nextPage}:`, response.data);
      console.log(users);
    } catch (error) {
      console.log(`Ocorreu um erro ao buscar os dados na api: ${error}`);
    }
    setLoadingMore(false);
  }
  

  function togglePostModal(user) {
    setShowPostModal(!showPostModal);
    setDetail(user);
  }

  if(loading) {
    return(
      <div>
        <Header />

        <div className='content'>
          <Title name='Usuários'>
            <FiMessageSquare size={25} />
          </Title>

          <div className="container dashboard">
            <span>Buscando usuários...</span>
          </div>

        </div>
      </div>
    )
  }

  return(
    <div>
      <Header />

      <div className='content'>
        <Title name='Usuários Cadastrados'>
          <FiMessageSquare size={25} />
        </Title>

        {users.length === 0 ? (
          <div className="container dashboard">
            <span>Nenhum usuário registrado...</span>
            <Link to='/users' className='new'>
              <FiPlus size={25} color='#FFF' />
              Novo Usuário
            </Link>
          </div>
        ) : (
          <>
            <Link to='/users' className='new'>
              <FiPlus size={25} color='#FFF' />
              Novo Usuário
            </Link>

            <table>
              <thead>
                <tr>
                  <th scope='col'>Usuário</th>
                  <th scope='col'>Email</th>
                  <th scope='col'>Idade</th>
                  <th scope='col'>Cadastrado em:</th>
                  <th scope='col'>#</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => {
                  return(
                    <tr key={index}>
                    <td data-label='Usuário'>{user.name}</td>
                    <td data-label='Email'>{user.email}</td>
                    <td data-label='Idade'>{user.idade}</td>
                    <td data-label='Cadastrado'>{user.created_at}</td>
                    <td data-label='#'>
                      <button className='action' style={{backgroundColor: '#3583f6'}} onClick={ () => togglePostModal(user) }>
                        <FiSearch color='#FFF' size={17} />
                      </button>
                      <Link className='action' style={{backgroundColor: '#f6a935'}} to={`/updateuser/${user.name}`}>
                        <FiEdit2 color='#FFF' size={17} />
                      </Link>
                    </td>
                  </tr>
                  )
                })}
              </tbody>
            </table>

            {loadingMore && <h3 style={{ textAlign: 'center', marginTop: 15 }}>Buscando chamados...</h3>}
            { !loadingMore && !isEmpty && <button className='btn-more' onClick={handleMore}>Buscar mais</button>}

          </>
        )}

      </div>

      {showPostModal && (
        <Modal 
          conteudo={detail}
          close={togglePostModal}
        />
      )}
      
    </div>
  )
}