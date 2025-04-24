---
sidebar_position: 4
---

# Installation Guide

This guide will help you set up the THA Augsburg project, including the frontend, n8n workflows, and OpenAI integration.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 18 or higher)
- npm (version 9 or higher)
- Git
- n8n (latest version)
- OpenAI API access

## Frontend Setup

1. **Clone the Repository**
   ```bash
   git clone [your-repository-url]
   cd THA_Augsburg
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```
   # Frontend Configuration
   NEXT_PUBLIC_API_URL=http://localhost:3000
   NEXT_PUBLIC_N8N_WEBHOOK_URL=http://localhost:5678/webhook
   
   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key
   OPENAI_MODEL=gpt-4
   
   # n8n Configuration
   N8N_API_KEY=your_n8n_api_key
   ```

## n8n Setup

1. **Install n8n**
   ```bash
   npm install n8n -g
   ```

2. **Start n8n**
   ```bash
   n8n start
   ```

3. **Configure n8n**
   - Access the n8n interface at `http://localhost:5678`
   - Create a new API key in the settings
   - Import the workflow templates from the project

4. **Environment Variables**
   Create a `.env` file in your n8n directory:
   ```
   # n8n Configuration
   N8N_BASIC_AUTH_ACTIVE=true
   N8N_BASIC_AUTH_USER=admin
   N8N_BASIC_AUTH_PASSWORD=your_password
   
   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key
   ```

## OpenAI Integration

1. **API Key Setup**
   - Get your OpenAI API key from the OpenAI platform
   - Add it to both frontend and n8n environment files

2. **RAG System Setup**
   ```bash
   # Install vector database (e.g., Pinecone)
   npm install @pinecone-database/pinecone
   
   # Set up environment variables
   PINECONE_API_KEY=your_pinecone_api_key
   PINECONE_ENVIRONMENT=your_environment
   ```

## Development Server

1. **Start Frontend**
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`

2. **Start n8n**
   ```bash
   n8n start
   ```
   n8n will be available at `http://localhost:5678`

## Testing the Setup

1. **Verify Frontend**
   - Access `http://localhost:3000`
   - Check if the application loads correctly

2. **Verify n8n**
   - Access `http://localhost:5678`
   - Check if workflows are imported
   - Test webhook endpoints

3. **Verify OpenAI Integration**
   - Test a simple query through the frontend
   - Check n8n logs for OpenAI API calls
   - Verify RAG system responses

## Common Issues

### Frontend Issues
- **Port Conflict**: Change port in `.env.local`
  ```
  PORT=3001
  ```
- **API Connection**: Verify API URLs and keys

### n8n Issues
- **Workflow Import**: Check workflow JSON format
- **Webhook Access**: Verify webhook URLs and authentication

### OpenAI Issues
- **API Limits**: Check usage and limits
- **Model Access**: Verify model availability
- **RAG System**: Check vector database connection

## Next Steps

After installation, you can:
1. Explore the [Development Guide](./development)
2. Check the [API Documentation](./api)
3. Learn about [Architecture](./architecture) 