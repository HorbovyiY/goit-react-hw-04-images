import { useState } from "react";
import PropTypes from 'prop-types'

import { Header, Form, Button, ButtonLabel, FormInput} from "./Searchbar.styled";

export const SearchBar = ({onSubmitForm}) => {
    const [searchText, setSearchText] = useState('');

    const onChange = (e) => { 
        setSearchText( e.currentTarget.value)
    }

    const onSubmit = (e) => { 
        e.preventDefault();

        onSubmitForm(searchText);
        resetSearch();
    }

    const resetSearch = () => { 
        setSearchText('')
    }

    return (
            <Header>
                <Form onSubmit={onSubmit}>
                <Button type="submit">
                    <ButtonLabel>Search</ButtonLabel>
                </Button>

                <FormInput
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={searchText}
                    onChange={onChange}
                />
            </Form>
        </Header>
    )
}

SearchBar.propTypes = {
    onSubmitForm: PropTypes.func.isRequired
}