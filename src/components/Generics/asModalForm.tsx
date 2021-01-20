import {Modal} from "react-bootstrap";
import React from "react";

interface AsModalFormProps {
    title: string,
    description: string,
    showModal: boolean,
    handleClose: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
    handleSave: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const asModalForm = <P extends object>(Component: React.ComponentType<P>) =>
    class AsModalForm extends React.Component<P & AsModalFormProps> {
        render() {
            const {
                title,
                description,
                showModal,
                handleClose,
                handleSave,
                ...props
            } = this.props;
            return (
                <Modal show={showModal} onHide={handleClose} backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>{description}</div>
                        <Component {...props as P}/>
                    </Modal.Body>
                </Modal>
            );
        }
    }

export default asModalForm;
