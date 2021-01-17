import React, { Component } from "react";

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

registerPlugin(FilePondPluginImagePreview);

export default class Files extends Component {
    render() {
        const apiUrl =  process.env.REACT_APP_API_ADDRESS + '/cards/files';
        const filePondServerConfig = {
            url: apiUrl,
            process: {
                onload: (data) => {
                    this.props.onAddFile(JSON.parse(data).filename);
                }
            }
        };

        const card = this.props.card;
        let files = [];

        if (card) {
            card.files.forEach(el => files.push(
                {
                    source: el,
                    options: {
                        type: 'local'
                    }
                }
            ))
        }
        
        return (
            <div>
                <FilePond
                    labelIdle="Нажмите здесь чтоб сфотографировать и прикрепить к записи выписки, анализы или другие изображения ..."
                    allowMultiple={true}
                    server={filePondServerConfig}
                    files={files}
                />
            </div>
        );
    }
}