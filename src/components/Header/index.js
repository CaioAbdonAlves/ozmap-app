import './header.css';
import { Link } from 'react-router-dom';
import { FiHome, FiUser } from 'react-icons/fi';

export default function Header() {

    return(
        <div className='sidebar'>
            <Link to="/">
                <FiHome color='#FFF' size={24} />
                Lista de usuários
            </Link>
            <Link to="/users">
                <FiUser color='#FFF' size={24} />
                Usuários
            </Link>
        </div>
    );
}