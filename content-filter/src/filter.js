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
    
    toggleAll(show) {
        var _active = this.active;
        for (var key in this.active) {
            _active[key] = show;
        }
        
        console.log(this);
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
        
        var that = this;
        
        return (
            <div className="filter">
                <TagList
                    tags={this.tags}
                    activeTags={active_tags}
                    onClick={i => this.handleClick(i)}
                />
                <nav className="toggle-all">
                    <button onClick={i => this.toggleAll(false)}>hide all</button>
                    <button onClick={i => this.toggleAll(true)}>show all</button>
                </nav>
                <ItemSet items={this.props.items} activeTags={active_tags} />
            </div>
        );
    }
}

function TagList(props) {
    return (
        <nav>
            {props.tags.map((i) =>
                <Tag key={i} name={i} activeTags={props.activeTags} onClick={() => props.onClick(i)} />
            )}
        </nav>
    );
}

function Tag(props) {
    const is_active = props.activeTags.has(props.name);
    var class_name = "tag inactive";
    if (is_active) {
        class_name = "tag";
    }
        
    return (
        <button className={class_name} onClick={props.onClick}>
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
            links={i.links}
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
            display: "none"
        };
        
        if (is_visible) {
            divStyle.display = "";
        }
        
        /** If undefined */
        if (this.props.links) {
            var links = this.props.links;
        } else {
            var links = [];
        }
        
        return (
            <div style={divStyle} className="item">
                <h3>{this.props.title}</h3>
                <p className="tags">
                    {this.props.tags.map((i) => <span>{i}</span>)}
                </p>
                <p className="description">
                    {this.props.description}
                </p>
                <nav>
                    {links.map((i) => <a href={i.url}>{i.name}</a>)}
                </nav>
            </div>
        );
    }
}

ReactDOM.render(
    <Filter items={items} />,
    document.getElementById('root')
)