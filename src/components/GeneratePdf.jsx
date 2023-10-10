import React, { useRef, useEffect, useState } from "react";

import { Editor } from '@tinymce/tinymce-react';
import parse from "html-react-parser";
import jsPDF from 'jspdf';
import PdfDocument from "./PdfDocument.jsx";

export default function GeneratePdf(props) {
  const html = `<p style="display: inline;"><img src="https://www.w3schools.com/images/lynx_in_space.png" alt="" style="width:78px;height: 86px">  text</p><p style="display: inline;">&nbsp;</p><p style="display: inline;">&nbsp;</p><p style="display: inline;">Specie: {{...}} Wet Date: {{...}}&nbsp;Subspecie: {{...}} ESt.harv.date: {{...}}&nbsp;</p><p style="display: inline;">&nbsp;</p><p style="display: inline;">Customer: {{...}}&nbsp; Site: {{...}}</p><div style="display: flex;"><p>text</p><div style="border-collapse: collapse; width: 100.043%;" border="1"><div style="display: block;"><div style="display: flex; flex-direction: row; width: 100%"><div style="border: 1px solid black;border-collapse: collapse;flex: 1;">plot</div><div style="border: 1px solid black;border-collapse: collapse;flex: 1;">variety</div><div style="border: 1px solid black;border-collapse: collapse;flex: 1;">producer</div></div><div style="display: flex; flex-direction: row; width: 100%"><div style="border: 1px solid black;border-collapse: collapse;flex: 1;">&nbsp;</div><div style="border: 1px solid black;border-collapse: collapse;flex: 1;">&nbsp;</div><div style="border: 1px solid black;border-collapse: collapse;flex: 1;">
    &nbsp;</div></div><div style="display: flex; flex-direction: row; width: 100%"><div style="border: 1px solid black;border-collapse: collapse;flex: 1;">&nbsp;</div><div style="border: 1px solid black;border-collapse: collapse;flex: 1;">&nbsp;</div><div style="border: 1px solid black;border-collapse: collapse;flex: 1;">&nbsp;</div></div><div style="display: flex; flex-direction: row; width: 100%"><div style="border: 1px solid black;border-collapse: collapse;flex: 1;">&nbsp;</div><div style="border: 1px solid black;border-collapse: collapse;flex: 1;">&nbsp;</div><div style="border: 1px solid black;border-collapse: collapse;flex: 1;">&nbsp;</div></div><div style="display: flex; flex-direction: row; width: 100%"><div style="border: 1px solid black;border-collapse: collapse;flex: 1;">&nbsp;</div><div style="border: 1px solid black;border-collapse: collapse;flex: 1;">&nbsp;</div><div style="border: 1px solid black;border-collapse: collapse;flex: 1;">&nbsp;</div></div><div style="display: flex; flex-direction: row; width: 100%"><div style="border: 1px solid black;border-collapse: collapse;flex: 1;">&nbsp;</div><div style="border: 1px solid black;border-collapse: collapse;flex: 1;">&nbsp;</div><div style="border: 1px solid black;border-collapse: collapse;flex: 1;">&nbsp;</div></div><div style="display: flex; flex-direction: row; width: 100%"><div style="border: 1px solid black;border-collapse: collapse;flex: 1;">&nbsp;</div><div style="border: 1px solid black;border-collapse: collapse;flex: 1;">&nbsp;</div><div style="border: 1px solid black;border-collapse: collapse;flex: 1;">&nbsp;</div></div><div style="display: flex; flex-direction: row; width: 100%"><div style="border: 1px solid black;border-collapse: collapse;flex: 1;">&nbsp;</div><div style="border: 1px solid black;border-collapse: collapse;flex: 1;">&nbsp;</div><div style="border: 1px solid black;border-collapse: collapse;flex: 1;">&nbsp;</div></div><div style="display: flex; flex-direction: row; width: 100%"><div style="border: 1px solid black;border-collapse: collapse;flex: 1;">&nbsp;</div><div style="border: 1px solid black;border-collapse: collapse;flex: 1;">&nbsp;</div><div style="border: 1px solid black;border-collapse: collapse;flex: 1;">&nbsp;</div></div></div></div></div>`;
  const [htmlRaw, setHtmlRaw] = useState(html);
  const [componentUpdated, setComponentUpdated] = useState(html);


  const handleEditorChange = (content, editor) => {
    setHtmlRaw(content);
  }

  const transformHtmlToReactPdf = async (type = "") => {
    let html = htmlRaw;

    html = html
     .replace(/<table/g, '<div')
    .replace(/\/table>/g, '/div>')
     .replace(/<tbody/g, '<div style="display: block;"')
    .replace(/\/tbody>/g, '/div>')
    .replace(/<tr/g, '<div style="display: flex; flex-direction: row; width: 100%"')
    .replace(/\/tr>/g, '/div>')
    
    .replace(/<td/g, '<div style="border: 1px solid black;border-collapse: collapse;flex: 1;"')
    .replace(/\/td>/g, '/div>')
    .replace(/\r\n|\n|\r/gm, '')

    const splitBy = html.split("<");
    console.log(splitBy);
    console.log(splitBy.join("<"));


    // .replace(/<div/g, '<VIEW')
    // .replace(/\/div>/g, '/VIEW>')
    // .replace(/<p/g, '<TEXT')
    // .replace(/\/p>/g, '/TEXT>')
    // .replace(/<strong/g, '<TEXT')
    // .replace(/\/strong>/g, '/TEXT>')

    // .replace(/<h1/g, '<TEXT style="font-size:32px;font-weight: bold" ')
    // .replace(/\/h1>/g, '/TEXT>')

    // .replace(/<h2/g, '<TEXT style="font-size:24px;font-weight: bold" ')
    // .replace(/\/h2>/g, '/TEXT>')

    // .replace(/<h3/g, '<TEXT style="font-size:18px;font-weight: bold"')
    // .replace(/\/h3>/g, '/TEXT>')

    // .replace(/<h4/g, '<TEXT "font-size:16px;font-weight: bold"')
    // .replace(/\/h4>/g, '/TEXT>')
    // .replace(/<table/g, '<VIEW')
    // .replace(/\/table>/g, '/VIEW>')
    // // .replace(/<colgroup/g, ' ')
    // // .replace(/\/colgroup>/g, ' ')
    // // .replace(/<col/g, '')
    // // .replace(/\/col>/g, '')

    // .replace(/<tbody/g, '<VIEW style="display: block;"')
    // .replace(/\/tbody>/g, '/VIEW>')

    // .replace(/<tr/g, '<VIEW style="display: flex; flex-direction: row; width: 100%"')
    // .replace(/\/tr>/g, '/VIEW>')
    
    // .replace(/<td/g, '<TEXT style="border: 1px solid black;border-collapse: collapse;flex: 1;"')
    // .replace(/\/td>/g, '/TEXT>')

    switch(type) {
      case "jsPDF": 
        const doc = new jsPDF({
          format: 'a4',
          unit: 'px',
        });
        doc.html(htmlRaw, {
        callback(doc) {
            doc.save('document');
          }
        });
      break;
         default: 
      // let component = parse(html, { htmlparser2: { lowerCaseTags: false } });
      // let array= [component];
      // if (Array.isArray(component)) {
      //   array = [...component];
      // }
      // console.log("before array=", array);
      
      // array = array.map(row => {
      //   return renderHtmltoReactPdf(row);
      // })
      // console.log("after array=", array);
      
      setComponentUpdated(html);
      break;
    }
  }
  
  const buttonStyle= {
    padding: "10px", 
    background: "#f3f3f3", 
    borderRadius: "10px",
     cursor: "pointer"
  }

  const replaceTextDynamicWithData = (text, row) => {
    let stringToBeReplacedWithData = text;
    let startIndexOfCurlyBrace = stringToBeReplacedWithData.indexOf('{'), endIndexOfCurlyBrace = stringToBeReplacedWithData.lastIndexOf('}')
    stringToBeReplacedWithData = stringToBeReplacedWithData.replace(/\{\{/gm, "").replace(/\}\}/gm, "");

    if (startIndexOfCurlyBrace !== -1 && endIndexOfCurlyBrace !== -1 && startIndexOfCurlyBrace >= 0) {
      let property = text.substring(startIndexOfCurlyBrace + 2, endIndexOfCurlyBrace - 1);
      let data = row[property];
      data !== undefined ? stringToBeReplacedWithData = stringToBeReplacedWithData.replace(text.substring(startIndexOfCurlyBrace + 2, endIndexOfCurlyBrace - 1), data) : stringToBeReplacedWithData = stringToBeReplacedWithData
    }
  };

  return (
    <>
      <h2>Edit PDF Template</h2>
     <div style={{display: "flex", gap: "30px", marginBottom: "20px"}}>
      <Editor
        onInit={(evt, editor) => editor.current = editor}
        // there's a known issue with how tinymce works where the intialValue and value
        // come into conflict when using useState. tinymce recommend removing initialValue
        // and setting the initial value as the the default state value i.e. formData.description
        // is set to the placeholder text instead of just an empty string
        // initialValue="<p>This is the initial content of the editor.</p>"
        apiKey={process.env.REACT_APP_TINY_KEY}
        init={{
          height: 500,
          width: "500px",
          menubar: true,
          plugins: 'advlist autolink lists link image charmap preview anchor ' +
            'searchreplace visualblocks code fullscreen ' +
            'insertdatetime media table code help wordcount'
          ,
          toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        value={htmlRaw}
        onEditorChange={handleEditorChange}
      />
      {/* <button onClick={log}>Log editor content</button> */}

      <PdfDocument content={componentUpdated}></PdfDocument>
     </div>
     <article  style={{display: "flex", minWidth: "200px", maxWidth: "550px", justifyContent: "space-around"}}>
       <button style={{...buttonStyle}} onClick={() => transformHtmlToReactPdf("jsPDF")}>Gneerate PDF using jsPDF</button>
       <button style={{...buttonStyle, marginLeft: "20px"}} disabled={false} onClick={() => transformHtmlToReactPdf()}>{"Generate PDF using react/pdf"}</button>
     </article>
    </>
  )
}