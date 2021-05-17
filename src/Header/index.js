import './styles.scss';

export default function Header({numVotes}){
    return (
        <header className='Header'>
            <h3 className='Header__title'>Ron Swanson Voter</h3>
            <h4 className='Header__subtitle'>&quot;Vote for your favorite quote!&quot;</h4>
        </header>
    );
}