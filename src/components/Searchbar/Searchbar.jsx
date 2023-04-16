import React from "react";
import PropTypes from 'prop-types'

import { Header, Form, Button, ButtonLabel, FormInput} from "./Searchbar.styled";

export class SearchBar extends React.Component {
    state = {
        searchText: '',
    }

    onChange = (e) => { 
        this.setState({searchText: e.currentTarget.value})
    }

    onSubmit = (e) => { 
        e.preventDefault();

        this.props.onSubmit(this.state.searchText);
        this.resetSearch();
    }

    resetSearch = () => { 
        this.setState({searchText: ''})
    }

    render() { 
        return (
            <Header>
                <Form onSubmit={this.onSubmit}>
                <Button type="submit">
                    <ButtonLabel>Search</ButtonLabel>
                </Button>

                <FormInput
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={this.state.searchText}
                    onChange={this.onChange}
                />
            </Form>
            </Header>)
    }
}

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}