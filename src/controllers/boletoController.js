import * as boletoService from "../services/boletoService.js";

export async function create(req, res) {
  const dados = req.body;
  if (!dados) {
    return res
      .status(400)
      .json({ mensagem: "Requisição ruim", erro: error.message });
  }
  try {
    const novoBoleto = await boletoService.criarBoleto(dados);
    return res.status(201).json({
      message: "Boleto criado com sucesso!",
      data: novoBoleto,
    });
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
  //testar em casa
}

export async function getAll(req, res) {
  const token = req.body;
  if (!token) {
    return res
      .status(400)
      .json({ mensagem: "Requisição ruim", erro: error.message });
  }
  try {
    const todosOsBoletos = await boletoService.carregarTodosOsBoletos(token);
    return res.status(200).json({
      message: "Boletos carregados com sucesso!",
      data: todosOsBoletos,
    });
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
  //testar em casa
}

export async function updateStatus(req, res) {
  try {
    // Supondo que o middleware de autenticação já adicionou req.usuario.id
    const usuario_id = req.usuario.id;
    const { status, idBoleto } = req.body;

    const dados = { status, idBoleto, usuario_id };

    await boletoService.mudarStatusDoBoleto(dados);

    return res.status(200).json({ message: "Status atualizado com sucesso!" });
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
  //testar em casa
}
