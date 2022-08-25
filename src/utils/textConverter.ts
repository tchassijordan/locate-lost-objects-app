// This should be applied only to the document collection

const textToApiFormatConverter = (text: TProps): TReturnObject => {
  //add s to birth certificates
  if (text.trim().includes(' ')) {
    const wordArray = text.split(' ');
    const transformedWord = wordArray[0].toLowerCase();
    const newText = transformedWord.concat(wordArray[1]);
    return { documentType: newText, documentCollection: newText };
  }

  if (text.trim().length > 3) {
    return {
      documentType: text.toLowerCase(),
      documentCollection: text.toLowerCase()
    };
  }

  return {
    documentType: text,
    documentCollection: text.toLowerCase()
  };
};

export default textToApiFormatConverter;

type TProps = 'CNI' | 'Passports' | 'Birth Certificates' | 'Other Docs';

type TReturnObject = {
  documentType: string;
  documentCollection: string;
};
