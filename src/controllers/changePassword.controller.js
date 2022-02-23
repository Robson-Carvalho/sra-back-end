const Student = require("../models/Student");

module.exports = {
  put: async (req, res) => {
    const dataChangePassword = {
      registration: req.body.registration,
      currentPassword: req.body.currentPassword,
      password: req.body.password,
    };

    const studentExists = await Student.findOne({
      registration: dataChangePassword.registration,
    });

    if (!studentExists) {
      return res
        .status(404)
        .json({
          changePassword: false,
          message: "Matrícula do aluno(a) não encontrada!",
        })
        .end();
    }

    if (dataChangePassword.currentPassword !== studentExists.password) {
      return res
        .status(401)
        .json({ changePassword: false, message: "Senha atual incorreta!" })
        .end();
    }

    if (dataChangePassword.registration != studentExists.registration) {
      return res
        .status(404)
        .json({ changePassword: false, message: "Aluno não encontrado!" });
    }

    if (dataChangePassword.currentPassword != studentExists.password) {
      return res
        .status(401)
        .json({ changePassword: false, message: "Senha atual incorreta!" });
    }

    if (dataChangePassword.password.length < 8) {
      return res.status(401).json({
        changePassword: false,
        message: "A senha nova deve ter no mínimo 8 caracteres!",
      });
    }

    const newPassword = {
      password: dataChangePassword.password,
    };
    const student = await Student.findByIdAndUpdate(
      studentExists._id,
      newPassword
    ).clone();

    try {
      await student.save();
      return res.status(200).json({
        changePassword: true,
        message: `${studentExists.name} sua senha foi alterada com sucesso!`,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        changePassword: false,
        message: "Error no servidor, tente novamente mais tarde!",
      });
    }
  },
};
