const Student = require("../models/Student");

module.exports = {
  post: async (req, res) => {
    const studentDataBody = {
      registration: req.body.registration,
      cpf: req.body.cpf,
      name: req.body.name,
      password: req.body.password,
      classroom: req.body.classroom,
      course: req.body.course,
      schoolGrade: req.body.schoolGrade,
    };

    if (!studentDataBody.registration) {
      return res
        .status(422)
        .json({
          register: false,
          message: "Número de matrícula é obrigatório!",
        })
        .end();
    }
    if (!studentDataBody.cpf) {
      return res
        .status(422)
        .json({ register: false, message: "Número do cpf é obrigatório!" })
        .end();
    }
    if (!studentDataBody.name) {
      return res
        .status(422)
        .json({ register: false, message: "Nome do(a) aluno(a) é obrigatório" })
        .end();
    }
    if (studentDataBody.password != "") {
      if (studentDataBody.password.length < 8) {
        return res
          .status(422)
          .json({
            register: false,
            message: "A senha deve ser vazia ou no mínimo 8 caracteres!",
          })
          .end();
      }
    }
    if (!studentDataBody.classroom) {
      return res
        .status(422)
        .json({
          register: false,
          message: "A sala em que o aluno(a) está matriculado é obrigatória!",
        })
        .end();
    }
    if (!studentDataBody.course) {
      return res
        .status(422)
        .json({
          register: false,
          message: "O curso em que o aluno(a) está matriculado é obrigatório!",
        })
        .end();
    }
    if (!studentDataBody.schoolGrade) {
      return res
        .status(422)
        .json({
          register: false,
          message: "A série atual do aluno é obrigatório!",
        })
        .end();
    }

    if (studentDataBody.password === "") {
      studentDataBody.password = studentDataBody.cpf;
    }

    const studentEnrollmentExists = await Student.findOne({
      registration: studentDataBody.registration,
    });

    const studentCpfExists = await Student.findOne({
      cpf: studentDataBody.cpf,
    });

    if (studentEnrollmentExists) {
      return res.status(422).json({
        message: "Matrícula existente! Por favor, tente outro novamente! ",
      });
    }

    if (studentCpfExists) {
      return res.status(422).json({
        message: "CPF existente! Por favor, tente outro novamente! ",
      });
    }

    const checkNumberLessThanTen = (value) => {
      if (value < 10) {
        return `0${value}`;
      }
      return value;
    };

    function date() {
      let date = new Date();
      let newDate = `${checkNumberLessThanTen(
        date.getDate()
      )}/${checkNumberLessThanTen(date.getMonth() + 1)}/${date.getFullYear()}`;
      return newDate;
    }

    function time() {
      const time = new Date();
      let timeConfig = {
        hours: time.getHours(),
        minutes: time.getMinutes(),
        seconds: time.getSeconds(),
      };

      const newTime = `${checkNumberLessThanTen(
        timeConfig.hours
      )}:${checkNumberLessThanTen(timeConfig.minutes)}:${checkNumberLessThanTen(
        timeConfig.seconds
      )}`;

      return newTime;
    }

    const student = new Student({
      ...studentDataBody,
      date: await date(),
      time: await time(),
    });

    try {
      await student.save();
      res
        .status(201)
        .json({ register: true, message: "Aluno registrado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        register: false,
        message: "Erro no servidor, tente novamente mais tarde!",
      });
    }
  },
};
