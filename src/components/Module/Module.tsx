import React, {useState} from "react";
import {Button, Spinner, Table} from "react-bootstrap";
import asModalForm from "../Generics/asModalForm";
import ModuleForm from "./ModuleForm";
import {gql, useQuery} from "@apollo/client";
import {Modul} from "../../data/api";

interface AlleModule {
    module: Modul[]
}


export const GET_MODULE = gql`
 query GetModule {
  module {
    id
    name
    schule {
      id
      name
      adresse {
        id
        ort
        plz
        adresse_1
        adresse_2
        tel_g
        tel_m
        email_1
        email_2
      }
    }
  }
}
`;


export default function Module() {
    const {loading, error, data} = useQuery<AlleModule>(GET_MODULE,);

    const ModuleFormModal = asModalForm(ModuleForm)

    const [showModal, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const closeModal = () => setShow(false);

    return (
        <div>
            <div className="Site-header">
                <h2>Module</h2>
                <div>
                    <Button size={"lg"} variant="primary" onClick={handleShow}>
                        Neu +
                    </Button>
                    <ModuleFormModal
                        title={"Neue Modul erfassen"}
                        description={""}
                        showModal={showModal}
                        handleClose={handleClose}
                        closeModal={closeModal}
                    />
                </div>

            </div>

            <div> {loading ?
                (
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Wird geladen...</span>
                    </Spinner>)
                : (
                    <Table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Modulname</th>
                            <th>Schule</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data?.module?.map(modul => (
                            <tr key={modul.id}>
                                <td>{modul.id}</td>
                                <td>{modul.name}</td>
                                <td>{modul.schule.name}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                )
            }
            </div>
        </div>
    );
}