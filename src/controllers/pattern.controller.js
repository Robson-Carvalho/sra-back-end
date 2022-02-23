module.exports = {
  get: (req, res) => {
    res.status(200).json({
      message: "Seja bem-vindo(a) a API do Sistema de Requerimento de Almoço do IF Baiano!",
    });
  },
};
