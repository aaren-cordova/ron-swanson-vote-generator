import renderer from 'react-test-renderer';
import ThemeFieldset from './index';

let props;

function render() {
    return <ThemeFieldset {...props}/>;
}

beforeEach(() => {
    props = {
        theme: '',
        setTheme: jest.fn(),
    };
});

test('matches the snapshot', () => {
    let component = renderer.create(render());
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('@theme="light" matches the snapshot', () => {
    props.theme = 'light';
    let component = renderer.create(render());
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('@theme="dark" matches the snapshot', () => {
    props.theme = 'dark';
    let component = renderer.create(render());
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
