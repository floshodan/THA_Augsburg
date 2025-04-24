---
sidebar_position: 3
---

# API Documentation

This document provides detailed information about the API endpoints and integration points in the THA Augsburg project.

## Overview

The API consists of several integration points:
1. Frontend to n8n communication
2. n8n to OpenAI integration
3. RAG system endpoints

## Frontend to n8n Endpoints

### Process Task
```typescript
POST /api/n8n/process-task

Request:
{
  "taskId": string,
  "input": {
    "query": string,
    "context": object,
    "parameters": object
  }
}

Response:
{
  "status": "success" | "error",
  "data": {
    "result": any,
    "metadata": object
  }
}
```

### Get Task Status
```typescript
GET /api/n8n/task-status/:taskId

Response:
{
  "status": "pending" | "processing" | "completed" | "failed",
  "progress": number,
  "result": any
}
```

## n8n Workflow Endpoints

### OpenAI Processing
```typescript
POST /api/openai/process

Request:
{
  "prompt": string,
  "context": object,
  "parameters": {
    "model": string,
    "temperature": number,
    "max_tokens": number
  }
}

Response:
{
  "completion": string,
  "usage": {
    "prompt_tokens": number,
    "completion_tokens": number,
    "total_tokens": number
  }
}
```

### RAG Processing
```typescript
POST /api/rag/process

Request:
{
  "query": string,
  "context": object,
  "parameters": {
    "top_k": number,
    "threshold": number
  }
}

Response:
{
  "answer": string,
  "sources": array,
  "confidence": number
}
```

## Error Handling

All API endpoints follow a consistent error response format:

```typescript
{
  "status": "error",
  "error": {
    "code": string,
    "message": string,
    "details": object
  }
}
```

Common error codes:
- `INVALID_REQUEST`: Invalid input parameters
- `PROCESSING_ERROR`: Error during task processing
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `AUTHENTICATION_ERROR`: Invalid or missing authentication
- `INTERNAL_ERROR`: Server-side error

## Authentication

API endpoints are secured using API keys:

```typescript
Headers:
{
  "Authorization": "Bearer <api_key>",
  "Content-Type": "application/json"
}
```

## Rate Limiting

- 100 requests per minute per API key
- 1000 requests per hour per API key
- Rate limit headers included in responses:
  ```typescript
  {
    "X-RateLimit-Limit": number,
    "X-RateLimit-Remaining": number,
    "X-RateLimit-Reset": timestamp
  }
  ```

## Webhook Configuration

n8n webhooks are configured with the following settings:

```typescript
{
  "path": "/webhook/:workflowId",
  "method": "POST",
  "authentication": "apiKey",
  "timeout": 30000,
  "response": {
    "format": "json",
    "statusCode": 200
  }
}
```

## Testing Endpoints

### Health Check
```typescript
GET /api/health

Response:
{
  "status": "healthy",
  "timestamp": string,
  "version": string
}
```

### Test Webhook
```typescript
POST /api/test/webhook

Request:
{
  "workflowId": string,
  "testData": object
}

Response:
{
  "status": "success",
  "response": object
}
``` 