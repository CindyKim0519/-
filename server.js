const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT || 3000);
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";
const ROOT = __dirname;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

function sendJson(response, status, payload) {
  response.writeHead(status, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json; charset=utf-8"
  });
  response.end(JSON.stringify(payload));
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 64 * 1024) {
        reject(new Error("요청 본문이 너무 커요."));
        request.destroy();
      }
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function responseText(payload) {
  if (typeof payload.output_text === "string") return payload.output_text.trim();
  const output = Array.isArray(payload.output) ? payload.output : [];
  for (const item of output) {
    const content = Array.isArray(item.content) ? item.content : [];
    for (const part of content) {
      if (typeof part.text === "string") return part.text.trim();
      if (typeof part.output_text === "string") return part.output_text.trim();
    }
  }
  return "";
}

async function handleRefine(request, response) {
  if (!OPENAI_API_KEY) {
    sendJson(response, 503, {
      error: "OPENAI_API_KEY 환경변수가 설정되어 있지 않아요."
    });
    return;
  }

  try {
    const body = await readRequestBody(request);
    const { text = "", prompt = "" } = JSON.parse(body || "{}");
    const source = String(text).trim();
    const instruction = String(prompt).trim()
      || "내 감정과 말투는 유지하고, 문장 흐름과 표현만 자연스럽게 다듬어줘. 과장하거나 새로운 감정은 추가하지 마.";

    if (!source) {
      sendJson(response, 400, { error: "다듬을 원문이 없어요." });
      return;
    }

    const aiInput = [
      `프롬프트: ${instruction}`,
      "",
      "원문:",
      source
    ].join("\n");

    const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        instructions: [
          "너는 커플 다이어리 앱의 문장 정리 도우미야.",
          instruction,
          "원문에 없는 사건, 감정, 사과, 약속, 호칭은 추가하지 마.",
          "한국어로 답하고, 결과 문장만 출력해."
        ].join("\n"),
        input: aiInput
      })
    });

    const payload = await openaiResponse.json();
    if (!openaiResponse.ok) {
      sendJson(response, openaiResponse.status, {
        error: payload.error?.message || "OpenAI API 요청에 실패했어요."
      });
      return;
    }

    sendJson(response, 200, {
      result: responseText(payload) || source
    });
  } catch (error) {
    sendJson(response, 500, {
      error: error.message || "AI 정리 중 오류가 발생했어요."
    });
  }
}

function serveStatic(request, response) {
  const requestPath = decodeURIComponent(new URL(request.url, `http://localhost:${PORT}`).pathname);
  const safePath = requestPath === "/" ? "/index.html" : requestPath;
  const filePath = path.normalize(path.join(ROOT, safePath));

  if (!filePath.startsWith(ROOT)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }
    response.writeHead(200, {
      "Content-Type": MIME_TYPES[path.extname(filePath).toLowerCase()] || "application/octet-stream"
    });
    response.end(data);
  });
}

const server = http.createServer((request, response) => {
  if (request.method === "OPTIONS") {
    sendJson(response, 204, {});
    return;
  }
  if (request.url?.startsWith("/api/refine")) {
    if (request.method !== "POST") {
      sendJson(response, 405, { error: "POST 요청만 사용할 수 있어요." });
      return;
    }
    handleRefine(request, response);
    return;
  }
  serveStatic(request, response);
});

server.listen(PORT, () => {
  console.log(`Duari server running at http://localhost:${PORT}`);
});
