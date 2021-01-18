import React, {useEffect, useState} from "react";
import {List} from "../List/List";
import withLoading from "../withLoading";
import {Button} from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import KlassenForm from "./KlassenForm";
import asModalForm from "../Generics/asModalForm";

export default function Klassen() {
    const LoadingComponent = withLoading(List);
    const KlassenFormModal = asModalForm(KlassenForm)
    const [appState, setAppState] = useState({
        loading: false,
        columns: null,
        classes: null,
    });

    const [showModal, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSave = () => {
        console.log("saved")
        setShow(false);
    }

    useEffect(() => {
        setAppState({loading: true, columns: null, classes: null});
        const apiUrl = process.env.REACT_APP_BACKEND_API_URL!.concat(`/klassen`);
        console.log(apiUrl)
        fetch(apiUrl)
            .then((res) => res.json())
            .then((klassen) => {
                setAppState({loading: false, columns: klassen[0], classes: klassen.shift()});
            });
    }, [setAppState]);

    return (
        <div>
            <div className="Site-header">
                <h2>Klassen</h2>
                <div>
                    <Button variant="primary" onClick={handleShow}>
                        <Icon.Plus/>
                    </Button>
                    <KlassenFormModal
                        title={"Neue Klasse erfassen"}
                        description={"blablabab"}
                        showModal={showModal}
                        handleClose={handleClose}
                        handleSave = {handleSave}
                    />
                </div>

            </div>
            <LoadingComponent loading={appState.loading} columnNames={appState.columns}
                              entries={appState.classes}/>
        </div>
    );
}