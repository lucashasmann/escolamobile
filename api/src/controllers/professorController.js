const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getProfessores = async (req, res) => {
  try {
    const professores = await prisma.professor.findMany();
    res.json(professores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar professores" });
  }
};

const getProfessorById = async (req, res) => {
  const { id } = req.params;
  try {
    const professor = await prisma.professor.findUnique({
      where: { id: Number(id) },
    });
    if (!professor) {
      return res.status(404).json({ error: "Professor não encontrado" });
    }
    res.json(professor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar professor" });
  }
};

const createProfessor = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const newProfessor = await prisma.professor.create({
      data: { nome, email, senha },
    });
    res.json(newProfessor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar professor" });
  }
};

const updateProfessor = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;
  try {
    const updatedProfessor = await prisma.professor.update({
      where: { id: Number(id) },
      data: { nome, email, senha },
    });
    res.json(updatedProfessor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar professor" });
  }
};

const deleteProfessor = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.professor.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar professor" });
  }
};

const loginProfessor = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: "Email e senha são obrigatórios" });
  }

  try {
    const professor = await prisma.professor.findUnique({
      where: { email: email },
    });

    if (!professor || professor.senha !== senha) {
      return res.status(401).json({ message: "Email ou senha incorretos" });
    }

    return res.status(200).json({
      message: "Login realizado com sucesso",
      professor: {
        id: professor.id,
        nome: professor.nome,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports = {
  getProfessores,
  getProfessorById,
  createProfessor,
  updateProfessor,
  deleteProfessor,
  loginProfessor,
};