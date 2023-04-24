import React from 'react';
import './modal.css';

import { FiX } from 'react-icons/fi';

export default function Modal({conteudo, close}) {
    return(
        <div className='modal'>
           <div className='container'>
                <button className='close' onClick={ close }>
                    <FiX size={23} color="#FFF" />
                    Voltar
                </button>

                <div>
                    <h2>Detalhes do usuário</h2>

                    <div className='row'>
                        <span>
                            Usuário: <i>{conteudo.name}</i>
                        </span>
                    </div>

                    <div className='row'>
                        <span>
                            Email: <i>{conteudo.email}</i>
                        </span>
                        <span>
                            Idade: <i>{conteudo.idade}</i>
                        </span>
                    </div>

                </div>
           </div>
        </div>
    );
}