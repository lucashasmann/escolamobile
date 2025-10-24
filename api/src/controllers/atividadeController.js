const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAtividades = async (req, res) => {
  try {
    const atividades = await prisma.atividade.findMany();
    res.json(atividades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar atividades" });
  }
};

const getAtividadesByTurma = async (req, res) => {
  const { id } = req.params;

  try {
    const atividades = await prisma.atividade.findMany({
      where: { turmaId: Number(id) },
      select: {
        id: true,
        titulo: true,
      },
    });

    res.json(atividades);
  } catch (error) {
    console.error("Erro ao buscar atividades:", error);
    res.status(500).json({ error: "Erro ao buscar atividades" });
  }
};

const createAtividade = async (req, res) => {
  const { titulo, turmaId } = req.body;
  try {
    const novaAtividade = await prisma.atividade.create({
      data: {
        titulo,
        turma: {
          connect: { id: Number(turmaId) },
        },
      },
    });
    res.status(201).json(novaAtividade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar atividade" });
  }
};

const updateAtividade = async (req, res) => {
  const { id } = req.params;
  const { titulo, turmaId } = req.body;
  try {
    const atividadeAtualizada = await prisma.atividade.update({
      where: { id: Number(id) },
      data: {
        titulo,
        turma: {
          connect: { id: Number(turmaId) },
        },
      },
    });
    res.json(atividadeAtualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar atividade" });
  }
};

const deleteAtividade = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.atividade.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar atividade" });
  }
};

module.exports = {
  getAtividades,
  getAtividadesByTurma,
  createAtividade,
  updateAtividade,
  deleteAtividade,
};