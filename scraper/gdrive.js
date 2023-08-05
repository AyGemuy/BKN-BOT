export async function Download(fileLink) {
  var tempList = fileLink.split("/");
  var FileID = tempList[5];
  var mode = tempList[3];

  var doc = (id) =>
    `https://docs.google.com/document/d/${id}/export?format=docx`;
  var excel = (id) =>
    `https://docs.google.com/spreadsheets/d/${id}/export?format=xlsx`;
  var ppt = (id) => `https://docs.google.com/presentation/d/${id}/export/pptx`;

  var drive = (id) => `https://drive.google.com/uc?export=download&id=${id}`;

  if (tempList[2] === "drive.google.com") {
    return drive(FileID);
  } else if (tempList[2] === "docs.google.com") {
    switch (mode) {
      case "document":
        return doc(FileID);
      case "spreadsheets":
        return excel(FileID);
      case "presentation":
        return ppt(FileID);
      default:
        break;
    }
  } else {
    return null;
  }
}
