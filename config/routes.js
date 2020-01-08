module.exports = app => {
  
  app.route('/save/img/doc')
    .all(app.config.passport.authStorage())
    .post(app.upload.single('img_documento'), app.controllers.uploadImageOcr.store)

  app.route('/save/img/ass')
    .all(app.config.passport.authStorage())
    .post(app.upload.single('img_assinatura'), app.controllers.uploadImageAss.store)

}