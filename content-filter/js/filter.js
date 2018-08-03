var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Filter = function (_React$Component) {
    _inherits(Filter, _React$Component);

    // props should contain list of tags and items
    function Filter(props) {
        _classCallCheck(this, Filter);

        // List of tags
        var _this = _possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).call(this, props));

        var values = Object.values(props.items);
        _this.tags = new Set();
        for (var i = 0; i < values.length; i++) {
            for (var j = 0; j < values[i].tags.length; j++) {
                _this.tags.add(values[i].tags[j]);
            }
        }
        _this.tags = Array.from(_this.tags);

        // Maps tags whether or not they are active
        _this.active = {};
        for (var i = 0; i < _this.tags.length; i++) {
            _this.active[_this.tags[i]] = true;
        }
        return _this;
    }

    _createClass(Filter, [{
        key: "handleClick",
        value: function handleClick(i) {
            var _active = this.active;
            _active[i] = !this.active[i];

            this.setState({ active: _active });
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var active_tags = new Set();
            var cand_tags = Object.keys(this.active);

            for (var i = 0; i < cand_tags.length; i++) {
                if (this.active[cand_tags[i]]) {
                    active_tags.add(cand_tags[i]);
                }
            }

            return React.createElement(
                "div",
                { className: "filter" },
                React.createElement(TagList, { tags: this.tags, onClick: function onClick(i) {
                        return _this2.handleClick(i);
                    } }),
                React.createElement(ItemSet, { items: this.props.items, activeTags: active_tags })
            );
        }
    }]);

    return Filter;
}(React.Component);

function TagList(props) {
    return React.createElement(
        "nav",
        null,
        props.tags.map(function (i) {
            return React.createElement(Tag, { key: i, name: i, onClick: function onClick() {
                    return props.onClick(i);
                } });
        })
    );
}

function Tag(props) {
    return React.createElement(
        "button",
        { className: "tag", onClick: props.onClick },
        props.name
    );
}

function ItemSet(props) {
    return React.createElement(
        "div",
        null,
        props.items.map(function (i) {
            return React.createElement(Item, {
                key: i.title,
                title: i.title,
                description: i.description,
                tags: i.tags,
                activeTags: props.activeTags
            });
        })
    );
}

var Item = function (_React$Component2) {
    _inherits(Item, _React$Component2);

    function Item(props) {
        _classCallCheck(this, Item);

        return _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, props));
    }

    _createClass(Item, [{
        key: "render",
        value: function render() {
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

            return React.createElement(
                "div",
                { style: divStyle, className: "item" },
                React.createElement(
                    "h3",
                    null,
                    this.props.title
                ),
                React.createElement(
                    "p",
                    null,
                    this.props.description
                )
            );
        }
    }]);

    return Item;
}(React.Component);

ReactDOM.render(React.createElement(Filter, { items: items }), document.getElementById('root'));