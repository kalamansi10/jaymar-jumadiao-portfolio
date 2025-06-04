import { lazy, Suspense, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import "@n8n/chat/style.css";
import { createChat } from "@n8n/chat";
import "./App.css";

const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const ReachOut = lazy(() => import("./pages/ReachOut"));

const App: React.FC = () => {
  const chatInitialized = useRef(false);

  useEffect(() => {
    if (!chatInitialized.current) {
      try {
        createChat({
          webhookUrl: import.meta.env.VITE_CHAT_WEBHOOK_URL,
          webhookConfig: {
            method: 'POST',
            headers: {}
          },
          target: '#n8n-chat',
          mode: 'window',
          chatInputKey: 'chatInput',
          chatSessionKey: 'sessionId',
          metadata: {},
          showWelcomeScreen: false,
          defaultLanguage: 'en',
          initialMessages: [
            'Beep! Boop! I\'m Juju, I\'m Jaymar\'s personal robot assistant.',
            'How can I help you today?'
          ],
          i18n: {
            en: {
              title: 'Juju The Chatbot 🤖',
              subtitle: "Ask to your heart's content!",
              footer: '',
              getStarted: 'New Conversation',
              inputPlaceholder: 'Type your question..',
              closeButtonTooltip: 'Close',
            },
          },
        });        
        chatInitialized.current = true;
      } catch (error) {
        console.error('Failed to initialize chat:', error);
      }
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navigation />
        <div className="pages">
          <Routes>
            <Route
              index
              element={
                <Suspense>
                  <Hero />
                </Suspense>
              }
            />
            <Route
              path="/about"
              element={
                <Suspense>
                  <About />
                </Suspense>
              }
            />
            <Route
              path="/projects"
              element={
                <Suspense>
                  <Projects />
                </Suspense>
              }
            />
            <Route
              path="/reach-out"
              element={
                <Suspense>
                  <ReachOut />
                </Suspense>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
