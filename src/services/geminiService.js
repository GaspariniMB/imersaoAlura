import { GoogleGenerativeAI } from "@google/generative-ai";

// Cria uma instância do cliente GoogleGenerativeAI, utilizando a chave de API do Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Obtém o modelo generativo "gemini-1.5-flash" para gerar texto a partir de imagens
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Função assíncrona para gerar uma descrição em português do Brasil para uma imagem
export default async function gerarDescricaoComGemini(imageBuffer) {
  // Prompt padrão para solicitar a geração de uma descrição da imagem
  const prompt = "Gere uma descrição em português do Brasil para a seguinte imagem";

  try {
    // Prepara a imagem no formato esperado pela API do Gemini
    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"), // Converte o buffer da imagem para base64
        mimeType: "image/png", // Define o tipo MIME da imagem (ajuste conforme necessário)
      },
    };

    // Gera a descrição da imagem utilizando o modelo Gemini
    const res = await model.generateContent([prompt, image]);

    // Extrai o texto da resposta e retorna
    return res.response.text() || "Alt-text não disponível.";
  } catch (error) {
    // Captura e trata possíveis erros durante a geração da descrição
    console.error("Erro ao obter alt-text:", error.message, error);
    throw new Error("Erro ao obter o alt-text do Gemini.");
  }
}