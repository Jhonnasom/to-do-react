import imageAvatar from'./assets/avatar.jpg';
import './PresentationCard.css';

function PresentationCard(){
    let name='Jhonna';
return(
    <div className="presentation-card">
        <img src={imageAvatar} alt="Avatar" className="avatar"/>
        <h1>
            Hola soy {name} y estoy aprendiendo React
        </h1>
    </div>
    );
}

export default PresentationCard;