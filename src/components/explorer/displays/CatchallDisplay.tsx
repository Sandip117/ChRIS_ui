import * as React from "react";

import { DownloadIcon } from "@patternfly/react-icons";
import { Alert, Button } from "@patternfly/react-core";
import FileViewerModel, {
  IFileBlob,
} from "../../../api/models/file-viewer.model";
type AllProps = {
  fileItem: IFileBlob;
};

const CatchallDisplay: React.FunctionComponent<AllProps> = (
  props: AllProps
) => {
  const noPreviewMessage = () => {
    const { fileItem } = props;
    const itemArray = fileItem.file && fileItem.file.fname.split("/");
    const fileName = itemArray && itemArray[itemArray.length - 1];

    const ext = fileItem.fileType ? fileItem.fileType : "";
    const alertText = (
      <React.Fragment>
        <label>
          <b>File Name:</b> {fileName ? fileName : "Not available"}
        </label>
        <br></br>
        <label>
          <b>File Type:</b> {ext}
        </label>
        <Button
          variant="primary"
          className="float-right"
          onClick={() =>
            fileItem.file &&
            fileItem.file.fname &&
            FileViewerModel.downloadFile(fileItem.blob, fileItem.file.fname)
          }
        >
          <DownloadIcon /> Download
        </Button>
      </React.Fragment>
    );
    return (
        <Alert
          variant="info"
          title="No preview available for large files"
          children={alertText}
        />
    );
  };
  return noPreviewMessage();
};

export default React.memo(CatchallDisplay);
