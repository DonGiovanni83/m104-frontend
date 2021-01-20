import React, {useState} from "react";
import {Button, Spinner, Table} from "react-bootstrap";
import asModalForm from "../Generics/asModalForm";
import SchulenForm from "./SchulenForm";
import {gql, useQuery} from "@apollo/client";
import {Schule} from "../../data/api";

interface AlleSchulen {
    schulen: Schule[]
}


export const GET_SCHULEN = gql`
  query GetSchulen {
    schulen {
      id
      name
      adresse{
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
`;


export default function Schulen() {
    const {loading, error, data} = useQuery<AlleSchulen>(GET_SCHULEN,);
    const SchulenFormModal = asModalForm(SchulenForm)

    const [showModal, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const closeModal = () => {
        setShow(false);
    }


    return (
        <div>
            <div className="Site-header">
                <h2>Schulen</h2>
                <div>
                    <Button size={"lg"} variant="primary" onClick={handleShow}>
                        Neu +
                    </Button>
                    <SchulenFormModal
                        title={"Neue Schule erfassen"}
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
                        <span className="sr-only">Loading...</span>
                    </Spinner>)
                : (
                    <Table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Ort</th>
                            <th>PLZ</th>
                            <th>Adresse 1</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data?.schulen?.map(schule => (
                            <tr key={schule.id}>
                                <td>{schule.id}</td>
                                <td>{schule.name}</td>
                                <td>{schule.adresse.ort}</td>
                                <td>{schule.adresse.plz}</td>
                                <td>{schule.adresse.adresse_1}</td>
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