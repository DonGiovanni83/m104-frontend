import {Button, Col, Form, FormControl} from "react-bootstrap";
import React, {useState} from "react";
import {InferProps} from "prop-types";

interface SchulenFormProps {
    handleSave: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

function SchulenForm({handleSave}: InferProps<SchulenFormProps>) {
    const [formData, setFormData] = useState({
        name: '',
        ort: '',
        plz: 0,
        adresse_1: '',
        adresse_2: '',
        tel_g: '',
        tel_m: '',
        email_1: '',
        email_2: '',
    });

    const changeHandler = (e:  React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.id]: e.target.value})
    }

    const handleSubmit = () => {
        console.log(formData)
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
                <Form.Label>Schulname</Form.Label>
                <Form.Control required onChange={changeHandler} type="text" placeholder=""/>
            </Form.Group>
            <Form.Row>
                <Form.Group as={Col} controlId="ort">
                    <Form.Label>Ort</Form.Label>
                    <Form.Control type="text" required/>
                </Form.Group>

                <Form.Group as={Col} controlId="plz">
                    <Form.Label>PLZ</Form.Label>
                    <Form.Control type="number" required>
                    </Form.Control>
                </Form.Group>
            </Form.Row>
            <Form.Group controlId="adresse_1">
                <Form.Label>Adresse</Form.Label>
                <Form.Control placeholder="1234 Main St" required/>
            </Form.Group>

            <Form.Group controlId="adresse_1">
                <Form.Label>Adresse 2</Form.Label>
                <Form.Control placeholder="Apartment, studio, or floor"/>
            </Form.Group>

            <Form.Row>
                <Form.Group as={Col} controlId="tel_g">
                    <Form.Label>Telefon Geschäft</Form.Label>
                    <Form.Control type="phone" placeholder="031 999 00 00" required/>
                </Form.Group>

                <Form.Group as={Col} controlId="tel_m">
                    <Form.Label>Telefon privat</Form.Label>
                    <Form.Control type="phone" placeholder=""/>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId="email_1">
                    <Form.Label>Email 1</Form.Label>
                    <Form.Control type="email" placeholder="email@message.com" required/>
                </Form.Group>

                <Form.Group as={Col} controlId="email_1">
                    <Form.Label>Email 2</Form.Label>
                    <Form.Control type="email" placeholder=""/>
                </Form.Group>
            </Form.Row>

            <Button variant="primary" type="submit">
                Speichern
            </Button>
        </Form>
    );
}

export default SchulenForm;
