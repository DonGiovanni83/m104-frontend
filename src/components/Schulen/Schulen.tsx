import React, {FormEvent, useEffect, useState} from "react";
import {List} from "../List/List";
import withLoading from "../withLoading";
import {Button} from "react-bootstrap";
import asModalForm from "../Generics/asModalForm";
import SchulenForm from "./SchulenForm";

export default function Schulen() {
    const LoadingComponent = withLoading(List);
    const SchulenFormModal = asModalForm(SchulenForm)
    const [appState, setAppState] = useState({
        loading: false,
        columns: null,
        classes: null,
    });

    const [showModal, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSave = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(event)
        setShow(false);
    }

    useEffect(() => {
        setAppState({loading: true, columns: null, classes: null});
        const apiUrl = process.env.REACT_APP_BACKEND_API_URL!.concat(`/schulen`);
        console.log(apiUrl)
        fetch(apiUrl)
            .then((res) => res.json())
            .then((schulen) => {
                setAppState({loading: false, columns: schulen[0], classes: schulen.shift()});
            });
    }, [setAppState]);

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
                        handleSave={handleSave}
                    />
                </div>

            </div>
            <LoadingComponent loading={appState.loading} columnNames={appState.columns}
                              entries={appState.classes}/>
        </div>
    );
}