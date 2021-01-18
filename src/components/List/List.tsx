import React from 'react';
import Entity from "../../data/Entity";
import {InferProps} from "prop-types";
import PropTypes from "prop-types";


export function List({columnNames, entries}: InferProps<typeof List.propTypes>) {
    if (!entries || entries.length === 0) return <p>No entries, sorry</p>;
    return (
        <ul>
            {
                columnNames?.map((col) => {
                        return (
                            col?.properties.forEach((k, v) => {
                                    return (
                                        <li key={k} className='list'>
                                            <span className='col-title'>{v}</span>
                                        </li>)
                                }
                            )
                        )
                    }
                )
            }
            {
                entries.map((entry) => {
                        return (
                            entry?.properties.forEach((k, v) => {
                                    return (
                                        <li key={k} className='list'>
                                            <span className='col-val'>{v}</span>
                                        </li>)
                                }
                            )
                        )
                    }
                )
            }

        </ul>
    );
}

List.propTypes = {
    columnNames: PropTypes.arrayOf(PropTypes.instanceOf(Entity)),
    entries: PropTypes.arrayOf(PropTypes.instanceOf(Entity))
};