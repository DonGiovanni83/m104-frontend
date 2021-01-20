import React, {useState} from "react";
import {Button, Spinner, Table} from "react-bootstrap";
import asModalForm from "../Generics/asModalForm";
import FirmenForm from "./FirmenForm";
import {gql, useQuery} from "@apollo/client";
import {Firma} from "../../data/api";

interface AlleFirmen {
    firmen: Firma[]
}


export const GET_FIRMEN = gql`
  query GetFirmen {
    firmen {
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


export default function Firmen() {
    const {loading, error, data} = useQuery<AlleFirmen>(GET_FIRMEN,);
    const FirmenFormModal = asModalForm(FirmenForm)

    const [showModal, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const closeModal = () => {
        setShow(false);
    }


    return (
        <div>
            <div className="Site-header">
                <h2>Firmen</h2>
                <div>
                    <Button size={"lg"} variant="primary" onClick={handleShow}>
                        Neu +
                    </Button>
                    <FirmenFormModal
                        title={"Neue Firma erfassen"}
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
                        {data?.firmen?.map(firma => (
                            <tr key={firma.id}>
                                <td>{firma.id}</td>
                                <td>{firma.name}</td>
                                <td>{firma.adresse.ort}</td>
                                <td>{firma.adresse.plz}</td>
                                <td>{firma.adresse.adresse_1}</td>
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