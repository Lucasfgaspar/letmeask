import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/buttom';
import { Link, useHistory } from 'react-router-dom';
import { FormEvent } from 'react';
import '../styles/auth.scss';
import { useState } from 'react';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';



export function NewRoom() {
    const {user } = useAuth()
    const [newRoom, setNewRoom] = useState('');
    const history = useHistory()

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoom.trim() === ''){
            alert('Digite o nome da sala')
            return;
        }

        const roomRef = database.ref('rooms');
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authId: user?.id,            
        })

        history.push(`/room/${firebaseRoom.key}`)
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="ilustração simbolizando perguntas e respostas" />
                <strong> Crie salas de Perguntas e Respostas ao vivo</strong>
                <p> Tire as dúvidas da sua audiência em tempo-real </p>
            </aside>

            <main>
                <div className="main-content">
                    <img src={logoImg} alt="letmeask" />
                    <h2>Criar uma nova sala</h2>

                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>

                    <p>
                        Quer entrar em uma sala existente? <Link to="/"> Clique aqui </Link>
                    </p>
                </div>
            </main>
        </div>
    )
}