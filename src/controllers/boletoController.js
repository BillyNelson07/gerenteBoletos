import {
  criarBoleto,
  carregarTodosOsBoletos,
  mudarStatusDoBoleto,
  carregarBoletoPorId,
  deletarBoleto,
} from "../services/boletoService.js";

export async function criar(req, res) {
  const dados = req.body;
  if (!dados) {
    return res
      .status(400)
      .json({ mensagem: "Requisição ruim", erro: error.message });
  }
  try {
    const novoBoleto = await criarBoleto(dados);
    return res.status(201).json({
      message: "Boleto criado com sucesso!",
      data: novoBoleto,
    });
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
}

export async function carregarTodos(req, res) {
  const token = req.body;
  if (!token) {
    return res
      .status(400)
      .json({ mensagem: "Requisição ruim", erro: error.message });
  }
  try {
    const todosOsBoletos = await carregarTodosOsBoletos(token);
    return res.status(200).json({
      message: "Boletos carregados com sucesso!",
      data: todosOsBoletos,
    });
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
}

export async function carregarPorId(req, res) {
  try {
    const { usuario_id } = req.body;
    const { id } = req.params;
    const dados = { id, usuario_id };

    const boleto = await carregarBoletoPorId(dados);
    return res.status(200).json({
      message: "Boleto carregado com sucesso!",
      data: boleto,
    });
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
}

export async function atualizarStatus(req, res) {
  try {
    const { status, usuario_id } = req.body;
    const { id } = req.params;

    const dados = { status, id, usuario_id };

    await mudarStatusDoBoleto(dados);

    return res.status(200).json({ message: "Status atualizado com sucesso!" });
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
}

export async function deletar(req, res) {
  try {
    const { id } = req.params;
    const { usuario_id } = req.body;
    const dados = { id, usuario_id };
    await deletarBoleto(dados);

    return res.status(200).json({ message: "Boleto apagado com sucesso!" });
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
}
