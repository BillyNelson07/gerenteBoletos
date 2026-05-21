import jwt from "jsonwebtoken";

try {
  const dados = jwt.verify(token, process.env.JWT_SECRET);
  // dados → { id: 1, nome: 'Carlos', iat: ..., exp: ... }
  // Token válido — prossiga com a requisição
} catch (erro) {
  // Token inválido ou expirado
}
