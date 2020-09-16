export class xX_FileBlobBase64_Helper {

  /**
   * 【Base64】格式，转【Blob】格式。
   */
  public base64ToBlob(base64: string): Blob {
    const arr   = base64.split(',');
    const mime  = arr[0].match(/:(.*?);/)?.[1];
    const bstr  = atob(arr[1]);
    let n       = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
  }


  /**
   * 【Blob】格式，转【File】格式。
   *        1.附加参考资料：[node.js - How to convert Blob to File in JavaScript - Stack Overflow](https://stackoverflow.com/a/29390393/6264260)
   */
  public blobToFile(theBlob: Blob, fileName: string): File {
    const b: any       = theBlob;
    // A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name             = fileName;
    // Cast to a File() type
    return theBlob as File;
  }

  /**
   * 【File】格式，转【Base64】格式。
   *        1.附加参考资料：[How to convert file to base64 in JavaScript? - Stack Overflow](https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript)
   */
  public fileToBase64(file: File): Promise<FileReader['result']> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload  = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

}
