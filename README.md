# MeetingMinds - AI-Powered Meeting Transcript Processor

## Overview
MeetingMinds is a full-stack web application that leverages AI to process meeting transcripts and generate actionable summaries. The platform allows users to upload transcript files, customize AI prompts, and receive structured meeting summaries via email.

## 🎯 Project Approach & Process

### 1. **Problem Analysis**
- **Challenge**: Manual processing of meeting transcripts is time-consuming and prone to human error
- **Solution**: Automated AI-powered transcript analysis with customizable summarization
- **Key Features**: File upload, AI processing, email delivery, and sharing capabilities

### 2. **Architecture Design**
```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   React Frontend │────│   Node.js API    │────│  AI Processing  │
│   (Vite + TS)   │     │   (Express)      │     │   (OpenAI)      │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                                │
                       ┌──────────────────┐
                       │   Email Service  │
                       │   (Nodemailer)   │
                       └──────────────────┘
```

### 3. **Development Process**

#### Phase 1: Foundation Setup
- **Backend**: Node.js with Express framework
- **Frontend**: React with TypeScript and Vite
- **Database**: File-based storage for MVP
- **Deployment**: Vercel for both frontend and backend

#### Phase 2: Core Features Implementation
- File upload system with validation
- AI integration with groq ai
- Email service integration
- Real-time processing feedback

#### Phase 3: User Experience Enhancement
- Responsive design with modern UI components
- Error handling and loading states
- Share functionality with unique links
- Customizable AI prompts

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite (fast development and optimized builds)
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React hooks (useState, useEffect)
- **HTTP Client**: Axios for API communication
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: JavaScript (ES6+)
- **File Upload**: Multer for handling multipart/form-data
- **Email**: Nodemailer with Gmail SMTP
- **AI Integration**: OpenAI GPT-3.5-turbo API
- **CORS**: Cross-origin resource sharing enabled

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint with TypeScript support
- **Formatting**: Prettier
- **Environment**: dotenv for configuration management

## 📁 Project Structure

```
MeetingMinds/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API service layer
│   │   └── hooks/            # Custom React hooks
│   └── package.json
├── backend/                  # Node.js backend API
│   ├── src/
│   │   ├── routes/           # API route handlers
│   │   ├── services/         # Business logic services
│   │   └── middleware/       # Express middleware
│   ├── api/                  # Vercel serverless functions
│   └── server.js             # Express server setup
├── vercel.json               # Vercel deployment configuration
└── README.md
```

## 🚀 Key Features & Implementation

### 1. **File Upload System**
- **Technology**: Multer middleware for multipart form handling
- **Validation**: File type and size restrictions
- **Processing**: Real-time upload progress with React state management

### 2. **AI Processing Pipeline**
- **Model**: OpenAI GPT-3.5-turbo for optimal balance of quality and cost
- **Prompt Engineering**: Customizable prompts for different summary styles
- **Error Handling**: Graceful fallbacks for API failures

### 3. **Email Integration**
- **Service**: Gmail SMTP via Nodemailer
- **Templates**: Dynamic HTML email templates
- **Security**: Environment-based configuration

### 4. **Sharing Mechanism**
- **Implementation**: Unique identifier generation for each processed transcript
- **Storage**: Temporary file storage with cleanup
- **Access**: Shareable links with expiration

## 🔧 Development Setup

### Prerequisites
- Node.js (v16 or higher)
- npm package manager
- OpenAI API key
- Gmail account for email service

### Environment Variables
Create `.env` files in both frontend and backend directories:

**Backend (.env)**
```
OPENAI_API_KEY=your_openai_api_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
PORT=5000
```

**Frontend (.env)**
```
VITE_API_URL=http://localhost:5000/api
```

### Installation Steps

1. **Clone the repository**
```bash
git clone [repository-url]
cd MeetingMinds
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd ../frontend
npm install
```

4. **Start development servers**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## 🚀 Deployment

### Vercel Deployment (Recommended)
1. **Frontend**: Connect GitHub repository to Vercel
2. **Backend**: Deploy backend/api directory as serverless functions
3. **Environment Variables**: Configure in Vercel dashboard

### Manual Deployment
```bash
# Build frontend
cd frontend
npm run build

# Deploy backend
cd backend
vercel --prod
```

## 🔍 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/upload` | Upload transcript file |
| POST | `/api/process` | Process transcript with AI |
| POST | `/api/email` | Send summary via email |
| GET | `/api/transcript/:id` | Retrieve processed transcript |

## 🧪 Testing Strategy

### Unit Testing
- **Frontend**: React Testing Library for component testing
- **Backend**: Jest for API endpoint testing

### Integration Testing
- **File Upload**: Test various file formats and sizes
- **AI Processing**: Validate summary quality and format
- **Email Delivery**: Test email sending functionality

## 📊 Performance Optimization

### Frontend
- **Code Splitting**: Lazy loading for better initial load
- **Image Optimization**: WebP format with fallbacks
- **Caching**: Browser caching for static assets

### Backend
- **Response Compression**: Gzip compression for API responses
- **Rate Limiting**: Prevent API abuse
- **Caching**: Redis for frequently accessed data (future enhancement)

## 🔐 Security Considerations

- **Input Validation**: Sanitize all user inputs
- **CORS Configuration**: Restrict origins in production
- **API Key Management**: Secure storage of OpenAI keys
- **File Upload Security**: Scan uploaded files for malicious content

## 🎯 Future Enhancements

1. **Database Integration**: MongoDB for persistent storage
2. **User Authentication**: JWT-based authentication system
3. **Real-time Updates**: WebSocket integration for live processing
4. **Advanced Analytics**: Usage tracking and insights
5. **Multi-language Support**: Internationalization (i18n)
6. **Mobile App**: React Native companion app

## 📞 Support & Contributing

For questions, issues, or contributions:
- Open an issue on GitHub
- Submit a pull request with detailed description
- Follow the existing code style and conventions

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ using React, Node.js, and OpenAI**
