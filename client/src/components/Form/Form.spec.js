import React from "react"
import { render, screen, fireEvent, waitFor,act } from "@testing-library/react"
import Form from "./"
import Input from "../Input";
import Button from "../Button";

it ("should render the form containing an input field and a button", () => {
    render(
        <Form submitFunc={null} defaultValues={null}>
            <Input name="model" label="Model" disabled={false} type="text" className="form-control input-box" />
            

            <div className="form-group form-btns">
                <Button btnClass="btn-primary" label="Save" iconClass="far fa-save" type="submit" clickFunc={null}/>
            </div> 
        </Form>
    );
    
    expect(screen.getByText("Model")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
});
