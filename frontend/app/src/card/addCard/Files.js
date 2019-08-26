import React, { Component } from "react";

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

registerPlugin(FilePondPluginImagePreview);

export default class Files extends Component {
    render() {
        const apiUrl =  process.env.REACT_APP_API_ADDRESS + '/cards/save-picture';

        return (
            <div class="mb-5">
                <FilePond allowMultiple={true} server={apiUrl} />
            </div>
        );
    }
}