"use client"
import React from 'react';
import { PDFViewer, Image, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
// Font.register({
//   family: 'Oswald',
//   src: '/Y_TKV6o8WovbUd3m_X9aAA.ttf'
// });
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    // fontFamily: 'Oswald'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    // fontFamily: 'Oswald'
  },
  subsubtitle: {
    fontSize: 15,
    margin: 12,
    // fontFamily: 'cursive',
    textDecoration: "underline"
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

function parseText(text) {
  const parts = text.split(/(\*\*.*?\*\*)/); // Split by the **bold** markers
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return { bold: true, text: part.slice(2, -2), key: index };
    }
    return { bold: false, text: part, key: index };
  });
}

const Quixote = ({ messages, process_description }) => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.header} fixed>
        Discussion About The Process Helpful For Generate BPMN
      </Text>
      <Text style={styles.title}>Discussion Report </Text>
      <Text style={styles.author}>BPMN.hiast.edu.sy</Text>
      <Image
        style={styles.image}
        src="/pexels-divinetechygirl-1181715.jpg"
      />
      <Text style={styles.header} >
        This Discussion will help you see the power of our AI in BPMN.
      </Text>
      <Text style={styles.subtitle}>
        Process Description
      </Text>
      <Text style={styles.text}>
        {process_description}
      </Text>

      <Text style={styles.title}>
        Discussion
      </Text>
      {messages.map((message, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.subtitle}>
            {index % 2 === 0 ? 'First Expert' : 'Second Expert'}
          </Text>
          <Text style={styles.text}>

            {parseText(message.content).map(part =>
              part.bold ? (
                <Text style={styles.subsubtitle}>
                  {part.text}
                </Text>
              ) : (
                <Text style={styles.text}>
                  {part.text}
                </Text>

              )
            )}

          </Text>
        </View>
      ))}
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />
    </Page>
  </Document>
);


const CustomViewer = ({ messages, process_description }) => {
  return (
    <PDFViewer width="100%" height="720px">
      <Quixote messages={messages} process_description={process_description} />
    </PDFViewer>
  );
};

export default CustomViewer;