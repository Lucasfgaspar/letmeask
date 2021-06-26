import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/buttom';
import { RoomCode } from '../components/roomCode';
import '../styles/room.scss';
import { useParams } from 'react-router';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';

import deleteImg from '../assets/images/delete.svg'
import { database } from '../services/firebase';
import { useHistory } from 'react-router-dom';


type RoomParams = {
    id: string;
}

export function AdminRoom() {
    //const {user} = useAuth();
    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const {title, questions} = useRoom(roomId)

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })

        history.push('/')
    }

   async function handleDeleteQuestion (questionId: string) {
       if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')){
           await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
       }
   }

   
    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Logo" />
                    <div>
                        <RoomCode code={roomId}/>
                        <Button onClick={handleEndRoom}>Encerrar sala</Button>
                    </div>
                    
                </div>
            </header>

            <main className="content">
                <div className="room-title">
                    <h1>Sala: {title}</h1>
                    { questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>


               <div className="question-list">
               {questions.map(question => {
                    return (
                        <Question 
                            key={question.id}
                            content={question.content}
                            autor={question.autor}
                        >
                            <button
                                type="button"
                                onClick={() => handleDeleteQuestion(question.id)}
                            >
                                <img src={deleteImg} alt="delete" />
                            </button>
                        </Question>
                        
                    );
                })}
               </div>
            </main>
        </div>
    );
}