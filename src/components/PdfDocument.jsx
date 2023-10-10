import React from "react";
import { PDFViewer, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import Html from 'react-pdf-html';

export default function PdfDocument({ content }) {
    const stylesheet = {
        p: {
            margin: "0px",
        },
        div: {
            margin: "0px"
        }
    }
    return (
            <PDFViewer width={"800px"} height={"500px"}>
                <Document>
                    <Page size="A4">
                        <View>
                           <Html stylesheet={stylesheet}>{content}</Html>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
    )
}