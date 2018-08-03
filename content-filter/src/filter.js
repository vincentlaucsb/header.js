class Filter extends React.Component {
    // props should contain list of tags and items
    constructor(props) {
        super(props);
        
        // List of tags
        const values = Object.values(props.items);
        this.tags = new Set();
        for (var i = 0; i < values.length; i++) {
            for (var j = 0; j < values[i].tags.length; j++) {
                this.tags.add(values[i].tags[j]);
            }
        }
        this.tags = Array.from(this.tags);        
        
        // Maps tags whether or not they are active
        this.active = {};
        for (var i = 0; i < this.tags.length; i++) {
            this.active[this.tags[i]] = true;
        }
    }
    
    handleClick(i) {
        var _active = this.active;
        _active[i] = !(this.active[i]);
        
        this.setState({active: _active});
    }
    
    render() {
        var active_tags = new Set();
        var cand_tags = Object.keys(this.active);
        
        for (var i = 0; i < cand_tags.length; i++) {
            if (this.active[cand_tags[i]]) {
                active_tags.add(cand_tags[i]);
            }
        }
        
        return (
            <div className="filter">
                <TagList tags={this.tags} onClick={i => this.handleClick(i)} />
                <ItemSet items={this.props.items} activeTags={active_tags} />
            </div>
        );
    }
}

function TagList(props) {
    return (
        <nav>
        {props.tags.map((i) =>
            <Tag key={i} name={i} onClick={() => props.onClick(i)} />
        )}
        </nav>
    );
}

function Tag(props) {
    return (
        <button className="tag" onClick={props.onClick}>
            {props.name}
        </button>
    );
}

function ItemSet(props) {
    return (
        <div>
        {props.items.map((i) => <Item
            key={i.title}
            title={i.title}
            description={i.description}
            tags={i.tags}
            activeTags={props.activeTags}
        />)}
        </div>
    );    
}

class Item extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        var is_visible = false;
        for (var i = 0; i < this.props.tags.length; i++) {
            if (this.props.activeTags.has(this.props.tags[i])) {
                is_visible = true;
            }
        }
        
        var divStyle = {
            display: 'none'
        };
        
        if (is_visible) {
            divStyle.display = "block";
        }
        
        return (
            <div style={divStyle} className="item">
                <h3>{this.props.title}</h3>
                <p>{this.props.description}</p>
            </div>
        );
    }
}

ReactDOM.render(
    <Filter items={items} />,
    document.getElementById('root')
)