# THA Augsburg

A modern web application that combines Next.js frontend with n8n workflow automation and OpenAI's LLM capabilities for intelligent task handling.

## 🎯 Problem Statement

Learning to code presents several significant challenges:
- Students often get stuck on errors they don't understand
- Lack of real-time performance feedback
- Teachers overwhelmed with repetitive help requests
- Delayed feedback that arrives too late to be effective

## 💡 Solution

THA Augsburg addresses these challenges through:
- **AI-Powered Error Analysis**: Real-time error detection and explanation using OpenAI's LLM
- **Automated Feedback System**: Instant feedback on code submissions through n8n workflows
- **Performance Analytics**: Detailed insights into student progress and common pain points
- **Smart Assistance**: Context-aware help suggestions based on student's current task

## 🚀 Features

- **Modern Frontend**: Built with Next.js 15, React 19, and TypeScript
- **Intelligent Backend**: Powered by n8n workflow automation
- **AI Integration**: OpenAI LLM for intelligent task processing
- **RAG Implementation**: Retrieval-Augmented Generation for enhanced AI responses
- **State Management**: Efficient state handling with Zustand
- **Styling**: Beautiful UI with Tailwind CSS
- **Real-time Feedback**: Instant code analysis and suggestions
- **Performance Tracking**: Comprehensive analytics dashboard

## 🏗️ Architecture

### Frontend
- **Framework**: Next.js 15.3.1
- **Language**: TypeScript
- **State Management**: Zustand 5.0.3
- **Styling**: Tailwind CSS 4
- **UI Components**: React 19
- **Real-time Updates**: WebSocket integration for instant feedback

### Backend
- **Workflow Automation**: n8n
- **AI Processing**: OpenAI LLM
- **RAG System**: Custom implementation for enhanced AI responses
- **Analytics Engine**: Custom-built performance tracking system
- **Error Analysis**: Advanced code parsing and error detection

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 15.3.1
- **UI Library**: React 19
- **Language**: TypeScript
- **State Management**: Zustand 5.0.3
- **Styling**: Tailwind CSS 4
- **Workflow Automation**: n8n
- **AI Integration**: OpenAI
- **Development Tools**: ESLint, TypeScript, PostCSS
- **Analytics**: Custom-built tracking system

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/floshodan/THA_Augsburg
   cd THA_Augsburg
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with:
   ```
   OPENAI_API_KEY=your_api_key
   N8N_WEBHOOK_URL=your_n8n_webhook_url
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🔧 Development

- Run development server: `npm run dev`
- Build for production: `npm run build`
- Start production server: `npm run start`
- Lint code: `npm run lint`
- Run tests: `npm run test`
- Generate analytics report: `npm run analytics`

## 📚 Documentation

Detailed documentation is available in the `docs/` directory. It includes:
- Project overview
- Technical architecture
- Setup instructions
- Development guide
- API documentation
- Deployment guide
- Analytics implementation
- Error handling procedures

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
