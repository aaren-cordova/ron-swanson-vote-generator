import renderer from 'react-test-renderer';
import QuoteListItem from './index';
let props;

function render() {
    return <QuoteListItem {...props}/>;
}

beforeEach(() => {
    props = {
        currentVote: {},
        label: '',
        numNoVotes: 0,
        numYesVotes: 0,
        value: '',
        setCurrentVote: function(){},

    };

});

test('matches the snapshot', () => {
    let component = renderer.create(render());
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('@className="my-class-name" matches the snapshot', () => {
    props.className = 'my-class-name';
    let component = renderer.create(render());
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('@label="my-custom-label" matches the snapshot', () => {
    props.label = 'my-custom-label';
    let component = renderer.create(render());
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('@numNoVotes=9 @numYesVotes=10 matches the snapshot', () => {
    props.numNoVotes = 9;
    props.numYesVotes = 10;
    let component = renderer.create(render());
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('@value="my-custom-value" matches the snapshot', () => {
    props.value = 'my-custom-value';
    let component = renderer.create(render());
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
