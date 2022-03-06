const Student = require("../models/Student");
const Requirement = require("../models/Requirement");

module.exports = {
  post: async (req, res) => {
    const studentDataBody = {
      registration: req.body.registration,
      name: req.body.name,
      classroom: req.body.classroom,
      course: req.body.course,
      schoolGrade: req.body.schoolGrade,
    };

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

    if (parseInt(time()) < 9 || parseInt(time()) > 10) {
      return res
        .status(401)
        .json({
          token: true,
          requirement: false,
          message:
            "O almoço só pode ser requisitado a partir das 07h até às 08h da manhã!",
        })
        .end();
    }

    const studentExists = await Student.findOne({
      registration: studentDataBody.registration,
    });

    const requirementExists = await Requirement.findOne({
      // registration: studentExists.registration,
      date: date(),
    });

    if (!studentExists) {
      return res
        .status(404)
        .json({
          token: true,
          requirement: false,
          message: "Matrícula do aluno(a) não encontrada!",
        })
        .end();
    }

    // if (studentDataBody.password !== studentExists.password) {
    //   return res
    //     .status(401)
    //     .json({ requirement: false, message: "Senha incorreta!" })
    //     .end();
    // }

    if (!studentDataBody.name) {
      return res
        .status(422)
        .json({
          token: true,
          requirement: false,
          message: "Nome do(a) aluno(a) é obrigatório",
        })
        .end();
    }

    if (requirementExists) {
      return res
        .status(404)
        .json({
          token: true,
          requirement: false,
          message: "O almoço já foi requisitado hoje!",
        })
        .end();
    }

    if (!studentDataBody.classroom) {
      return res
        .status(422)
        .json({
          token: true,
          requirement: false,
          message: "A sala em que o aluno(a) está matriculado é obrigatória!",
        })
        .end();
    }
    if (!studentDataBody.course) {
      return res
        .status(422)
        .json({
          token: true,
          requirement: false,
          message: "O curso em que o aluno(a) está matriculado é obrigatório!",
        })
        .end();
    }
    if (!studentDataBody.schoolGrade) {
      return res
        .status(422)
        .json({
          token: true,
          requirement: false,
          message: "A série atual do aluno é obrigatório!",
        })
        .end();
    }

    const requirement = new Requirement({
      registration: req.body.registration,
      name: req.body.name,
      classroom: req.body.classroom,
      course: req.body.course,
      schoolGrade: req.body.schoolGrade,
      requirement: "Requisitado",
      date: date(),
      time: time(),
    });

    try {
      await requirement.save();
      return res.status(200).json({
        token: true,
        requirement: true,
        message: "Almoço solicitado com sucesso!",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        token: true,
        requirement: false,
        message: "Error no servidor, tente novamente mais tarde!",
      });
    }
  },
};
