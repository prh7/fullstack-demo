import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '.';

test('it should render a button with a text', () => {
    render(<Button btnClass="btn-primary" label="Save" iconClass="far fa-save" type="submit" clickFunc={null} />)

    const buttonText= screen.getByText('Save');

    expect(buttonText).toBeInTheDocument();
});

test('it should render a button and be clickable without the change of text in the button', () => {
    render(<Button btnClass="btn-primary" label="Save" iconClass="far fa-save" type="submit" clickFunc={null} />)
    
    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(screen.queryByText('Wrong text')).not.toBeInTheDocument();
});
