# Transcription API — Documentação Técnica

## Visão Geral

Esta API fornece um endpoint para **upload de vídeo** e **transcrição automática de áudio** utilizando o modelo **Whisper (OpenAI)**.  
O arquivo é processado, transcrito e removido do servidor após a execução.

---

## Stack Utilizada

- Node.js
- Express
- Multer (upload de arquivos)
- OpenAI API (Whisper)
- dotenv
- cors
- fs / fs/promises

---

## Estrutura de Pastas (resumida)

```
.
├── controllers/
│   └── transcriptionController.js
├── routes/
│   └── transcriptionRoutes.js
├── services/
│   └── transcriptionServices.js
├── uploads/
├── app.js
├── server.js
└── .env
```
---

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
OPENAI_API_KEY=your_openai_api_key
```

# Endpoint de Transcrição
POST /transcription

Realiza o upload de um vídeo e retorna a transcrição do áudio.

Request

Método: POST

Content-Type: multipart/form-data

Body (form-data)
Campo	Tipo	Obrigatório	Descrição
video	File	Sim	Arquivo de vídeo
Exemplo (curl)
```
curl -X POST http://localhost:3000/transcription \
  -F "video=@video.mp4"
```

Response — Sucesso (200)

```
{
  "text": "Texto completo transcrito...",
  "segments": [
    {
      "id": 0,
      "start": 0.0,
      "end": 4.1,
      "text": "Primeiro trecho"
    },
    {
      "id": 1,
      "start": 4.1,
      "end": 9.3,
      "text": "Segundo trecho"
    }
  ]
}
```


Response — Erros
400 — Arquivo não enviado
```
{
  "error": "Nenhum arquivo enviado."
}
```


500 — Erro interno

```
{
  "error": "Mensagem do erro"
}
```


# Uso com Docker

### Subir os containers

```make up```

Servidor backend disponível em:

`http://localhost:3000`
### Parar os containers

`make down`



