import React, { Component } from "react";

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import {FormattedMessage, injectIntl} from "react-intl";


registerPlugin(FilePondPluginImageTransform, FilePondPluginImageResize, FilePondPluginImagePreview);

class Files extends Component {
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

        const buttonText = "<span class='btn btn-outline-primary'>" + this.props.intl.formatMessage({ id: "card.add.take-photo", defaultMessage: 'take photo or choose files click here'}) + "</span>";

        return (
            <div className="filepond_box">
                <p>
                    <FormattedMessage id="card.add.add-files-extended" defaultMessage="add to note photo or files of statements, certificates, analysis or any other files" />
                </p>
                <FilePond
                    labelIdle={buttonText}
                    allowMultiple={true}
                    imageResizeTargetWidth={1024}
                    imageResizeUpscale={false}
                    server={filePondServerConfig}
                />
            </div>
        );
    }
}

export default injectIntl(Files);