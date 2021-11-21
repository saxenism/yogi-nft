import React, {useState} from "react";
import 'antd/dist/antd.css';
import {Upload, message} from 'antd';

export default function ExampleUI() {
  return (
    <div>
      <form method="post" action="#" id="#">                  
        <div class="form-group files">
          <label>Upload Your File </label>
          <input type="file" class="form-control" multiple=""/>
        </div>  
        <button>Submit</button>
      </form>
    </div>
  );
}
