const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getTurmas = async (req, res) => {
  try {
    const turmas = await prisma.turma.findMany();
    res.json(turmas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar turmas" });
  }
};

const getTurmaById = async (req, res) => {
  const { id } = req.params;
  try {
    const turma = await prisma.turma.findUnique({
      where: { id: Number(id) },
      include: { professor: true, atividades: true },
    });
    if (!turma) {
      return res.status(404).json({ error: "Turma não encontrada" });
    }
    res.json(turma);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar a turma" });
  }
};

const createTurma = async (req, res) => {
  const { nome, professor } = req.body;
  try {
    const novaTurma = await prisma.turma.create({
      data: {
        nome,
        professor: {
          connect: { id: Number(professor) },
        },
      },
    });
    res.json(novaTurma);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar a turma" });
  }
};

const updateTurma = async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  try {
    const updatedTurma = await prisma.turma.update({
      where: { id: Number(id) },
      data: { nome },
    });
    res.json(updatedTurma);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar a turma" });
  }
};

const deleteTurma = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.turma.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar a turma" });
  }
};

const getTurmaByProfessor = async (req, res) => {
  const { id } = req.params;

  try {
    const turmas = await prisma.turma.findMany({
      where: { professorId: Number(id) },
      select: {
        id: true,
        nome: true,
      },
    });

    res.json(turmas);
  } catch (error) {
    console.error("Erro ao buscar Turmas:", error);
    res.status(500).json({ error: "Erro ao buscar atividades" });
  }
};

module.exports = {
  getTurmas,
  getTurmaById,
  createTurma,
  updateTurma,
  deleteTurma,
  getTurmaByProfessor,
};