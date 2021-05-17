import './styles.scss';
import classNames from 'classnames';


export default function Header(
    {
        className,
        quotes,

    },
) {

    return (
        <header className={classNames('Header', className)}>
            <section className="Header__section">
                <h3 className="Header__title">
                    Ron Swanson Voter
                    <span className="Header__votes">({quotes.length})</span>
                </h3>
                <h4 className="Header__subtitle">&quot;Vote for your favorite quote!&quot;</h4>
            </section>


        </header>
    );
}
