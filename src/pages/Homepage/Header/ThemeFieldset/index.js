import classNames from 'classnames';
import './styles.scss';
import PropTypes from 'prop-types';
import {Radio} from 'antd';

ThemeFieldset.propTypes = {
    className: PropTypes.string,
    setTheme: PropTypes.func.isRequired,
    theme: PropTypes.string.isRequired,
};
export default function ThemeFieldset({className, theme, setTheme}) {
    function onChange(event) {
        setTheme(event.target.value);
    }

    return (
        <fieldset
            className={classNames('ThemeFieldset', className)}
        >
            <label className="ThemeFieldset__label">Theme</label>

            <Radio.Group
                onChange={onChange}
                value={theme}
            >
                <Radio
                    id="theme-light-input"
                    name="theme"
                    value="light"
                />
                <label
                    className="ThemeFieldset__label"
                    htmlFor="theme-light-input"
                >
                    Light
                </label>
                <Radio
                    id="theme-dark-input"
                    name="theme"
                    value="dark"
                />
                <label
                    className="ThemeFieldset__label"
                    htmlFor="theme-dark-input"
                >
                    Dark
                </label>
            </Radio.Group>


        </fieldset>
    );
}