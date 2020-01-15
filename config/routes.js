module.exports = app => {
  
  // Rota para salvar a imagem vinda do OCR 
  app.route('/save/img/doc')
    .all(app.config.passport.authStorage())
    .post(app.upload.single('img_documento'), app.controllers.uploadImageOcr.store)

  // Rota para salvar a imagem da assinatura
  app.route('/save/img/ass')
    .all(app.config.passport.authStorage())
    .post(app.upload.single('img_assinatura'), app.controllers.uploadImageAss.store)

  // Rota para salvar o PDF do termo do hotel
  app.route('/save/dados/hotel')
    .all(app.config.passport.authStorage())
    .post(app.uploadPdfLogo.single('dados_hotel'), app.controllers.upPdfLogo.store)

}