import React, { Component } from "react";

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';


registerPlugin(FilePondPluginImageTransform, FilePondPluginImageResize, FilePondPluginImagePreview);

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
        
        return (
            <div className="filepond_box">
                <p>Добавьте к записи фотографии или файлы выписок, справок, анализов или любые другие файлы</p>
                <FilePond
                    labelIdle="<span class='btn btn-outline-primary'>Сфотографировать или выбрать файлы нажмите здесь</span>"
                    allowMultiple={true}
                    imageResizeTargetWidth={1024}
                    imageResizeUpscale={false}
                    server={filePondServerConfig}
                />
            </div>
        );
    }
}