# Uso com Docker

### Subir os containers

```make up```

Servidor backend disponível em:

`http://localhost:3000`
### Parar os containers

`make down`

---

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

# Client Side - Documentação Técnica

## Estrutura de Componentes

O projeto é dividido em quatro componentes principais, cada um com responsabilidades específicas:

| Componente | Arquivo | Descrição |
| --- | --- | --- |
| **VideoPage** | `VideoPage.jsx` | O container principal que gerencia o estado global (transcrição, tempo do vídeo, contraste). |
| **DragDropVideoPlayer** | `DropVideo.jsx` | Gerencia o upload de arquivos, a reprodução do vídeo local e a chamada à API de transcrição. |
| **Transcription** | `Transcription.jsx` | Exibe o texto transcrito com suporte a segmentos clicáveis e auto-scroll sincronizado. |
| **VideoPlayer** | `VideoPlayer.jsx` | (Opcional/Legacy) Componente para reprodução de vídeos remotos via API com suporte a múltiplas legendas. |

---

## Detalhes dos Componentes

### 1. VideoPage (`VideoPage.jsx`)

Atua como o **Orchestrator** da aplicação.

* **Estados Globais:** `transcription` (dados da API), `currentTime` (progresso do vídeo), e `highContrast` (acessibilidade).
* **Sincronização:** Implementa a função `handleSegmentClick`, que permite ao usuário clicar em um texto da transcrição e saltar para o momento exato no vídeo.

### 2. DragDropVideoPlayer (`DropVideo.jsx`)

Responsável pela entrada de mídia e integração com o backend.

* **Upload:** Suporta arrastar e soltar (Drag-and-Drop) ou seleção via seletor de arquivos.
* **Transcrição:** Envia o arquivo de vídeo para `http://localhost:3000/transcription` via `FormData`.
* **Memória:** Utiliza `URL.createObjectURL` para pré-visualizar o vídeo local sem necessidade de upload prévio para um servidor de mídia, garantindo a limpeza com `URL.revokeObjectURL`.

### 3. Transcription (`Transcription.jsx`)

Focado na exibição de texto e experiência do usuário.

* **Sincronização Ativa:** Destaca visualmente o segmento de texto correspondente ao tempo atual do vídeo (`currentTime`).
* **Auto-Scroll:** Utiliza `scrollIntoView` para manter o texto que está sendo falado sempre visível na área de rolagem.
* **Modos de Exibição:** Pode ser minimizado ou expandido para economizar espaço na interface.

---

## Acessibilidade e Estilo

O projeto implementa o componente **VLibras** para a descrição visual para deficientes auditivos.

Também apresenta um **Modo de Alto Contraste** persistente em todos os componentes:

* **Cores:** Alterna entre um tema padrão e um tema de alto contraste (fundo preto e texto/detalhes amarelos).
* **Feedback Visual:** Botões e estados de foco são otimizados para garantir que usuários com baixa visão possam navegar na interface com facilidade.


