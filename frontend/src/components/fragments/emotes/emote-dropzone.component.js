import React, { Component } from 'react';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';

export default class EmoteDropzone extends Component {
    constructor(props){
        super(props);

        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeStatus = ({ meta }, status) => {
        console.log(status, meta)
    }

    handleSubmit = (files, allFiles) => {
        let bodyData = new FormData();
        for (let index = 0; index < files.length; ++index) {
            bodyData.append('files[]', files[index]['file'], files[index]['file']['name']);
        }
        console.log(files);
        console.log(bodyData);
        
        fetch("http://localhost:5000/api/v1/emotes/create", {
            method: "POST",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "Access-Control-Allow-Credentials": true
            },
            body: bodyData
        })
        .then(response => {
            if (response.status === 200) return response.json();
            console.log(response);
            throw new Error("Failed to upload.");
        })
        .then(responseJson => {
            console.log(responseJson);
        })
        .catch(error => {
            console.log(error);
        });
        
        allFiles.forEach(f => f.remove())
    }

    render(){
        return (
            <Dropzone
                onChangeStatus={this.handleChangeStatus}
                onSubmit={this.handleSubmit}
                accept="image/gif, image/jpg, image/jpeg, image/png"
                inputContent={(files, extra) => (extra.reject ? 'GIF, JPG, or PNG only.' : 'Drag files here')}
                styles={{
                    dropzoneReject: { 
                        borderColor: 'red', 
                        backgroundColor: 'red' 
                    },
                    inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
                }}
            />
        )
    }

}