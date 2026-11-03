import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Stripe from './components/ui/Stripe';
import ToastProvider from './components/toast/ToastProvider';
import Home from './pages/Home';

export default function App() {
  return (
    <HelmetProvider>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">
          <ToastProvider>
            <div id="top" className="flex min-h-svh flex-col">
              <Header />
              <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
                <Home />
              </main>
              <Stripe />
              <Footer />
            </div>
          </ToastProvider>
        </MotionConfig>
      </LazyMotion>
    </HelmetProvider>
  );
}
