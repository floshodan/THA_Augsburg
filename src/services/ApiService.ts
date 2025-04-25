interface ChatMessageParams {
  knowledge: string[];
  wantKnown: string[];
  description: string;
  sessionId: number;
  message: string;
}

interface ChatResponse {
  response?: string;
  output?: string;
  data?: {
    quality?: { score: number; description: string };
    readability?: { score: number; description: string };
    structure?: { score: number; description: string };
    efficiency?: { score: number; description: string };
    tips?: string;
    progress_checkpoint?: {
      problems: string;
      category: string;
    };
  };
}

interface CodeFeedbackParams {
  task_description: string;
  solution_code: string;
  test_code: string;
  submitted_code: string;
  test_results: string;
}

interface CodeFeedbackResponse {
  output: {
    progress_checkpoint: {
      problems: string;
      category: string;
    };
    quality: {
      score: number;
      description: string;
    };
    readability: {
      score: number;
      description: string;
    };
    structure: {
      score: number;
      description: string;
    };
    efficiency: {
      score: number;
      description: string;
    };
    tips: string;
  };
}

interface GlobalFeedbackResponse {
  output: {
    shortAnswer: string;
    longAnswer: string;
  };
}

interface InterviewMessageParams {
  sessionId: number;
  message: string;
  mode: "interview";
  review: string;
}

interface InterviewResponse {
  response?: string;
  output?: string;
}

class ApiService {
  //private static readonly BASE_URL = 'http://agent.floshodan.io:5678';
  private static readonly BASE_URL = '';

  public static async sendChatMessage(params: ChatMessageParams): Promise<ChatResponse> {
    try {
      const response = await fetch(`${this.BASE_URL}/webhook/chat_responder_agent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error in sendChatMessage:', error);
      throw error;
    }
  }

  public static async getDailyFeedback(params: CodeFeedbackParams): Promise<CodeFeedbackResponse> {
    try {
      const response = await fetch(`${this.BASE_URL}/webhook/grade-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error in getDailyFeedback:', error);
      throw error;
    }
  }

  public static async getGlobalFeedback(): Promise<GlobalFeedbackResponse> {
    try {
      const targetUrl = `${this.BASE_URL}/webhook/1836e87e-4937-4db2-b8c0-6131d633a0a6`;
      console.log(targetUrl)
      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ coolResponse: 1 }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error in getGlobalFeedback:', error);
      throw error;
    }
  }

  public static async resetInterviewDialog(sessionId: number): Promise<void> {
    try {
      const response = await fetch(`${this.BASE_URL}/webhook/reset-interviewer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error in resetInterviewDialog:', error);
      throw error;
    }
  }

  public static async sendInterviewDialogMessage(params: InterviewMessageParams): Promise<InterviewResponse> {
    try {
      const response = await fetch(`${this.BASE_URL}/webhook/interviewer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error in sendInterviewDialogMessage:', error);
      throw error;
    }
  }
}

export default ApiService; 