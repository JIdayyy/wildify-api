const downloadHandler = (req: any, res: any) => {
  return res.download("public/Nyan-Cat-original.mp3");
};

export default downloadHandler;
