import { bind } from 'decko';
import React, { Component } from 'react';

import 'react-dropzone-uploader/dist/styles.css';
import Dropzone, { IFileWithMeta, StatusValue } from 'react-dropzone-uploader';

export default class EmoteDropzone extends Component<{}, {}> {
  @bind
  private handleChangeStatus(file: IFileWithMeta, status: StatusValue, allFiles: IFileWithMeta[]): void {
    console.log(status, file.meta);
  }

  @bind
  private async handleSubmit(files: IFileWithMeta[], allFiles: IFileWithMeta[]): Promise<void> {
    try {
      const bodyData = new FormData();

      for (const file of files) {
        bodyData.append('files[]', file.file, file.file.name);
      }

      const response = await fetch('http://localhost:5000/api/v1/emotes/create', {
        method: 'POST',
        credentials: 'include',
        headers: [
          ['Accept', 'application/json'],
          ['Access-Control-Allow-Credentials', 'true'],
        ],
        body: bodyData,
      });

      if (response.status === 200) {
        const responseJson = await response.json();
        console.log(responseJson);
      } else {
        throw new Error('Failed to upload.');
      }
    } catch (error) {
      console.log(error);
    }

    allFiles.forEach((f: any) => f.remove());
  }

  public render(): JSX.Element {
    return (
      <Dropzone
        onChangeStatus={this.handleChangeStatus}
        onSubmit={this.handleSubmit}
        accept='image/gif, image/jpg, image/jpeg, image/png'
        inputContent={(files, extra) => (extra.reject ? 'GIF, JPG, or PNG only.' : 'Drag files here')}
        styles={{
          dropzoneReject: {
            borderColor: 'red',
            backgroundColor: 'red',
          },
          inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
        }}
      />
    );
  }
}
