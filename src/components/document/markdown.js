import React, {Component} from 'react';
import Markdown from 'markdown-to-jsx';
import NotFound from "../not-found";
import {withRouter} from '../../common/with-router';
import ChangePageTitle from "../../common/change-page-title";

class MarkdownPage extends Component {

    constructor(props) {
        super(props);

        let currentPagePath = this.props.pagePath ? this.props.pagePath : this.props.router.location.pathname;
        if (!currentPagePath.startsWith("/")) {
            currentPagePath = "/" + currentPagePath;
        }
        let currentPageTitle = this.props.pageTitle ? this.props.pageTitle : "Document";

        this.state = {
            pathname : currentPagePath,
            pagetitle : currentPageTitle,
            content: null,
            errorMessage: null
        };
    }

    componentDidMount() {

        this.setState({content: null, errorMessage: null});

        fetch("https://raw.githubusercontent.com/MoultDB/moultdb-docs/" + process.env.REACT_APP_GITHUB_BRANCH + this.state.pathname + ".md")
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
                        <ChangePageTitle pageTitle={this.state.pagetitle} />
                        <Markdown className={'col-sm-10 offset-sm-1'}>{this.state.content}</Markdown>
                    </div>
                </div>
        } else {
            text = <NotFound />;
        }
        return <main>{text}</main>
    }
}

export default withRouter(MarkdownPage);