import classNames from 'classnames';
import './styles.scss';

export default function ThemeFieldset({className, theme, setTheme}) {
    function onChange(event) {
        setTheme(event.target.value);
    }

    return (
        <fieldset
            className={classNames('ThemeFieldset', className)}
            onChange={onChange}
        >
            <label className="ThemeFieldset__label">Theme</label>
            <input
                type="radio"
                id="theme-light-input"
                name="theme"
                value="light"
                checked={theme === 'light'}
            />
            <label
                className="ThemeFieldset__label"
                htmlFor="theme-light-input"
            >
                Light
            </label>
            <input
                type="radio"
                id="theme-dark-input"
                name="theme"
                value="dark"
                checked={theme === 'dark'}
            />
            <label
                className="ThemeFieldset__label"
                htmlFor="theme-dark-input"
            >
                Dark
            </label>
        </fieldset>
    );
}