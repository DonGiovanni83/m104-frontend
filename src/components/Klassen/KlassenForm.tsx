import {Button, Col, Form} from "react-bootstrap";
import React, {FormEvent, useState} from "react";
import {InferProps} from "prop-types";
import {gql, useMutation, useQuery} from "@apollo/client";
import {GET_KLASSEN} from "./Klassen";

const CREATE_KLASSE = gql`
  mutation CreateKlasse(
  $name: String,
  $schule_id: ID,
  ) {
    create_klasse(input_args:{
    name:$name
    schule_id:$schule_id
  }){
    ok
  }
 }
`;

interface KlassenFormProps {
    closeModal: () => void
}

function KlassenForm({closeModal}: InferProps<KlassenFormProps>) {
    const [createKlasse, {loading: mutationLoading, error: mutationError}] = useMutation(CREATE_KLASSE, {
        refetchQueries: [
            {query: GET_KLASSEN}
        ]
    });


    const [formData, setFormData] = useState({
        name: '',
        schule_id: ''
    });

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.id]: e.target.value})
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        closeModal()
        e.preventDefault();
        createKlasse({
            variables: {
                name: formData.name,
                schule_id: formData.schule_id
            }
        });
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
                <Form.Label>Klassenname</Form.Label>
                <Form.Control required onChange={changeHandler} type="text" placeholder=""/>
            </Form.Group>
            <Form.Group controlId="name">
                <Form.Label>Schule</Form.Label>
                <Form.Control required onChange={changeHandler} type="text" placeholder="" as="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
                Speichern
            </Button>
            {
                mutationLoading && <p>Loading...</p>
            }
            {
                mutationError && <p>Error :( Please try again</p>
            }
        </Form>
    );
}

export default KlassenForm;
