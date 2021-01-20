import {Button, Col, Form} from "react-bootstrap";
import React, {FormEvent, useState} from "react";
import {InferProps} from "prop-types";
import {gql, useMutation, useQuery} from "@apollo/client";
import {GET_FIRMEN} from "./Firmen";

const CREATE_FIRMA = gql`
  mutation CreateFirma(
  $name: String,
  $ort: String,
  $plz: Int,
  $adresse_1: String,
  $adresse_2: String,
  $tel_g: String,
  $tel_m: String,
  $email_1: String,
  $email_2: String
  ) {
    create_firma(input_args:{
    name:$name
    ort:$ort,
    plz:$plz,
    adresse_1:$adresse_1,
    adresse_2:$adresse_2,
    tel_g:$tel_g,
    tel_m:$tel_m,
    email_1:$email_1,
    email_2:$email_2
  }){
    ok
  }
 }
`;

interface FirmenFormProps {
    closeModal: () => void
}

function FirmenForm({closeModal}: InferProps<FirmenFormProps>) {
    const [createFirma, {loading: mutationLoading, error: mutationError}] = useMutation(CREATE_FIRMA, {
        refetchQueries: [
            {query: GET_FIRMEN}
        ]
    });


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

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.id]: e.target.value})
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        closeModal()
        e.preventDefault();
        createFirma({
            variables: {
                name: formData.name,
                ort: formData.ort,
                plz: formData.plz,
                adresse_1: formData.adresse_1,
                adresse_2: formData.adresse_2,
                tel_g: formData.tel_g,
                tel_m: formData.tel_m,
                email_1: formData.email_1,
                email_2: formData.email_2
            }
        });
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
                <Form.Label>Firma</Form.Label>
                <Form.Control required onChange={changeHandler} type="text" placeholder=""/>
            </Form.Group>
            <Form.Row>
                <Form.Group as={Col} controlId="ort">
                    <Form.Label>Ort</Form.Label>
                    <Form.Control onChange={changeHandler} type="text" required/>
                </Form.Group>

                <Form.Group as={Col} controlId="plz">
                    <Form.Label>PLZ</Form.Label>
                    <Form.Control onChange={changeHandler} required>
                    </Form.Control>
                </Form.Group>
            </Form.Row>
            <Form.Group controlId="adresse_1">
                <Form.Label>Adresse</Form.Label>
                <Form.Control onChange={changeHandler} placeholder="1234 Main St" required/>
            </Form.Group>

            <Form.Group controlId="adresse_1">
                <Form.Label>Adresse 2</Form.Label>
                <Form.Control onChange={changeHandler} placeholder="Apartment, studio, or floor"/>
            </Form.Group>

            <Form.Row>
                <Form.Group as={Col} controlId="tel_g">
                    <Form.Label>Telefon Geschäft</Form.Label>
                    <Form.Control onChange={changeHandler} type="phone" placeholder="031 999 00 00" required/>
                </Form.Group>

                <Form.Group as={Col} controlId="tel_m">
                    <Form.Label>Telefon privat</Form.Label>
                    <Form.Control onChange={changeHandler} type="phone" placeholder=""/>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId="email_1">
                    <Form.Label>Email 1</Form.Label>
                    <Form.Control onChange={changeHandler} type="email" placeholder="email@message.com" required/>
                </Form.Group>

                <Form.Group as={Col} controlId="email_1">
                    <Form.Label>Email 2</Form.Label>
                    <Form.Control onChange={changeHandler} type="email" placeholder=""/>
                </Form.Group>
            </Form.Row>

            <Button variant="primary" type="submit" >
                Speichern
            </Button>
            {mutationLoading && <p>Loading...</p>}
            {mutationError && <p>Error :( Please try again</p>}
        </Form>
    );
}

export default FirmenForm;
