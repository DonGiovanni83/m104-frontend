import {Button, Form} from "react-bootstrap";
import React, {FormEvent, useState} from "react";
import {InferProps} from "prop-types";
import {gql, useMutation, useQuery} from "@apollo/client";
import {GET_MODULE} from "./Module";

const GET_SCHULEN_ID_AND_NAMES = gql`
query GetSchulen {
    schulen {
      id
      name
    }
  }
`;
const CREATE_MODUL = gql`
  mutation CreateModul(
  $name: String,
  $schule_id: ID,
  ) {
    create_modul(
    name:$name
    schule_id:$schule_id
  ){
    ok
  }
 }
`;

interface ModuleFormProps {
    closeModal: () => void
}

interface AlleSchulen {
    schulen: [{
        id: number,
        name: string,
    }]
}

function ModuleForm({closeModal}: InferProps<ModuleFormProps>) {
    const {loading, error, data} = useQuery<AlleSchulen>(GET_SCHULEN_ID_AND_NAMES);
    const [createModul, {loading: mutationLoading, error: mutationError}] = useMutation(CREATE_MODUL, {
        refetchQueries: [
            {query: GET_MODULE}
        ]
    });

    const [formData, setFormData] = useState({
        name: '',
        schule_id: 0,
    });

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.id]: e.target.value})
        console.log(formData)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        closeModal()
        e.preventDefault();
        createModul({
            variables: {
                name: formData.name,
                schule_id: formData.schule_id
            }
        });
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
                <Form.Label>Modulname</Form.Label>
                <Form.Control required onChange={changeHandler} type="text" placeholder=""/>
            </Form.Group>
            <Form.Group controlId="schule_id">
                <Form.Label>Schule</Form.Label>
                <Form.Control required onChange={changeHandler} as="select">
                    <option></option>
                    {data && data.schulen.map(schule => (
                        <option value={schule.id}>{schule.name}</option>
                    )
                    )
                    }
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

export default ModuleForm;
