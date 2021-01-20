import React, {useState} from "react";
import {Button, Spinner, Table} from "react-bootstrap";
import asModalForm from "../Generics/asModalForm";
import KlassenForm from "./KlassenForm";
import {gql, useQuery} from "@apollo/client";
import {Klasse} from "../../data/api";

interface AlleKlassen {
    klassen: Klasse[]
}


export const GET_KLASSEN = gql`
 query GetKlassen {
  klassen {
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


export default function Klassen() {
    const {loading, error, data} = useQuery<AlleKlassen>(GET_KLASSEN,);

    const KlassenFormModal = asModalForm(KlassenForm)

    const [showModal, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const closeModal = () => setShow(false);

    return (
        <div>
            <div className="Site-header">
                <h2>Klassen</h2>
                <div>
                    <Button size={"lg"} variant="primary" onClick={handleShow}>
                        Neu +
                    </Button>
                    <KlassenFormModal
                        title={"Neue Klasse erfassen"}
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
                            <th>Name</th>
                            <th>Schule</th>
                            <th>Ort</th>
                            <th>PLZ</th>
                            <th>Adresse 1</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data?.klassen?.map(klasse => (
                            <tr key={klasse.id}>
                                <td>{klasse.id}</td>
                                <td>{klasse.name}</td>
                                <td>{klasse.schule.adresse.ort}</td>
                                <td>{klasse.schule.adresse.plz}</td>
                                <td>{klasse.schule.adresse.adresse_1}</td>
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