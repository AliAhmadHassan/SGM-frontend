interface Dialog {
    title: string;
    message: string;
    icon: string;
    textButton: string;
    icon2: string;
    textButton2: string;
    success: () => void;
    cancel: () => void;
  }
  
  export default Dialog;
  