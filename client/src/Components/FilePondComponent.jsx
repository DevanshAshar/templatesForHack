import React, { useEffect, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";

import "filepond/dist/filepond.min.css";

import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

import { Button } from "@chakra-ui/react";

registerPlugin(
    FilePondPluginImagePreview, FilePondPluginImageCrop, FilePondPluginFileValidateType
);

export function FilePondComponent(props) {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        console.log(files)
    }, [props.files])

    //style panel layout ko {} dynamically karke dekho... agar select kiya toh hi voh props.stylePanelLayout jo ki circle hoga osme jayega
    // ye isiliye kyuki validation ka error nahi dikhta hai osme

    return (
        <div className="App">
            <FilePond
                checkValidity={true}
                acceptedFileTypes={['image/*']}
                files={files}
                allowFileTypeValidation={true}
                instantUpload={false}
                dropValidation={true}
                name="files"
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                allowMultiple={props.allowMultiple}
                server="http://localhost:5000/user/imageUploading"
            />
        </div>
    );
}
