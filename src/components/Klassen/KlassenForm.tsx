import {Form} from "react-bootstrap";
import React from "react";
import {InferProps} from "prop-types";

interface KlassenFormProps {
    handleClose: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
    handleSave: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

function KlassenForm({handleSave}: InferProps<KlassenFormProps>) {
    return (
        <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Klassenname</Form.Label>
                <Form.Control type="text" placeholder="z.B. INFW2020b"/>
            </Form.Group>
        </Form>
    );
}

export default KlassenForm;
