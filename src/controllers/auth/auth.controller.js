require("dotenv").config();
const jwt = require("jsonwebtoken");
const Student = require("../../models/Student");

module.exports = {
  post: async (req, res) => {
    const JWT_SECRET = process.env.JWT_SECRET;

    const registration = req.body.registration;
    const password = req.body.password;

    const studentExists = await Student.findOne({
      registration: registration,
    });

    if (!studentExists) {
      return res
        .status(404)
        .json({ auth: false, message: "Matrícula do(a) aluno(a) não encontrada!" })
        .end();
    }

    if (password !== studentExists.password) {
      return res
        .status(401)
        .json({ auth: false, message: "Senha incorreta, tente novamente!" })
        .end();
    }

    try {
      const token = jwt.sign({ id: studentExists._id }, JWT_SECRET, {
        expiresIn: "300s",
      });

      const student = {
        registration: studentExists.registration,
        name: studentExists.name,
        course: studentExists.course,
        classroom: studentExists.classroom,
        course: studentExists.course,
        schoolGrade: studentExists.schoolGrade,
        token
      };

      return res.status(201).json({
        auth: true,
        message: "Login efetuado com sucesso!",
        data: student,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({
          auth: false,
          message: "Erro no servidor, tente novamente mais tarde!",
        })
        .end();
    }
  },
};
