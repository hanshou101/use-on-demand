export class xX_FileBlobBase64_Helper {

  /**
   * 【Base64】格式，转【Blob】格式。
   */
  public static base64ToBlob(base64: string): Blob {
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
   * 【Base64】格式，转【Uint8Array】格式。
   */
  public static url_base64_To_Uint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64  = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData     = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  /**
   * 【Blob】格式，转【File】格式。
   *        1.附加参考资料：[node.js - How to convert Blob to File in JavaScript - Stack Overflow](https://stackoverflow.com/a/29390393/6264260)
   */
  public  static blobToFile(theBlob: Blob, fileName: string): File {
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
  public  static fileToBase64(file: File): Promise<FileReader['result']> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload  = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

}
