import React, { useEffect } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "./filePond.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import {
  makeDeleteRequest,
  makeUploadRequest,
} from "../../Assets/Cloudinary/cloudinaryHelper";
import { useColorMode } from "@chakra-ui/react";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageExifOrientation,
  FilePondPluginImageCrop,
  FilePondPluginFileValidateType
);

export function FilePondComponent(props) {
  const { colorMode } = useColorMode();
  var logic = props.setLogic;
  var deleteLogic = props.deleteLogic;

  useEffect(() => {
    if (props.files[0] && !props.profilePic) {
      props.setIsPictureOnlySelectedAndNotUploaded(true);
    } else if (props.files[0] && props.profilePic) {
      props.setIsPictureOnlySelectedAndNotUploaded(false);
    }
  }, [props.files]);

  useEffect(() => {
    if(colorMode==='dark'){
      document.getElementById("filePondDiv").classList.add(`dark`);
    }else{
      document.getElementById("filePondDiv").classList.remove(`dark`);
    }
  }, [colorMode]);

  /*
        in props you pass logic & deleteLogic
        logic contains you pushing the given cloudinary response (the whole object) into your controlled forms data
        in deleteLogic you will remoe that data from your formdata( if its multiple only remove those from the array whose deletetoken matches with cloudinary)
        THIS IS DONE SO THAT THE CONDITION WHERE USER UPLOADS 1+ BUT ONLY DELETES SOME OF THEM THEN THE OTHERS
        CAN STILL BE UPLOADED IN THE POST REQUEST 
    */

  const revert = (token, successCallback, errorCallback) => {
    makeDeleteRequest(
      {
        token,
        successCallback,
        errorCallback,
      },
      deleteLogic
    );
  };

  const process = (
    fieldName,
    file,
    metadata,
    load,
    error,
    progress,
    abort,
    transfer,
    options
  ) => {
    const abortRequest = makeUploadRequest(
      {
        file,
        fieldName,
        successCallback: load,
        errorCallback: error,
        progressCallback: progress,
      },
      logic
    );

    return {
      abort: () => {
        abortRequest();
        abort();
      },
    };
  };

  //accepted files ko bhi array se pass karo

  return (
    <div id="filePondDiv">
      <FilePond
        acceptedFileTypes={props.acceptedFileType}
        files={props.files}
        onupdatefiles={props.setFiles}
        allowFileTypeValidation={true}
        instantUpload={false}
        dropValidation={true}
        name="file"
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        allowMultiple={props.allowMultiple}
        server={{ process, revert }}
        credits={false}
      />
    </div>
  );
}
