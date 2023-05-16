import React, {Component} from 'react';
import Markdown from 'markdown-to-jsx';
import Notfound from "../notfound";
import {withRouter} from '../../common/with-router';

class MarkdownPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pathname : this.props.router.location.pathname,
            content: null,
            errorMessage: null
        };
    }

    componentDidMount() {

        this.setState({content: null, errorMessage: null});

        fetch("https://raw.githubusercontent.com/MoultDB/moultdb-docs/master" + this.state.pathname + ".md")
            .then(results => {
                if (!results.ok) {
                    this.setState({errorMessage: "Fail to get data from MoultDB GitHub"});
                    return null;
                }
                return results.text()} )
            .then(text => {
                this.setState({content: text});
            })
            .catch(function(error) {
                this.setState({errorMessage: error});
            });
    }

    render() {
        let text = "";
        if (this.state.errorMessage == null && this.state.content != null) {
            let id = this.state.pathname.replaceAll("/", "-").substring(1);
            text =
                <div className="container ">
                    <div id={id} className="row">
                        <Markdown className={'col-sm-10 offset-sm-1'}>{this.state.content}</Markdown>
                    </div>
                </div>
        } else {
            text = <Notfound />;
        }
        return <main>{text}</main>
    }
}

export default withRouter(MarkdownPage);