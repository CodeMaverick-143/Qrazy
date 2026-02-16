import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustSection from './components/TrustSection';
import ValueProps from './components/ValueProps';
import ProblemSolution from './components/ProblemSolution';
import ProductOverview from './components/ProductOverview';
import HowItWorks from './components/HowItWorks';
import SecuritySection from './components/SecuritySection';
import CTABand from './components/CTABand';
import Footer from './components/Footer';

function App() {
    return (
        <div className="min-h-screen flex flex-col bg-corp-bg">
            <Navbar />
            <main className="flex-grow">
                <Hero />
                <TrustSection />
                <ValueProps />
                <ProblemSolution />
                <ProductOverview />
                <HowItWorks />
                <SecuritySection />
                <CTABand />
            </main>
            <Footer />
        </div>
    );
}

export default App;
