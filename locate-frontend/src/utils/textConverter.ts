// This should be applied only to the document collection

const textToApiFormatConverter = (text: TProps) => {
  //add s to birth certificates
  if (text.trim().includes(' ')) {
    const wordArray = text.split(' ');
    const transformedWord = wordArray[0].toLowerCase();
    const newText = transformedWord.concat(wordArray[1]);
    return newText;
  } else return text.toLowerCase();
};

export default textToApiFormatConverter;

type TProps = 'CNI' | 'Passports' | 'Birth Certificates' | 'Other Docs';
