import {Spinner} from "react-bootstrap";
import React from "react";

interface WithLoadingProps {
    loading: boolean;
}

const withLoading = <P extends object>(Component: React.ComponentType<P>) =>
    class WithLoading extends React.Component<P & WithLoadingProps> {
        render() {
            const {loading, ...props} = this.props;
            return loading ?
                (
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                )
                : <Component {...props as P} />;
        }
    };

export default withLoading;